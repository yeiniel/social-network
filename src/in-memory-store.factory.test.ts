import { beforeEach, describe, expect, it } from "@jest/globals";
import { StoreFn } from "./store-fn.js";
import { User } from "./user.js";
import { Message } from "./message.js";

function inMemoryStoreFactory(map: Map<unknown, Message[]>) {
    return async function(author: User, message: Message) {
        map.get((author as any).id)!.push(message);
    };
}

describe(inMemoryStoreFactory.name, () => {
    it("should return callable when called with Map", () => {
        const map = new Map();

        const store = inMemoryStoreFactory(map);

        expect(typeof store).toBe("function");
    });

    describe("product", () => {
        let map: Map<unknown, Message[]>;
        let store: StoreFn;

        beforeEach(() => {
            map = new Map();
            store = inMemoryStoreFactory(map);
        });

        it("should store message on the array for the author identifier", async () => {
            const author = { id: 'Alice' };
            const message = 'Hello World!';
            map.set(author.id, []);

            await store(author, message);

            expect(map.get(author.id)).toContain(message);
        });
    });
});