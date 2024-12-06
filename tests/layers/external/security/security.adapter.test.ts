import { environmentVariables } from "@/shared";
import { SecurityAdapter } from "@/layers/external";
import { InvalidJsonWebTokenError } from "@/layers/application";

describe("External - SecurityAdapter", () => {

    beforeAll(() => {
       environmentVariables.jwtKey = "secret";
       environmentVariables.basicAuthenticationUser = "user";
       environmentVariables.basicAuthenticationPassword = "password";
    });

    test("Should create the token jwt | createJsonWebToken", async () => {
        const payload = {
            id: 1
        };
        const expiryTimeInSeconds = 1;
        const sut = new SecurityAdapter();
        jest.spyOn(sut, "createJsonWebToken");

        const result = sut.createJsonWebToken(payload, expiryTimeInSeconds);

        expect(typeof result).toBe("string");
        expect(sut.createJsonWebToken).toHaveBeenCalled();
        expect(sut.createJsonWebToken).toHaveBeenCalledWith(payload, expiryTimeInSeconds);
    });

    test("Should return error | verifyJsonWebToken", async () => {
        const invalidToken = "invalid_token";
        const sut = new SecurityAdapter();
        jest.spyOn(sut, "verifyJsonWebToken");

        const result = (): unknown => sut.verifyJsonWebToken(invalidToken);

        expect(result).toThrow(InvalidJsonWebTokenError);
        expect(sut.verifyJsonWebToken).toHaveBeenCalled();
        expect(sut.verifyJsonWebToken).toHaveBeenCalledWith(invalidToken);
    });

    test("Should verify the token jwt | verifyJsonWebToken", async () => {
        const sut = new SecurityAdapter();
        const payload = { id: 1 };
        const token = sut.createJsonWebToken(payload, 1);
        jest.spyOn(sut, "verifyJsonWebToken");

        const result = sut.verifyJsonWebToken(token);

        expect(typeof result).toBe("object");
        expect(sut.verifyJsonWebToken).toHaveBeenCalled();
        expect(sut.verifyJsonWebToken).toHaveBeenCalledWith(token);
    });

    test("Should return false | verifyBasicAuthenticationCredential", async () => {
        const sut = new SecurityAdapter();

        const credential = Buffer
            .from("error:error")
            .toString("base64");
        jest.spyOn(sut, "verifyBasicAuthenticationCredential");

        const result = sut.verifyBasicAuthenticationCredential(credential);

        expect(result).toBeFalsy();
        expect(sut.verifyBasicAuthenticationCredential).toHaveBeenCalled();
        expect(sut.verifyBasicAuthenticationCredential).toHaveBeenCalledWith(credential);
    });

    test("Should return true | verifyBasicAuthenticationCredential", async () => {
        const sut = new SecurityAdapter();

        const credential = Buffer
            .from(`${environmentVariables.basicAuthenticationUser}:${environmentVariables.basicAuthenticationPassword}`)
            .toString("base64");
        jest.spyOn(sut, "verifyBasicAuthenticationCredential");

        const result = sut.verifyBasicAuthenticationCredential(credential);

        expect(result).toBeTruthy();
        expect(sut.verifyBasicAuthenticationCredential).toHaveBeenCalled();
        expect(sut.verifyBasicAuthenticationCredential).toHaveBeenCalledWith(credential);
    });
});