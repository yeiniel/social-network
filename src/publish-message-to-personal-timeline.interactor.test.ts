import { describe, it, expect, jest } from '@jest/globals';
import { User } from './user.js';
import { Message } from './message.js';
import { TimelineRepository } from './timeline.repository.js';

class PublishMessageToPersonalTimelineInteractor {
    constructor(private readonly timelineRepository: TimelineRepository) { }

    public async execute(author: User, message: Message) {
        await this.timelineRepository.store(author, message);
    }
}

describe(PublishMessageToPersonalTimelineInteractor.name, () => {
    describe(PublishMessageToPersonalTimelineInteractor.prototype.execute.name, () => {
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