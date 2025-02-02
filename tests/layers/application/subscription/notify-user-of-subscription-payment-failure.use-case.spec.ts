import {
    NotFoundError,
    NotifyUserOfSubscriptionPaymentFailureUseCase,
} from "@/layers/application";
import {
    CustomerRepositoryStub,
    NotificationStub,
    unitOfWorkRepositoryStubFactory,
    notificationStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: NotifyUserOfSubscriptionPaymentFailureUseCase;
    customerRepositoryStub: CustomerRepositoryStub;
    notificationStub: NotificationStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const notificationStub = notificationStubFactory();
    const sut = new NotifyUserOfSubscriptionPaymentFailureUseCase(
        unitOfWorkRepositoryStub,
        notificationStub,
    );

    return {
        sut,
        customerRepositoryStub:
            unitOfWorkRepositoryStub.getCustomerRepository(),
        notificationStub,
    };
};

describe("Use case - NotifyUserOfSubscriptionPaymentFailureUseCase", () => {
    test("Should not notify because customer does not exist", async () => {
        const customerId = "2";
        const { sut, customerRepositoryStub } = makeSut();
        jest.spyOn(
            customerRepositoryStub,
            "getCustomerByCustomerId",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ customerId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should send notification successfully when customer and user exist", async () => {
        const customerId = "1";
        const { sut, notificationStub } = makeSut();
        const sendEmailSpy = jest.spyOn(notificationStub, "sendEmail");

        await sut.execute({ customerId });

        expect(sendEmailSpy).toHaveBeenCalled();
    });
});
