import { encrypt } from "../../src/helpers/helpers";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("encrypt", () => {
  /**
   * Test suite for the encryptpass function.
   */
  describe("encryptpass", () => {
    /**
     * Tests that encryptpass returns a hashed password.
     */
    it("Returns hashed password", async () => {
      const password = "password";
      const hashedPassword = "hashedpassword";
      (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedPassword);

      const result = await encrypt.encryptpass(password);

      expect(result).toBe(hashedPassword);
    });
  });

  /**
   * Test suite for the comparepassword function.
   */
  describe("comparepassword", () => {
    /**
     * Tests that comparepassword returns true if passwords match.
     */
    it("Returns true if passwords match", () => {
      const hashPassword = "hashedpassword";
      const password = "password";
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

      const result = encrypt.comparepassword(hashPassword, password);

      expect(result).toBe(true);
    });

    /**
     * Tests that comparepassword returns false if passwords do not match.
     */
    it("Returns false if passwords do not match", () => {
      const hashPassword = "hashedpassword";
      const password = "wrongpassword";
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

      const result = encrypt.comparepassword(hashPassword, password);

      expect(result).toBe(false);
    });
  });

  /**
   * Test suite for the generateToken function.
   */
  describe("generateToken", () => {
    /**
     * Tests that generateToken returns a JWT token.
     */
    it("Returns a JWT token", () => {
      const payload = { id: "1", firstName: "John", lastName: "Doe", phone: "1234567890", email: "test@example.com", role: "user" };
      const token = "token";
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = encrypt.generateToken(payload);

      expect(result).toBe(token);
    });
  });
});