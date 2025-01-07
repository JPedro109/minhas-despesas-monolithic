import { ISendUserPasswordRecoveryLinkUseCase } from "@/layers/application";
import { SendUserPasswordRecoveryLinkController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: SendUserPasswordRecoveryLinkController;
    mockSendUserPasswordRecoveryLinkUseCase: jest.Mocked<ISendUserPasswordRecoveryLinkUseCase>;
} => {
    const mockSendUserPasswordRecoveryLinkUseCase: jest.Mocked<ISendUserPasswordRecoveryLinkUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();

    const sut = new SendUserPasswordRecoveryLinkController(
        mockSendUserPasswordRecoveryLinkUseCase,
        logStub,
    );

    return {
        sut,
        mockSendUserPasswordRecoveryLinkUseCase,
    };
};

describe("Controller - SendUserPasswordRecoveryLinkController", () => {
    test("Should not send user password recovery link because schema is invalid", async () => {
        const { sut } = makeSut();
        const email = "";

        const result = await sut.http({
            data: {
                email,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should send user password recovery link", async () => {
        const { sut } = makeSut();
        const email = "email@test.com";

        const result = await sut.http({
            data: {
                email,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
