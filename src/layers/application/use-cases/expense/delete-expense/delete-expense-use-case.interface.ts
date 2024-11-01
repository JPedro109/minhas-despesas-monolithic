import { DeleteExpenseDTO } from "@/layers/application";

export interface IDeleteExpenseUseCase {
    execute(dto: DeleteExpenseDTO): Promise<string>;
}