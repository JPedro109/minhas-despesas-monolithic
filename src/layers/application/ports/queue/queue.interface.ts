export interface IQueue {
    sendMessage(queue: string, message: object): Promise<void>;
}