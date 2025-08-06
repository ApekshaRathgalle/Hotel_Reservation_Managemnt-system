"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = exports.requireAdmin = void 0;
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
const requireUser = (req, res, next) => {
    if (!req.user || (req.user.role !== 'user' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied. User role required.' });
    }
    next();
};
exports.requireUser = requireUser;
//# sourceMappingURL=role.middleware.js.map