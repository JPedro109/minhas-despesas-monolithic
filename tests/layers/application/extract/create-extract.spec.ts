import { CreateExtract, NotFoundError } from "@/layers/application";
import { 
    UserRepositoryStub, 
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStub, 
    userRepositoryStub, 
    extractStub,  
    paymentHistoryRepositoryStub 
} from "../__mocks__";

const makeSut = (): {
    sut: CreateExtract,
    userRepositoryStub: UserRepositoryStub,
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub
} => {
    const sut = new CreateExtract(unitOfWorkRepositoryStub, extractStub);
    return { 
        sut,
        userRepositoryStub,
        paymentHistoryRepositoryStub
    };
};

describe("Use case - CreateExtract", () => {

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

        expect(result).rejects.toThrow(NotFoundError);
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

        expect(result).rejects.toThrow(NotFoundError);
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