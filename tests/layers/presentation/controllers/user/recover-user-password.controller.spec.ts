import { IRecoverUserPasswordUseCase } from "@/layers/application";
import { RecoverUserPasswordController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: RecoverUserPasswordController,
    mockRecoverUserPasswordUseCase: jest.Mocked<IRecoverUserPasswordUseCase>
} => {
    const mockRecoverUserPasswordUseCase: jest.Mocked<IRecoverUserPasswordUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new RecoverUserPasswordController(
        mockRecoverUserPasswordUseCase, 
        logStub
    );

    return {
        sut,
        mockRecoverUserPasswordUseCase
    };
};

describe("Controller - RecoverUserPasswordController", () => {

    test("Should not recover user password because schema is invalid", async () => {
        const { sut } = makeSut();
        const code = "";
        const password = "";
        const passwordConfirm = "";

        const result = await sut.http({
            data: {
                code,
                password,
                passwordConfirm
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should recover user password", async () => {
        const { sut } = makeSut();
        const code = "123456";
        const password = "Password@123456";
        const passwordConfirm = "Password@123456";

        const result = await sut.http({
            data: {
                code,
                password,
                passwordConfirm
            }
        });

        expect(result.statusCode).toBe(204);
    });
});