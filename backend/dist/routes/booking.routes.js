"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, role_middleware_1.requireUser, booking_controller_1.createBooking);
router.get('/my', auth_middleware_1.authenticate, role_middleware_1.requireUser, booking_controller_1.getUserBookings);
router.get('/all', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, booking_controller_1.getAllBookings);
router.get('/:id', auth_middleware_1.authenticate, booking_controller_1.getBooking);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, booking_controller_1.updateBooking);
router.patch('/:id/cancel', auth_middleware_1.authenticate, role_middleware_1.requireUser, booking_controller_1.cancelBooking);
exports.default = router;
//# sourceMappingURL=booking.routes.js.map