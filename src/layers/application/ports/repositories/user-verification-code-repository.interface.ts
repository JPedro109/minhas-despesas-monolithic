import { UserVerificationCodeEntity } from "@/layers/domain";

export interface IUserVerificationCodeRepository {
    setContext(context: unknown): void;
    createUserVerificationCode(userVerificationCode: UserVerificationCodeEntity): Promise<UserVerificationCodeEntity>;
    updateUserVerificationCode(userVerificationCode: UserVerificationCodeEntity): Promise<UserVerificationCodeEntity>;
}