"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        if (!email || !password || !firstName || !lastName) {
            res.status(400).json({
                success: false,
                message: 'Email, password, firstName, and lastName are required'
            });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
            return;
        }
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'User already exists'
            });
            return;
        }
        const user = new user_model_1.User({
            email,
            password,
            firstName,
            lastName,
            phone,
            role: 'user'
        });
        await user.save();
        const token = (0, jwt_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
            role: user.role
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
            return;
        }
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validationErrors
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
            return;
        }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }
        const token = (0, jwt_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
            role: user.role
        });
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map