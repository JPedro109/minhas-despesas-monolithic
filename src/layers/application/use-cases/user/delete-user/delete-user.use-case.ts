import {
	IUnitOfWorkRepository,
	ICryptography,
	IPayment,
	InvalidParamError,
	DeleteUserDTO,
	IDeleteUserUseCase,
	NotFoundError
} from "@/layers/application";

export class DeleteUserUseCase implements IDeleteUserUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly cryptography: ICryptography,
		private readonly payment: IPayment
	) { }

	async execute({ id, password, passwordConfirm }: DeleteUserDTO): Promise<void> {
		if(password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const customerRepository = this.unitOfWorkRepository.getCustomerRepository();

		const user = await userRepository.getUserById(id);
		
		if(!user) throw new NotFoundError("Usuário não existe");

		const passwordIsEqual = await this.cryptography.compareHash(user.password, password);

		if(!passwordIsEqual) throw new InvalidParamError("Senha inválida");

		const customer = await customerRepository.getCustomerByUserId(user.id);
		const hashEmail = await this.cryptography.toHash(user.email);

		await this.unitOfWorkRepository.transaction(async () => {
			await this.payment.updateCustomerEmailByCustomerId(customer.customerId, `${hashEmail}@hash.com`);
			await userRepository.deleteUserById(id);
		});
	}
}