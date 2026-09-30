const express = require("express");
const router = express.Router();
const User = require("../models/user"); // تم تعديل المسار ليطابق اسم الملف لديكِ

// 1- POST: إضافة مستخدم واحد باستخدام new User() و save()
router.post("/user/single", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            message: "Single user added successfully",
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2- POST: إضافة 5 مستخدمين (أو مجموعة مستخدمين) دفعة واحدة باستخدام insertMany()
router.post("/user", async (req, res) => {
    try {
        const user = await User.insertMany(req.body);
        res.status(201).json({
            message: "User added successfully",
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3- GET: استرجاع كل المستخدمين
router.get("/user", async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4- GET by ID: استرجاع مستخدم معين بواسطة الـ ID
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5- PATCH: تعديل بيانات مستخدم بواسطة الـ ID
router.patch("/user/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 6- DELETE: حذف مستخدم بواسطة الـ ID
router.delete("/user/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;