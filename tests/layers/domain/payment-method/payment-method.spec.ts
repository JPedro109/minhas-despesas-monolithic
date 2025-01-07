import { PaymentMethodEntity } from "@/layers/domain";

describe("Entity - PaymentMethod", () => {
    test("Should create PaymentMethodEntity", () => {
        const userId = "1";
        const name = "Card One";
        const token = "card_one_1";
        const updatedAt = new Date();

        const sut = new PaymentMethodEntity({
            userId,
            name,
            token,
            updatedAt,
        });

        expect(sut).toBeInstanceOf(PaymentMethodEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.userId).toBe(userId);
        expect(sut.name).toBe(name);
        expect(sut.token).toBe(token);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).not.toBeUndefined();
    });

    test("Should update name", () => {
        const userId = "1";
        const name = "Updated Card One";
        const token = "card_one_1";
        const updatedAt = new Date();
        const paymentMethod = new PaymentMethodEntity({
            userId,
            name,
            token,
            updatedAt,
        });

        paymentMethod.name = name;

        expect(paymentMethod.name).toBe(name);
    });
});
