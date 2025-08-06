"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOffer = exports.updateOffer = exports.createOffer = exports.getOffer = exports.getAllOffers = exports.getOffers = void 0;
const offer_model_1 = require("../models/offer.model");
const getOffers = async (req, res) => {
    try {
        const currentDate = new Date();
        const offers = await offer_model_1.Offer.find({
            validFrom: { $lte: currentDate },
            validTo: { $gte: currentDate }
        }).sort({ createdAt: -1 });
        res.json({ success: true, data: offers });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOffers = getOffers;
const getAllOffers = async (req, res) => {
    try {
        const offers = await offer_model_1.Offer.find().sort({ createdAt: -1 });
        res.json({ success: true, data: offers });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllOffers = getAllOffers;
const getOffer = async (req, res) => {
    try {
        const offer = await offer_model_1.Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOffer = getOffer;
const createOffer = async (req, res) => {
    try {
        const offer = new offer_model_1.Offer(req.body);
        await offer.save();
        res.status(201).json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createOffer = createOffer;
const updateOffer = async (req, res) => {
    try {
        const offer = await offer_model_1.Offer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json({ success: true, data: offer });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateOffer = updateOffer;
const deleteOffer = async (req, res) => {
    try {
        const offer = await offer_model_1.Offer.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json({ success: true, message: 'Offer deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteOffer = deleteOffer;
//# sourceMappingURL=offer.controller.js.map