const express = require("express");
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require("../controller/blogCatCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createCategory);
router.post("/", createCategory);
// router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.put("/:id", updateCategory);
// router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);

module.exports = router;