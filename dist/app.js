"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const submission_routes_1 = __importDefault(require("./routes/submission.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const data_source_1 = require("./config/data-source");
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middleware/error.middleware");
const User_1 = require("./schemas/User");
const helpers_1 = require("./helpers/helpers");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use('/api', submission_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use(error_middleware_1.errorHandler);
/**
 * Function to create a default admin user if it doesn't exist.
 */
const createDefaultAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminEmail = "admin@example.com";
    const adminPassword = "admin";
    const existingAdmin = yield User_1.User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
        const encryptedPassword = yield helpers_1.encrypt.encryptpass(adminPassword);
        const admin = new User_1.User();
        admin.firstName = "Admin";
        admin.lastName = "User";
        admin.email = adminEmail;
        admin.phone = "0000000000";
        admin.password = encryptedPassword;
        admin.role = "Admin";
        yield User_1.User.save(admin);
        console.log("Default admin user created");
    }
    else {
        console.log("Default admin user already exists");
    }
});
/**
 * Initializes the data source and starts the Express server.
 */
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data Source has been initialized!");
    yield createDefaultAdmin();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}))
    .catch(error => console.log(error));
