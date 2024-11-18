import { UserVerificationCodeEntity } from "@/layers/domain";

export interface IUserVerificationCodeRepository {
    setContext(context: unknown): void;
    createUserVerificationCode(userVerificationCode: UserVerificationCodeEntity): Promise<UserVerificationCodeEntity>;
    getUserVerificationCodeByVerificationCode(verificationCode: string): Promise<UserVerificationCodeEntity | null>;
    updateUserVerificationCodeById(
        userVerificationCodeId : string, 
        userVerificationCode: UserVerificationCodeEntity
    ): Promise<void>;
}