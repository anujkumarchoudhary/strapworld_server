const express = require("express");

const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getEnquiries);
router.get("/:id", getEnquiryById);
router.patch("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);

module.exports = router;