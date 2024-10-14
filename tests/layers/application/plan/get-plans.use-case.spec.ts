import { unitOfWorkRepositoryStub } from "../__mocks__";
import { GetPlansUseCase } from "@/layers/application";
import { PlanNameEnum } from "@/layers/domain";

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
            { planId: "1", planAmount: 50, planDescription: "Plano GOLD com benefícios exclusivos", planName: PlanNameEnum.Free }
        ]);
    });
});