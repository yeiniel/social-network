import { describe, it, expect, jest } from '@jest/globals';
import { User } from './user.js';
import { Message } from './message.js';
import { PublishMessageToPersonalTimelineUseCase } from './publish-message-to-personal-timeline.use-case.js';
import { TimelineRepository } from './timeline.repository.js';
import { randomUserFactory } from './testing/random-user.factory.js';
import { randomMessageFactory } from './testing/random-message.factory.js';

class PublishMessageToPersonalTimelineInteractor implements PublishMessageToPersonalTimelineUseCase {
    constructor(private readonly timelineRepository: TimelineRepository) { }

    public async execute(author: User, message: Message) {
        await this.timelineRepository.store(author, message);
    }
}

describe(PublishMessageToPersonalTimelineInteractor.name, () => {
    describe(PublishMessageToPersonalTimelineInteractor.prototype.execute.name, () => {
        it('should call timelineRepository.store with author and message', async () => {
            const author = randomUserFactory();
            const message = randomMessageFactory(); 
            const timelineRepository: TimelineRepository = {
                store: jest.fn<TimelineRepository['store']>()
            };
            const interactor = new PublishMessageToPersonalTimelineInteractor(timelineRepository);

            await interactor.execute(author, message);

            expect(timelineRepository.store).toHaveBeenCalledWith(author, message);
        });
    });
});