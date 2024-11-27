import { IUpdateUserPasswordUseCase } from "@/layers/application";
import { UpdateUserPasswordController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UpdateUserPasswordController,
    mockUpdateUserPasswordUseCase: jest.Mocked<IUpdateUserPasswordUseCase>
} => {
    const mockUpdateUserPasswordUseCase: jest.Mocked<IUpdateUserPasswordUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new UpdateUserPasswordController(
        mockUpdateUserPasswordUseCase,
        logStub
    );

    return {
        sut,
        mockUpdateUserPasswordUseCase
    };
};

describe("Controller - UpdateUserPasswordController", () => {

    test("Should not update user password because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const password = "";
        const newPassword = "";
        const newPasswordConfirm = "";

        const result = await sut.http({
            data: {
                password,
                newPassword,
                newPasswordConfirm
            },
            userId: id
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update user password", async () => {
        const { sut } = makeSut();
        const id = "1";
        const password = "Password@123456";
        const newPassword = "Password@1234567";
        const newPasswordConfirm = "Password@1234567";

        const result = await sut.http({
            data: {
                password,
                newPassword,
                newPasswordConfirm
            },
            userId: id
        });

        expect(result.statusCode).toBe(204);
    });
});