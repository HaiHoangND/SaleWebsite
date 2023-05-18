const express = require("express");
const {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon
} = require("../controller/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createCoupon);
router.post("/", createCoupon);
// router.get("/", authMiddleware, isAdmin, getAllCoupons );
router.get("/", getAllCoupons);
// router.put("/:id", authMiddleware, isAdmin, updateCoupon );
router.put("/:id", updateCoupon);
// router.delete("/:id", authMiddleware, isAdmin, deleteCoupon );
router.delete("/:id", deleteCoupon);

module.exports = router;