import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { StoreFn } from "./store-fn.js";
import { randomUserFactory } from "./random-user.factory.js";
import { randomMessageFactory } from "./random-message.factory.js";
import { PublishMessageToTimelineInteractor } from "./publish-message-to-timeline.interactor.js";
import { publishMessageToTimelineInteractorFactory } from "./publish-message-to-timeline-interactor.factory.js";

describe(publishMessageToTimelineInteractorFactory.name, () => {
    describe("product", () => {
        let store: jest.Mock<StoreFn>;
        let interactor: PublishMessageToTimelineInteractor;

        beforeEach(() => {
            store = jest.fn<StoreFn>();
            interactor = publishMessageToTimelineInteractorFactory(store);
        });

        it("should return the result of calling store(author, message)", async () => {
            const author = randomUserFactory();
            const message = randomMessageFactory();

            const result = await interactor(author, message);

            expect(store).toBeCalledTimes(1);
            expect(store).toBeCalledWith(author, message);
            expect(store).toReturnWith(result);
        });
    });
});