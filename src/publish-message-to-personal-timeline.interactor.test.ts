import { describe, it, expect } from '@jest/globals';

class PublishMessageToPersonalTimelineInteractor {}

describe(PublishMessageToPersonalTimelineInteractor.name, () => {
    it('should be defined', () => {
        expect(PublishMessageToPersonalTimelineInteractor).toBeDefined();
    });

    describe(PublishMessageToPersonalTimelineInteractor.prototype.execute.name, () => {
        it('should be of type function', () => {
            expect(typeof (new PublishMessageToPersonalTimelineInteractor()).execute).toBe('function');
        });
    });
});