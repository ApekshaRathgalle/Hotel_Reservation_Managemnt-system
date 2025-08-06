"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['hotel', 'resort', 'wedding', 'event'],
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    specialRequests: {
        type: String
    }
}, {
    timestamps: true
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
//# sourceMappingURL=booking.model.js.map