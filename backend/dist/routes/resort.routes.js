"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resort_controller_1 = require("../controllers/resort.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', resort_controller_1.getResorts);
router.get('/:id', resort_controller_1.getResort);
router.post('/', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, resort_controller_1.createResort);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, resort_controller_1.updateResort);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, resort_controller_1.deleteResort);
exports.default = router;
//# sourceMappingURL=resort.routes.js.map