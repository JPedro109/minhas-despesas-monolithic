import { environmentVariables } from "@/shared";
import { UserVerificationCodeEntity, UserVerificationCodeTypeEnum } from "@/layers/domain";
import {
	IUnitOfWorkRepository,
	IMail,
	IGeneration,
	ConflictedError,
	MailBodyTypeEnum,
	SendUserEmailUpdateLinkDTO,
	ISendUserEmailUpdateLinkUseCase,
	NotFoundError
} from "@/layers/application";

export class SendUserEmailUpdateLinkUseCase implements ISendUserEmailUpdateLinkUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly mail: IMail,
		private readonly generation: IGeneration
	) { }

	async execute({ id, email }: SendUserEmailUpdateLinkDTO): Promise<void> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();

		const user = await userRepository.getUserById(id);
		if(!user) throw new NotFoundError("Usuário não existe");
	
		const emailExists = await userRepository.getUserByEmail(email);
		if(emailExists) throw new ConflictedError("Email já cadastrado");

		const verificationCode = this.generation.generateCode();
		const verificationCodeExpiryDate = this.generation.generateCodeExpirationDate();

		const userVerificationCode = new UserVerificationCodeEntity({
			user,
			type: UserVerificationCodeTypeEnum.UpdateUserEmail,
			valid: true,
			verificationCode,
			verificationCodeExpiryDate
		});

		await this.unitOfWorkRepository.transaction(async () => {
			await userVerificationCodeRepository.createUserVerificationCode(userVerificationCode);
			await this.mail.sendMail(email, MailBodyTypeEnum.UpdateUserEmailBody, {
				appUrl: environmentVariables.appUrl,
				email,
				code: verificationCode
			});
		});
	}
}