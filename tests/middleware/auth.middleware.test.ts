import { auth } from "../../src/middleware/auth.middleware";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

jest.mock("jsonwebtoken");

interface AuthenticatedRequest extends Request {
  authUser?: any;
}

describe("Auth middleware", () => {
  /**
   * Test case for when no token is provided in the request headers.
   * Expects a 401 status code and an error message.
   */
  it("Returns 401 if no token is provided", () => {
    const req = { headers: {} } as AuthenticatedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
  });

  /**
   * Test case for when token verification fails.
   * Expects a 401 status code and an error message.
   */
  it("Returns 401 if token verification fails", () => {
    const req = {headers: {token: "invalidtoken"}} as unknown as AuthenticatedRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error("Invalid token") });

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  /**
   * Test case for when token is valid.
   * Expects the next middleware to be called.
   */
  it("Calls next if token is valid", () => {
    const req = {headers: {token: "validtoken"}} as unknown as AuthenticatedRequest;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const decodedToken = { id: "1", role: "user" };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    auth(req, res, next);

    expect(req.authUser).toBe(decodedToken);
    expect(next).toHaveBeenCalled();
  });
});