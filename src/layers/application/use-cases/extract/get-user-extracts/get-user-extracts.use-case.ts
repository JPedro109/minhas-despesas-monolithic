import { 
    GetUserExtractsDTO, 
    GetUserExtractsResponseDTO, 
    IGetUserExtractsUseCase, 
    IUnitOfWorkRepository, 
    NotFoundError 
} from "@/layers/application";

export class GetUserExtractsUseCase implements IGetUserExtractsUseCase {

    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId }: GetUserExtractsDTO): Promise<GetUserExtractsResponseDTO[]> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const extractRepository = this.unitOfWorkRepository.getExtractRepository();

        const userExists = await userRepository.getUserById(userId);

        if (!userExists) throw new NotFoundError("Esse usuário não existe");

        const extracts = await extractRepository.getExtractsByUserId(userId);

        return extracts.map(x => ({
            extractId: x.id,
            url: x.url,
            userId: x.userId,
            expiryDate: x.expiryDate,
            urlExpiryDate: x.urlExpiryDate
        }));
    }
}