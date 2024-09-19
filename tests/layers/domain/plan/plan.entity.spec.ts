import { PlanEntity, DomainError, InvalidPlanNameError, InvalidPlanDescriptionError } from "@/layers/domain";

describe("Entity - Plan", () => {

    test("Should not create plan, because plan name is not valid", () => {
        const invalidPlanName = "";
        const planDescription = "A valid description";
        const actions = [];
      
        const sut = (): PlanEntity => new PlanEntity({
          name: invalidPlanName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });
      
        expect(sut).toThrow(DomainError);
    });

    test("Should not create plan, because plan description is not valid", () => {
        const planName = "Valid Plan";
        const invalidPlanDescription = "";
        const actions = [];

        const sut = (): PlanEntity => new PlanEntity({
          name: planName, 
          description: invalidPlanDescription, 
          actions,
          createdAt: new Date()
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create plan, because actions are invalid", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const invalidActions = [{ id: "", name: "", description: "", createdAt: new Date() }];

        const sut = (): PlanEntity => new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions: invalidActions,
          createdAt: new Date()
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should create plan", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const sut = new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });

        expect(sut).toBeInstanceOf(PlanEntity);
    });

    test("Should not update plan name, because name is invalid", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const plan = new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });

        const sut = (): string => plan.name = "";

        expect(sut).toThrow(InvalidPlanNameError);
    });

    test("Should update plan name", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const plan = new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });

        plan.name = "Updated Plan";

        expect(plan.name).toBe("Updated Plan");
    });

    test("Should not update plan description, because description is invalid", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const plan = new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });

        const sut = (): string => plan.description = "";

        expect(sut).toThrow(InvalidPlanDescriptionError);
    });

    test("Should update plan description", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const plan = new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });

        plan.description = "Updated description";

        expect(plan.description).toBe("Updated description");
    });

    test("Should update createdAt date", () => {
        const planName = "Valid Plan";
        const planDescription = "A valid description";
        const actions = [{ id: "1", name: "Action 1", description: "Action description", createdAt: new Date() }];

        const plan = new PlanEntity({
          name: planName, 
          description: planDescription, 
          actions,
          createdAt: new Date()
        });
      
        const newDate = new Date();
        plan.updatedAt = newDate;
      
        expect(plan.updatedAt).toBe(newDate);
    });
});