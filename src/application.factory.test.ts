import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
jest.mock("express");
jest.mock("express-openid-connect");
import express, { Application, NextFunction } from "express";
import { auth } from "express-openid-connect";

function applicationFactory(expressFactory = express) {
    return expressFactory();
}

describe(applicationFactory.name, () => {
    beforeEach(() => {
        jest.mocked(auth).mockReturnValue((_req: unknown, _res: unknown, next: NextFunction) => next());
    });
    
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should return a new instance of the express application", () => {
        jest.mocked(express).mockImplementation(jest.requireActual("express"));

        const app = applicationFactory();

        expect(express).toBeCalledTimes(1);
        expect(app).toBe(jest.mocked(express).mock.results[0]!.value);
    });

    it("should use the express-openid-connect auth middleware", () => {
        const actualApp = jest.requireActual<typeof express>("express")();
         jest.spyOn(actualApp, "use");
         jest.mocked<() => Application>(express).mockImplementation(() => actualApp);

         const app = applicationFactory();

         expect(auth).toBeCalledTimes(1);
         expect(jest.mocked(auth).mock.calls[0]!.length).toBe(0);
         expect(app.use).toBeCalledTimes(1);
         expect(app.use).toBeCalledWith(jest.mocked(auth).mock.results[0]!.value);
    });
});