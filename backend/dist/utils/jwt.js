"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!process.env['JWT_SECRET']) {
    throw new Error('JWT_SECRET environment variable is required');
}
const JWT_SECRET = process.env['JWT_SECRET'];
const JWT_EXPIRE = process.env['JWT_EXPIRE'] || '30d';
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map