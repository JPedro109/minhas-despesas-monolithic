import { IDeleteUserUseCase } from "@/layers/application";
import { DeleteUserController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: DeleteUserController,
    mockDeleteUserUseCase: jest.Mocked<IDeleteUserUseCase>
} => {
    const mockDeleteUserUseCase: jest.Mocked<IDeleteUserUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new DeleteUserController(
        mockDeleteUserUseCase, 
        logStub
    );

    return {
        sut,
        mockDeleteUserUseCase
    };
};

describe("Controller - DeleteUserController", () => {

    test("Should not delete user request because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const password = "";
        const passwordConfirm = "";

        const result = await sut.http({
            data: {
                password,
                passwordConfirm
            },
            userId: id
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should delete user", async () => {
        const { sut } = makeSut();
        const id = "1";
        const password = "Password@123456";
        const passwordConfirm = "Password@123456";

        const result = await sut.http({
            data: {
                password,
                passwordConfirm
            },
            userId: id
        });

        expect(result.statusCode).toBe(204);
    });
});