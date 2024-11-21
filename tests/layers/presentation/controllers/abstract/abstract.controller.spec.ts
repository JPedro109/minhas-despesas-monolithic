import { DomainError } from "@/layers/domain";
import { ConflictedError, ForbiddenError, ILog, NotFoundError, UnauthorizedError } from "@/layers/application";
import { AbstractController, HttpHelper, HttpRequest, HttpResponse } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

class UseCase {
    async execute(): Promise<string> {
        return "1";
    }
}

class TestController extends AbstractController {

    constructor(
        private readonly useCase: UseCase,
        log: ILog
    ) {
        super(
            log,
            "Test",
            {
                account: {
                    type: {
                        email: {
                            type: "string",
                            optional: false
                        },
                        password: {
                            type: "string",
                            optional: false
                        },
                    },
                    optional: false
                },
                address: {
                    type: {
                        street: {
                            type: "string",
                            optional: false
                        },
                        city: {
                            type: "string",
                            optional: false
                        },
                        state: {
                            type: "string",
                            optional: false
                        },
                        complement: {
                            type: "string",
                            optional: true
                        }
                    },
                    optional: true
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const {
            account,
            address
        } = request.data;

        const body = {
            account,
            address
        };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute();

        return HttpHelper.created(response);
    }
}

const makeSut = (): {
    sut: TestController,
    useCase: UseCase
} => {
    const logStub = logStubFactory();
    const useCase = new UseCase();

    const sut = new TestController(
        useCase,
        logStub
    );

    return {
        sut,
        useCase
    };
};

describe("Controller - CreateUserController", () => {

    test("Should return status code 422", async () => {
        const { sut, useCase } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(useCase, "execute").mockRejectedValueOnce(new DomainError("Test"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(422);
    });

    test("Should return status code 401", async () => {
        const { sut, useCase } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(useCase, "execute").mockRejectedValueOnce(new UnauthorizedError("Test"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should return status code 404", async () => {
        const { sut, useCase } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(useCase, "execute").mockRejectedValueOnce(new NotFoundError("Test"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(404);
    });

    test("Should return status code 403", async () => {
        const { sut, useCase } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(useCase, "execute").mockRejectedValueOnce(new ForbiddenError("Test"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(403);
    });

    test("Should return status code 409", async () => {
        const { sut, useCase } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(useCase, "execute").mockRejectedValueOnce(new ConflictedError("Test"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(409);
    });

    test("Should return status code 500", async () => {
        const { sut, useCase } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(useCase, "execute").mockRejectedValueOnce(new Error("Test"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(500);
    });

    test("Should return status code 400", async () => {
        const { sut } = makeSut();
        const account = {
            email: "",
            password: ""
        };
        const address = {
            street: "",
            city: "",
            state: "",
            complement: undefined
        };

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should return status code 200", async () => {
        const { sut } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(sut, "http").mockResolvedValueOnce(HttpHelper.ok("1"));

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(200);
    });

    test("Should return status code 201", async () => {
        const { sut } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(201);
    });

    test("Should return status code 204", async () => {
        const { sut } = makeSut();
        const account = {
            email: "email@test.com",
            password: "Password1234"
        };
        const address = {
            street: "Street One",
            city: "City",
            state: "State",
            complement: undefined
        };
        jest.spyOn(sut, "http").mockResolvedValueOnce(HttpHelper.noBody());

        const result = await sut.http({
            data: {
                account,
                address
            }
        });

        expect(result.statusCode).toBe(204);
    });
});