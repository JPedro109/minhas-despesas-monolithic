import { ExtractEntity } from "@/layers/domain";

export interface IExtractRepository {
    setContext(context: unknown): void;    
    createExtract(extract: ExtractEntity): Promise<ExtractEntity>;
    getExtractById(id: string): Promise<ExtractEntity>;
    getExtractsByUserId(userId: string): Promise<ExtractEntity[]>;
    deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate(): Promise<void>;
}