import { Request, Response } from "express";
import Product from "../model/product.model";

// CREATE PRODUCT
export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    console.error("Create product error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await Product.find()
      .populate({
        path: "relatedProducts.productId",
        select: "title description button image labels slug",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

// GET SINGLE PRODUCT BY SLUG
export const getProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    }).populate({
      path: "relatedProducts.productId",
      select: "title description button image labels slug",
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error("Get product error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

// UPDATE PRODUCT BY SLUG
export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "relatedProducts.productId",
      select: "title description button image labels slug",
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error: any) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

// DELETE PRODUCT BY SLUG
export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await Product.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete product",
    });
  }
};