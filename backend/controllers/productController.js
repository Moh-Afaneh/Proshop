import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    products,
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "product not found",
    });
  }
});
export const productDelete = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.status(201).json({
      message: "product Removed",
      product,
    });
  } else {
    res.status(404).json({
      message: "product not found",
    });
  }
});
export const productCreate = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    category: "Sample category",
    brand: "Sample brand",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json({
    createdProduct,
  });
});
export const productUpdate = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const {
    name,
    price,
    user,
    image,
    category,
    countInStock,
    numReviews,
    descripation,
  } = req.body;
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.category = category;
    product.brand = category;
    product.countInStock = countInStock;
    product.descripation = descripation;
    const updatedProduct = await product.save();
    res.status(201).json({
      message: "Product updated",
      updatedProduct,
    });
  } else {
    res.status(401).json({
      message: "Product not updated",
      updatedProduct: null,
    });
  }
});
export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, review } = req.body;
  if (product) {
  } else {
    res.status(401).json({
      message: "Product not updated",
      updatedProduct: null,
    });
  }
});
