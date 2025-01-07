import { environmentVariables } from "@/shared";
import { IQueue } from "@/layers/application";

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export class SQSAdapter implements IQueue {
    private readonly client: SQSClient;

    constructor() {
        const credential = {
            accessKeyId: environmentVariables.awsAccessKeyId,
            secretAccessKey: environmentVariables.secretAccessKey,
        };
        this.client = new SQSClient({
            region: environmentVariables.awsRegion,
            credentials:
                environmentVariables.nodeEnv === "production"
                    ? null
                    : credential,
        });
    }

    async sendMessage(queue: string, message: object): Promise<void> {
        const command = new SendMessageCommand({
            QueueUrl: queue,
            MessageBody: JSON.stringify(message),
        });
        await this.client.send(command);
    }
}
