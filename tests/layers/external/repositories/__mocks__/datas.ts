import { CustomerEntity, ExpenseEntity, ExtractEntity, UserEntity } from "@/layers/domain";

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

export const testExpenseEntityPaid = (): ExpenseEntity => new ExpenseEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        expenseName: "Expense",
        expenseValue: 100,
        dueDate: new Date("3000-01-01"),
        paid: true
    },
    "00000000-0000-0000-0000-000000000000",
    new Date("3000-01-01")
);

export const testExtractEntity = (): ExtractEntity => new ExtractEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        url: "https://url.com",
        expiryDate: new Date("3000-01-01"),
        urlExpiryDate: new Date("3000-01-01"),
        referenceMonth: 1,
        referenceYear: 2024
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);

export const testExtractEntityExpired = (): ExtractEntity => new ExtractEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        url: "https://url.com",
        expiryDate: new Date("2000-01-01"),
        urlExpiryDate: new Date("2000-01-01"),
        referenceMonth: 1,
        referenceYear: 2024
    },
    "00000000-0000-0000-0000-000000000001",
    new Date()
);