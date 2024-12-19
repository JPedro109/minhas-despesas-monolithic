import { PrismaPlanRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { PlanEntity, PlanNameEnum } from "@/layers/domain";
import { Seed } from "./__mocks__";

describe("External - PrismaPlanRepositoryAdapter", () => {

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

    describe("getPlans", () => {
        test("Should return all plans", async () => {
            const sut = new PrismaPlanRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getPlans();

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("getPlanByName", () => {
        test("Should return null if plan does not exist", async () => {
            const sut = new PrismaPlanRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getPlanByName("NON_EXISTING_PLAN" as PlanNameEnum);

            expect(result).toBeNull();
        });

        test("Should return a plan by name", async () => {
            const sut = new PrismaPlanRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getPlanByName(PlanNameEnum.Free);

            expect(result).toBeInstanceOf(PlanEntity);
        });
    });

    describe("getPlanById", () => {
        test("Should return null if plan does not exist", async () => {
            const sut = new PrismaPlanRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getPlanById("ffffffff-ffff-ffff-ffff-ffffffffffff");

            expect(result).toBeNull();
        });
        
        test("Should return a plan by ID", async () => {
            const sut = new PrismaPlanRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getPlanById("00000000-0000-0000-0000-000000000000");

            expect(result).toBeInstanceOf(PlanEntity);
        });
    });
});