import { describe, expect, it } from "@jest/globals";

class InMemoryTimelineRepository {}

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