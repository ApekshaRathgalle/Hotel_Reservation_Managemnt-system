"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.updateBooking = exports.getBooking = exports.getAllBookings = exports.getUserBookings = exports.createBooking = void 0;
const booking_model_1 = require("../models/booking.model");
const createBooking = async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            userId: req.user?.id
        };
        const booking = new booking_model_1.Booking(bookingData);
        await booking.save();
        res.status(201).json({ success: true, data: booking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createBooking = createBooking;
const getUserBookings = async (req, res) => {
    try {
        const bookings = await booking_model_1.Booking.find({ userId: req.user?.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserBookings = getUserBookings;
const getAllBookings = async (req, res) => {
    try {
        const bookings = await booking_model_1.Booking.find().sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllBookings = getAllBookings;
const getBooking = async (req, res) => {
    try {
        const booking = await booking_model_1.Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ success: true, data: booking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBooking = getBooking;
const updateBooking = async (req, res) => {
    try {
        const booking = await booking_model_1.Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ success: true, data: booking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateBooking = updateBooking;
const cancelBooking = async (req, res) => {
    try {
        const booking = await booking_model_1.Booking.findOneAndUpdate({ _id: req.params.id, userId: req.user?.id }, { status: 'cancelled' }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ success: true, data: booking });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.cancelBooking = cancelBooking;
//# sourceMappingURL=booking.controller.js.map