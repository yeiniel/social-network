import { describe, expect, it } from "@jest/globals";

function inMemoryStoreFactory() {}

describe(inMemoryStoreFactory.name, () => {
    it("should be defined", () => {
        expect(inMemoryStoreFactory).toBeDefined();
    });
});