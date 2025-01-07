import {
    IUnitOfWorkRepository,
    ISecurity,
    JsonWebTokenTypeEnum,
    RefreshUserTokenDTO,
    IRefreshUserTokenUseCase,
    UnauthorizedError,
} from "@/layers/application";

export class RefreshUserTokenUseCase implements IRefreshUserTokenUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly authentication: ISecurity,
    ) {}

    async execute({ refreshToken }: RefreshUserTokenDTO): Promise<string> {
        const data = this.authentication.verifyJsonWebToken(refreshToken);

        if (data.type !== JsonWebTokenTypeEnum.RefreshToken)
            throw new UnauthorizedError("Token inválido");

        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const user = await userRepository.getUserById(data.sub as string);

        if (!user) throw new UnauthorizedError("Token inválido");

        const accessToken = this.authentication.createJsonWebToken(
            {
                sub: user.id,
                type: JsonWebTokenTypeEnum.AccessToken,
            },
            3600, // 1 hour
        );

        return accessToken;
    }
}
