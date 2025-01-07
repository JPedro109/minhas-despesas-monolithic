import { UpdatePaymentMethodTokenDTO } from "@/layers/application";

export interface IUpdatePaymentMethodTokenUseCase {
    execute(dto: UpdatePaymentMethodTokenDTO): Promise<void>;
}
