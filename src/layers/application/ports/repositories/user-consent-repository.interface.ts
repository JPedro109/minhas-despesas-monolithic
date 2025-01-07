import { UserConsentEntity } from "@/layers/domain";

export interface IUserConsentRepository {
    setContext(context: unknown): void;
    createUserConsent(
        userConsent: UserConsentEntity,
    ): Promise<UserConsentEntity>;
}
