import {
    DatabaseSQLHelper,
    PrismaCustomerRepositoryAdapter,
} from "@/layers/external";
import { CustomerEntity } from "@/layers/domain";
import { Seed } from "./__mocks__";

describe("External - PrismaCustomerRepositoryAdapter", () => {
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

    describe("createCustomer", () => {
        test("Should create customer", async () => {
            const customer = new CustomerEntity({
                userId: "00000000-0000-0000-0000-000000000001",
                customerId: "2",
            });
            const sut = new PrismaCustomerRepositoryAdapter(databaseSQLHelper);

            const result = await sut.createCustomer(customer);

            expect(result).toBeInstanceOf(CustomerEntity);
        });
    });

    describe("getCustomerByUserId", () => {
        test("Should get null", async () => {
            const userId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
            const sut = new PrismaCustomerRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getCustomerByUserId(userId);

            expect(result).toBeNull();
        });

        test("Should get customer", async () => {
            const userId = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaCustomerRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getCustomerByUserId(userId);

            expect(result.userId).toBe(userId);
        });
    });

    describe("getCustomerByCustomerId", () => {
        test("Should get null", async () => {
            const customerId = "not-found";
            const sut = new PrismaCustomerRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getCustomerByCustomerId(customerId);

            expect(result).toBeNull();
        });

        test("Should get customer", async () => {
            const customerId = "1";
            const sut = new PrismaCustomerRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getCustomerByCustomerId(customerId);

            expect(result.customerId).toBe(customerId);
        });
    });

    describe("getCustomersByUserIds", () => {
        test("Should get customers", async () => {
            const userIds = ["00000000-0000-0000-0000-000000000000"];
            const sut = new PrismaCustomerRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getCustomersByUserIds(userIds);

            expect(result.length).toBeGreaterThan(0);
        });
    });
});
