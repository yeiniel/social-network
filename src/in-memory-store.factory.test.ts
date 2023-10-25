import { beforeEach, describe, expect, it } from "@jest/globals";
import { StoreFn } from "./store-fn.js";
import { Message } from "./message.js";
import { randomUserFactory } from "./random-user.factory.js";
import { randomMessageFactory } from "./random-message.factory.js";
import { inMemoryStoreFactory } from "./in-memory-store.factory.js";

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