import { User } from "./user.js";
import { Message } from "./message.js";

export type PublishMessageToTimelineInteractor = (author: User, message: Message) => Promise<unknown>;
