export class InvalidExpenseDueDateError extends Error {
  constructor() {
    super("A data de vencimento deve ser maior que a data atual");
    this.name = "InvalidExpenseDueDateError";
  }
}