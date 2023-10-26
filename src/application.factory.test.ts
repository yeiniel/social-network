import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
jest.mock("express");
jest.mock("express-openid-connect");
import request from "supertest";
import express, { Application, NextFunction } from "express";
import { auth } from "express-openid-connect";

class MessageRequiredError extends Error {
    constructor() {
        super("Message is required");
    }
}

function applicationFactory(authMiddlewareFactory = auth, expressFactory = express) {
    const app = expressFactory();

    app.use(authMiddlewareFactory());

    return app;
}

describe(applicationFactory.name, () => {
    beforeEach(() => {
        jest.mocked(express).mockImplementation(jest.requireActual("express"));
        jest.mocked(auth).mockReturnValue((_req: unknown, _res: unknown, next: NextFunction) => next());
    });
    
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should use the express-openid-connect auth middleware", () => {
        const actualApp = jest.requireActual<typeof express>("express")();
         jest.spyOn(actualApp, "use");
         jest.mocked<() => Application>(express).mockImplementation(() => actualApp);

         const app = applicationFactory();

         expect(auth).toBeCalledTimes(1);
         expect(jest.mocked(auth).mock.calls[0]!.length).toBe(0);
         expect(app.use).toBeCalledWith(jest.mocked(auth).mock.results[0]!.value);
    });

    describe("product", () => {
        describe("while publishing message to personal timeline", () => {
            const endpoint = "/compose";
    
            it("should validate message", async () => {
                const res = await request(applicationFactory())
                     .post(endpoint)
                     .set('Content-Type', 'application/x-www-form-urlencoded');
    
                 expect(res.status).toBe(500);
                 expect(res.text).toContain(new MessageRequiredError().message);
            });
        });
    });
});