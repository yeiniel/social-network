import { beforeEach, describe, expect, it } from "@jest/globals";
import { StoreFn } from "./store-fn.js";
import { User } from "./user.js";
import { Message } from "./message.js";
import { randomUserFactory } from "./random-user.factory.js";
import { randomMessageFactory } from "./random-message.factory.js";

function inMemoryStoreFactory(map: Map<User['id'], Message[]>) {
    return async function(author: User, message: Message) {
        map.get(author.id)!.push(message);
    };
}

describe(inMemoryStoreFactory.name, () => {
    describe("product", () => {
        let map: Map<unknown, Message[]>;
        let store: StoreFn;

        beforeEach(() => {
            map = new Map();
            store = inMemoryStoreFactory(map);
        });

        it("should store message on existing timeline for the author", async () => {
            const author = randomUserFactory();
            const message = randomMessageFactory();
            map.set(author.id, []);

            await store(author, message);

            expect(map.get(author.id)).toContain(message);
        });
    });
});