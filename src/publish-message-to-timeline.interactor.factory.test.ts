import { beforeEach, describe, expect, it, jest } from "@jest/globals";

type User = unknown;
type Message = unknown;
/** Store Message into User Timeline */
type StoreFn = (author: User, message: Message) => Promise<unknown>;
type PublishMessageToTimelineInteractor = (author: User, message: Message) => Promise<unknown>;

function publishMessageToTimelineInteractorFactory(store: StoreFn) {
    return function publishMessageToTimelineInteractor(author: User, message: Message) {
        return store(author, message);
    }
}

describe(publishMessageToTimelineInteractorFactory.name, () => {
    it("should return callable when called with store", () => {
        const store = jest.fn<StoreFn>();

        const interactor = publishMessageToTimelineInteractorFactory(store);

        expect(typeof interactor).toBe("function");
    });

    describe("product", () => {
        let store: jest.Mock<StoreFn>;
        let interactor: PublishMessageToTimelineInteractor;

        beforeEach(() => {
            store = jest.fn<StoreFn>();
            interactor = publishMessageToTimelineInteractorFactory(store);
        });

        it("should return the result of calling store(author, message)", async () => {
            const author = 'Alice';
            const message = 'Hello World!';

            const result = await interactor(author, message);

            expect(store).toBeCalledTimes(1);
            expect(store).toBeCalledWith(author, message);
            expect(store).toReturnWith(result);
        });
    });
});