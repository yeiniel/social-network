import { describe, expect, it } from '@jest/globals';

class PublishMessageToPersonalTimelineController {
    handle() {}
}

describe(PublishMessageToPersonalTimelineController.name, () => {
    describe(PublishMessageToPersonalTimelineController.prototype.handle.name, () => {
        it('should be defined', () => {
            expect((new PublishMessageToPersonalTimelineController()).handle).toBeDefined();
        });
    });
});