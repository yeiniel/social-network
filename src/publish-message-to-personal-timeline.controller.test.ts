import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { text } from 'body-parser';
import { PublishMessageToPersonalTimelineUseCase } from './publish-message-to-personal-timeline.use-case.js';
import { User } from './user.js';
import { Message } from './message.js';
import { randomUserFactory } from './testing/random-user.factory.js';
import { randomMessageFactory } from './testing/random-message.factory.js';

class PublishMessageToPersonalTimelineController {
    constructor(private readonly useCase: PublishMessageToPersonalTimelineUseCase) {}

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            if (!('user' in req)) {
                res.statusCode = 401;
                throw new Error('Author is missing');
            }
    
            if (!req.body) {
                throw new Error('Message is missing');
            }

            await this.useCase.execute(req.user, req.body);
            res.end();
        } catch (error) {
            next(error);
        }   
    }
}

describe(PublishMessageToPersonalTimelineController.name, () => {
    let interactor: PublishMessageToPersonalTimelineUseCase;
    let controller: PublishMessageToPersonalTimelineController;
    
    beforeEach(() => {
        interactor = {
            execute: jest.fn<PublishMessageToPersonalTimelineUseCase['execute']>()
                .mockResolvedValue(undefined)
        }
        controller = new PublishMessageToPersonalTimelineController(interactor);
    });

    describe(PublishMessageToPersonalTimelineController.prototype.handle.name, () => {
        let withUser: User;
        let withMessage: Message;

        beforeEach(() => {
            withUser = randomUserFactory();
            withMessage = randomMessageFactory();
        });

        const buildRequest = ({ withUser, withMessage }: { withUser?: User, withMessage?: Message } = {}) => {
            const app = express();
            const endpoint: string = '/personal-timeline';

            if (withUser) {
                app.use((req, _, next) => {
                    (req as unknown as { user: User }).user = withUser;
                    next();
                });
            }

            app.use(text());
            app.post(endpoint, controller.handle.bind(controller));

            let req = request(app).post(endpoint).set('Content-Type', 'text/plain');

            if (withMessage) {
                req = req.send(withMessage);
            }


            return req;
        };

        it('should set response status code to 401 if no author provided', async () => {
            const res = await buildRequest({ withUser: undefined, withMessage });

            expect(res.status).toBe(401);
        });

        it('should set response status code to 500 if no message provided', async () => {
            const res = await buildRequest({ withUser, withMessage: undefined });

            expect(res.status).toBe(500);
            expect(res.text).toContain('Message is missing');
        });

        it('should call interactor.execute with user and message', async () => {
            const res = await buildRequest({ withUser, withMessage });

            expect(res.status).toBe(200);
            expect(interactor.execute).toHaveBeenCalledWith(withUser, withMessage);
        });
    });
});