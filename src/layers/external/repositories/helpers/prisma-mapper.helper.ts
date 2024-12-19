import { 
    PrismaAction,
    PrismaCustomer, 
    PrismaExpense, 
    PrismaExtract, 
    PrismaPaymentHistory, 
    PrismaPaymentMethod, 
    PrismaPlan, 
    PrismaSubscription, 
    PrismaUser, 
    PrismaUserConsent,
    PrismaUserVerificationCode
} from "@prisma/client";
import { 
    CustomerEntity, 
    ExpenseEntity, 
    ExtractEntity, 
    PaymentHistoryEntity, 
    PaymentMethodEntity, 
    PlanEntity, 
    PlanNameEnum, 
    SubscriptionEntity, 
    UserConsentEntity, 
    UserEntity, 
    UserVerificationCodeEntity,
    UserVerificationCodeTypeEnum
} from "@/layers/domain";

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

    static toPaymentMethodEntity(prismaPaymentMethod: PrismaPaymentMethod): PaymentMethodEntity {
        return new PaymentMethodEntity(
            {
                userId: prismaPaymentMethod.userId,
                name: prismaPaymentMethod.name,
                token: prismaPaymentMethod.token,
                updatedAt: prismaPaymentMethod.updatedAt
            },
            prismaPaymentMethod.id,
            prismaPaymentMethod.createdAt
        );
    }

    static toPlanEntity(prismaPlan: PrismaPlan, prismaAction: PrismaAction[]): PlanEntity {
        return new PlanEntity(
            {
                name: prismaPlan.name as PlanNameEnum,
                amount: prismaPlan.amount,
                description: prismaPlan.description,
                durationInDays: prismaPlan.durationInDays,
                updatedAt: prismaPlan.updatedAt,
                actions: prismaAction
            },
            prismaPlan.id,
            prismaPlan.createdAt
        );
    }

    static toSubscriptionEntity(
        prismaSubscription: PrismaSubscription, 
        prismaPlan: PrismaPlan,
        prismaActions: PrismaAction[]
    ): SubscriptionEntity {
        return new SubscriptionEntity(
            {
                userId: prismaSubscription.userId,
                active: prismaSubscription.active,
                renewable: prismaSubscription.renewable,
                amount: prismaSubscription.amount,
                startDate: prismaSubscription.startDate,
                endDate: prismaSubscription.endDate,
                plan: PrismaMapperHelper.toPlanEntity(prismaPlan, prismaActions),
                updatedAt: prismaSubscription.updatedAt
            },
            prismaSubscription.id,
            prismaSubscription.createdAt
        );
    }

    static toUserConsentEntity(prismaUserConsent: PrismaUserConsent): UserConsentEntity {
        return new UserConsentEntity(
            {
                userId: prismaUserConsent.userId,
                consentVersion: prismaUserConsent.consentVersion,
                ipAddress: prismaUserConsent.ipAddress,
                userAgent: prismaUserConsent.userAgent
            },
            prismaUserConsent.id,
            prismaUserConsent.createdAt
        );
    }

    static toUserVerificationCodeEntity(
        prismaUserVerificationCode: PrismaUserVerificationCode,
        prismaUser: PrismaUser
    ): UserVerificationCodeEntity {
        return new UserVerificationCodeEntity(
            {
                user: PrismaMapperHelper.toUserEntity(prismaUser),
                type: prismaUserVerificationCode.type as UserVerificationCodeTypeEnum,
                valid: prismaUserVerificationCode.valid,
                verificationCode: prismaUserVerificationCode.verificationCode,
                verificationCodeExpiryDate: prismaUserVerificationCode.verificationCodeExpiryDate,
                updatedAt: prismaUserVerificationCode.updatedAt
            },
            prismaUserVerificationCode.id,
            prismaUserVerificationCode.createdAt
        );
    }
}