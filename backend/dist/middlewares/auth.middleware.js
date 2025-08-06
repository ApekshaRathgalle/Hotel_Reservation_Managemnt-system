"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../models/user.model");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }
        const token = authHeader.substring(7);
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await user_model_1.User.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: 'Invalid token.' });
            return;
        }
        req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map