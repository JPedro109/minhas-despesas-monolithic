import { CustomerEntity, UserEntity } from "@/layers/domain";

export const testUserEntity = (): UserEntity => new UserEntity(
    {
        email: "email@test.com",
        password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
        username: "Test",
        verifiedEmail: true
    },
    "00000000-0000-0000-0000-000000000000"
);

export const testUserEntityTwo = (): UserEntity => new UserEntity(
    {
        email: "email-two@test.com",
        password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
        username: "Test",
        verifiedEmail: true
    },
    "00000000-0000-0000-0000-000000000001"
);

export const testCustomerEntity = (): CustomerEntity => new CustomerEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        customerId: "1"
    },
    "00000000-0000-0000-0000-000000000000"
);