export interface IExtract {
    generateExtract<T>(props: T): Promise<void>;
}