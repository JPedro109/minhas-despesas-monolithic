import { CreatePaymentMethodDTO } from "@/layers/application";

export interface ICreatePaymentMethodUseCase {
    execute(dto: CreatePaymentMethodDTO): Promise<string>;
}
