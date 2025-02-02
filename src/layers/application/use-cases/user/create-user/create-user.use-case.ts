import { environmentVariables } from "@/shared";
import {
    CustomerEntity,
    UserConsentEntity,
    UserEntity,
    UserVerificationCodeEntity,
    UserVerificationCodeTypeEnum,
} from "@/layers/domain";
import {
    IUnitOfWorkRepository,
    INotification,
    ICryptography,
    IGeneration,
    IPayment,
    InvalidParamError,
    ConflictedError,
    EmailTemplateEnum,
    CreateUserDTO,
    ICreateUserUseCase,
} from "@/layers/application";

export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly notification: INotification,
        private readonly cryptography: ICryptography,
        private readonly generation: IGeneration,
        private readonly payment: IPayment,
    ) {}

    async execute({
        email,
        username,
        password,
        passwordConfirm,
        consentVersion,
        userAgent,
        ipAddress,
    }: CreateUserDTO): Promise<string> {
        const user = new UserEntity({
            email,
            password,
            username,
            verifiedEmail: false,
        });

        const hashPassword = await this.cryptography.toHash(user.password);
        user.password = hashPassword;

        if (password !== passwordConfirm)
            throw new InvalidParamError("As senhas não coincidem");

        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const userConsentRepository =
            this.unitOfWorkRepository.getUserConsentRepository();
        const userVerificationCodeRepository =
            this.unitOfWorkRepository.getUserVerificationCodeRepository();
        const customerRepository =
            this.unitOfWorkRepository.getCustomerRepository();

        const userExists = await userRepository.getUserByEmail(user.email);
        if (userExists) throw new ConflictedError("Email já cadastrado");

        let userCreated: UserEntity;

        await this.unitOfWorkRepository.transaction(async () => {
            userCreated = await userRepository.createUser(user);

            const userConsent = new UserConsentEntity({
                userId: userCreated.id,
                consentVersion,
                ipAddress,
                userAgent,
            });
            await userConsentRepository.createUserConsent(userConsent);

            const code = this.generation.generateCode();
            const userVerificationCode = new UserVerificationCodeEntity({
                type: UserVerificationCodeTypeEnum.VerifyUserEmail,
                user: userCreated,
                valid: true,
                verificationCode: code,
            });
            await userVerificationCodeRepository.createUserVerificationCode(
                userVerificationCode,
            );

            const customerId = await this.payment.createCustomer();
            try {
                const customer = new CustomerEntity({
                    userId: userCreated.id,
                    customerId,
                });
                await customerRepository.createCustomer(customer);
                await this.notification.sendEmail(
                    email,
                    EmailTemplateEnum.VerifyUserEmailTemplate,
                    {
                        appUrl: environmentVariables.appUrl,
                        email,
                        username,
                        code,
                    },
                );
            } catch (e) {
                await this.payment.deleteCustomer(customerId);
                throw e;
            }
        });

        return userCreated.id;
    }
}
