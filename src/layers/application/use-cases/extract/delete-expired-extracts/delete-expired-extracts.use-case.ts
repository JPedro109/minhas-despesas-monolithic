import { IDeleteExpiredExtractsUseCase, IUnitOfWorkRepository } from "@/layers/application";

export class DeleteExpiredExtractsUseCase implements IDeleteExpiredExtractsUseCase {

    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }
    
    async execute(): Promise<void> {
        const extractRepository = this.unitOfWorkRepository.getExtractRepository();

        await extractRepository.deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate();
    }
}