import { UserVerificationCodeTypeEnum } from "@/layers/domain";
import {
	IUnitOfWorkRepository,
	IPayment,
	UpdateUserEmailDTO,
	IUpdateUserEmailUseCase,
	InvalidParamError
} from "@/layers/application";

export class UpdateUserEmailUseCase implements IUpdateUserEmailUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly payment: IPayment,
	) { }

	async execute({ email, code }: UpdateUserEmailDTO): Promise<void> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const userVerificationCodeRepository = this.unitOfWorkRepository.getUserVerificationCodeRepository();
		const customerRepository = this.unitOfWorkRepository.getCustomerRepository();

		const userVerificationCode = await userVerificationCodeRepository.getUserVerificationCodeByVerificationCode(code);
		if(!userVerificationCode || userVerificationCode.type !== UserVerificationCodeTypeEnum.UpdateUserEmail) 
			throw new InvalidParamError("Código inválido"); 

		const user = userVerificationCode.user;

		if(new Date().getTime() >= userVerificationCode.verificationCodeExpiryDate.getTime()) throw new InvalidParamError("Código expirado");

		user.email = email;

		await this.unitOfWorkRepository.transaction(async () => {
			userVerificationCode.valid = false;
			await userVerificationCodeRepository.updateUserVerificationCodeById(userVerificationCode.id, userVerificationCode);
			await userRepository.updateUserById(user.id, user);
			
			const customer = await customerRepository.getCustomerByUserId(user.id);
			await this.payment.updateCustomerEmailByCustomerId(customer.customerId, email);
		});
	}
}