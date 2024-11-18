import { UserVerificationCodeTypeEnum } from "@/layers/domain";
import {
	IUnitOfWorkRepository,
	ICryptography,
	RecoverUserPasswordDTO,
	IRecoverUserPasswordUseCase,
	InvalidParamError
} from "@/layers/application";

export class RecoverUserPasswordUseCase implements IRecoverUserPasswordUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly cryptography: ICryptography
	) { }

	async execute({ code, password, passwordConfirm }: RecoverUserPasswordDTO): Promise<void> {
		if(password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();

		const userVerificationCode = await userVerificationCodeRepository.getUserVerificationCodeByVerificationCode(code);
		if(!userVerificationCode || userVerificationCode.type !== UserVerificationCodeTypeEnum.RecoveryUserPassword) 
			throw new InvalidParamError("Código inválido"); 

		const user = userVerificationCode.user;

		if(new Date().getTime() >= userVerificationCode.verificationCodeExpiryDate.getTime()) throw new InvalidParamError("Código expirado");

		const passwordEqual = await this.cryptography.compareHash(user.password, password);

		if(passwordEqual) throw new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.toHash(password);
        user.password = password;
        user.password = hashPassword;

		await this.unitOfWorkRepository.transaction(async () => {
			userVerificationCode.valid = false;
			await userVerificationCodeRepository.updateUserVerificationCodeById(userVerificationCode.id, userVerificationCode);
			await userRepository.updateUserById(user.id, user);
		});
	}
}