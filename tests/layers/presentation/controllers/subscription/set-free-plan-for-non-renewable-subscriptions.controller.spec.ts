import {
    IGetActiveNonRenewableSubscriptionsUseCase,
    IManageSubscriptionRenewalUseCase,
} from "@/layers/application";
import { SetFreePlanForNonRenewableSubscriptionsController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: SetFreePlanForNonRenewableSubscriptionsController;
    mockGetActiveNonRenewableSubscriptionsUseCase: jest.Mocked<IGetActiveNonRenewableSubscriptionsUseCase>;
    mockManageSubscriptionRenewalUseCase: jest.Mocked<IManageSubscriptionRenewalUseCase>;
} => {
    const mockGetActiveNonRenewableSubscriptionsUseCase: jest.Mocked<IGetActiveNonRenewableSubscriptionsUseCase> =
        {
            execute: jest.fn().mockResolvedValue([
                {
                    subscriptionId: "1",
                    userId: "1",
                    amount: 100,
                    active: true,
                    renewable: false,
                    startDate: new Date(),
                    endDate: "",
                },
            ]),
        };
    const mockManageSubscriptionRenewalUseCase: jest.Mocked<IManageSubscriptionRenewalUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();

    const sut = new SetFreePlanForNonRenewableSubscriptionsController(
        mockGetActiveNonRenewableSubscriptionsUseCase,
        mockManageSubscriptionRenewalUseCase,
        logStub,
    );

    return {
        sut,
        mockGetActiveNonRenewableSubscriptionsUseCase,
        mockManageSubscriptionRenewalUseCase,
    };
};

describe("Controller - ExecuteChargeToExpiredSubscriptionController", () => {
    test("Should not set free plan for non renewable subscriptions because exists a promise reject", async () => {
        const { sut, mockManageSubscriptionRenewalUseCase } = makeSut();
        jest.spyOn(
            mockManageSubscriptionRenewalUseCase,
            "execute",
        ).mockRejectedValueOnce(new Error());

        const result = await sut.http({});

        expect(result.statusCode).toBe(500);
    });

    test("Should set free plan for non renewable subscriptions", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});
