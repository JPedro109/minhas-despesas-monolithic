import { PrismaPaymentMethodRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { PaymentMethodEntity } from "@/layers/domain";
import { Seed, testPaymentMethodEntity } from "./__mocks__";

describe("External - PrismaPaymentMethodRepositoryAdapter", () => {
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

    describe("createPaymentMethod", () => {
        test("Should create a payment method", async () => {
            const paymentMethod = new PaymentMethodEntity({
                userId: "00000000-0000-0000-0000-000000000001",
                name: "Card One",
                token: "1",
            });

            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.createPaymentMethod(paymentMethod);

            expect(result).toBeInstanceOf(PaymentMethodEntity);
        });
    });

    describe("getPaymentMethodById", () => {
        test("Should return a payment method by ID", async () => {
            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getPaymentMethodById(
                "00000000-0000-0000-0000-000000000000",
            );

            expect(result).toBeInstanceOf(PaymentMethodEntity);
        });

        test("Should return null if payment method does not exist", async () => {
            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getPaymentMethodById(
                "ffffffff-ffff-ffff-ffff-ffffffffffff",
            );

            expect(result).toBeNull();
        });
    });

    describe("getPaymentMethodByUserId", () => {
        test("Should return a payment method by user ID", async () => {
            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getPaymentMethodByUserId(
                "00000000-0000-0000-0000-000000000000",
            );

            expect(result).toBeInstanceOf(PaymentMethodEntity);
        });

        test("Should return null if user has no payment method", async () => {
            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.getPaymentMethodByUserId(
                "ffffffff-ffff-ffff-ffff-ffffffffffff",
            );

            expect(result).toBeNull();
        });
    });

    describe("updatePaymentMethodById", () => {
        test("Should update a payment method", async () => {
            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );
            const paymentMethod = testPaymentMethodEntity();

            await sut.updatePaymentMethodById(
                "00000000-0000-0000-0000-000000000000",
                paymentMethod,
            );

            const result = await sut.getPaymentMethodById(
                "00000000-0000-0000-0000-000000000000",
            );

            expect(result).toBeInstanceOf(PaymentMethodEntity);
        });
    });

    describe("deletePaymentMethodById", () => {
        test("Should delete a payment method by ID", async () => {
            const sut = new PrismaPaymentMethodRepositoryAdapter(
                databaseSQLHelper,
            );

            await sut.deletePaymentMethodById(
                "00000000-0000-0000-0000-000000000000",
            );

            const result = await sut.getPaymentMethodById(
                "00000000-0000-0000-0000-000000000000",
            );

            expect(result).toBeNull();
        });
    });
});
