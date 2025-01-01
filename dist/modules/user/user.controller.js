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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = exports.createUserController = void 0;
const user_service_1 = require("./user.service");
const user_zodvalidation_1 = require("./user.zodvalidation");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body using Zod schema
        const parsedData = user_zodvalidation_1.createUserSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsedData.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        // If validation passes, proceed with creating the user
        const user = yield (0, user_service_1.createUser)(parsedData.data);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    }
    catch (error) {
        // Handle custom error message for duplicate uid
        if (error.message === 'A user with this UID already exists. Please use a different UID.') {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        // Pass any other errors to Express error handler
        next(error);
    }
});
exports.createUserController = createUserController;
const getAllUsersController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        if (!users.length) {
            return res.status(200).json({
                success: true,
                message: 'No users found',
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            total: users.length,
            data: users,
        });
    }
    catch (error) {
        next(error); // Pass errors to Express error handler
    }
});
exports.getAllUsersController = getAllUsersController;
