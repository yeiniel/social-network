import { describe, it, expect, jest } from '@jest/globals';

type User = unknown;
type Message = unknown;
type TimelineRepository = { store: (author: User, message: Message) => Promise<unknown>; };

class PublishMessageToPersonalTimelineInteractor {
    constructor(private readonly timelineRepository?: TimelineRepository) { }

    public async execute(author: User, message: Message) {
        await this.timelineRepository?.store(author, message);
    }
}

describe(PublishMessageToPersonalTimelineInteractor.name, () => {
    describe(PublishMessageToPersonalTimelineInteractor.prototype.execute.name, () => {
        it('should be of type function', () => {
            expect(typeof (new PublishMessageToPersonalTimelineInteractor()).execute).toBe('function');
        });

        it('should call timelineRepository.store with author and message', async () => {
            const author: User = 'some-random-author';
            const message: Message = 'some-random-message'; 
            const timelineRepository: TimelineRepository = {
                store: jest.fn<TimelineRepository['store']>()
            };
            const interactor = new PublishMessageToPersonalTimelineInteractor(timelineRepository);

            await interactor.execute(author, message);

            expect(timelineRepository.store).toHaveBeenCalledWith(author, message);
        });
    });
});