"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offer_controller_1 = require("../controllers/offer.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/', offer_controller_1.getOffers);
router.get('/all', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, offer_controller_1.getAllOffers);
router.get('/:id', offer_controller_1.getOffer);
router.post('/', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, offer_controller_1.createOffer);
router.put('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, offer_controller_1.updateOffer);
router.delete('/:id', auth_middleware_1.authenticate, role_middleware_1.requireAdmin, offer_controller_1.deleteOffer);
exports.default = router;
//# sourceMappingURL=offer.routes.js.map