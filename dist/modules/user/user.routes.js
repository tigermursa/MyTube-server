"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// Route to create a user
router.post('/create-user', user_controller_1.createUserController);
// Route to get all users
router.get('/get-all-users', user_controller_1.getAllUsersController);
exports.default = router;
