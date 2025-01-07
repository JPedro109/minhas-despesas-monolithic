import {
    GetUserPaymentMethodDTO,
    GetUserPaymentMethodResponseDTO,
    IGetUserPaymentMethodUseCase,
    IUnitOfWorkRepository,
    NotFoundError,
} from "@/layers/application";

export class GetUserPaymentMethodUseCase
    implements IGetUserPaymentMethodUseCase
{
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) {}

    async execute({
        userId,
    }: GetUserPaymentMethodDTO): Promise<GetUserPaymentMethodResponseDTO | null> {
        const paymentMethodRepository =
            this.unitOfWorkRepository.getPaymentMethodRepository();
        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const userExists = await userRepository.getUserById(userId);

        if (!userExists) throw new NotFoundError("O usuário não existe");

        const paymentMethod =
            await paymentMethodRepository.getPaymentMethodByUserId(userId);

        if (!paymentMethod) return null;

        return {
            userId: paymentMethod.userId,
            name: paymentMethod.name,
            token: paymentMethod.token,
        };
    }
}
