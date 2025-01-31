import {
    IUnitOfWorkRepository,
    ICryptography,
    IPayment,
    InvalidParamError,
    DeleteUserDTO,
    IDeleteUserUseCase,
    NotFoundError,
} from "@/layers/application";

export class DeleteUserUseCase implements IDeleteUserUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly cryptography: ICryptography,
        private readonly payment: IPayment,
    ) {}

    async execute({
        id,
        password,
        passwordConfirm,
    }: DeleteUserDTO): Promise<void> {
        if (password !== passwordConfirm)
            throw new InvalidParamError("As senhas não coincidem");

        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const user = await userRepository.getUserById(id);

        if (!user) throw new NotFoundError("Usuário não existe");

        const passwordIsEqual = await this.cryptography.compareHash(
            user.password,
            password,
        );

        if (!passwordIsEqual) throw new InvalidParamError("Senha inválida");

        await userRepository.deleteUserById(id);
    }
}
