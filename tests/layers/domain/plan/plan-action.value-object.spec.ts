import { PlanActionValueObject, InvalidPlanActionError } from "@/layers/domain";

describe("Value Object - PlanActionValueObject", () => {

    test("Should not create PlanActionValueObject, because name is empty", () => {
        const invalidName = "";

        const sut = PlanActionValueObject.create({
          id: "1",
          name: invalidName,
          description: "Valid description",
          createdAt: new Date(),
          updatedAt: new Date()
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should not create PlanActionValueObject, because name has more than 15 characters", () => {
        const invalidName = "a".repeat(16);

        const sut = PlanActionValueObject.create({
          id: "1",
          name: invalidName,
          description: "Valid description",
          createdAt: new Date(),
          updatedAt: new Date()
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should not create PlanActionValueObject, because description is empty", () => {
        const invalidDescription = "";

        const sut = PlanActionValueObject.create({
          id: "1",
          name: "Valid name",
          description: invalidDescription,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should not create PlanActionValueObject, because description has more than 50 characters", () => {
        const invalidDescription = "a".repeat(51);

        const sut = PlanActionValueObject.create({
          id: "1",
          name: "Valid name",
          description: invalidDescription,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should create PlanActionValueObject", () => {
        const validName = "Valid name";
        const validDescription = "Valid description";
      
        const sut = PlanActionValueObject.create({
          id: "1",
          name: validName,
          description: validDescription,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      
        expect(sut).toBeInstanceOf(PlanActionValueObject);
    });
});