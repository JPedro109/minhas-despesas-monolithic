import { 
    ExtractRepositoryStub,
    unitOfWorkRepositoryStub, 
    extractRepositoryStub
} from "../__mocks__";
import { InvalidExtractUrlError } from "@/layers/domain";
import { NotFoundError, UpdateExtractUrl } from "@/layers/application";

const makeSut = (): {
    sut: UpdateExtractUrl,
    extractRepositoryStub: ExtractRepositoryStub
} => {
    const sut = new UpdateExtractUrl(unitOfWorkRepositoryStub);
    return { 
        sut,
        extractRepositoryStub
    };
};

describe("Use case - UpdateExtractUrl", () => {

    test("Should not update extract url because extract is not exists", async () => {
        const { sut } = makeSut();
        const id = "2";
        const url = "https://www.example.coms";
        jest.spyOn(extractRepositoryStub, "getExtractById").mockResolvedValueOnce(null);

        const result = sut.execute({
            id,
            url
        });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not update extract url because url is invalid", async () => {
        const { sut } = makeSut();
        const id = "1";
        const url = "htp://invalid-url";

        const result = sut.execute({
            id,
            url
        });

        expect(result).rejects.toThrow(InvalidExtractUrlError);
    });

    test("Should update extract url", async () => {
        const { sut } = makeSut();
        const id = "1";
        const url = "https://www.example.com";

        const result = await sut.execute({
            id,
            url
        });

        expect(result).toBe("1");
    });
});