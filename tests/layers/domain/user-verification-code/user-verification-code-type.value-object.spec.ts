import { UserVerificationCodeTypeValueObject, InvalidUserVerificationCodeTypeError } from "@/layers/domain";

describe(("Object Value - UserVerificationCodeTypeValueObject"), () => {
    
	test("Should not create user verification code type, because user verification code type is empty" , () => {
		const invalidUserVerificationCodeTypeName = "";

		const sut = UserVerificationCodeTypeValueObject.create({
            id: "1",
            typeName: invalidUserVerificationCodeTypeName,
            createdAt: new Date()
        });

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeTypeError);
	});

	test("Should not create user verification code type, because the user verification code type has more than 6 characters" , () => {
		const invalidUserVerificationCodeTypeName = "c".repeat(16);

		const sut = UserVerificationCodeTypeValueObject.create({
            id: "1",
            typeName: invalidUserVerificationCodeTypeName,
            createdAt: new Date()
        });

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeTypeError);
	});

	test("Should not create user verification code type, because the user verification code type has more than 256 characters" , () => {
		const userVerificationCodeTypeName = "123456";

		const sut = UserVerificationCodeTypeValueObject.create({
            id: "1",
            typeName: userVerificationCodeTypeName,
            createdAt: new Date()
        });

		expect(sut).toBeInstanceOf(UserVerificationCodeTypeValueObject);
	});
});