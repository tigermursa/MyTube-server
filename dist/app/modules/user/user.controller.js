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
exports.getDeletedUsersController = exports.toggleUserDeleteStatusController = exports.updateUserByUIDController = exports.deleteUserByUIDController = exports.getUserByUIDController = exports.getAllUsersController = exports.createUserController = void 0;
const user_service_1 = require("./user.service");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUser)(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    }
    catch (error) {
        if (error.message === 'This UID is already in use.') {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        next(error); // Pass other errors to the error handler
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
const getUserByUIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield (0, user_service_1.getUserByUID)(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
        });
    }
    catch (error) {
        next(error); // Pass error to the handler
    }
});
exports.getUserByUIDController = getUserByUIDController;
const deleteUserByUIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield (0, user_service_1.deleteUserByUID)(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserByUIDController = deleteUserByUIDController;
const updateUserByUIDController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const updatedUser = yield (0, user_service_1.updateUserByUID)(uid, req.body);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserByUIDController = updateUserByUIDController;
const toggleUserDeleteStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const user = yield (0, user_service_1.toggleUserDeleteStatus)(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: `User ${user.isDeleted ? 'marked as deleted' : 'restored'}`,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.toggleUserDeleteStatusController = toggleUserDeleteStatusController;
// New controller to fetch deleted users
const getDeletedUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUsers = yield (0, user_service_1.getDeletedUsers)();
        res.status(200).json({
            success: true,
            data: deletedUsers,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getDeletedUsersController = getDeletedUsersController;
