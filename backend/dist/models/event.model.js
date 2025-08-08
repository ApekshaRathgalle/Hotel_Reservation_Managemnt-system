"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: {
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
    date: {
        type: Date,
        required: true
    },
    images: [{
            type: String
        }],
    ticketPrice: {
        type: Number,
        required: true,
        min: 0
    },
    availableTickets: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ location: 1 });
eventSchema.index({ createdAt: -1 });
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
//# sourceMappingURL=event.model.js.map