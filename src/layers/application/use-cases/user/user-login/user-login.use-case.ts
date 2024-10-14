import {
	IUnitOfWorkRepository,
	IAuthentication,
	JsonWebTokenTypeEnum,
	ICryptography,
	UserLoginDTO,
	UserLoginResponseDTO,
	IUserLoginUseCase,
	UnauthorizedError
} from "@/layers/application";

export class UserLoginUseCase implements IUserLoginUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly cryptography: ICryptography,
		private readonly authentication: IAuthentication
	) { }

	async execute({ email, password }: UserLoginDTO): Promise<UserLoginResponseDTO> {
		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();
		const planRepository = this.unitOfWorkRepository.getPlanRepository();

		const user = await userRepository.getUserByEmail(email);

		if(!user) throw new UnauthorizedError("Email ou senha incorreto(s)");
		if(!user.verifiedEmail) throw new UnauthorizedError("Email não está verificado");

		const passwordIsEqual = await this.cryptography.compareHash(user.password, password);
		if(!passwordIsEqual) throw new UnauthorizedError("Email ou senha incorreto(s)");

		const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(user.id);
		const planActive = await planRepository.getPlanById(subscriptionActive.planId);

		const accessToken = this.authentication.createJsonWebToken(
			{ 
				sub: user.id,
				plan: planActive.name,
				actions: planActive.actions.map(x => ({ name: x.name, totalOperations: x.totalOperations })),
				type: JsonWebTokenTypeEnum.AccessToken
			}, 
			3600 // 1 hour
		);

		const refreshToken = this.authentication.createJsonWebToken(
			{ 
				sub: user.id,
				type: JsonWebTokenTypeEnum.RefreshToken
			}, 
			604800 // 7 days
		);

		return {
			accessToken,
			refreshToken
		};
	}
}