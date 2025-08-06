"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/profile', auth_middleware_1.authenticate, user_controller_1.getProfile);
router.put('/profile', auth_middleware_1.authenticate, user_controller_1.updateProfile);
router.get('/', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, user_controller_1.getUsers);
router.get('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, user_controller_1.getUser);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, user_controller_1.updateUser);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map