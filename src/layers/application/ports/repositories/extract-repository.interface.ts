import { ExtractEntity } from "@/layers/domain";

export interface IExtractRepository {
    createExtract(extract: ExtractEntity): Promise<ExtractEntity>;
    updateExtract(extract: ExtractEntity): Promise<ExtractEntity>;
    getExtractsByUserId(userId: string): Promise<ExtractEntity[]>;
    deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate(): Promise<void>;
}