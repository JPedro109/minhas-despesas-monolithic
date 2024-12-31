import { environmentVariables } from "@/shared";
import { IPayment, PaymentCurrencyEnum } from "@/layers/application";

import { Stripe } from "stripe";

export class StripeAdapter implements IPayment {
    public readonly stripe = new Stripe(environmentVariables.stripeSecretKey);

    public async createCustomer(email: string): Promise<string> {
        const customer = await this.stripe.customers.create({ email });

        return customer.id;
    }

    public async updateCustomerEmailByCustomerId(customerId: string, email: string): Promise<void> {
        await this.stripe.customers.update(customerId, { email });
    }

    public async deleteCustomer(customerId: string): Promise<void> {
        await this.stripe.customers.del(customerId);
    }

    public async createPaymentMethod(customerId: string, token: string): Promise<string> {
        const paymentMethod = await this.stripe.paymentMethods.attach(token, {
            customer: customerId
        });

        return paymentMethod.id;
    }

    public async deletePaymentMethodByToken(token: string): Promise<void> {
        await this.stripe.paymentMethods.detach(token);
    }

    public async pay(customerId: string, paymentMethodId: string, amount: number, currency: PaymentCurrencyEnum): Promise<void> {
        await this.stripe.paymentIntents.create({
            currency,
            payment_method: paymentMethodId,
            confirm: true,
            amount: amount,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            },
            customer: customerId
        });
    }

    public async deleteAllCustomers(): Promise<void> {
        const customers = await this.stripe.customers.list({
            limit: 100
        });

        for (const customer of customers.data) {
            if (customer.id) {
                await this.stripe.customers.del(customer.id);
            }
        }
    }
}