import { UserVerificationCodeEntity } from "@/layers/domain";
import { IUserVerificationCodeRepository } from "@/layers/application";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

export class PrismaUserVerificationCodeRepositoryAdapter
    implements IUserVerificationCodeRepository
{
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createUserVerificationCode(
        userVerificationCode: UserVerificationCodeEntity,
    ): Promise<UserVerificationCodeEntity> {
        const createdCode =
            await this.context.prismaUserVerificationCode.create({
                data: {
                    id: userVerificationCode.id,
                    userId: userVerificationCode.user.id,
                    type: userVerificationCode.type,
                    valid: userVerificationCode.valid,
                    verificationCode: userVerificationCode.verificationCode,
                    verificationCodeExpiryDate:
                        userVerificationCode.verificationCodeExpiryDate,
                    createdAt: userVerificationCode.createdAt,
                    updatedAt: userVerificationCode.updatedAt,
                },
                include: {
                    user: true,
                },
            });
        return PrismaMapperHelper.toUserVerificationCodeEntity(
            createdCode,
            createdCode.user,
        );
    }

    async getUserVerificationCodeByVerificationCode(
        verificationCode: string,
    ): Promise<UserVerificationCodeEntity | null> {
        const userVerificationCode =
            await this.context.prismaUserVerificationCode.findFirst({
                where: { verificationCode },
                include: {
                    user: true,
                },
            });

        if (!userVerificationCode) return null;

        return PrismaMapperHelper.toUserVerificationCodeEntity(
            userVerificationCode,
            userVerificationCode.user,
        );
    }

    async updateUserVerificationCodeById(
        userVerificationCodeId: string,
        userVerificationCode: UserVerificationCodeEntity,
    ): Promise<void> {
        await this.context.prismaUserVerificationCode.update({
            where: { id: userVerificationCodeId },
            data: {
                type: userVerificationCode.type,
                valid: userVerificationCode.valid,
                verificationCode: userVerificationCode.verificationCode,
                verificationCodeExpiryDate:
                    userVerificationCode.verificationCodeExpiryDate,
            },
        });
    }
}
