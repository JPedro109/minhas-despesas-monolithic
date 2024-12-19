import { PrismaUserVerificationCodeRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { UserVerificationCodeEntity, UserVerificationCodeTypeEnum } from "@/layers/domain";
import { Seed, testUserEntity, testUserVerificationCodeEntity } from "./__mocks__";

describe("External - PrismaUserVerificationCodeRepositoryAdapter", () => {
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

    describe("createUserVerificationCode", () => {
        test("Should create a new user verification code", async () => {
            const sut = new PrismaUserVerificationCodeRepositoryAdapter(databaseSQLHelper);
            const user = testUserEntity();
            const userVerificationCode = new UserVerificationCodeEntity({
                user,
                verificationCode: "000001",
                updatedAt: new Date(),
                type: UserVerificationCodeTypeEnum.VerifyUserEmail,
                valid: true,
            });

            const result = await sut.createUserVerificationCode(userVerificationCode);

            expect(result).toBeInstanceOf(UserVerificationCodeEntity);
        });
    });

    describe("getUserVerificationCodeByVerificationCode", () => {
        test("Should return a user verification code by its code", async () => {
            const sut = new PrismaUserVerificationCodeRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getUserVerificationCodeByVerificationCode("000000");

            expect(result).toBeInstanceOf(UserVerificationCodeEntity);
        });

        test("Should return null if the verification code does not exist", async () => {
            const sut = new PrismaUserVerificationCodeRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getUserVerificationCodeByVerificationCode("999999");

            expect(result).toBeNull();
        });
    });

    describe("updateUserVerificationCodeById", () => {
        test("Should update a user verification code by its ID", async () => {
            const sut = new PrismaUserVerificationCodeRepositoryAdapter(databaseSQLHelper);
            const userVerificationCode = testUserVerificationCodeEntity();
            userVerificationCode.valid = false;

            await sut.updateUserVerificationCodeById("00000000-0000-0000-0000-000000000000", userVerificationCode);

            const result = await sut.getUserVerificationCodeByVerificationCode("000000");
            expect(result).toBeInstanceOf(UserVerificationCodeEntity);
        });
    });
});