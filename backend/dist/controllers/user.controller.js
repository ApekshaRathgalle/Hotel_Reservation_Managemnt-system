"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const getUsers = async (req, res) => {
    try {
        const users = await user_model_1.User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        const user = await user_model_1.User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
const getProfile = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.user?.id).select('-password');
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        const user = await user_model_1.User.findByIdAndUpdate(req.user?.id, updateData, {
            new: true,
            runValidators: true
        }).select('-password');
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=user.controller.js.map