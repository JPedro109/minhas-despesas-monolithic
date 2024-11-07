import { ExtractEntity } from "@/layers/domain";
import { CreateExtractDTO, ICreateExtractUseCase, IExtract, IUnitOfWorkRepository, NotFoundError } from "@/layers/application";

export class CreateExtractUseCase implements ICreateExtractUseCase {

    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly extract: IExtract
    ) { }

    async execute({ userId, referenceMonth, referenceYear }: CreateExtractDTO): Promise<string> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const paymentHistoryRepository = this.unitOfWorkRepository.getPaymentHistoryRepository();
        const extractRepository = this.unitOfWorkRepository.getExtractRepository();

        const userExists = await userRepository.getUserById(userId);

        if (!userExists) throw new NotFoundError("O usuário não existe");

        const paymentHistories = await paymentHistoryRepository.getPaymentHistoriesByUserIdAndPaymentMonthAndPaymentYear(
            userId,
            referenceMonth,
            referenceYear
        );

        if (paymentHistories.length === 0) throw new NotFoundError("Não existe histórico de despesas para o mês e ano de referência");

        const today = new Date();
        const expiryDateExtract = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);
        expiryDateExtract.setDate(expiryDateExtract.getUTCDate() + 8);
        const extract = new ExtractEntity({
            userId,
            referenceMonth,
            referenceYear,
            expiryDate: expiryDateExtract
        });

        let extractCreated: ExtractEntity;
        await this.unitOfWorkRepository.transaction(async () => {
            extractCreated = await extractRepository.createExtract(extract);
            const paymentHistoriesFormated = paymentHistories.map(x => ({
                userId: x.userId,
                expenseId: x.expenseId,
                expenseName: x.expenseName,
                expenseValue: x.expenseValue,
                dueDate: x.dueDate,
                paidDate: x.paidDate
            }));
            await this.extract.generateExtract<{
                extractId: string,
                referenceMonth: number,
                referenceYear: number,
                data: {
                    userId: string;
                    expenseId: string;
                    expenseName: string;
                    expenseValue: number;
                    dueDate: Date;
                    paidDate: Date;
                }[]
            }>(
                {
                    extractId: extractCreated.id,
                    referenceMonth,
                    referenceYear,
                    data: paymentHistoriesFormated
                }
            );
        });

        return extractCreated.id;
    }
}