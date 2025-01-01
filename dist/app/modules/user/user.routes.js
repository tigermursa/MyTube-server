"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// Create a user
router.post('/create-user', user_controller_1.createUserController);
// Get all users
router.get('/get-all-users', user_controller_1.getAllUsersController);
// Get a single user by UID
router.get('/get-user/:uid', user_controller_1.getUserByUIDController);
// Delete a user by UID
router.delete('/delete-user/:uid', user_controller_1.deleteUserByUIDController);
// Update a user by UID
router.put('/update-user/:uid', user_controller_1.updateUserByUIDController);
// Route to toggle user delete status
router.patch('/user/:uid/toggle-delete', user_controller_1.toggleUserDeleteStatusController);
// Route to get deleted users
router.get('/users/deleted', user_controller_1.getDeletedUsersController);
exports.default = router;
