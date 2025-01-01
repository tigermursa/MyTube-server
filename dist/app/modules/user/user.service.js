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
exports.getDeletedUsers = exports.toggleUserDeleteStatus = exports.updateUserByUID = exports.deleteUserByUID = exports.getUserByUID = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = require("./user.model");
// Create a new user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = new user_model_1.User(userData);
        return yield user.save();
    }
    catch (error) {
        if (error.code === 11000 && ((_a = error.keyPattern) === null || _a === void 0 ? void 0 : _a.uid)) {
            throw new Error('This UID is already in use.');
        }
        throw error; // Re-throw other errors
    }
});
exports.createUser = createUser;
// Get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find({ isDeleted: false }); // Only get users where isDeleted is false
});
exports.getAllUsers = getAllUsers;
const getUserByUID = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ uid });
});
exports.getUserByUID = getUserByUID;
const deleteUserByUID = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOneAndDelete({ uid });
});
exports.deleteUserByUID = deleteUserByUID;
const updateUserByUID = (uid, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOneAndUpdate({ uid }, updateData, { new: true, runValidators: true });
});
exports.updateUserByUID = updateUserByUID;
const toggleUserDeleteStatus = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user and toggle the 'isDeleted' status
    const user = yield user_model_1.User.findOne({ uid });
    if (user) {
        user.isDeleted = !user.isDeleted; // Toggle isDeleted value
        yield user.save(); // Save the updated user
    }
    return user;
});
exports.toggleUserDeleteStatus = toggleUserDeleteStatus;
const getDeletedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all users with isDeleted = true
    return yield user_model_1.User.find({ isDeleted: true });
});
exports.getDeletedUsers = getDeletedUsers;
