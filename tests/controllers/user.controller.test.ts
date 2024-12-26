import {Request, Response} from "express";
import {UserController} from "../../src/controllers/user.controller";
import {User} from "../../src/schemas/User";
import {encrypt} from "../../src/helpers/helpers";

jest.mock("../../src/schemas/User");
jest.mock("../../src/helpers/helpers");

describe("UserController", () => {
    describe("create", () => {
        /**
         * Test case for invalid phone number.
         * Expects a 400 status code and an error message.
         */
        it("Returns 400 if phone number is invalid", async () => {
            const req = {
                body: {
                    email: "test@example.com",
                    phone: "invalidphone",
                    firstName: "John",
                    lastName: "Doe",
                    password: "password"
                }
            } as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            await UserController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({message: "Invalid phone number"});
        });

        /**
         * Test case for successful user creation.
         * Expects a 200 status code and a success message.
         */
        it("Returns 200 and success message if user is created successfully", async () => {
            const req = {
                body: {
                    email: "test@example.com",
                    phone: "1234567890",
                    firstName: "John",
                    lastName: "Doe",
                    password: "password",
                },
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (User.findOne as jest.Mock).mockResolvedValue(null);
            (encrypt.encryptpass as jest.Mock).mockResolvedValue("encryptedPassword");
            (User.save as jest.Mock).mockResolvedValue({
                firstName: "John",
                lastName: "Doe",
                email: "test@example.com",
                phone: "1234567890",
                role: "Recycler",
            });

            await UserController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "User created successfully",
                    user: expect.objectContaining({
                        firstName: "John",
                        lastName: "Doe",
                        email: "test@example.com",
                        phone: "1234567890",
                        role: "Recycler",
                    }),
                })
            );
        });

        /**
         * Test case for user already existing in the database.
         * Expects a 400 status code and an error message.
         */
        it("Returns 400 if user already exists", async () => {
            const req = {
                body: {
                    email: "test@example.com",
                    phone: "1234567890",
                    firstName: "John",
                    lastName: "Doe",
                    password: "password"
                }
            } as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            (User.findOne as jest.Mock).mockResolvedValue({});

            await UserController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({message: "User already exists"});
        });
    });

    describe("makeAdmin", () => {
        /**
         * Test case for user not found in the database.
         * Expects a 404 status code and an error message.
         */
        it("Returns 404 if user is not found", async () => {
            const req = {
                params: {id: "1"}
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            (User.findOne as jest.Mock).mockResolvedValue(null);

            await UserController.makeAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith("User not found");
        });

        /**
         * Test case for successfully making a user an admin.
         * Expects a 200 status code and a success message.
         */
        it("Returns 200 and success message if user is made admin", async () => {
            const req = {
                params: {id: "1"}
            } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            const user = {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                role: "Recycler"
            };
            (User.findOne as jest.Mock).mockResolvedValue(user);
            (User.save as jest.Mock).mockResolvedValue({
                ...user,
                role: "Admin"
            });

            await UserController.makeAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message: `User John Doe is now an Admin`});
        });
    });
});