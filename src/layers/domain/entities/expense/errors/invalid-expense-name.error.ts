export class InvalidExpenseNameError extends Error {
  constructor() {
    super("O nome da despesa deve ter entre 1 e 60 caracteres");
    this.name = "InvalidExpenseNameError";
  }
}