import { ExtractEntity } from "@/layers/domain";
import { IExtractRepository } from "@/layers/application";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

export class PrismaExtractRepositoryAdapter implements IExtractRepository {
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createExtract(extract: ExtractEntity): Promise<ExtractEntity> {
        const createdExtract = await this.context.prismaExtract.create({
            data: {
                id: extract.id,
                userId: extract.userId,
                url: extract.url,
                expiryDate: extract.expiryDate,
                urlExpiryDate: extract.urlExpiryDate,
                referenceMonth: extract.referenceMonth,
                referenceYear: extract.referenceYear,
                createdAt: extract.createdAt,
                updatedAt: extract.updatedAt,
            },
        });

        return PrismaMapperHelper.toExtractEntity(createdExtract);
    }

    async getExtractById(id: string): Promise<ExtractEntity | null> {
        const extract = await this.context.prismaExtract.findUnique({
            where: { id },
        });

        if (!extract) return null;

        return PrismaMapperHelper.toExtractEntity(extract);
    }

    async getExtractsByUserId(userId: string): Promise<ExtractEntity[]> {
        const extracts = await this.context.prismaExtract.findMany({
            where: { userId },
        });

        return extracts.map((extract) =>
            PrismaMapperHelper.toExtractEntity(extract),
        );
    }

    async deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate(): Promise<void> {
        const currentDate = new Date();

        await this.context.prismaExtract.deleteMany({
            where: {
                expiryDate: { lt: currentDate },
            },
        });
    }
}
