import { INotifyUserOfSubscriptionPaymentFailureUseCase } from "@/layers/application";
import { SubscriptionWebhookController } from "@/layers/presentation";
import {
    logStubFactory,
    PaymentStub,
    paymentStubFactory,
} from "../../__mocks__";

const makeSut = (): {
    sut: SubscriptionWebhookController;
    paymentStub: PaymentStub;
    mockSubscriptionWebhookControllerUseCase: jest.Mocked<INotifyUserOfSubscriptionPaymentFailureUseCase>;
} => {
    const mockSubscriptionWebhookControllerUseCase: jest.Mocked<INotifyUserOfSubscriptionPaymentFailureUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();
    const paymentStub = paymentStubFactory();

    const sut = new SubscriptionWebhookController(
        paymentStub,
        mockSubscriptionWebhookControllerUseCase,
        logStub,
    );

    return {
        sut,
        paymentStub,
        mockSubscriptionWebhookControllerUseCase,
    };
};

describe("Controller - SubscriptionWebhookController", () => {
    test("Should execute subscription webhook", async () => {
        const { sut, paymentStub, mockSubscriptionWebhookControllerUseCase } =
            makeSut();
        const mockSubscriptionWebhookControllerUseCaseSpy = jest.spyOn(
            mockSubscriptionWebhookControllerUseCase,
            "execute",
        );
        jest.spyOn(
            paymentStub,
            "validateWebhookRequest",
        ).mockImplementationOnce(() => ({
            type: "invoice.payment_failed",
            data: {
                object: {
                    customer: "1",
                },
            },
        }));

        const result = await sut.http({
            headers: {},
            body: {},
        });

        expect(mockSubscriptionWebhookControllerUseCaseSpy).toHaveBeenCalled();
        expect(result.statusCode).toBe(200);
    });
});
