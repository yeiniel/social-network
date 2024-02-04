import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';

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
        it('should be defined', () => {
            expect((new PublishMessageToPersonalTimelineController()).handle).toBeDefined();
        });

        it('should set response status code to 401 if no author provided', async () => {
            const endpoint = '/api/v1/personal-timeline';
            const controller = new PublishMessageToPersonalTimelineController();

            const app = express();
            app.post(endpoint, controller.handle);

            const res = await request(app).post(endpoint);

            expect(res.status).toBe(401);
        });
    });
});