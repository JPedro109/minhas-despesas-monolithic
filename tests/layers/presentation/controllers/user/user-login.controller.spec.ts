import { IUserLoginUseCase } from "@/layers/application";
import { UserLoginController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UserLoginController;
    mockUserLoginUseCase: jest.Mocked<IUserLoginUseCase>;
} => {
    const mockUserLoginUseCase: jest.Mocked<IUserLoginUseCase> = {
        execute: jest.fn().mockResolvedValue({
            accessToken: "token",
            refreshToken: "refresh-token",
        }),
    };
    const logStub = logStubFactory();

    const sut = new UserLoginController(mockUserLoginUseCase, logStub);

    return {
        sut,
        mockUserLoginUseCase,
    };
};

describe("Controller - UserLoginController", () => {
    test("Should not user login because schema is invalid", async () => {
        const { sut } = makeSut();
        const email = "";
        const password = "";

        const result = await sut.http({
            data: {
                email,
                password,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should user login", async () => {
        const { sut } = makeSut();
        const email = "email@test.com";
        const password = "Password@12345";

        const result = await sut.http({
            data: {
                email,
                password,
            },
        });

        expect(result.statusCode).toBe(200);
    });
});
