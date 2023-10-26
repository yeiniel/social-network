import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { User } from "./user.js";
import { Message } from "./message.js";
import { StoreFn } from "./store-fn.js";
import { randomUserFactory } from "./random-user.factory.js";
import { randomMessageFactory } from "./random-message.factory.js";
import { PublishMessageToTimelineInteractor } from "./publish-message-to-timeline.interactor.js";

function publishMessageToTimelineInteractorFactory(store: StoreFn) {
    return function publishMessageToTimelineInteractor(author: User, message: Message) {
        return store(author, message);
    }
}

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