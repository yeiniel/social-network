import { describe, expect, it } from "@jest/globals";
import { TimelineRepository } from "./timeline.repository.js";
import { User } from "./user.js";
import { Message } from "./message.js";

class InMemoryTimelineRepository implements TimelineRepository {
    constructor(private map: Map<User, Message[]>) {}

    public async store(owner: User, message: Message): Promise<void> {
        this.map.set(owner, [message]);
    }
}

describe(InMemoryTimelineRepository.name, () => {
    describe(InMemoryTimelineRepository.prototype.store.name, () => {
        it('should set map entry with key owner to array of first message', async () => {
            const owner: User = 'some-random-author';
            const message: Message = 'some-random-message'; 
            const map = new Map<User, Message[]>();
            const timelineRepository = new InMemoryTimelineRepository(map);

            await timelineRepository.store(owner, message);

            expect(map.get(owner)).toEqual([message]);
        });
    })
});