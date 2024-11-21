import { IVerifyUserEmailUseCase } from "@/layers/application";
import { VerifyUserEmailController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: VerifyUserEmailController,
    mockVerifyUserEmailUseCase: jest.Mocked<IVerifyUserEmailUseCase>
} => {
    const mockVerifyUserEmailUseCase: jest.Mocked<IVerifyUserEmailUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new VerifyUserEmailController(
        mockVerifyUserEmailUseCase,
        logStub
    );

    return {
        sut,
        mockVerifyUserEmailUseCase
    };
};

describe("Controller - VerifyUserEmailController", () => {

    test("Should not verify user email because schema is invalid", async () => {
        const { sut } = makeSut();
        const code = "";

        const result = await sut.http({
            data: {
                code
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should verify user email", async () => {
        const { sut } = makeSut();
        const code = "123456";

        const result = await sut.http({
            data: {
                code
            }
        });

        expect(result.statusCode).toBe(204);
    });
});