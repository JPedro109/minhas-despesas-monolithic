import {
    GetUserExpensesDTO,
    GetUserExpensesResponseDTO,
} from "@/layers/application";

export interface IGetUserExpensesUseCase {
    execute(dto: GetUserExpensesDTO): Promise<GetUserExpensesResponseDTO[]>;
}
