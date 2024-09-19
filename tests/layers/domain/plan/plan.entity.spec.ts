import { PlanEntity, DomainError, InvalidPlanNameError, InvalidPlanDescriptionError } from "@/layers/domain";

describe("Entity - Plan", () => {

    test("Should not create PlanEntity, because plan name is not valid", () => {
        const invalidName = "";
        const description = "A valid description";
        const amount = 100;
        const actions = [];
      
        const sut = (): PlanEntity => new PlanEntity({
          name: invalidName, 
          description, 
          amount,
          actions
        });
      
        expect(sut).toThrow(DomainError);
    });

    test("Should not create PlanEntity, because plan description is not valid", () => {
        const name = "Valid Plan";
        const invalidPlanDescription = "";
        const amount = 100;
        const actions = [];

        const sut = (): PlanEntity => new PlanEntity({
          name, 
          description: invalidPlanDescription, 
          amount,
          actions
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create PlanEntity, because plan amount is not valid", () => {
      const name = "Valid Plan";
      const invalidPlanDescription = "";
      const invalidAmount = -100;
      const actions = [];

      const sut = (): PlanEntity => new PlanEntity({
        name, 
        description: invalidPlanDescription, 
        amount: invalidAmount,
        actions
      });

      expect(sut).toThrow(DomainError);
  });

    test("Should not create PlanEntity, because actions are not valid", () => {
        const name = "Valid Plan";
        const description = "A valid description";
        const amount = 100;
        const invalidActions = [{ id: "", name: "", description: "", createdAt: new Date() }];

        const sut = (): PlanEntity => new PlanEntity({
          name, 
          description, 
          amount,
          actions: invalidActions
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should create PlanEntity", () => {
        const name = "Valid Plan";
        const description = "A valid description";
        const amount = 100;
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const sut = new PlanEntity({
          name, 
          description, 
          amount,
          actions
        });

        expect(sut).toBeInstanceOf(PlanEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.name).toBe(name);
        expect(sut.description).toBe(description);
        expect(sut.amount).toBe(amount);
        expect(sut.actions).toEqual(actions);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).toBeUndefined();
    });

    test("Should not update plan name, because it is invalid", () => {
        const name = "Valid Plan";
        const description = "A valid description";
        const amount = 100;
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];
        const plan = new PlanEntity({
          name, 
          description, 
          amount,
          actions
        });

        const sut = (): string => plan.name = "";

        expect(sut).toThrow(InvalidPlanNameError);
    });

    test("Should update plan name", () => {
        const name = "Valid Plan";
        const description = "A valid description";
        const amount = 100;
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];
        const plan = new PlanEntity({
          name, 
          description, 
          amount,
          actions
        });

        plan.name = "Updated Plan";

        expect(plan.name).toBe("Updated Plan");
    });

    test("Should not update plan description, because it is invalid", () => {
        const name = "Valid Plan";
        const description = "A valid description";
        const amount = 100;
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];
        const plan = new PlanEntity({
          name, 
          description, 
          amount,
          actions
        });

        const sut = (): string => plan.description = "";

        expect(sut).toThrow(InvalidPlanDescriptionError);
    });

    test("Should update plan description", () => {
        const name = "Valid Plan";
        const description = "A valid description";
        const amount = 100;
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];
        const plan = new PlanEntity({
          name, 
          description, 
          amount,
          actions
        });

        plan.description = "Updated description";

        expect(plan.description).toBe("Updated description");
    });
});