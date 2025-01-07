export interface IBucket {
    uploadFile(fileName: string, fileContent: Buffer): Promise<string>;
}
