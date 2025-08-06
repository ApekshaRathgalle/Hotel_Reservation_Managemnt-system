"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wedding_controller_1 = require("../controllers/wedding.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', wedding_controller_1.getWeddingHalls);
router.get('/:id', wedding_controller_1.getWeddingHall);
router.post('/', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, wedding_controller_1.createWeddingHall);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, wedding_controller_1.updateWeddingHall);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, wedding_controller_1.deleteWeddingHall);
exports.default = router;
//# sourceMappingURL=wedding.routes.js.map