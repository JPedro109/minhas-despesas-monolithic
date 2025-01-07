import { ISendUserEmailUpdateLinkUseCase } from "@/layers/application";
import { SendUserEmailUpdateLinkController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: SendUserEmailUpdateLinkController;
    mockSendUserEmailUpdateLinkUseCase: jest.Mocked<ISendUserEmailUpdateLinkUseCase>;
} => {
    const mockSendUserEmailUpdateLinkUseCase: jest.Mocked<ISendUserEmailUpdateLinkUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();

    const sut = new SendUserEmailUpdateLinkController(
        mockSendUserEmailUpdateLinkUseCase,
        logStub,
    );

    return {
        sut,
        mockSendUserEmailUpdateLinkUseCase,
    };
};

describe("Controller - SendUserEmailUpdateLinkController", () => {
    test("Should not send user email update link because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const email = "";

        const result = await sut.http({
            data: {
                email,
            },
            userId: id,
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should send user email update link", async () => {
        const { sut } = makeSut();
        const id = "1";
        const email = "email@test.com";

        const result = await sut.http({
            data: {
                email,
            },
            userId: id,
        });

        expect(result.statusCode).toBe(204);
    });
});
