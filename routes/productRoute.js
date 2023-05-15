const express = require("express");
const {
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating,
    uploadImages,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
    uploadPhoto,
    productImgResize
} = require("../middlewares/uploadImages");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createProduct);
router.post("/", createProduct);
router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);

// router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.put("/:id", updateProduct);
// router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProduct);

module.exports = router;