import { PlanEntity, DomainError, PlanNameEnum } from "@/layers/domain";

describe("Entity - Plan", () => {
    test("Should not create PlanEntity, because plan name is not valid", () => {
        const invalidName = "" as PlanNameEnum;
        const planExternalId = "A valid description";
        const description = "A valid description";
        const amount = 100;
        const durationInDays = 1;
        const actions = [];

        const sut = (): PlanEntity =>
            new PlanEntity({
                name: invalidName,
                planExternalId,
                description,
                amount,
                actions,
                durationInDays,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create PlanEntity, because plan description is not valid", () => {
        const name = PlanNameEnum.Gold;
        const planExternalId = "A valid description";
        const invalidPlanDescription = "";
        const amount = 100;
        const durationInDays = 1;
        const actions = [];

        const sut = (): PlanEntity =>
            new PlanEntity({
                name,
                planExternalId,
                description: invalidPlanDescription,
                amount,
                actions,
                durationInDays,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create PlanEntity, because plan amount is not valid", () => {
        const name = PlanNameEnum.Gold;
        const planExternalId = "A valid description";
        const invalidPlanDescription = "";
        const invalidAmount = -100;
        const durationInDays = 1;
        const actions = [];

        const sut = (): PlanEntity =>
            new PlanEntity({
                name,
                planExternalId,
                description: invalidPlanDescription,
                amount: invalidAmount,
                actions,
                durationInDays,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should create PlanEntity", () => {
        const name = PlanNameEnum.Gold;
        const planExternalId = "1";
        const description = "A valid description";
        const amount = 100;
        const durationInDays = 1;
        const actions = [
            {
                id: "1",
                name: "Action 1",
                description: "Action description",
                createdAt: new Date(),
            },
        ];

        const sut = new PlanEntity({
            name,
            planExternalId: "1",
            description,
            amount,
            actions,
            durationInDays,
        });

        expect(sut).toBeInstanceOf(PlanEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.planExternalId).toBe(planExternalId);
        expect(sut.name).toBe(name);
        expect(sut.description).toBe(description);
        expect(sut.amount).toBe(amount);
        expect(sut.durationInDays).toBe(durationInDays);
        expect(sut.actions).toEqual(actions);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).toBeUndefined();
    });
});
