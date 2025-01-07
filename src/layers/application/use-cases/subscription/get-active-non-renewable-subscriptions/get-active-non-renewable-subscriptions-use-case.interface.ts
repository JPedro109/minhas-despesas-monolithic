import { GetActiveNonRenewableSubscriptionsResponseDTO } from "@/layers/application";

export interface IGetActiveNonRenewableSubscriptionsUseCase {
    execute(): Promise<GetActiveNonRenewableSubscriptionsResponseDTO[]>;
}
