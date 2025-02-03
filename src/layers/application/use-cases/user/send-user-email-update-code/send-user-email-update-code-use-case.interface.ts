import { SendUserEmailUpdateCodeDTO } from "@/layers/application";

export interface ISendUserEmailUpdateCodeUseCase {
    execute(dto: SendUserEmailUpdateCodeDTO): Promise<void>;
}
