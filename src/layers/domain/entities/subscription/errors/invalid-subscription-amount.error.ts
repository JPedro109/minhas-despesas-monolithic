import { DomainError } from "@/layers/domain";

export class InvalidSubscriptionAmountError extends DomainError {
    constructor() {
        super("O valor da assinatura não pode ser menor que zero");
        this.name = "InvalidSubscriptionAmountError";
    }
}
