import { describe, expect, it } from "@jest/globals";

describe(inMemoryStoreFactory.name, () => {
    it("should be defined", () => {
        expect(inMemoryStoreFactory).toBeDefined();
    });
});