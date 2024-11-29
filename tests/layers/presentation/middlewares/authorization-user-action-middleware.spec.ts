import { IGetUserSubscriptionUseCase } from "@/layers/application";
import { AuthorizationUserActionMiddleware } from "@/layers/presentation";

const makeSut = (): {
    sutWithActionNameAndWithTenTotalOperations: AuthorizationUserActionMiddleware
    sutWithActionNameAndWithFiveTotalOperations: AuthorizationUserActionMiddleware
    sutWithActionNotFound: AuthorizationUserActionMiddleware
    mockGetUserSubscriptionUseCaseWithFiveTotalOperations: IGetUserSubscriptionUseCase
    mockGetUserSubscriptionUseCaseWithTenTotalOperations: IGetUserSubscriptionUseCase
} => {
    const mockGetUserSubscriptionUseCaseWithFiveTotalOperations: jest.Mocked<IGetUserSubscriptionUseCase> = {
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
                        totalOperations: 5
                    }
                ]
            }
        })
    };  

    const mockGetUserSubscriptionUseCaseWithTenTotalOperations: jest.Mocked<IGetUserSubscriptionUseCase> = {
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
                        totalOperations: 10
                    }
                ]
            }
        })
    };  
    
    const sutWithActionNameAndWithTenTotalOperations = new AuthorizationUserActionMiddleware(
        mockGetUserSubscriptionUseCaseWithTenTotalOperations,
        "Name",
        true,
        jest.fn().mockResolvedValueOnce(5)
    );

    const sutWithActionNameAndWithFiveTotalOperations = new AuthorizationUserActionMiddleware(
        mockGetUserSubscriptionUseCaseWithFiveTotalOperations,
        "Name",
        true,
        jest.fn().mockResolvedValueOnce(5)
    );

    const sutWithActionNotFound = new AuthorizationUserActionMiddleware(
        mockGetUserSubscriptionUseCaseWithTenTotalOperations,
        "NotFound",
        true,
        jest.fn().mockResolvedValueOnce(2)
    );

    return {
        sutWithActionNameAndWithTenTotalOperations,
        sutWithActionNameAndWithFiveTotalOperations,
        sutWithActionNotFound,
        mockGetUserSubscriptionUseCaseWithTenTotalOperations,
        mockGetUserSubscriptionUseCaseWithFiveTotalOperations
    };
};

describe("Presentation - AuthorizationUserActionMiddleware", () => {

    test("Should not instantiate AuthorizationUserActionMiddleware because constructor arguments are invalid", async () => {
        const { mockGetUserSubscriptionUseCaseWithFiveTotalOperations } = makeSut();

        const result = (): AuthorizationUserActionMiddleware =>
             new AuthorizationUserActionMiddleware(mockGetUserSubscriptionUseCaseWithFiveTotalOperations, "Name", true);

        expect(result).toThrow();
    });

    test("Should not authorization user action because user id is empty", async () => {
        const userId = "";
        const { sutWithActionNameAndWithTenTotalOperations } = makeSut();

        const result = await sutWithActionNameAndWithTenTotalOperations.http(
            {
                userId
            }
        );

        expect(result.statusCode).toBe(401);
    });

    test("Should not authorization user action because action is invalid", async () => {
        const userId = "1";
        const { sutWithActionNotFound } = makeSut();

        const result = await sutWithActionNotFound.http(
            {
                userId
            }
        );

        expect(result.statusCode).toBe(403);
    });

    test("Should not authorization user action because user has already performed the maximum number of operations", async () => {
        const userId = "1";
        const { sutWithActionNameAndWithFiveTotalOperations } = makeSut();
         
        const result = await sutWithActionNameAndWithFiveTotalOperations.http(
            {
                userId
            }
        );

        expect(result.statusCode).toBe(403);
    });

    test("Should authorization user action", async () => {
        const userId = "1";
        const { sutWithActionNameAndWithTenTotalOperations } = makeSut();

        const result = await sutWithActionNameAndWithTenTotalOperations.http(
            {
                userId
            }
        );

        expect(result.statusCode).toBe(204);
    });
});