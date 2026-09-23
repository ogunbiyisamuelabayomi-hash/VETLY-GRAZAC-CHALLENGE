const UserModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

const {
    registerUser,
    loginUser
} = require("../../controllers/userController");

jest.mock("../../models/userModel");
jest.mock("bcrypt");
jest.mock("../../utils/generateToken");

const mockResponse = () => {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

describe("User Controller Unit Tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // REGISTER

    test("should register user successfully", async () => {
        UserModel.findOne.mockResolvedValue(null);

        bcrypt.hash.mockResolvedValue("hashedPassword");

        UserModel.create.mockResolvedValue({
            _id: "123",
            name: "John Doe",
            email: "john@example.com",
            password: "hashedPassword",
            role: "USER"
        });

        const req = {
            body: {
                name: "John Doe",
                email: "john@example.com",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await registerUser(req, res);

        expect(UserModel.findOne).toHaveBeenCalledWith({
            email: "john@example.com"
        });

        expect(bcrypt.hash).toHaveBeenCalledWith(
            "Password@123",
            10
        );

        expect(UserModel.create).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
    });


    test("should reject registration when name is missing", async () => {
        const req = {
            body: {
                email: "john@example.com",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should reject registration when email is missing", async () => {
        const req = {
            body: {
                name: "John Doe",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should reject invalid email", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "johnexample.com",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should reject registration when password is missing", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "john@example.com"
            }
        };

        const res = mockResponse();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should reject existing user", async () => {
        UserModel.findOne.mockResolvedValue({
            email: "john@example.com"
        });

        const req = {
            body: {
                name: "John Doe",
                email: "john@example.com",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });


    // LOGIN

    test("should login user successfully", async () => {
        UserModel.findOne.mockResolvedValue({
            _id: "123",
            name: "John Doe",
            email: "john@example.com",
            password: "hashedPassword",
            role: "USER"
        });

        bcrypt.compare.mockResolvedValue(true);

        generateToken.mockReturnValue("test-jwt-token");

        const req = {
            body: {
                email: "john@example.com",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await loginUser(req, res);

        expect(UserModel.findOne).toHaveBeenCalledWith({
            email: "john@example.com"
        });

        expect(bcrypt.compare).toHaveBeenCalledWith(
            "Password@123",
            "hashedPassword"
        );

        expect(generateToken).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("should reject login when email is missing", async () => {
        const req = {
            body: {
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should reject login when password is missing", async () => {
        const req = {
            body: {
                email: "john@example.com"
            }
        };

        const res = mockResponse();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });


    test("should return 404 when user does not exist", async () => {
        UserModel.findOne.mockResolvedValue(null);

        const req = {
            body: {
                email: "unknown@example.com",
                password: "Password@123"
            }
        };

        const res = mockResponse();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });


    test("should reject invalid password", async () => {
        UserModel.findOne.mockResolvedValue({
            _id: "123",
            email: "john@example.com",
            password: "hashedPassword",
            role: "USER"
        });

        bcrypt.compare.mockResolvedValue(false);

        const req = {
            body: {
                email: "john@example.com",
                password: "WrongPassword"
            }
        };

        const res = mockResponse();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

});