import { UserConsentEntity } from "@/layers/domain";
import { IUserConsentRepository } from "@/layers/application";
import { DatabaseSQLHelper, PrismaClientType, PrismaMapperHelper } from "@/layers/external";

export class PrismaUserConsentRepositoryAdapter implements IUserConsentRepository {
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createUserConsent(userConsent: UserConsentEntity): Promise<UserConsentEntity> {
        const createdUserConsent = await this.context.prismaUserConsent.create({
            data: {
                id: userConsent.id,
                userId: userConsent.userId,
                consentVersion: userConsent.consentVersion,
                ipAddress: userConsent.ipAddress,
                userAgent: userConsent.userAgent,
                createdAt: userConsent.createdAt
            },
            
        });
        return PrismaMapperHelper.toUserConsentEntity(createdUserConsent);
    }
}
