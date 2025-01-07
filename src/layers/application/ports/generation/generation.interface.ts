export interface IGeneration {
    generateCode(): string;
    generateCodeExpirationDate(): Date;
}
