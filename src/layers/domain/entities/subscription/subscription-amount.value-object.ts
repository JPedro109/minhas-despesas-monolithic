import { InvalidSubscriptionAmountError } from "./errors/invalid-subscription-amount.error";

export class SubscriptionAmountValueObject {
    private constructor(private readonly subscriptionAmount: number) {}

    public get value(): number {
        return this.subscriptionAmount;
    }

    static create(
        subscriptionAmount: number,
    ): SubscriptionAmountValueObject | InvalidSubscriptionAmountError {
        if (!this.validate(subscriptionAmount))
            return new InvalidSubscriptionAmountError();

        return new SubscriptionAmountValueObject(subscriptionAmount);
    }

    private static validate(subscriptionAmount: number): boolean {
        if (subscriptionAmount < 0) return false;

        return true;
    }
}
