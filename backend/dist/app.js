"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const resort_routes_1 = __importDefault(require("./routes/resort.routes"));
const wedding_routes_1 = __importDefault(require("./routes/wedding.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const offer_routes_1 = __importDefault(require("./routes/offer.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: process.env['FRONTEND_URL'] || 'http://localhost:4200',
    credentials: true
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'development' ? 1000 : 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/hotels', hotel_routes_1.default);
app.use('/api/resorts', resort_routes_1.default);
app.use('/api/weddings', wedding_routes_1.default);
app.use('/api/events', event_routes_1.default);
app.use('/api/offers', offer_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Hotel Chain API is running' });
});
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map