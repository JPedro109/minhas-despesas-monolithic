import { environmentVariables } from "@/shared";
import {
	CustomerEntity,
	SubscriptionEntity,
	UserConsentEntity,
	UserEntity,
	UserVerificationCodeEntity,
	UserVerificationCodeTypeEnum,
	PlanNameEnum
} from "@/layers/domain";
import {
	IUnitOfWorkRepository,
	IMail,
	ICryptography,
	IGeneration,
	IPayment,
	InvalidParamError,
	ConflictedError,
	MailBodyTypeEnum,
	CreateUserDTO,
	ICreateUserUseCase
} from "@/layers/application";

export class CreateUserUseCase implements ICreateUserUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly mail: IMail,
		private readonly cryptography: ICryptography,
		private readonly generation: IGeneration,
		private readonly payment: IPayment
	) { }

	async execute({ email, username, password, passwordConfirm, consentVersion, userAgent, ipAddress }: CreateUserDTO): Promise<string> {
		const user = new UserEntity({
			email,
			password,
			username,
			verifiedEmail: false
		});

		const hashPassword = await this.cryptography.toHash(user.password);
		user.password = hashPassword;

		if (password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userConsentRepository = this.unitOfWorkRepository.getUserConsentRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();
		const customerRepository = this.unitOfWorkRepository.getCustomerRepository();
		const planRepository = this.unitOfWorkRepository.getPlanRepository();
		const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();

		const userExists = await userRepository.getUserByEmail(user.email);
		if (userExists) throw new ConflictedError("Email já cadastrado");

		let userCreated: UserEntity;

		await this.unitOfWorkRepository.transaction(async () => {
			userCreated = await userRepository.createUser(user);

			const userConsent = new UserConsentEntity({
				userId: userCreated.id,
				consentDate: new Date(),
				consentVersion,
				ipAddress,
				userAgent
			});
			await userConsentRepository.createUserConsent(userConsent);

			const code = this.generation.generateCode();
			const userVerificationCode = new UserVerificationCodeEntity({
				type: UserVerificationCodeTypeEnum.VerifyUserEmail,
				user: userCreated,
				valid: true,
				verificationCode: code
			});
			await userVerificationCodeRepository.createUserVerificationCode(userVerificationCode);

			const planFree = await planRepository.getPlanByName(PlanNameEnum.Free);

			const date = new Date();
			const subspcription = new SubscriptionEntity({
				userId: userCreated.id,
				planId: planFree.id,
				active: true,
				renewable: false,
				amount: planFree.amount,
				startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
			});
			await subscriptionRepository.createSubscription(subspcription);

			const customerId = await this.payment.createCustomer(email);
			try {
				const customer = new CustomerEntity({
					userId: userCreated.id,
					customerId
				});
				await customerRepository.createCustomer(customer);
				await this.mail.sendMail(email, MailBodyTypeEnum.VerifyUserEmailBody, {
					appUrl: environmentVariables.appUrl,
					email,
					username,
					code
				});
			} catch (e) {
				await this.payment.deleteCustomer(customerId);
				throw e;
			}
		});

		return userCreated.email;
	}
}