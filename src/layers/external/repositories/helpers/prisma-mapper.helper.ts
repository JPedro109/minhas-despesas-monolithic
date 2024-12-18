import { PrismaCustomer, PrismaExpense, PrismaExtract, PrismaPaymentHistory, PrismaUser } from "@prisma/client";
import { CustomerEntity, ExpenseEntity, ExtractEntity, PaymentHistoryEntity, UserEntity } from "@/layers/domain";

export class PrismaMapperHelper {
    static toUserEntity(prismaUser: PrismaUser): UserEntity {
        return new UserEntity(
            {
                email: prismaUser.email,
                username: prismaUser.username,
                password: prismaUser.password,
                verifiedEmail: prismaUser.verifiedEmail,
                updatedAt: prismaUser.updatedAt
            },
            prismaUser.id,
            prismaUser.createdAt
        );
    }

    static toCustomerEntity(prismaCustomer: PrismaCustomer): CustomerEntity {
        return new CustomerEntity(
            {
                customerId: prismaCustomer.customerId,
                userId: prismaCustomer.userId
            },
            prismaCustomer.id,
            prismaCustomer.createdAt
        );
    }

    static toExpenseEntity(prismaExpense: PrismaExpense): ExpenseEntity {
        return new ExpenseEntity(
            {
                userId: prismaExpense.userId,
                expenseName: prismaExpense.expenseName,
                expenseValue: prismaExpense.expenseValue,
                dueDate: prismaExpense.dueDate,
                paid: prismaExpense.paid,
                updatedAt: prismaExpense.updatedAt
            },
            prismaExpense.id,
            prismaExpense.createdAt
        );
    }

    static toExtractEntity(prismaExtract: PrismaExtract): ExtractEntity {
        return new ExtractEntity(
            {
                userId: prismaExtract.userId,
                url: prismaExtract.url,
                expiryDate: prismaExtract.expiryDate,
                urlExpiryDate: prismaExtract.urlExpiryDate,
                referenceMonth: prismaExtract.referenceMonth,
                referenceYear: prismaExtract.referenceYear,
                updatedAt: prismaExtract.updatedAt
            },
            prismaExtract.id,
            prismaExtract.createdAt
        );
    }

    static toPaymentHistoryEntity(prismaPaymentHistory: PrismaPaymentHistory): PaymentHistoryEntity {
        return new PaymentHistoryEntity(
            {
                userId: prismaPaymentHistory.userId,
                expenseId: prismaPaymentHistory.expenseId,
                expenseName: prismaPaymentHistory.expenseName,
                expenseValue: prismaPaymentHistory.expenseValue,
                dueDate: prismaPaymentHistory.dueDate,
                paidDate: prismaPaymentHistory.paymentDate
            },
            prismaPaymentHistory.id,
            prismaPaymentHistory.createdAt
        );
    }
}