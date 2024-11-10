import {errorHandler} from "../../src/middleware/error.middleware";
import {Request, Response, NextFunction} from "express";

describe("Error handling middleware", () => {
    /**
     * Test case for when an error occurs.
     * Expects a 500 status code and an error message.
     */
    it("Returns 500 and error message when an error occurs", () => {
        const error = new Error("Test error");
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: "Internal server error"});
    });

    /**
     * Test case for logging the error message to the console.
     * Expects the error message to be logged to the console.
     */
    it("Logs the error message to the console", () => {
        const error = new Error("Test error");
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        const consoleSpy = jest.spyOn(console, "error").mockImplementation();

        errorHandler(error, req, res, next);

        expect(consoleSpy).toHaveBeenCalledWith(`Error: ${error.message}`);

        consoleSpy.mockRestore();
    });
});