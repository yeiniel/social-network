import { beforeEach, describe, expect, it } from "@jest/globals";
import { StoreFn } from "./store-fn.js";
import { User } from "./user.js";
import { Message } from "./message.js";
import { randomUserFactory } from "./random-user.factory.js";
import { randomMessageFactory } from "./random-message.factory.js";

function inMemoryStoreFactory(map: Map<User['id'], Message[]>) {
    return async function(author: User, message: Message) {
        if (!map.has(author.id)) {
            map.set(author.id, []);
        }

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

        async function testStoreShouldStoreMessageOnArrayForAuthorIdentifier(createArray: boolean) {
            const author = randomUserFactory();
            const message = randomMessageFactory();
            if (createArray) {
                map.set(author.id, []);
            }
            
            await store(author, message);

            expect(map.get(author.id)).toContain(message);
        }

        it("should store message on existing timeline for the author", testStoreShouldStoreMessageOnArrayForAuthorIdentifier.bind(undefined, true));

        it("should store message on created timeline for the author", testStoreShouldStoreMessageOnArrayForAuthorIdentifier.bind(undefined, false));
    });
});