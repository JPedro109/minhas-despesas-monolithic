import { SendUserEmailUpdateLinkDTO } from "@/layers/application";

export interface ISendUserEmailUpdateLinkUseCase {
    execute(dto: SendUserEmailUpdateLinkDTO): Promise<void>;
}
