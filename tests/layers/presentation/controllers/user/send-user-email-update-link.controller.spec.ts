import { ISendUserEmailUpdateCodeUseCase } from "@/layers/application";
import { SendUserEmailUpdateCodeController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: SendUserEmailUpdateCodeController;
    mockSendUserEmailUpdateCodeUseCase: jest.Mocked<ISendUserEmailUpdateCodeUseCase>;
} => {
    const mockSendUserEmailUpdateCodeUseCase: jest.Mocked<ISendUserEmailUpdateCodeUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();

    const sut = new SendUserEmailUpdateCodeController(
        mockSendUserEmailUpdateCodeUseCase,
        logStub,
    );

    return {
        sut,
        mockSendUserEmailUpdateCodeUseCase,
    };
};

describe("Controller - SendUserEmailUpdateCodeController", () => {
    test("Should not send user email update link because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const email = "";

        const result = await sut.http({
            body: {
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
            body: {
                email,
            },
            userId: id,
        });

        expect(result.statusCode).toBe(204);
    });
});
