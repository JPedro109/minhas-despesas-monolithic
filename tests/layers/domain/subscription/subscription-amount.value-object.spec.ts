import {
    SubscriptionAmountValueObject,
    InvalidSubscriptionAmountError,
} from "@/layers/domain";

describe("Value Object - SubscriptionAmountValueObject", () => {
    test("Should not create SubscriptionAmountValueObject, because value is less than zero", () => {
        const invalidExpenseValue = -1;

        const sut = SubscriptionAmountValueObject.create(invalidExpenseValue);

        expect(sut).toBeInstanceOf(InvalidSubscriptionAmountError);
    });

    test("Should create SubscriptionAmountValueObject", () => {
        const expenseValue = 1;

        const sut = SubscriptionAmountValueObject.create(
            expenseValue,
        ) as unknown as SubscriptionAmountValueObject;

        expect(sut).toBeInstanceOf(SubscriptionAmountValueObject);
        expect(sut.value).toBe(expenseValue);
    });
});
