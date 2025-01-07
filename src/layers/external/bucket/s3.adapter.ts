import { environmentVariables } from "@/shared";
import { IBucket } from "@/layers/application";

import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3BucketAdapter implements IBucket {
    private readonly s3Client: S3Client;
    private readonly bucketName: string = environmentVariables.awsBucketName;

    constructor() {
        const credential = {
            accessKeyId: environmentVariables.awsAccessKeyId,
            secretAccessKey: environmentVariables.secretAccessKey,
        };
        this.s3Client = new S3Client({
            region: environmentVariables.awsRegion,
            credentials:
                environmentVariables.nodeEnv === "production"
                    ? null
                    : credential,
        });
    }

    async uploadFile(fileName: string, fileContent: Buffer): Promise<string> {
        const putObjectCommand = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
            Body: fileContent,
        });
        await this.s3Client.send(putObjectCommand);

        const getObjectCommand = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
        });
        const url = await getSignedUrl(
            this.s3Client,
            getObjectCommand,
            { expiresIn: 5 * 24 * 60 * 60 }, // 5 days
        );

        return url;
    }
}
