import { describe, expect, it } from '@jest/globals';

class PublishMessageToPersonalTimelineController {}

describe(PublishMessageToPersonalTimelineController.name, () => {
    it('should be defined', () => {
        expect(PublishMessageToPersonalTimelineController).toBeDefined();
    });

    describe(PublishMessageToPersonalTimelineController.prototype.handle.name, () => {
        it('should be defined', () => {
            expect((new PublishMessageToPersonalTimelineController()).handle).toBeDefined();
        });
    });
});