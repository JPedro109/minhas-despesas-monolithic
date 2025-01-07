import { PrismaExtractRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { ExtractEntity } from "@/layers/domain";
import { Seed } from "./__mocks__";

describe("External - PrismaExtractRepositoryAdapter", () => {
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

    describe("createExtract", () => {
        test("Should create extract", async () => {
            const extract = new ExtractEntity({
                userId: "00000000-0000-0000-0000-000000000000",
                url: "https://url.com",
                expiryDate: new Date("3000-01-01"),
                urlExpiryDate: new Date("3000-01-01"),
                referenceMonth: 1,
                referenceYear: 2024,
            });

            const sut = new PrismaExtractRepositoryAdapter(databaseSQLHelper);

            const result = await sut.createExtract(extract);

            expect(result).toBeInstanceOf(ExtractEntity);
        });
    });

    describe("getExtractById", () => {
        test("Should return null if extract does not exist", async () => {
            const id = "ffffffff-ffff-ffff-ffff-ffffffffffff";
            const sut = new PrismaExtractRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExtractById(id);

            expect(result).toBeNull();
        });

        test("Should return an extract", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaExtractRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExtractById(id);

            expect(result.id).toBe(id);
        });
    });

    describe("getExtractsByUserId", () => {
        test("Should return extracts for a given user", async () => {
            const userId = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaExtractRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExtractsByUserId(userId);

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate", () => {
        test("Should delete extracts with expired dates", async () => {
            const sut = new PrismaExtractRepositoryAdapter(databaseSQLHelper);

            await sut.deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate();

            const userId = "00000000-0000-0000-0000-000000000000";
            const nonExpiredExtracts = await sut.getExtractsByUserId(userId);
            expect(nonExpiredExtracts.length).toBe(1);
        });
    });
});
