import { GetUserPaymentMethodDTO, GetUserPaymentMethodResponseDTO } from "@/layers/application";

export interface IGetUserPaymentMethodUseCase {
    execute(dto: GetUserPaymentMethodDTO): Promise<GetUserPaymentMethodResponseDTO | null>
}