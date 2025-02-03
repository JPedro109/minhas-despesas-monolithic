import { IUpdateUsernameUseCase } from "@/layers/application";
import { UpdateUsernameController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UpdateUsernameController;
    mockUpdateUsernameUseCase: jest.Mocked<IUpdateUsernameUseCase>;
} => {
    const mockUpdateUsernameUseCase: jest.Mocked<IUpdateUsernameUseCase> = {
        execute: jest.fn(),
    };
    const logStub = logStubFactory();

    const sut = new UpdateUsernameController(
        mockUpdateUsernameUseCase,
        logStub,
    );

    return {
        sut,
        mockUpdateUsernameUseCase,
    };
};

describe("Controller - UpdateUsernameController", () => {
    test("Should not update username because schema is invalid", async () => {
        const { sut } = makeSut();
        const username = "";

        const result = await sut.http({
            body: {
                username,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update username", async () => {
        const { sut } = makeSut();
        const username = "Test One";

        const result = await sut.http({
            body: {
                username,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
