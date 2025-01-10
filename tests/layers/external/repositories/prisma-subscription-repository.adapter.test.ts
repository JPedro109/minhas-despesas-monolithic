import {
    PrismaSubscriptionRepositoryAdapter,
    DatabaseSQLHelper,
} from "@/layers/external";
import { SubscriptionEntity } from "@/layers/domain";
import { Seed, testPlanFreeEntity, testSubscriptionEntity } from "./__mocks__";

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
            const plan = testPlanFreeEntity();
            const subscription = new SubscriptionEntity({
                userId: "00000000-0000-0000-0000-000000000001",
                active: true,
                renewable: true,
                startDate: new Date("3000-01-01"),
                endDate: new Date("3000-02-02"),
                plan,
                amount: 0,
            });

            const result = await sut.createSubscription(subscription);

            expect(result).toBeInstanceOf(SubscriptionEntity);
        });
    });

    describe("getActiveSubscriptionByUserId", () => {
        test("Should return null if no active subscription exists", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getActiveSubscriptionByUserId(
                "ffffffff-ffff-ffff-ffff-ffffffffffff",
            );

            expect(result).toBeNull();
        });

        test("Should return the active subscription for a user", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getActiveSubscriptionByUserId(
                "00000000-0000-0000-0000-000000000000",
            );

            expect(result).toBeInstanceOf(SubscriptionEntity);
        });
    });

    describe("getActiveSubscriptionsByEndDate", () => {
        test("Should return an empty array if no subscriptions match the criteria", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );
            const endDate = new Date("2024-01-01");
            const renewable = false;

            const result = await sut.getActiveSubscriptionsByEndDate(
                endDate,
                renewable,
            );

            expect(result).toEqual([]);
        });

        test("Should return active subscriptions matching the end date and renewable status", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );

            const endDate = new Date("3000-01-01");
            const renewable = true;

            const result = await sut.getActiveSubscriptionsByEndDate(
                endDate,
                renewable,
            );

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("getActiveSubscriptionsByEndDate", () => {
        test("Should return subscriptions active and Renewable when the current date is greater than the end date", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );

            const result =
                await sut.getSubscriptionsActiveAndRenewableWhenTheCurrentDateIsGreaterThanTheEndDate();

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("updateSubscriptionById", () => {
        test("Should update the subscription by ID", async () => {
            const sut = new PrismaSubscriptionRepositoryAdapter(
                databaseSQLHelper,
            );
            const subscription = testSubscriptionEntity();
            subscription.renewable = false;

            await sut.updateSubscriptionById(subscription.id, subscription);

            const updatedSubscription = await sut.getActiveSubscriptionByUserId(
                subscription.userId,
            );
            expect(updatedSubscription.renewable).toBeFalsy();
        });
    });
});
