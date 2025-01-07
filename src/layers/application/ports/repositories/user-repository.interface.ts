import { UserEntity } from "@/layers/domain";

export interface IUserRepository {
    setContext(context: unknown): void;
    createUser(user: UserEntity): Promise<UserEntity>;
    getUserById(id: string): Promise<UserEntity | null>;
    getUsersByIds(ids: string[]): Promise<UserEntity[]>;
    getUserByEmail(email: string): Promise<UserEntity | null>;
    updateUserById(id: string, user: UserEntity): Promise<void>;
    deleteUserById(id: string): Promise<void>;
}
