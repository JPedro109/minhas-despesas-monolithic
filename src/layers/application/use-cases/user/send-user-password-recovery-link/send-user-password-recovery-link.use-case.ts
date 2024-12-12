import { environmentVariables } from "@/shared";
import { UserVerificationCodeEntity, UserVerificationCodeTypeEnum } from "@/layers/domain";
import {
	IUnitOfWorkRepository,
	INotification,
	IGeneration,
	MailBodyTypeEnum,
	SendUserPasswordRecoveryLinkDTO,
	ISendUserPasswordRecoveryLinkUseCase,
	NotFoundError
} from "@/layers/application";

export class SendUserPasswordRecoveryLinkUseCase implements ISendUserPasswordRecoveryLinkUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly notification: INotification,
		private readonly generation: IGeneration
	) { }

	async execute({ email }: SendUserPasswordRecoveryLinkDTO): Promise<void> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();
	
		const user = await userRepository.getUserByEmail(email);
		if(!user) throw new NotFoundError("Email não cadastrado");

		const verificationCode = this.generation.generateCode();
		const verificationCodeExpiryDate = this.generation.generateCodeExpirationDate();

		const userVerificationCode = new UserVerificationCodeEntity({
			user: user,
			type: UserVerificationCodeTypeEnum.RecoveryUserPassword,
			valid: true,
			verificationCode,
			verificationCodeExpiryDate
		});

		await this.unitOfWorkRepository.transaction(async () => {
			await userVerificationCodeRepository.createUserVerificationCode(userVerificationCode);
			await this.notification.sendMail(email, MailBodyTypeEnum.RecoveryUserPasswordBody, {
				appUrl: environmentVariables.appUrl,
				email,
				code: verificationCode
			});
		});
	}
}