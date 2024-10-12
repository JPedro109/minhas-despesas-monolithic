import {
	IUnitOfWorkRepository,
	ICryptography,
	UpdateUserPasswordDTO,
	IUpdateUserPasswordUseCase,
	InvalidParamError,
	NotFoundError
} from "@/layers/application";

export class UpdateUserPasswordUseCase implements IUpdateUserPasswordUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly cryptography: ICryptography
	) { }

	async execute({ id, password, newPassword, newPasswordConfirm }: UpdateUserPasswordDTO): Promise<string> {
		if(newPassword !== newPasswordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWorkRepository.getUserRepository();

		const user = await userRepository.getUserById(id);
		if(!user) throw new NotFoundError("O usuário não existe");

		const passwordEqual = await this.cryptography.compareHash(user.password, password);
		if(passwordEqual) throw new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const hashPassword = await this.cryptography.toHash(newPassword);
        user.password = newPassword;
        user.password = hashPassword;

		await userRepository.updateUserById(user.id, user);

		return user.email;
	}
}