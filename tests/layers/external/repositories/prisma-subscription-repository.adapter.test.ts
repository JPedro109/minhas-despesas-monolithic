import {
    PrismaSubscriptionRepositoryAdapter,
    DatabaseSQLHelper,
} from "@/layers/external";
import { SubscriptionEntity } from "@/layers/domain";
import { Seed, testPlanGoldEntity } from "./__mocks__";

describe("External - PrismaSubscriptionRepositoryAdapter", () => {
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

    describe("createSubscription", () => {
        test("Should create a new subscription", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );
            const plan = testPlanGoldEntity();
            const subscription = new SubscriptionEntity({
                userId: "00000000-0000-0000-0000-000000000001",
                subscriptionExternalId: "1",
                plan,
            });

            const result = await sut.createSubscription(subscription);

            expect(result).toBeInstanceOf(SubscriptionEntity);
        });
    });

    describe("getSubscriptionByUserId", () => {
        test("Should return null if no active subscription exists", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getSubscriptionByUserId(
                "ffffffff-ffff-ffff-ffff-ffffffffffff",
            );

            expect(result).toBeNull();
        });

        test("Should return the active subscription for a user", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getSubscriptionByUserId(
                "00000000-0000-0000-0000-000000000000",
            );

            expect(result).toBeInstanceOf(SubscriptionEntity);
        });
    });
});
