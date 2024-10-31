import { GetUserExpensesDTO } from "@/layers/application";

export interface IGetUserExpensesUseCase {
    execute(dto: GetUserExpensesDTO): Promise<string>;
}