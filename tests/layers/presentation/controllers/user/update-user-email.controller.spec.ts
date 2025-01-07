import { IUpdateUserEmailUseCase } from "@/layers/application";
import { UpdateUserEmailController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UpdateUserEmailController;
    mockUpdateUserEmailUseCase: jest.Mocked<IUpdateUserEmailUseCase>;
} => {
    const mockUpdateUserEmailUseCase: jest.Mocked<IUpdateUserEmailUseCase> = {
        execute: jest.fn(),
    };
    const logStub = logStubFactory();

    const sut = new UpdateUserEmailController(
        mockUpdateUserEmailUseCase,
        logStub,
    );

    return {
        sut,
        mockUpdateUserEmailUseCase,
    };
};

describe("Controller - UpdateUserEmailController", () => {
    test("Should not update user email because schema is invalid", async () => {
        const { sut } = makeSut();
        const code = "";
        const email = "";

        const result = await sut.http({
            data: {
                code,
                email,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update user email", async () => {
        const { sut } = makeSut();
        const code = "123456";
        const email = "email@test.com";

        const result = await sut.http({
            data: {
                code,
                email,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
