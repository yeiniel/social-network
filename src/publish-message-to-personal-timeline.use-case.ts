import { Message } from "./message.js";
import { User } from "./user.js";

export type PublishMessageToPersonalTimelineUseCase = {
    execute(author: User, message: Message): Promise<unknown>;
};