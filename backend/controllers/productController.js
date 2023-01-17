import asyncHandler from "express-async-handler";
import Product from "../Models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.count({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
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
// @desc    Fetch single product
// @route   DELETE /api/products/:id
// @access  private
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
// @desc    create single product
// @route   POST /api/products/:id
// @access  private
export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(401).json({
        message: "Product already reviewed",
        review: null,
      });
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(400).json({
      message: "Product not found",
      product: null,
    });
  }
});
// @desc    create single product
// @route   get /api/products/top
// @access  public
export const getTopRated = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  if (products) {
    res.status(201).json({
      products,
    });
  } else {
    res.status(400).json({
      message: "no top products",
      products: null,
    });
  }
});
