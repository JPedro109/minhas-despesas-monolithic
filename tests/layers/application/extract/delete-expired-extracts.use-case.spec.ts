import {
    unitOfWorkRepositoryStub,
    ExtractRepositoryStub,
    extractRepositoryStub
} from "../__mocks__";
import { DeleteExpiredExtractsUseCase } from "@/layers/application";

const makeSut = (): {
    sut: DeleteExpiredExtractsUseCase,
    extractRepositoryStub: ExtractRepositoryStub
} => {
    const sut = new DeleteExpiredExtractsUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        extractRepositoryStub
    };
};

describe("Use case - DeleteExpiredExtractsUseCase", () => {

    test("Should delete expired extracts", async () => {
        const { sut, extractRepositoryStub } = makeSut();
        const deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDateSpy = jest
            .spyOn(extractRepositoryStub, "deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate");

        await sut.execute();

        expect(deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDateSpy).toHaveBeenCalledWith();
    });
});