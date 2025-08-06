"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    amenities: [{
            type: String
        }],
    images: [{
            type: String
        }],
    pricePerNight: {
        type: Number,
        required: true,
        min: 0
    },
    availableRooms: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});
exports.Hotel = (0, mongoose_1.model)('Hotel', hotelSchema);
//# sourceMappingURL=hotel.model.js.map