import { environmentVariables } from "@/shared";
import {
	IUnitOfWorkRepository,
	IMail,
	IGeneration,
	MailBodyTypeEnum,
	SendUserPasswordRecoveryLinkDTO,
	ISendUserPasswordRecoveryLinkUseCase,
	NotFoundError
} from "@/layers/application";
import { UserVerificationCodeEntity, UserVerificationCodeTypeEnum } from "@/layers/domain";

export class SendUserPasswordRecoveryUseCase implements ISendUserPasswordRecoveryLinkUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly mail: IMail,
		private readonly generation: IGeneration
	) { }

	async execute({ email }: SendUserPasswordRecoveryLinkDTO): Promise<string> {
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
		await userVerificationCodeRepository.createUserVerificationCode(userVerificationCode);

		await this.mail.sendMail(email, MailBodyTypeEnum.RecoveryUserPasswordBody, {
			appUrl: environmentVariables.appUrl,
			email,
			code: verificationCode
		});

		return user.email;
	}
}