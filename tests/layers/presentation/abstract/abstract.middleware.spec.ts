import { ForbiddenError, UnauthorizedError } from "@/layers/application";
import { AbstractMiddleware, HttpHelper, HttpResponse } from "@/layers/presentation";

class Test {
    async execute(): Promise<void> { }
}

class TestMiddleware extends AbstractMiddleware {

    constructor(private readonly test: Test) {
        super();
    }

    protected async handler(): Promise<HttpResponse> {
        await this.test.execute();
        return HttpHelper.noBody();
    }
}

const makeSut = (): {
    sut: TestMiddleware
    test: Test
} => {
    const test = new Test();
    const sut = new TestMiddleware(test);

    return {
        sut,
        test
    };
};

describe("Middleware - AbstractMiddleware", () => {

    test("Should return status code 401", async () => {
        const { sut, test } = makeSut();
        jest.spyOn(test, "execute").mockRejectedValueOnce(new UnauthorizedError("Error"));

        const result = await sut.http({});

        expect(result.statusCode).toBe(401);
    });

    test("Should return status code 403", async () => {
        const { sut, test } = makeSut();
        jest.spyOn(test, "execute").mockRejectedValueOnce(new ForbiddenError("Error"));

        const result = await sut.http({});

        expect(result.statusCode).toBe(403);
    });

    test("Should return status code 500", async () => {
        const { sut, test } = makeSut();
        jest.spyOn(test, "execute").mockRejectedValueOnce(new Error());

        const result = await sut.http({});

        expect(result.statusCode).toBe(500);
    });

    test("Should return status code 204", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});