import { beforeEach, describe, expect, it } from "@jest/globals";
import { TimelineRepository } from "./timeline.repository.js";
import { User } from "./user.js";
import { Message } from "./message.js";
import { randomUserFactory } from "./testing/random-user.factory.js";
import { randomMessageFactory } from "./testing/random-message.factory.js";

class InMemoryTimelineRepository implements TimelineRepository {
    constructor(private map: Map<User, Message[]>) {}

    public async store(owner: User, message: Message): Promise<void> {
        if (!this.map.has(owner)) {
            this.map.set(owner, []);
        }

        this.map.get(owner)!.push(message);
    }
}

describe(InMemoryTimelineRepository.name, () => {
    let owner: Parameters<TimelineRepository['store']>[0];
    let messageToStore: Parameters<TimelineRepository['store']>[1];
    let map: ConstructorParameters<typeof InMemoryTimelineRepository>[0];
    let repository: InMemoryTimelineRepository;

    const expectToAddMessageToOwnerArray = async (
        message: Message
    ) => {
        const initial = map.has(owner) ? [...map.get(owner)!] : [];

        await repository.store(owner, message);

        expect(map.get(owner)).toEqual([...initial, message]);
    };

    beforeEach(() => {
        owner = randomUserFactory();
        messageToStore = randomMessageFactory();
        map = new Map<User, Message[]>();
        repository = new InMemoryTimelineRepository(map);
    });

    describe(InMemoryTimelineRepository.prototype.store.name, () => {
        it('should set map entry with key owner to array of first message', () => expectToAddMessageToOwnerArray(messageToStore));

        it('should update map entry with key owner and append additional message', async () => {
            const initialMessage = randomMessageFactory();
            map.set(owner, [initialMessage]);

            await expectToAddMessageToOwnerArray(messageToStore);
        });
    })
});