import { SubscriptionEntity, DomainError } from "@/layers/domain";

describe("Entity - Subscription", () => {

	test("Should not create subscription, because endDate is before startDate", () => {
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2023-12-31");

		const sut = (): SubscriptionEntity => new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: true,
			startDate: startDate,
			endDate: endDate,
			createdAt: new Date(),
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create subscription", () => {
		const startDate = new Date("2024-01-01");
		const endDate = new Date("2024-12-31");

		const sut = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: true,
			startDate: startDate,
			endDate: endDate,
			createdAt: new Date(),
		});

		expect(sut).toBeInstanceOf(SubscriptionEntity);
	});

	test("Should not update active status, because it is already true", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: false,
			renewable: true,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		const sut = (): boolean => subscription.active = false;

		expect(sut).toThrow(DomainError);
	});

	test("Should not update active status, because it is already true", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: true,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		const sut = (): boolean => subscription.active = true;

		expect(sut).toThrow(DomainError);
	});

	test("Should update active status", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: false,
			renewable: true,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		subscription.active = true;

		expect(subscription.active).toBeTruthy();
	});

	test("Should not update renewable status, because it is already false", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: false,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		const sut = (): boolean => subscription.renewable = false;

		expect(sut).toThrow(DomainError);
	});


	test("Should not update renewable status, because it is already true", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: true,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		const sut = (): boolean => subscription.renewable = true;

		expect(sut).toThrow(DomainError);
	});

	test("Should update renewable status", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: false,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		subscription.renewable = true;

		expect(subscription.renewable).toBeTruthy();
	});

	test("Should update updatedAt date", () => {
		const subscription = new SubscriptionEntity({
			userId: "user123",
			planId: "plan123",
			active: true,
			renewable: true,
			startDate: new Date("2024-01-01"),
			endDate: new Date("2024-12-31"),
			createdAt: new Date(),
		});

		const newUpdatedAt = new Date("2024-09-01");
		subscription.updatedAt = newUpdatedAt;

		expect(subscription.updatedAt).toBe(newUpdatedAt);
	});
});