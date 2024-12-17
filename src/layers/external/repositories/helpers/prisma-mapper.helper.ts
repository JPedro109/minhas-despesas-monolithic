import { PrismaCustomer, PrismaUser } from "@prisma/client";
import { CustomerEntity, UserEntity } from "@/layers/domain";

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
}