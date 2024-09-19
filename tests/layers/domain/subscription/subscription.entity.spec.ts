import { SubscriptionEntity, DomainError } from "@/layers/domain";

describe("Entity - Subscription", () => {

	test("Should not create SubscriptionEntity, because endDate is before startDate", () => {
		const userId = "user123";
		const planId = "plan123";
		const active = true;
		const renewable = true;
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2023-12-31");

		const sut = (): SubscriptionEntity => new SubscriptionEntity({
			userId,
			planId,
			active,
			renewable,
			startDate,
			endDate
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create SubscriptionEntity", () => {
		const userId = "user123";
		const planId = "plan123";
		const active = true;
		const renewable = true;
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2024-12-31");

		const sut = new SubscriptionEntity({
			userId,
			planId,
			active,
			renewable,
			startDate,
			endDate
		});

		expect(sut).toBeInstanceOf(SubscriptionEntity);
		expect(sut.id).not.toBeUndefined();
		expect(sut.userId).toBe(userId);
		expect(sut.planId).toBe(planId);
		expect(sut.active).toBe(active);
		expect(sut.renewable).toBe(renewable);
		expect(sut.createdAt).not.toBeUndefined();
		expect(sut.updatedAt).toBeUndefined();
	});

	test("Should not update active status, because it is already false", () => {
		const userId = "user123";
		const planId = "plan123";
		const active = false;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			planId,
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
		const planId = "plan123";
		const active = true;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			planId,
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
		const planId = "plan123";
		const active = false;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			planId,
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
		const planId = "plan123";
		const active = true;
		const renewable = false;
		const subscription = new SubscriptionEntity({
			userId,
			planId,
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
		const planId = "plan123";
		const active = true;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			planId,
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
		const planId = "plan123";
		const active = true;
		const renewable = true;
		const subscription = new SubscriptionEntity({
			userId,
			planId,
			active,
			renewable,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31")
		});

		subscription.renewable = false;

		expect(subscription.renewable).toBeFalsy();
	});
});