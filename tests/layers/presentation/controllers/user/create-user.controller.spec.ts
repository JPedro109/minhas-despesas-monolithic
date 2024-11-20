import { ICreateUserUseCase } from "@/layers/application";
import { CreateUserController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: CreateUserController,
    mockCreateUserUseCase: jest.Mocked<ICreateUserUseCase>
} => {
    const mockCreateUserUseCase: jest.Mocked<ICreateUserUseCase> = {
        execute: jest.fn().mockResolvedValue("1")
    };
    const logStub = logStubFactory();

    const sut = new CreateUserController(
        mockCreateUserUseCase, 
        logStub
    );

    return {
        sut,
        mockCreateUserUseCase
    };
};

describe("Controller - CreateUserController", () => {

    test("Should not create user schema is invalid", async () => {
        const { sut } = makeSut();
        const email = "";
        const username = "";
        const password = "";
        const passwordConfirm = "";
        const consentVersion = "";
        const ipAddress = "";
        const userAgent = "";

        const result = await sut.http({
            data: {
                email,
                username,
                password,
                passwordConfirm,
                consentVersion,
            },
            ipAddress,
            userAgent
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should create user", async () => {
        const { sut } = makeSut();
        const email = "email@test.com";
        const username = "User Test";
        const password = "Senha@1234";
        const passwordConfirm = "Senha@1234";
        const consentVersion = "v1.0";
        const ipAddress = "127.0.0.1";
        const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36";

        const result = await sut.http({
            data: {
                email,
                username,
                password,
                passwordConfirm,
                consentVersion,
            },
            ipAddress,
            userAgent
        });

        expect(result.statusCode).toBe(201);
    });
});