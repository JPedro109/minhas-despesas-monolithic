import { CreateExtractUseCase, ForbiddenError, NotFoundError } from "@/layers/application";
import { 
    UserRepositoryStub, 
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStubFactory, 
    extractStubFactory,  
    bucketStubFactory,
    ExtractRepositoryStub
} from "../__mocks__";

const makeSut = (): {
    sut: CreateExtractUseCase,
    userRepositoryStub: UserRepositoryStub,
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub,
    extractRepositoryStub: ExtractRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const extractStub = extractStubFactory();
    const bucketStub = bucketStubFactory();
    const sut = new CreateExtractUseCase(unitOfWorkRepositoryStub, extractStub, bucketStub);

    return { 
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        paymentHistoryRepositoryStub: unitOfWorkRepositoryStub.getPaymentHistoryRepository(),
        extractRepositoryStub: unitOfWorkRepositoryStub.getExtractRepository()
    };
};

describe("Use case - CreateExtractUseCase", () => {

    test("Should not create extract because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "3";
        const referenceMonth = 12;
        const referenceYear = 3000;        
        jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);

        const result = sut.execute({
            userId,
            referenceMonth,
            referenceYear
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not create extract because user already has the maximum number of extracts", async () => {
        const { sut } = makeSut();
        const userId = "2";
        const referenceMonth = 12;
        const referenceYear = 3000;        

        const result = sut.execute({
            userId,
            referenceMonth,
            referenceYear
        });

        await expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not create extract because are no payment histories for the given month and year", async () => {
        const { sut, paymentHistoryRepositoryStub, extractRepositoryStub } = makeSut();
        const userId = "1";
        const referenceMonth = 12;
        const referenceYear = 3000;        
        jest.spyOn(paymentHistoryRepositoryStub, "getPaymentHistoriesByUserIdAndDueMonthAndDueYear").mockResolvedValueOnce([]);
        jest.spyOn(extractRepositoryStub, "getExtractsByUserId").mockResolvedValueOnce([]);

        const result = sut.execute({
            userId,
            referenceMonth,
            referenceYear
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should create an extract and generate it with the formatted payment histories", async () => {
        const { sut, extractRepositoryStub } = makeSut();
        const userId = "1";
        const referenceMonth = 12;
        const referenceYear = 3000;
        jest.spyOn(extractRepositoryStub, "getExtractsByUserId").mockResolvedValueOnce([]);

        const result = await sut.execute({
            userId,
            referenceMonth,
            referenceYear
        });

        expect(typeof result).toBe("string");
    });
});