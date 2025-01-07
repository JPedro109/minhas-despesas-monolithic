import { DeleteExpiredExtractsUseCase } from "@/layers/application";
import {
    ExtractRepositoryStub,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: DeleteExpiredExtractsUseCase;
    extractRepositoryStub: ExtractRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new DeleteExpiredExtractsUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        extractRepositoryStub: unitOfWorkRepositoryStub.getExtractRepository(),
    };
};

describe("Use case - DeleteExpiredExtractsUseCase", () => {
    test("Should delete expired extracts", async () => {
        const { sut, extractRepositoryStub } = makeSut();
        const deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDateSpy =
            jest.spyOn(
                extractRepositoryStub,
                "deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate",
            );

        await sut.execute();

        expect(
            deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDateSpy,
        ).toHaveBeenCalledWith();
    });
});
