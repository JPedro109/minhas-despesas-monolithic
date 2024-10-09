import { 
    CryptographyStub,
    CustomerRepositoryStub,
    PaymentStub,
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    UnitOfWorkRepositoryStub,
    UserConsentRepositoryStub,
    UserRepositoryStub,
    UserVerificationCodeRepositoryStub,
    testUserEntity
} from "../__mocks__";
import { DeleteUserUseCase, InvalidParamError, NotFoundError } from "@/layers/application";

const makeSut = (): {
    sut: DeleteUserUseCase,
    userRepositoryStub: UserRepositoryStub,
    customerRepositoryStub: CustomerRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const userRepositoryStub = new UserRepositoryStub();
    const userConsentRepositoryStub = new UserConsentRepositoryStub();
    const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
    const customerRepositoryStub = new CustomerRepositoryStub();
    const planRepositoryStub = new PlanRepositoryStub();
    const subscriptionRepositoryStub = new SubscriptionRepositoryStub();
    const unitOfWorkRepositoryStub = new UnitOfWorkRepositoryStub(
        userRepositoryStub,
        userVerificationCodeRepositoryStub,
        customerRepositoryStub,
        planRepositoryStub,
        subscriptionRepositoryStub,
        userConsentRepositoryStub
    );
    const cryptographyStub = new CryptographyStub();
    const paymentStub = new PaymentStub();
    const sut = new DeleteUserUseCase(unitOfWorkRepositoryStub, cryptographyStub, paymentStub);

    return {
        sut,
        userRepositoryStub,
        customerRepositoryStub,
        cryptographyStub
    };
};

describe("Use case - DeleteUserUseCase", () => {

    test("Should not delete user because passwords do not match", async () => {
        const { sut } = makeSut();
        const deleteUserDTO = {
            id: "1",
            password: "Password1234",
            passwordConfirm: "Password12345"
        };

        const result = sut.execute(deleteUserDTO);

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not delete user because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const deleteUserDTO = {
            id: "2",
            password: "Password1234",
            passwordConfirm: "Password1234"
        };
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute(deleteUserDTO);

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not delete user because password is invalid", async () => {
        const { sut, userRepositoryStub, cryptographyStub } = makeSut();
        const deleteUserDTO = {
            id: "1",
            password: "InvalidPassword",
            passwordConfirm: "InvalidPassword"
        };

        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(Promise.resolve(testUserEntity));
        jest.spyOn(cryptographyStub, "compareHash").mockReturnValueOnce(Promise.resolve(false));

        const result = sut.execute(deleteUserDTO);

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should delete user successfully", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const deleteUserDTO = {
            id: "1",
            password: "Password1234",
            passwordConfirm: "Password1234"
        };
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(Promise.resolve(testUserEntity));

        const result = await sut.execute(deleteUserDTO);

        expect(result).toBe(deleteUserDTO.id);
    });
});