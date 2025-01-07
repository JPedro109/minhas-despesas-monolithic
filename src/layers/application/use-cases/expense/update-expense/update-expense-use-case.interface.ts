import { UpdateExpenseDTO } from "@/layers/application";

export interface IUpdateExpenseUseCase {
    execute(dto: UpdateExpenseDTO): Promise<void>;
}
