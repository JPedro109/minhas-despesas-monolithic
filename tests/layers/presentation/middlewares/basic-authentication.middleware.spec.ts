import { BasicAuthenticationMiddleware } from "@/layers/presentation";
import { SecurityStub } from "../__mocks__";

const makeSut = (): {
    sut: BasicAuthenticationMiddleware;
    securityStub: SecurityStub;
} => {
    const securityStub = new SecurityStub();
    const sut = new BasicAuthenticationMiddleware(securityStub);

    return {
        sut,
        securityStub,
    };
};

describe("Presentation - BasicAuthenticationMiddleware", () => {
    test("Should not authenticate user, because credential is empty", async () => {
        const authorization = "";
        const { sut } = makeSut();

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should not authenticate user, because Basic is invalid ", async () => {
        const authorization = "B credential";
        const { sut } = makeSut();

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should not authenticate user, because credential is invalid", async () => {
        const authorization = "Basic invalid_credential";
        const { sut, securityStub } = makeSut();
        jest.spyOn(
            securityStub,
            "verifyBasicAuthenticationCredential",
        ).mockImplementationOnce(() => false);

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should authenticate user", async () => {
        const authorization = "Basic credential";
        const { sut } = makeSut();

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
