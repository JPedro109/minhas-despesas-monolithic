/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    ISecurity,
    ILog,
    JsonWebTokenType,
    SubscriptionData,
    IPayment,
} from "@/layers/application";

export class SecurityStub implements ISecurity {
    createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
        return "token";
    }

    verifyJsonWebToken(token: string): JsonWebTokenType {
        return {
            id: "1",
            email: "email@test.com",
            type: "access_token",
        };
    }

    verifyBasicAuthenticationCredential(credential: string): boolean {
        return true;
    }
}

export class LogStub implements ILog {
    trace(message: string, trace: string): void {}

    info(message: string): void {}

    warning(message: string): void {}

    error(message: string, error: Error): void {}
}

export class PaymentStub implements IPayment {
    async createCustomer(): Promise<string> {
        return "1";
    }

    async deleteCustomer(customerId: string): Promise<void> {}

    async attachmentPaymentMethodInCustomer(
        customerId: string,
        paymentMethodId: string,
    ): Promise<string> {
        return "1";
    }

    async detachmentPaymentMethodInCustomerByToken(
        paymentMethodId: string,
    ): Promise<void> {}

    public async createSubscription(
        customerId: string,
        planExternalId: string,
        paymentMethod: string,
    ): Promise<string> {
        return "1";
    }

    public async getSubscriptionBySubscriptionExternalId(
        subscriptionExternalId: string,
    ): Promise<SubscriptionData> {
        return {
            active: true,
            renewable: false,
            startDate: new Date("3000-01-01"),
            endDate: new Date("3000-01-02"),
        };
    }

    public async updateSubscriptionRenewable(
        subscriptionId: string,
        renewable: boolean,
    ): Promise<void> {}

    public async deleteSubscription(
        subscriptionExternalId: string,
    ): Promise<void> {}

    validateWebhookRequest<T>(body: object, signature: string): T {
        return {} as T;
    }

    async payExpiredSubscriptionIfAny(
        customerId: string,
        token: string,
    ): Promise<void> {}
}

export const logStubFactory = (): LogStub => new LogStub();
export const paymentStubFactory = (): PaymentStub => new PaymentStub();
