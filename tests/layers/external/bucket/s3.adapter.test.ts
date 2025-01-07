import { S3BucketAdapter } from "@/layers/external";

describe("External - S3BucketAdapter", () => {
    test("Should upload file and return the signed URL | uploadFile", async () => {
        const fileName = "file.txt";
        const fileContent = Buffer.from("content");
        const sut = new S3BucketAdapter();

        const result = await sut.uploadFile(fileName, fileContent);

        expect(typeof result).toBe("string");
    });
});
