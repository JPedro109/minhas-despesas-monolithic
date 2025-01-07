import { PrismaUserConsentRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { UserConsentEntity } from "@/layers/domain";
import { Seed } from "./__mocks__";

describe("External - PrismaUserConsentRepositoryAdapter", () => {
    const databaseSQLHelper = new DatabaseSQLHelper();

    beforeAll(async () => {
        await databaseSQLHelper.connect();
    });

    afterAll(async () => {
        await databaseSQLHelper.disconnect();
    });

    beforeEach(async () => {
        const seed = new Seed(databaseSQLHelper);
        await seed.populate();
    });

    afterEach(async () => {
        const seed = new Seed(databaseSQLHelper);
        await seed.truncate();
    });

    describe("createUserConsent", () => {
        test("Should create a new user consent", async () => {
            const sut = new PrismaUserConsentRepositoryAdapter(
                databaseSQLHelper,
            );
            const userConsent = new UserConsentEntity({
                userId: "00000000-0000-0000-0000-000000000000",
                consentVersion: "v1.0",
                ipAddress: "127.0.0.1",
                userAgent: "Mozilla/5.0",
            });

            const result = await sut.createUserConsent(userConsent);

            expect(result).toBeInstanceOf(UserConsentEntity);
        });
    });
});
