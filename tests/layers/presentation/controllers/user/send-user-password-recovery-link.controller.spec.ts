import { ISendUserPasswordRecoveryCodeUseCase } from "@/layers/application";
import { SendUserPasswordRecoveryCodeController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: SendUserPasswordRecoveryCodeController;
    mockSendUserPasswordRecoveryCodeUseCase: jest.Mocked<ISendUserPasswordRecoveryCodeUseCase>;
} => {
    const mockSendUserPasswordRecoveryCodeUseCase: jest.Mocked<ISendUserPasswordRecoveryCodeUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();

    const sut = new SendUserPasswordRecoveryCodeController(
        mockSendUserPasswordRecoveryCodeUseCase,
        logStub,
    );

    return {
        sut,
        mockSendUserPasswordRecoveryCodeUseCase,
    };
};

describe("Controller - SendUserPasswordRecoveryCodeController", () => {
    test("Should not send user password recovery link because schema is invalid", async () => {
        const { sut } = makeSut();
        const email = "";

        const result = await sut.http({
            body: {
                email,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should send user password recovery link", async () => {
        const { sut } = makeSut();
        const email = "email@test.com";

        const result = await sut.http({
            body: {
                email,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
