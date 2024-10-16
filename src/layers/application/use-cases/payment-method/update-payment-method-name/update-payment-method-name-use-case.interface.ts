import { UpdatePaymentMethodNameDTO } from "@/layers/application";

export interface IUpdatePaymentMethodNameUseCase {
    execute(dto: UpdatePaymentMethodNameDTO): Promise<string>;
}