import { describe, expect, it } from "@jest/globals";

function applicationFactory() {}

describe(applicationFactory.name, () => {
    it("should be defined", () => {
        expect(applicationFactory).toBeDefined();
    });
});