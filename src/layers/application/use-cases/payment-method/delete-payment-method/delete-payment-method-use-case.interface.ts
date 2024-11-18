import { DeletePaymentMethodDTO } from "@/layers/application";

export interface IDeletePaymentMethodUseCase {
    execute(dto: DeletePaymentMethodDTO): Promise<void>;
}