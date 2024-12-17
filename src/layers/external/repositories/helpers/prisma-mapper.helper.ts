import { PrismaCustomer, PrismaExpense, PrismaUser } from "@prisma/client";
import { CustomerEntity, ExpenseEntity, UserEntity } from "@/layers/domain";

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
}