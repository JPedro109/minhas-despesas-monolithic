import {
	IUnitOfWorkRepository,
	UpdateUserEmailDTO,
	IUpdateUserEmailUseCase,
	InvalidParamError
} from "@/layers/application";

export class UpdateUserEmailUseCase implements IUpdateUserEmailUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute({ email, code }: UpdateUserEmailDTO): Promise<string> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();

		const userVerificationCode = await userVerificationCodeRepository.getUserVerificationCodeByVerificationCode(code);
		if(!userVerificationCode) throw new InvalidParamError("Código inválido"); 

		const user = userVerificationCode.user;

		if(new Date().getTime() >= userVerificationCode.verificationCodeExpiryDate.getTime()) throw new InvalidParamError("Código expirado");

		user.email = email;

		await this.unitOfWorkRepository.transaction(async () => {
			await userRepository.updateUserById(user.id, userVerificationCode.user);

            userVerificationCode.valid = false;
			await userVerificationCodeRepository.updateUserVerificationCodeById(userVerificationCode.id, userVerificationCode);
		});

		return user.email;
	}
}