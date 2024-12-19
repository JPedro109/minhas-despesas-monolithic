import { PaymentMethodEntity } from "@/layers/domain";
import { IPaymentMethodRepository } from "@/layers/application";
import { DatabaseSQLHelper, PrismaClientType, PrismaMapperHelper } from "@/layers/external";

export class PrismaPaymentMethodRepositoryAdapter implements IPaymentMethodRepository {
    
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createPaymentMethod(paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity> {
        const created = await this.context.prismaPaymentMethod.create({
            data: {
                id: paymentMethod.id,
                userId: paymentMethod.userId,
                name: paymentMethod.name,
                token: paymentMethod.token,
                createdAt: paymentMethod.createdAt,
                updatedAt: paymentMethod.updatedAt
            }
        });

        return PrismaMapperHelper.toPaymentMethodEntity(created);
    }

    async getPaymentMethodById(id: string): Promise<PaymentMethodEntity | null> {
        const paymentMethod = await this.context.prismaPaymentMethod.findUnique({
            where: { id }
        });

        if(!paymentMethod) return null;

        return PrismaMapperHelper.toPaymentMethodEntity(paymentMethod);
    }

    async getPaymentMethodByUserId(userId: string): Promise<PaymentMethodEntity | null> {
        const paymentMethod = await this.context.prismaPaymentMethod.findFirst({
            where: { userId }
        });

        if(!paymentMethod) return null;

        return PrismaMapperHelper.toPaymentMethodEntity(paymentMethod);
    }

    async getPaymentMethodsByUserIds(userIds: string[]): Promise<PaymentMethodEntity[]> {
        const paymentMethods = await this.context.prismaPaymentMethod.findMany({
            where: {
                userId: { in: userIds }
            }
        });

        return paymentMethods.map(paymentMethod => PrismaMapperHelper.toPaymentMethodEntity(paymentMethod));
    }

    async updatePaymentMethodById(paymentMethodId: string, paymentMethod: PaymentMethodEntity): Promise<void> {
        await this.context.prismaPaymentMethod.update({
            where: { id: paymentMethodId },
            data: {
                name: paymentMethod.name,
                token: paymentMethod.token,
                updatedAt: paymentMethod.updatedAt
            }
        });
    }

    async deletePaymentMethodById(paymentMethodId: string): Promise<void> {
        await this.context.prismaPaymentMethod.delete({
            where: { id: paymentMethodId }
        });
    }
}