import { describe, expect, it } from "@jest/globals";

describe(applicationFactory.name, () => {
    it("should be defined", () => {
        expect(applicationFactory).toBeDefined();
    });
});