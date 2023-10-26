import { User } from "./user.js";
import { Message } from "./message.js";
import { StoreFn } from "./store-fn.js";

export function publishMessageToTimelineInteractorFactory(store: StoreFn) {
    return function publishMessageToTimelineInteractor(author: User, message: Message) {
        return store(author, message);
    };
}
