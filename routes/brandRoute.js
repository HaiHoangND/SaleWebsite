const express = require("express");
const {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createBrand);
router.post("/", createBrand);
// router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.put("/:id", updateBrand);
// router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);

module.exports = router;