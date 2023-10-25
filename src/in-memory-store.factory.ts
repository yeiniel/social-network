import { User } from "./user.js";
import { Message } from "./message.js";

export function inMemoryStoreFactory(map: Map<User['id'], Message[]>) {
    return async function (author: User, message: Message) {
        if (!map.has(author.id)) {
            map.set(author.id, []);
        }

        return map.get(author.id)!.push(message);
    };
}
