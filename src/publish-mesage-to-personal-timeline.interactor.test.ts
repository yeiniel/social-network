import { describe, expect, it } from '@jest/globals';

class PublishMessageToPersonalTimelineInteractor {}

describe(PublishMessageToPersonalTimelineInteractor.name, () => {
    it('should be defined', () => {
        expect(PublishMessageToPersonalTimelineInteractor).toBeDefined();
    });

    describe('execute', () => {
        it('should be defined', () => {
            expect(typeof new PublishMessageToPersonalTimelineInteractor().execute).toBe('function');
        });
    });
});