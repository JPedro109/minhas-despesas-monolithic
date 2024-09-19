export class InvalidSubscriptionAmountError extends Error {
    constructor() {
        super("O valor da assinatura não pode ser menor que zero");
        this.name = "InvalidSubscriptionAmountError";
    }
}