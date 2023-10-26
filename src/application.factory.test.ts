import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
jest.mock("express");
jest.mock("express-openid-connect");
import request from "supertest";
import express, { NextFunction, Request } from "express";
import { auth } from "express-openid-connect";
import { randomMessageFactory } from "./random-message.factory.js";
import { User } from "./user.js";
import { randomUserFactory } from "./random-user.factory.js";
import { PublishMessageToTimelineInteractor } from "./publish-message-to-timeline.interactor.js";

class MessageRequiredError extends Error {
    constructor() {
        super("Message is required");
    }
}

function applicationFactory(authMiddlewareFactory = auth, urlencodedMiddlewareFactory = express.urlencoded, expressFactory = express) {
    const app = expressFactory();

    app.use(authMiddlewareFactory());
    app.use(urlencodedMiddlewareFactory());

    app.route("/compose")
        .post((req, _res, next) => {
            if (!Object.keys(req.body).length) {
                return next(new MessageRequiredError());
            }
        });

    return app;
}

describe(applicationFactory.name, () => {
    let user: User;
    let interactor: PublishMessageToTimelineInteractor;

    beforeEach(() => {
        user = randomUserFactory();
        interactor = jest.fn<PublishMessageToTimelineInteractor>().mockResolvedValue(Math.random());
        jest.mocked(express).mockImplementation(jest.requireActual("express"));
        jest.mocked(express.urlencoded).mockImplementation(jest.requireActual<typeof express>("express").urlencoded);
        jest.mocked(auth).mockReturnValue((req: Request, _res: unknown, next: NextFunction) => {
            req.oidc = {
                user
            } as never;

            next();
        });
    });
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("product", () => {
        describe("while publishing message to personal timeline", () => {
            const endpoint = "/compose";

            function requestFactory(message: Record<string, unknown> = {}) {
                let req = request(applicationFactory(interactor))
                    .post(endpoint)
                    .set('Content-Type', 'application/x-www-form-urlencoded');

                for (const key of Object.keys(message)) {
                    req = req.send(`${key}=${message[key]}`);
                }

                return req;
            }

            it("should authenticate user", async () => {
                const message = 'User not authenticated';
                jest.mocked(auth).mockReturnValue((_req: unknown, _res: unknown, next: NextFunction) => next(new Error(message)));
   
                const res = await requestFactory();
   
                expect(res.status).toBe(500);
                expect(res.text).toContain(message);
            });
    
            it("should validate message", async () => {
                const res = await requestFactory();
    
                 expect(res.status).toBe(500);
                 expect(res.text).toContain(new MessageRequiredError().message);
            });

            it("should send result of calling await interactor(req.oidc.user, req.body)", async () => {
                const message = randomMessageFactory();
   
                const res = await requestFactory(message);
   
                expect(interactor).toBeCalledWith(user, message);
                expect(res.text).toEqual(JSON.stringify(
                    await jest.mocked(interactor).mock.results[0]!.value
                ));
            });
        });
    });
});