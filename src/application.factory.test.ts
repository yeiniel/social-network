import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
jest.mock("express");
jest.mock("express-openid-connect");
import request from "supertest";
import express, { NextFunction } from "express";
import { auth } from "express-openid-connect";

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
    beforeEach(() => {
        jest.mocked(express).mockImplementation(jest.requireActual("express"));
        jest.mocked(express.urlencoded).mockImplementation(jest.requireActual<typeof express>("express").urlencoded);
        jest.mocked(auth).mockReturnValue((_req: unknown, _res: unknown, next: NextFunction) => next());
    });
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("product", () => {
        describe("while publishing message to personal timeline", () => {
            const endpoint = "/compose";

            function requestFactory() {
                return request(applicationFactory())
                    .post(endpoint)
                    .set('Content-Type', 'application/x-www-form-urlencoded');
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
        });
    });
});