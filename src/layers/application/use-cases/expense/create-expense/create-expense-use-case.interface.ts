import { CreateExpenseDTO } from "@/layers/application";

export interface ICreateExpenseUseCase {
    execute(dto: CreateExpenseDTO): Promise<string>;
}