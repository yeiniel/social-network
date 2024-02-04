import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { randomUserFactory } from './testing/random-user.factory.js';
import { User } from './user.js';

class PublishMessageToPersonalTimelineController {
    handle(req: Request, res: Response, next: NextFunction) {
        if (!('user' in req)) {
            res.statusCode = 401;
            return next(new Error('Author is missing'));
        }
    }
}

describe(PublishMessageToPersonalTimelineController.name, () => {
    describe(PublishMessageToPersonalTimelineController.prototype.handle.name, () => {
        it('should set response status code to 401 if no author provided', async () => {
            const endpoint = '/api/v1/personal-timeline';
            const controller = new PublishMessageToPersonalTimelineController();

            const app = express();
            app.post(endpoint, controller.handle);

            const res = await request(app).post(endpoint);

            expect(res.status).toBe(401);
        });

        it('should set response status code to 500 if no message provided', async () => {
            const endpoint = '/api/v1/personal-timeline';
            const controller = new PublishMessageToPersonalTimelineController();

            const app = express();
            app.use((req, _, next) => {
                (req as unknown as { user: User }).user = randomUserFactory();
                next();
            });
            app.post(endpoint, controller.handle);

            const res = await request(app).post(endpoint);

            expect(res.status).toBe(500);
            expect(res.text).toContain('Message is missing');
        });
    });
});