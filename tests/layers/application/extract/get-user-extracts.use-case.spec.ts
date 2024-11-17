import { NotFoundError, GetUserExtractsUseCase } from "@/layers/application";
import {
    UserRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testExtractEntity
} from "../__mocks__";

const makeSut = (): {
    sut: GetUserExtractsUseCase,
    userRepositoryStub: UserRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetUserExtractsUseCase(unitOfWorkRepositoryStub);
    
    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository()
    };
};

describe("Use case - GetUserExtractsUseCase", () => {

    test("Should not get users extracts because user is not exists", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "2";
        jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

        const result = sut.execute({ userId });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should get user extracts", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.execute({ userId });

        expect(result).toEqual(
            [
                {
                    extractId: testExtractEntity().id,
                    url: testExtractEntity().url,
                    userId: testExtractEntity().userId
                }
            ]
        );
    });
});