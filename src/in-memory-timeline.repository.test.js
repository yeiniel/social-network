import { describe, expect, it } from "@jest/globals";
import { InMemoryTimelineRepository } from "./in-memory-timeline.repository";

describe(InMemoryTimelineRepository.name, () => {
    it('should store first message in new array', async () => {
        const owner = `some-user-${Math.round(Math.random() * 1000)}`;
        const message = `some-message-${Math.round(Math.random() * 1000)}`;

        const repository = new InMemoryTimelineRepository()
        
        await repository.store(owner, message);

        expect(repository._dataFor(owner)).toEqual([message]);
    });
});