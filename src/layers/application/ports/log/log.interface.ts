export interface ILog {
    trace(message: string, trace: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(message: string, error: Error): void;
}