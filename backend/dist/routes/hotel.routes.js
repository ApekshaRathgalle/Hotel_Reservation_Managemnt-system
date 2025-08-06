"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_controller_1 = require("../controllers/hotel.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', hotel_controller_1.getHotels);
router.get('/:id', hotel_controller_1.getHotel);
router.post('/', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, hotel_controller_1.createHotel);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, hotel_controller_1.updateHotel);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, hotel_controller_1.deleteHotel);
exports.default = router;
//# sourceMappingURL=hotel.routes.js.map