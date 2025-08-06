"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.getHotel = exports.getHotels = void 0;
const hotel_model_1 = require("../models/hotel.model");
const getHotels = async (req, res) => {
    try {
        const hotels = await hotel_model_1.Hotel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: hotels });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getHotels = getHotels;
const getHotel = async (req, res) => {
    try {
        const hotel = await hotel_model_1.Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ success: true, data: hotel });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getHotel = getHotel;
const createHotel = async (req, res) => {
    try {
        const hotel = new hotel_model_1.Hotel(req.body);
        await hotel.save();
        res.status(201).json({ success: true, data: hotel });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createHotel = createHotel;
const updateHotel = async (req, res) => {
    try {
        const hotel = await hotel_model_1.Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ success: true, data: hotel });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateHotel = updateHotel;
const deleteHotel = async (req, res) => {
    try {
        const hotel = await hotel_model_1.Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ success: true, message: 'Hotel deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteHotel = deleteHotel;
//# sourceMappingURL=hotel.controller.js.map