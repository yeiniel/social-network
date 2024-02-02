import { beforeEach, describe, expect, it } from "@jest/globals";
import { TimelineRepository } from "./timeline.repository.js";
import { User } from "./user.js";
import { Message } from "./message.js";

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
    let map: ConstructorParameters<typeof InMemoryTimelineRepository>[0];
    let repository: InMemoryTimelineRepository;

    beforeEach(() => {
        map = new Map<User, Message[]>();
        owner = 'some-random-author';
        repository = new InMemoryTimelineRepository(map);
    });

    describe(InMemoryTimelineRepository.prototype.store.name, () => {
        it('should set map entry with key owner to array of first message', async () => {
            const message: Message = 'some-random-message'; 

            await repository.store(owner, message);

            expect(map.get(owner)).toEqual([message]);
        });

        it('should update map entry with key owner and append additional message', async () => {
            const initialMessage: Message = 'some-initial-message';
            const additionalMessage: Message = 'some-additional-message'; 
            map.set(owner, [initialMessage]);

            await repository.store(owner, additionalMessage);

            expect(map.get(owner)).toEqual([initialMessage, additionalMessage]);
        });
    })
});