"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeddingHall = void 0;
const mongoose_1 = require("mongoose");
const weddingHallSchema = new mongoose_1.Schema({
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
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    amenities: [{
            type: String
        }],
    images: [{
            type: String
        }],
    pricePerEvent: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
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
exports.WeddingHall = (0, mongoose_1.model)('WeddingHall', weddingHallSchema);
//# sourceMappingURL=wedding.model.js.map