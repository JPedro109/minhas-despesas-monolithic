import { databaseSQLHelper } from "@/main/factories/external";
import { setupServer } from "@/main/setup-server";

import request from "supertest";
import { Seed } from "./seed";

export const setup = (): void => {
	const mockRepository = new Seed(databaseSQLHelper);

	beforeAll(async () => {
		await databaseSQLHelper.connect();
	});

	afterAll(async () => {
		await databaseSQLHelper.disconnect();
	});
    
	beforeEach(async () => {
		await mockRepository.populate();
	});

	afterEach(async () => {
		await mockRepository.truncate();
	});
};

export const loginRest = async (email: string): Promise<{ accessToken: string; refreshToken: string }> => {
	return (await request(setupServer())
		.post("/api/users/login")
		.send({
			email,
			password: "Password1234"
		})).body;
};