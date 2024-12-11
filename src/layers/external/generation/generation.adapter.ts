import { IGeneration } from "@/layers/application";

import { randomBytes } from "node:crypto";

export class GenerationAdapter implements IGeneration {

    generateCode(): string {
		return randomBytes(3).toString("hex").toUpperCase();
	}

	generateCodeExpirationDate(): Date {
		const date = new Date();
        date.setMinutes(new Date().getMinutes() + 10);
        return date;
	}
}