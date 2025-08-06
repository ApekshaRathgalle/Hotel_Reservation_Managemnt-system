"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    validFrom: {
        type: Date,
        required: true
    },
    validTo: {
        type: Date,
        required: true
    },
    applicableType: {
        type: String,
        enum: ['hotel', 'resort', 'wedding', 'event'],
        required: true
    },
    applicableIds: [{
            type: String
        }],
    images: [{
            type: String
        }]
}, {
    timestamps: true
});
exports.Offer = (0, mongoose_1.model)('Offer', offerSchema);
//# sourceMappingURL=offer.model.js.map