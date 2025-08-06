"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResort = exports.updateResort = exports.createResort = exports.getResort = exports.getResorts = void 0;
const resort_model_1 = require("../models/resort.model");
const getResorts = async (req, res) => {
    try {
        const resorts = await resort_model_1.Resort.find().sort({ createdAt: -1 });
        res.json({ success: true, data: resorts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getResorts = getResorts;
const getResort = async (req, res) => {
    try {
        const resort = await resort_model_1.Resort.findById(req.params.id);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.json({ success: true, data: resort });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getResort = getResort;
const createResort = async (req, res) => {
    try {
        const resort = new resort_model_1.Resort(req.body);
        await resort.save();
        res.status(201).json({ success: true, data: resort });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createResort = createResort;
const updateResort = async (req, res) => {
    try {
        const resort = await resort_model_1.Resort.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.json({ success: true, data: resort });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateResort = updateResort;
const deleteResort = async (req, res) => {
    try {
        const resort = await resort_model_1.Resort.findByIdAndDelete(req.params.id);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        res.json({ success: true, message: 'Resort deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteResort = deleteResort;
//# sourceMappingURL=resort.controller.js.map