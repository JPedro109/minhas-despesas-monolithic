import {
	IUnitOfWorkRepository,
	IAuthentication,
	JsonWebTokenTypeEnum,
	RefreshUserTokenDTO,
	IRefreshUserTokenUseCase,
	UnauthorizedError
} from "@/layers/application";

export class RefreshUserTokenUseCase implements IRefreshUserTokenUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly authentication: IAuthentication
	) { }

	async execute({ refreshToken }: RefreshUserTokenDTO): Promise<string> {
		const data = this.authentication.verifyJsonWebToken(refreshToken);

		if(data.type !== JsonWebTokenTypeEnum.RefreshToken) throw new UnauthorizedError("Token inválido");

		const userRepository = this.unitOfWorkRepository.getUserRepository();
		const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();

		const user = await userRepository.getUserById(data.id as string);

		if(!user) throw new UnauthorizedError("Token inválido");

		const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(user.id);

		const accessToken = this.authentication.createJsonWebToken(
			{ 
				sub: user.id,
				plan: subscriptionActive.plan.name,
				actions: subscriptionActive.plan.actions.map(x => ({ name: x.name })),
				type: JsonWebTokenTypeEnum.AccessToken
			}, 
			3600 // 1 hour
		);

		return accessToken;
	}
}