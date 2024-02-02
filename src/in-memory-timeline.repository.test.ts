import { describe, expect, it } from "@jest/globals";
import { TimelineRepository } from "./timeline.repository.js";

class InMemoryTimelineRepository implements TimelineRepository {
    public async store(): Promise<void> {}
}

describe(InMemoryTimelineRepository.name, () => {
    it('should be defined', () => {
        expect(InMemoryTimelineRepository).toBeDefined();
    });

    describe(InMemoryTimelineRepository.prototype.store.name, () => {
        it('should be defined', () => {
            expect(InMemoryTimelineRepository.prototype.store).toBeDefined();
        });
    })
});