import { ExpenseExtractProps } from "./extract.types";

export interface IExtract {
    generateExpensesExtract(props: ExpenseExtractProps): Promise<Buffer>;
}