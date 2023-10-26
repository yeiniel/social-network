import { describe, expect, it, jest } from "@jest/globals";
jest.mock("express");
import express from "express";

function applicationFactory(expressFactory = express) {
    return expressFactory();
}

describe(applicationFactory.name, () => {
    it("should return a new instance of the express application", () => {
        jest.mocked(express).mockImplementation(jest.requireActual("express"));

        const app = applicationFactory();

        expect(express).toBeCalledTimes(1);
        expect(app).toBe(jest.mocked(express).mock.results[0]!.value);
    });
});