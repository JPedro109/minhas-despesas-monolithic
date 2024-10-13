import {
	IUnitOfWorkRepository,
	VerifyUserEmailDTO,
	IVerifyUserEmailUseCase,
	InvalidParamError
} from "@/layers/application";
import { UserVerificationCodeTypeEnum } from "@/layers/domain";

export class VerifyUserEmailUseCase implements IVerifyUserEmailUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute({ code }: VerifyUserEmailDTO): Promise<string> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();

		const userVerificationCode = await userVerificationCodeRepository.getUserVerificationCodeByVerificationCode(code);
		if(!userVerificationCode || userVerificationCode.type !== UserVerificationCodeTypeEnum.VerifyUserEmail) 
			throw new InvalidParamError("Código inválido"); 

		const user = userVerificationCode.user;

		if(new Date().getTime() >= userVerificationCode.verificationCodeExpiryDate.getTime()) throw new InvalidParamError("Código expirado");

		user.verifiedEmail = true;

		await this.unitOfWorkRepository.transaction(async () => {
			userVerificationCode.valid = false;
			await userVerificationCodeRepository.updateUserVerificationCodeById(userVerificationCode.id, userVerificationCode);
			await userRepository.updateUserById(user.id, userVerificationCode.user);
		});

		return user.email;
	}
}