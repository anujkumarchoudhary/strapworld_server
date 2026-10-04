const express = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

// Get product by slug
router.get("/:slug", getProduct);

// Update product by slug
router.put("/:slug", updateProduct);

// Delete product by slug
router.delete("/:slug", deleteProduct);

module.exports = router;