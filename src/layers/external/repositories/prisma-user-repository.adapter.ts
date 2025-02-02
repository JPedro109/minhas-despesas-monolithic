import { UserEntity } from "@/layers/domain";
import { IUserRepository } from "@/layers/application";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

export class PrismaUserRepositoryAdapter implements IUserRepository {
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createUser(user: UserEntity): Promise<UserEntity> {
        const userCreated = await this.context.prismaUser.create({
            data: {
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password,
                verifiedEmail: user.verifiedEmail,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });

        return PrismaMapperHelper.toUserEntity(userCreated);
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        const user = await this.context.prismaUser.findUnique({
            where: {
                id,
            },
        });

        if (!user) return null;

        return PrismaMapperHelper.toUserEntity(user);
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.context.prismaUser.findUnique({
            where: {
                email,
            },
        });

        if (!user) return null;

        return PrismaMapperHelper.toUserEntity(user);
    }

    async updateUserById(id: string, user: UserEntity): Promise<void> {
        await this.context.prismaUser.update({
            where: {
                id,
            },
            data: {
                email: user.email,
                username: user.username,
                password: user.password,
                verifiedEmail: user.verifiedEmail,
                updatedAt: user.updatedAt,
            },
        });
    }

    async deleteUserById(id: string): Promise<void> {
        await this.context.prismaUser.delete({
            where: {
                id,
            },
        });
    }
}
