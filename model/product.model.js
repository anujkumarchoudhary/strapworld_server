const mongoose = require("mongoose");

const HeadingPartSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    color: String,
    style: String,
    weight: String,
  },
  { _id: false }
);

const LabelSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    color: String,
    bgColor: String,
  },
  { _id: false }
);

const ProductImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ProductOverviewSchema = new mongoose.Schema(
  {
    label: String,
    aspectRatio: String,
    image: String,

    headingParts: {
      type: [HeadingPartSchema],
      default: [],
    },

    description: {
      type: [String],
      default: [],
    },

    labels: {
      type: [LabelSchema],
      default: [],
    },

    slides: {
      type: [ProductImageSchema],
      default: [],
    },

    button: String,
  },
  { _id: false }
);

const SpecificationSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      required: true,
    },

    thickness: {
      type: String,
      required: true,
    },

    length: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
    },

    averageBreakLoad: {
      type: String,
      required: true,
    },

    remarks: String,
  },
  { _id: false }
);

const TechnicalOverviewSchema = new mongoose.Schema(
  {
    label: String,
    aspectRatio: String,
    image: String,

    headingParts: {
      type: [HeadingPartSchema],
      default: [],
    },

    description: {
      type: [String],
      default: [],
    },

    labels: {
      type: [LabelSchema],
      default: [],
    },

    list: {
      type: [SpecificationSchema],
      default: [],
    },

    button: String,
  },
  { _id: false }
);

const RelatedProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { _id: false }
);

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const FAQDataSchema = new mongoose.Schema(
  {
    label: String,

    headingParts: {
      type: [HeadingPartSchema],
      default: [],
    },

    list: {
      type: [FAQSchema],
      default: [],
    },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    // Basic product information

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    button: {
      type: String,
      default: "View Product",
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      required: true,
    },

    labels: {
      type: [String],
      default: [],
    },

    // Product detail page

    productOverview: {
      type: ProductOverviewSchema,
    },

    technicalOverview: {
      type: TechnicalOverviewSchema,
    },

    // Only store IDs, not complete duplicated products

    relatedProducts: {
      type: [RelatedProductSchema],
      default: [],
    },

    faqData: {
      type: FAQDataSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;