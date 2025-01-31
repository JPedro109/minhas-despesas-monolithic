import { SubscriptionEntity, PlanEntity, PlanNameEnum } from "@/layers/domain";

const plan = new PlanEntity({
    name: PlanNameEnum.Gold,
    planExternalId: "1",
    amount: 50,
    description: "Plano GOLD com benefícios exclusivos",
    actions: [
        {
            id: "1",
            name: "Ação 1",
            description: "Descrição da Ação 1",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-06-30"),
        },
        {
            id: "2",
            name: "Ação 2",
            description: "Descrição da Ação 2",
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-07-01"),
        },
    ],
    durationInDays: 30,
});

describe("Entity - Subscription", () => {
    test("Should create SubscriptionEntity", () => {
        const userId = "1";
        const subscriptionExternalId = "1";

        const sut = new SubscriptionEntity({
            userId,
            plan,
            subscriptionExternalId,
        });

        expect(sut).toBeInstanceOf(SubscriptionEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.userId).toBe(userId);
        expect(sut.subscriptionExternalId).toBe(subscriptionExternalId);
        expect(sut.plan).toBeInstanceOf(PlanEntity);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).toBeUndefined();
    });
});
