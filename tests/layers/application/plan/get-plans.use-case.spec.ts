import { GetPlansUseCase } from "@/layers/application";
import {
    testPlanGoldEntity,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: GetPlansUseCase;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetPlansUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
    };
};

describe("Use case - GetPlansUseCase", () => {
    test("Should return a list of plans", async () => {
        const { sut } = makeSut();

        const result = await sut.execute();

        expect(result).toEqual([
            {
                planId: testPlanGoldEntity().id,
                planAmount: testPlanGoldEntity().amount,
                planDescription: testPlanGoldEntity().description,
                planName: testPlanGoldEntity().name,
            },
        ]);
    });
});
