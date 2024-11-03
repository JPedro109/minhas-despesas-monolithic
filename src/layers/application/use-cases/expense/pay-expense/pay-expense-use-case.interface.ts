import { PayExpenseDTO } from "@/layers/application";

export interface IPayExpenseUseCase {
    execute(dto: PayExpenseDTO): Promise<string>;
}