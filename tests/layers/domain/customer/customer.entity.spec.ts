import { CustomerEntity } from "@/layers/domain";

describe("Entity - Customer", () => {

    test("Should create CustomerEntity", () => {
        const userId = "1";
        const customerId = "1";
        
        const sut = new CustomerEntity({
            userId,
            customerId
        });

        expect(sut).toBeInstanceOf(CustomerEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.userId).toBe(userId);
        expect(sut.customerId).toBe(sut.customerId);
    });
});