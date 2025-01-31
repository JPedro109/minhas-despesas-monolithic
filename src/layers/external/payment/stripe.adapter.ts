import { environmentVariables } from "@/shared";
import { IPayment, SubscriptionData } from "@/layers/application";

import { Stripe } from "stripe";

export class StripeAdapter implements IPayment {
    public readonly stripe = new Stripe(environmentVariables.stripeSecretKey);

    public async createCustomer(): Promise<string> {
        const customer = await this.stripe.customers.create();

        return customer.id;
    }

    public async deleteCustomer(customerId: string): Promise<void> {
        await this.stripe.customers.del(customerId);
    }

    public async attachmentPaymentMethodInCustomer(
        customerId: string,
        token: string,
    ): Promise<string> {
        const paymentMethod = await this.stripe.paymentMethods.attach(token, {
            customer: customerId,
        });

        return paymentMethod.id;
    }

    public async detachmentPaymentMethodInCustomerByToken(
        token: string,
    ): Promise<void> {
        await this.stripe.paymentMethods.detach(token);
    }

    public async createSubscription(
        customerId: string,
        planExternalId: string,
        paymentMethod: string,
    ): Promise<string> {
        const subscription = await this.stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: planExternalId,
                },
            ],
            default_payment_method: paymentMethod,
        });

        return subscription.id;
    }

    public async getSubscriptionBySubscriptionExternalId(
        subscriptionExternalId: string,
    ): Promise<SubscriptionData> {
        const subscription = await this.stripe.subscriptions.retrieve(
            subscriptionExternalId,
        );

        return {
            active: subscription.status === "active",
            renewable: !subscription.cancel_at_period_end,
            startDate: new Date(subscription.current_period_start * 1000),
            endDate: new Date(subscription.current_period_end * 1000),
        };
    }

    public async updateSubscriptionRenewable(
        subscriptionId: string,
        renewable: boolean,
    ): Promise<void> {
        await this.stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: !renewable,
        });
    }

    public async deleteAllCustomers(): Promise<void> {
        const customers = await this.stripe.customers.list({
            limit: 100,
        });

        for (const customer of customers.data) {
            if (customer.id) {
                await this.stripe.customers.del(customer.id);
            }
        }
    }
}
