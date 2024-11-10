import {authorization} from "../../src/middleware/authorization";
import {User} from "../../src/schemas/User";
import {Request, Response, NextFunction} from "express";

jest.mock("../../src/schemas/User");

interface AuthenticatedRequest extends Request {
    authUser?: any;
}

describe("Authorization middleware", () => {
    /**
     * Test case for when the user is not found in the database.
     * Expects a 404 status code and an error message.
     */
    it("Returns 404 if user is not found", async () => {
        const req = {authUser: {id: "1"}} as AuthenticatedRequest;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        (User.findOneBy as jest.Mock).mockResolvedValue(null);

        await authorization(["admin"])(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: "User not found"});
    });

    /**
     * Test case for when the user role is not authorized.
     * Expects a 403 status code and an error message.
     */
    it("Returns 403 if user role is not authorized", async () => {
        const req = {authUser: {id: "1"}} as AuthenticatedRequest;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        const user = {role: "user"};
        (User.findOneBy as jest.Mock).mockResolvedValue(user);

        await authorization(["admin"])(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({message: "Forbidden"});
    });

    /**
     * Test case for when the user role is authorized.
     * Expects the next middleware to be called.
     */
    it("Calls next if user role is authorized", async () => {
        const req = {authUser: {id: "1"}} as AuthenticatedRequest;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        const user = {role: "admin"};
        (User.findOneBy as jest.Mock).mockResolvedValue(user);

        await authorization(["admin"])(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});