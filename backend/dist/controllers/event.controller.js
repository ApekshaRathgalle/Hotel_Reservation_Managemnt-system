"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvent = exports.getEvents = void 0;
const event_model_1 = require("../models/event.model");
const getEvents = async (req, res) => {
    try {
        const events = await event_model_1.Event.find()
            .select('-__v')
            .sort({ date: 1 })
            .lean();
        res.json({ success: true, data: events });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEvents = getEvents;
const getEvent = async (req, res) => {
    try {
        const event = await event_model_1.Event.findById(req.params.id).select('-__v').lean();
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ success: true, data: event });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getEvent = getEvent;
const createEvent = async (req, res) => {
    try {
        const event = new event_model_1.Event(req.body);
        await event.save();
        res.status(201).json({ success: true, data: event });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createEvent = createEvent;
const updateEvent = async (req, res) => {
    try {
        const event = await event_model_1.Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ success: true, data: event });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const event = await event_model_1.Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ success: true, message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=event.controller.js.map