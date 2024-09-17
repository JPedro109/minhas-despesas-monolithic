export class InvalidPlanActionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidPlanActionError";
    }
}