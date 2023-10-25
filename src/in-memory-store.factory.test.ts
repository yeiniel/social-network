import { beforeEach, describe, expect, it } from "@jest/globals";
import { StoreFn } from "./store-fn.js";

function inMemoryStoreFactory(_map: Map<unknown, unknown>) {
    return function() {};
}

describe(inMemoryStoreFactory.name, () => {
    it("should return callable when called with Map", () => {
        const map = new Map();

        const store = inMemoryStoreFactory(map);

        expect(typeof store).toBe("function");
    });

    describe("product", () => {
        let map: Map<unknown, unknown>;
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