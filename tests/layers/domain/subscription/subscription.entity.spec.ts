import { SubscriptionEntity, DomainError, PlanEntity, PlanNameEnum } from "@/layers/domain";

const plan = new PlanEntity(
	{
        name: PlanNameEnum.Free,
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
		durationInDays: 30
	}
);

describe("Entity - Subscription", () => {

	test("Should not create SubscriptionEntity, because endDate is before startDate", () => {
		const userId = "user123";
		const amount = 100;
		const active = true;
		const renewable = true;
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2023-12-31");

		const sut = (): SubscriptionEntity => new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate,
			endDate
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should not create SubscriptionEntity, because amount is less than zero", () => {
		const userId = "user123";
		const invalidAmount = -1;
		const active = true;
		const renewable = true;
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2024-12-01");

		const sut = (): SubscriptionEntity => new SubscriptionEntity({
			userId,
			plan,
			amount: invalidAmount,
			active,
			renewable,
			startDate,
			endDate
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create SubscriptionEntity", () => {
		const userId = "user123";
		const amount = 100;
		const active = true;
		const renewable = true;
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2024-12-31");

		const sut = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate,
			endDate
		});

		expect(sut).toBeInstanceOf(SubscriptionEntity);
		expect(sut.id).not.toBeUndefined();
		expect(sut.userId).toBe(userId);
		expect(sut.plan).toBeInstanceOf(PlanEntity);
		expect(sut.amount).toBe(amount);
		expect(sut.active).toBe(active);
		expect(sut.renewable).toBe(renewable);
		expect(sut.createdAt).not.toBeUndefined();
		expect(sut.updatedAt).toBeUndefined();
	});

	test("Should not update active status, because it is already false", () => {
		const userId = "user123";
		const amount = 100;
		const active = false;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		const sut = (): boolean => subscription.active = false;

		expect(sut).toThrow(DomainError);
	});

	test("Should not update active status, because it is already true", () => {
		const userId = "user123";
		const amount = 100;
		const active = true;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		const sut = (): boolean => subscription.active = true;

		expect(sut).toThrow(DomainError);
	});

	test("Should update active status", () => {
		const userId = "user123";
		const amount = 100;
		const active = false;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		subscription.active = true;

		expect(subscription.active).toBeTruthy();
	});

	test("Should not update renewable status, because it is already false", () => {
		const userId = "user123";
		const amount = 100;
		const active = true;
		const renewable = false;
		const subscription = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		const sut = (): boolean => subscription.renewable = false;

		expect(sut).toThrow(DomainError);
	});


	test("Should not update renewable status, because it is already true", () => {
		const userId = "user123";
		const amount = 100;
		const active = true;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		const sut = (): boolean => subscription.renewable = true;

		expect(sut).toThrow(DomainError);
	});

	test("Should update renewable status", () => {
		const userId = "user123";
		const amount = 100;
		const active = true;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			plan,
			amount,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		subscription.renewable = false;

		expect(subscription.renewable).toBeFalsy();
	});
});