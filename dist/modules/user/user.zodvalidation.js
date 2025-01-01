"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Define a Zod schema to validate the user input
exports.createUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required").max(50, "First name should not exceed 50 characters"),
    lastName: zod_1.z.string().min(1, "Last name is required").max(50, "Last name should not exceed 50 characters"),
    uid: zod_1.z.string().min(1, "UID is required").max(100, "UID should not exceed 100 characters"),
    age: zod_1.z.number().min(0, "Age cannot be negative").max(120, "Age should be between 0 and 120"),
    gender: zod_1.z.enum(["Male", "Female", "Other"], { errorMap: () => ({ message: "Gender must be Male, Female, or Other" }) }),
    country: zod_1.z.string().min(1, "Country is required").max(100, "Country name should not exceed 100 characters"),
    city: zod_1.z.string().min(1, "City is required").max(100, "City name should not exceed 100 characters"),
    phoneNumber: zod_1.z.string().regex(/^\+?[0-9\s\-]+$/, "Invalid phone number format"),
    email: zod_1.z.string().email("Invalid email format"),
    work: zod_1.z.string().min(1, "Work is required").max(100, "Work field should not exceed 100 characters"),
});
