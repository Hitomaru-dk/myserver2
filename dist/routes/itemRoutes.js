"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const Item_1 = require("../models/Item");
const router = (0, express_1.Router)();
// Middleware: check MongoDB connection before processing
router.use((req, res, next) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        res.status(503).json({
            success: false,
            message: 'MongoDB is not connected. Please set MONGO_URI in .env file.',
        });
        return;
    }
    next();
});
// GET /api/items - ดึงรายการทั้งหมด
router.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Item_1.Item.find().sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// GET /api/items/:id - ดึงรายการตาม ID
router.get('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item_1.Item.findById(req.params.id);
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// POST /api/items - สร้างรายการใหม่
router.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new Item_1.Item(req.body);
        const saved = yield item.save();
        res.status(201).json({ success: true, data: saved });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}));
// PUT /api/items/:id - อัปเดตรายการ
router.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item_1.Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}));
// DELETE /api/items/:id - ลบรายการ
router.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item_1.Item.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, message: 'Item deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
exports.default = router;
