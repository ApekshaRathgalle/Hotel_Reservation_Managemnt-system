"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', event_controller_1.getEvents);
router.get('/:id', event_controller_1.getEvent);
router.post('/', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, event_controller_1.createEvent);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, event_controller_1.updateEvent);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, event_controller_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=event.routes.js.map