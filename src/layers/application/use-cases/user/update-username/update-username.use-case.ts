import {
	IUnitOfWorkRepository,
	UpdateUsernameDTO,
	IUpdateUsernameUseCase,
	NotFoundError
} from "@/layers/application";

export class UpdateUsernameUseCase implements IUpdateUsernameUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute({ id, username }: UpdateUsernameDTO): Promise<string> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();

		const user = await userRepository.getUserById(id);
		if(!user) throw new NotFoundError("O usuário não existe");

        user.username = username;
		await userRepository.updateUserById(user.id, user);

		return user.email;
	}
}