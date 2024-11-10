import { Request, Response } from "express";
import { AuthController } from "../../src/controllers/auth.controller";
import { User } from "../../src/schemas/User";
import { encrypt } from "../../src/helpers/helpers";

jest.mock("../../src/schemas/User");
jest.mock("../../src/helpers/helpers");

describe("AuthController", () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    // Mock console.error to prevent error logs during tests
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore original console.error after tests
    console.error = originalConsoleError;
  });

  describe("login", () => {
    /**
     * Test case for missing email or password in the request body.
     * Expects a 500 status code and an error message.
     */
    it("Returns 500 if email or password is missing", async () => {
      const req = {
        body: {}
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "email and password required" });
    });

    /**
     * Test case for user not found in the database.
     * Expects a 404 status code and an error message.
     */
    it("Returns 404 if user is not found", async () => {
      const req = {
        body: { email: "test@example.com", password: "password" }
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    /**
     * Test case for invalid password.
     * Expects a 404 status code and an error message.
     */
    it("Returns 404 if password is invalid", async () => {
      const req = {
        body: { email: "test@example.com", password: "wrongpassword" }
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      const user = { password: "hashedpassword" };
      (User.findOne as jest.Mock).mockResolvedValue(user);
      (encrypt.comparepassword as jest.Mock).mockReturnValue(false);

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    /**
     * Test case for successful login.
     * Expects a 200 status code, a success message, and a token.
     */
    it("Returns 200 and token if login is successful", async () => {
      const req = {
        body: { email: "test@example.com", password: "password" }
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      const user = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
        email: "test@example.com",
        role: "user",
        password: "hashedpassword",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      (User.findOne as jest.Mock).mockResolvedValue(user);
      (encrypt.comparepassword as jest.Mock).mockReturnValue(true);
      (encrypt.generateToken as jest.Mock).mockReturnValue("token");

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: "token",
        result: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          phone: "1234567890",
          email: "test@example.com",
          role: "user"
        }
      });
    });

    /**
     * Test case for an internal server error.
     * Expects a 500 status code and an error message.
     */
    it("Returns 500 if an error occurs", async () => {
      const req = {
        body: { email: "test@example.com", password: "password" }
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
  });
});