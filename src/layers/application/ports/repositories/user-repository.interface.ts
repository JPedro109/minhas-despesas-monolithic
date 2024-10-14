import { UserEntity } from "@/layers/domain";

export interface IUserRepository {
    setContext(context: unknown): void;    
    createUser(user: UserEntity): Promise<UserEntity>;
    getUserById(id: string): Promise<UserEntity | null>;
    getUserByEmail(email: string): Promise<UserEntity| null>;
    updateUserById(id: string, user: UserEntity): Promise<UserEntity>;
    deleteUserById(id: string): Promise<UserEntity>;
}