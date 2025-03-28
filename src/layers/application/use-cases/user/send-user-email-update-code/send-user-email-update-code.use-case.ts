import {
    UserVerificationCodeEntity,
    UserVerificationCodeTypeEnum,
} from "@/layers/domain";
import {
    IUnitOfWorkRepository,
    INotification,
    IGeneration,
    ConflictedError,
    EmailTemplateEnum,
    SendUserEmailUpdateCodeDTO,
    ISendUserEmailUpdateCodeUseCase,
    NotFoundError,
} from "@/layers/application";

export class SendUserEmailUpdateCodeUseCase
    implements ISendUserEmailUpdateCodeUseCase
{
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly notification: INotification,
        private readonly generation: IGeneration,
    ) {}

    async execute({ id, email }: SendUserEmailUpdateCodeDTO): Promise<void> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const userVerificationCodeRepository =
            this.unitOfWorkRepository.getUserVerificationCodeRepository();

        const user = await userRepository.getUserById(id);
        if (!user) throw new NotFoundError("Usuário não existe");

        const emailExists = await userRepository.getUserByEmail(email);
        if (emailExists) throw new ConflictedError("Email já cadastrado");

        const verificationCode = this.generation.generateCode();
        const verificationCodeExpiryDate =
            this.generation.generateCodeExpirationDate();

        const userVerificationCode = new UserVerificationCodeEntity({
            user,
            type: UserVerificationCodeTypeEnum.UpdateUserEmail,
            valid: true,
            verificationCode,
            verificationCodeExpiryDate,
        });

        await this.unitOfWorkRepository.transaction(async () => {
            await userVerificationCodeRepository.createUserVerificationCode(
                userVerificationCode,
            );
            await this.notification.sendEmail(
                email,
                EmailTemplateEnum.UpdateUserEmailTemplate,
                {
                    email,
                    code: verificationCode,
                },
            );
        });
    }
}
