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
exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("./user.model");
const mongodb_1 = require("mongodb"); // Import MongoDB error type
// Create a new user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.User(userData);
        return yield user.save();
    }
    catch (error) {
        if (error instanceof mongodb_1.MongoError && error.code === 11000) {
            const mongoError = error;
            const duplicateField = Object.keys(mongoError.keyValue)[0]; // Get the duplicate field
            // If UID is the duplicate field, throw a user-friendly error
            if (duplicateField === 'uid') {
                throw new Error('A user with this UID already exists. Please use a different UID.');
            }
            // For other duplicate fields, handle similarly
            throw new Error(`Duplicate value for field: ${duplicateField}. Please provide a unique value.`);
        }
        // If it's any other error, throw it
        throw error;
    }
});
exports.createUser = createUser;
// Get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find({});
});
exports.getAllUsers = getAllUsers;
