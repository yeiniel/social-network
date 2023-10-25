import { describe, expect, it } from "@jest/globals";

function inMemoryStoreFactory(_map: Map<unknown, unknown>) {
    return function() {};
}

describe(inMemoryStoreFactory.name, () => {
    it("should be defined", () => {
        expect(inMemoryStoreFactory).toBeDefined();
    });

    it("should return callable when called with Map", () => {
        const map = new Map();

        const store = inMemoryStoreFactory(map);

        expect(typeof store).toBe("function");
    });
});