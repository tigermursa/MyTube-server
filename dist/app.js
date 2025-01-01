"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Use morgan for logging
app.use((0, morgan_1.default)("dev")); // 'dev' outputs concise colored logs
const user_routes_1 = __importDefault(require("./app/modules/user/user.routes"));
const ErrorHangler_1 = require("./app/middleware/ErrorHangler");
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', user_routes_1.default);
// Global error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err); // Log the error for debugging
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});
app.get('/', (_req, res) => {
    const filePath = path_1.default.join(process.cwd(), 'views', 'status.html');
    res.sendFile(filePath);
});
// Error Handler
app.use(ErrorHangler_1.errorHandler);
exports.default = app;
//node \dist/server.js
