"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWeddingHall = exports.updateWeddingHall = exports.createWeddingHall = exports.getWeddingHall = exports.getWeddingHalls = void 0;
const wedding_model_1 = require("../models/wedding.model");
const getWeddingHalls = async (req, res) => {
    try {
        const halls = await wedding_model_1.WeddingHall.find().sort({ createdAt: -1 });
        res.json({ success: true, data: halls });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getWeddingHalls = getWeddingHalls;
const getWeddingHall = async (req, res) => {
    try {
        const hall = await wedding_model_1.WeddingHall.findById(req.params['id']);
        if (!hall) {
            return res.status(404).json({ message: 'Wedding hall not found' });
        }
        res.json({ success: true, data: hall });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getWeddingHall = getWeddingHall;
const createWeddingHall = async (req, res) => {
    try {
        const hall = new wedding_model_1.WeddingHall(req.body);
        await hall.save();
        res.status(201).json({ success: true, data: hall });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createWeddingHall = createWeddingHall;
const updateWeddingHall = async (req, res) => {
    try {
        const hall = await wedding_model_1.WeddingHall.findByIdAndUpdate(req.params['id'], req.body, {
            new: true,
            runValidators: true
        });
        if (!hall) {
            return res.status(404).json({ message: 'Wedding hall not found' });
        }
        res.json({ success: true, data: hall });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateWeddingHall = updateWeddingHall;
const deleteWeddingHall = async (req, res) => {
    try {
        const hall = await wedding_model_1.WeddingHall.findByIdAndDelete(req.params['id']);
        if (!hall) {
            return res.status(404).json({ message: 'Wedding hall not found' });
        }
        res.json({ success: true, message: 'Wedding hall deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteWeddingHall = deleteWeddingHall;
//# sourceMappingURL=wedding.controller.js.map