import { PrismaUserRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { UserEntity } from "@/layers/domain";
import { Seed, testUserEntity } from "./__mocks__";

describe("External - PrismaUserRepositoryAdapter", () => {

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

    describe("createUser", () => {
        test("Should create user", async () => {
            const user = new UserEntity(
                {
                    email: "user_created@test.com",
                    password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
                    username: "Test",
                    verifiedEmail: true
                }
            );;
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            const result = await sut.createUser(user);
    
            expect(result).toBeInstanceOf(UserEntity);
        }); 
    });

    describe("getUserById", () => {
        test("Should get null", async () => {
            const id = "ffffffff-ffff-ffff-ffff-ffffffffffff";
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            const result = await sut.getUserById(id);
    
            expect(result).toBe(null);
        });
    
        test("Should get user", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            const result = await sut.getUserById(id);
    
            expect(result.id).toBe(id);
        }); 
    });

    describe("getUsersByIds", () => {
        test("Should get users", async () => {
            const ids = ["00000000-0000-0000-0000-000000000000"];
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            const result = await sut.getUsersByIds(ids);
    
            expect(result.length).toBeGreaterThan(0);
        }); 
    });

    describe("getUserByEmail", () => {
        test("Should get null", async () => {
            const email = "email_not_exists@test.com";
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            const result = await sut.getUserByEmail(email);
    
            expect(result).toBe(null);
        });
    
        test("Should get user", async () => {
            const email = "email@test.com";
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            const result = await sut.getUserByEmail(email);
    
            expect(result.email).toBe(email);
        }); 
    });

    describe("updateUserById", () => {
        test("Should update user", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const user = testUserEntity();
            user.email = "email_updated@test.com";
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);
    
            await sut.updateUserById(id, user);
    
            const updatedUser = await sut.getUserById(id);
            expect(updatedUser.email).toBe(user.email);
        });
    
    });

    describe("deleteUserById", () => {
        test("Should delete user", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaUserRepositoryAdapter(databaseSQLHelper);

            await sut.deleteUserById(id);

            const result = await sut.getUserById(id);
            expect(result).toBeNull();
        });
    });
});