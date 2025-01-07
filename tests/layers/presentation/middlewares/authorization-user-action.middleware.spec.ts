import { IGetUserSubscriptionUseCase } from "@/layers/application";
import { AuthorizationUserActionMiddleware } from "@/layers/presentation";

const makeSut = (): {
    sutWithActionNameAndWithTenTotalOperations: AuthorizationUserActionMiddleware;
    sutWithActionNotFound: AuthorizationUserActionMiddleware;
    mockGetUserSubscriptionUseCase: IGetUserSubscriptionUseCase;
} => {
    const mockGetUserSubscriptionUseCase: jest.Mocked<IGetUserSubscriptionUseCase> =
        {
            execute: jest.fn().mockResolvedValue({
                subscriptionId: "1",
                userId: "1",
                amount: "amount",
                active: "active",
                renewable: "renewable",
                startDate: "startDate",
                endDate: "endDate",
                plan: {
                    planId: "Name",
                    name: "Name",
                    amount: 100,
                    description: "Desc",
                    durationInDays: 30,
                    actions: [
                        {
                            actionId: "1",
                            name: "Name",
                            description: "Desc",
                        },
                    ],
                },
            }),
        };

    const sutWithActionNameAndWithTenTotalOperations =
        new AuthorizationUserActionMiddleware(
            mockGetUserSubscriptionUseCase,
            "Name",
        );

    const sutWithActionNotFound = new AuthorizationUserActionMiddleware(
        mockGetUserSubscriptionUseCase,
        "NotFound",
    );

    return {
        sutWithActionNameAndWithTenTotalOperations,
        sutWithActionNotFound,
        mockGetUserSubscriptionUseCase,
    };
};

describe("Presentation - AuthorizationUserActionMiddleware", () => {
    test("Should not authorization user action because user id is empty", async () => {
        const userId = "";
        const { sutWithActionNameAndWithTenTotalOperations } = makeSut();

        const result = await sutWithActionNameAndWithTenTotalOperations.http({
            userId,
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should not authorization user action because action is invalid", async () => {
        const userId = "1";
        const { sutWithActionNotFound } = makeSut();

        const result = await sutWithActionNotFound.http({
            userId,
        });

        expect(result.statusCode).toBe(403);
    });

    test("Should authorization user action", async () => {
        const userId = "1";
        const { sutWithActionNameAndWithTenTotalOperations } = makeSut();

        const result = await sutWithActionNameAndWithTenTotalOperations.http({
            userId,
        });

        expect(result.statusCode).toBe(204);
    });
});
