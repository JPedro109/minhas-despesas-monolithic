import { ExtractEntity } from "@/layers/domain";
import { 
    CreateExtractDTO, 
    IBucket, 
    ICreateExtractUseCase, 
    IExtract, 
    IUnitOfWorkRepository, 
    NotFoundError
} from "@/layers/application";

export class CreateExtractUseCase implements ICreateExtractUseCase {

    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly extract: IExtract,
        private readonly bucket: IBucket,
    ) { }

    async execute({ userId, referenceMonth, referenceYear }: CreateExtractDTO): Promise<string> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const paymentHistoryRepository = this.unitOfWorkRepository.getPaymentHistoryRepository();
        const extractRepository = this.unitOfWorkRepository.getExtractRepository();

        const userExists = await userRepository.getUserById(userId);

        if (!userExists) throw new NotFoundError("O usuário não existe");

        const paymentHistories = await paymentHistoryRepository.getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
            userId,
            referenceMonth,
            referenceYear
        );

        if (paymentHistories.length === 0) throw new NotFoundError("Não existe histórico de despesas para o mês e ano de referência");

        const today = new Date();
        const expiryDateExtract = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);
        expiryDateExtract.setDate(expiryDateExtract.getUTCDate() + 8);

        let extractCreated: ExtractEntity;
        await this.unitOfWorkRepository.transaction(async () => {
            const paymentHistoriesFormated = paymentHistories.map(x => ({
                expenseId: x.expenseId,
                expenseName: x.expenseName,
                expenseValue: x.expenseValue,
                dueDate: x.dueDate,
                paidDate: x.paidDate
            }));
            const file = await this.extract.generateExpensesExtract(
                {
                    referenceMonth,
                    referenceYear,
                    data: paymentHistoriesFormated
                }
            );

            const url = await this.bucket.uploadFile(`extract-expense-${userId}-${Date.now()}`, file);

            const extract = new ExtractEntity({
                userId,
                referenceMonth,
                referenceYear,
                expiryDate: expiryDateExtract,
                url
            });
            extractCreated = await extractRepository.createExtract(extract);
        });

        return extractCreated.id;
    }
}