import { PlanActionValueObject, InvalidPlanActionError } from "@/layers/domain";

describe("Value Object - PlanActionValueObject", () => {

    test("Should not create PlanActionValueObject, because name is empty", () => {
        const id = "1";
        const invalidName = "";
        const description = "Valid description";
        const createdAt = new Date();
        const updatedAt = new Date();

        const sut = PlanActionValueObject.create({
          id,
          name: invalidName,
          description,
          createdAt,
          updatedAt
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should not create PlanActionValueObject, because name has more than 15 characters", () => {
        const id = "1";
        const invalidName = "a".repeat(16);
        const description = "Valid description";
        const createdAt = new Date();
        const updatedAt = new Date();

        const sut = PlanActionValueObject.create({
          id,
          name: invalidName,
          description,
          createdAt,
          updatedAt
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should not create PlanActionValueObject, because description is empty", () => {
        const id = "1";
        const name = "Valid name";
        const invalidDescription = "";
        const createdAt = new Date();
        const updatedAt = new Date();

        const sut = PlanActionValueObject.create({
          id,
          name,
          description: invalidDescription,
          createdAt,
          updatedAt
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should not create PlanActionValueObject, because description has more than 50 characters", () => {
        const id = "1";
        const name = "Valid name";
        const invalidDescription = "a".repeat(51);
        const createdAt = new Date();
        const updatedAt = new Date();

        const sut = PlanActionValueObject.create({
          id,
          name,
          description: invalidDescription,
          createdAt,
          updatedAt
        });

        expect(sut).toBeInstanceOf(InvalidPlanActionError);
    });

    test("Should create PlanActionValueObject", () => {
        const id = "1";
        const name = "Valid name";
        const description = "Valid description";
        const createdAt = new Date();
        const updatedAt = new Date();

        const sut = PlanActionValueObject.create({
          id,
          name,
          description,
          createdAt,
          updatedAt
        }) as unknown as PlanActionValueObject;
      
        expect(sut).toBeInstanceOf(PlanActionValueObject);
        expect(sut.id).not.toBeUndefined();
        expect(sut.name).toBe(name);
        expect(sut.description).toBe(description);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).not.toBeUndefined();
    });
});