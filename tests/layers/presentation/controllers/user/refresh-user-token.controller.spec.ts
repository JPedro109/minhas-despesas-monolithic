import { IRefreshUserTokenUseCase } from "@/layers/application";
import { RefreshUserTokenController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: RefreshUserTokenController;
    mockRefreshUserTokenUseCase: jest.Mocked<IRefreshUserTokenUseCase>;
} => {
    const mockRefreshUserTokenUseCase: jest.Mocked<IRefreshUserTokenUseCase> = {
        execute: jest.fn().mockResolvedValue("token"),
    };
    const logStub = logStubFactory();

    const sut = new RefreshUserTokenController(
        mockRefreshUserTokenUseCase,
        logStub,
    );

    return {
        sut,
        mockRefreshUserTokenUseCase,
    };
};

describe("Controller - RefreshUserTokenController", () => {
    test("Should not refresh user token because schema is invalid", async () => {
        const { sut } = makeSut();
        const refreshToken = "";

        const result = await sut.http({
            body: {
                refreshToken,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should refresh user token", async () => {
        const { sut } = makeSut();
        const refreshToken = "refresh-token";

        const result = await sut.http({
            body: {
                refreshToken,
            },
        });

        expect(result.statusCode).toBe(200);
    });
});
