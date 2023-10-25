import { afterEach, describe, expect, it, jest } from "@jest/globals";

/** Store Message into User Timeline */
type StoreFn = (...args: unknown[]) => Promise<unknown>;

function publishMessageToTimelineInteractorFactory() {}

describe(publishMessageToTimelineInteractorFactory.name, () => {
    it("should be defined", () => {
        expect(publishMessageToTimelineInteractorFactory).toBeDefined();
    });

    it("should return callable when called with store", () => {
        const store = jest.fn<StoreFn>();

        const interactor = publishMessageToTimelineInteractorFactory(store);

        expect(typeof interactor).toBe("function");
    });
});