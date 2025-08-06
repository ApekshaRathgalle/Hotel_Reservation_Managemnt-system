"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    console.error('Error:', {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method
    });
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env['NODE_ENV'] === 'development' && { stack: error.stack })
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};
exports.notFound = notFound;
//# sourceMappingURL=error.middleware.js.map