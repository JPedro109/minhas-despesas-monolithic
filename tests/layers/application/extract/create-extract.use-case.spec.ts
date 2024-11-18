import { CreateExtractUseCase, NotFoundError } from "@/layers/application";
import { 
    UserRepositoryStub, 
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStubFactory, 
    extractStubFactory,  
    bucketStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: CreateExtractUseCase,
    userRepositoryStub: UserRepositoryStub,
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const extractStub = extractStubFactory();
    const bucketStub = bucketStubFactory();
    const sut = new CreateExtractUseCase(unitOfWorkRepositoryStub, extractStub, bucketStub);

    return { 
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        paymentHistoryRepositoryStub: unitOfWorkRepositoryStub.getPaymentHistoryRepository()
    };
};

describe("Use case - CreateExtractUseCase", () => {

    test("Should not create extract because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "2";
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

    test("Should not create extract because are no payment histories for the given month and year", async () => {
        const { sut, paymentHistoryRepositoryStub } = makeSut();
        const userId = "1";
        const referenceMonth = 12;
        const referenceYear = 3000;        
        jest.spyOn(paymentHistoryRepositoryStub, "getPaymentHistoriesByUserIdAndPaymentMonthAndPaymentYear").mockResolvedValueOnce([]);

        const result = sut.execute({
            userId,
            referenceMonth,
            referenceYear
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should create an extract and generate it with the formatted payment histories", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const referenceMonth = 12;
        const referenceYear = 3000;

        const result = await sut.execute({
            userId,
            referenceMonth,
            referenceYear
        });

        expect(result).toBe("1");
    });
});