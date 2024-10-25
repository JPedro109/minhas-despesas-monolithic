import { UserConsentEntity } from "@/layers/domain";

describe("Entity - UserConsent", () => {

    test("Should create UserConsentEntity", () => {
        const userId = "1";
        const consentVersion = "v1.0";
        const ipAddress = "192.168.1.1";
        const userAgent = "Mozilla/5.0";
        
        const sut = new UserConsentEntity({
            userId,
            consentVersion,
            ipAddress,
            userAgent
        });

        expect(sut).toBeInstanceOf(UserConsentEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.userId).toBe(userId);
        expect(sut.consentVersion).toBe(consentVersion);
        expect(sut.ipAddress).toBe(ipAddress);
        expect(sut.userAgent).toBe(userAgent);
        expect(sut.createdAt).not.toBeUndefined();
    });
});