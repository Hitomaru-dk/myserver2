import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Item } from '../models/Item';

const router = Router();

// Middleware: check MongoDB connection before processing
router.use((req: Request, res: Response, next: NextFunction) => {
    if (mongoose.connection.readyState !== 1) {
        res.status(503).json({
            success: false,
            message: 'MongoDB is not connected. Please set MONGO_URI in .env file.',
        });
        return;
    }
    next();
});

// GET /api/items - ดึงรายการทั้งหมด
router.get('/items', async (req: Request, res: Response) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/items/:id - ดึงรายการตาม ID
router.get('/items/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, data: item });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/items - สร้างรายการใหม่
router.post('/items', async (req: Request, res: Response) => {
    try {
        const item = new Item(req.body);
        const saved = await item.save();
        res.status(201).json({ success: true, data: saved });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/items/:id - อัปเดตรายการ
router.put('/items/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, data: item });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/items/:id - ลบรายการ
router.delete('/items/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, message: 'Item deleted' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
