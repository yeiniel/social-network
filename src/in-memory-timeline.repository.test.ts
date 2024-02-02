import { describe, expect, it } from "@jest/globals";

class InMemoryTimelineRepository {}

describe(InMemoryTimelineRepository.name, () => {
    it('should be defined', () => {
        expect(InMemoryTimelineRepository).toBeDefined();
    });
});