import { testPlanFreeEntity, unitOfWorkRepositoryStub } from "../__mocks__";
import { GetPlansUseCase } from "@/layers/application";

const makeSut = (): {
    sut: GetPlansUseCase
} => {
    const sut = new GetPlansUseCase(unitOfWorkRepositoryStub);
    return {
        sut
    };
};

describe("Use case - GetPlansUseCase", () => {
    test("Should return a list of plans", async () => {
        const { sut } = makeSut();
        
        const result = await sut.execute();
        
        expect(result).toEqual([
            { 
                planId: testPlanFreeEntity().id, 
                planAmount: testPlanFreeEntity().amount, 
                planDescription: testPlanFreeEntity().description, 
                planName: testPlanFreeEntity().name
            }
        ]);
    });
});