import { GetUserPaymentMethodDTO, GetUserPaymentMethodResponseDTO } from "@/layers/application";

export interface IGetUserPaymentMethod {
    execute(dto: GetUserPaymentMethodDTO): Promise<GetUserPaymentMethodResponseDTO | null>
}