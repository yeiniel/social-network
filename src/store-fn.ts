import { User } from "./user.js";
import { Message } from "./message.js";

/** Store Message into User Timeline */
export type StoreFn = (author: User, message: Message) => Promise<unknown>;
