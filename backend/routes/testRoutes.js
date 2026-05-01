const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


// Protected Route
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});


// Admin Route
router.get(
  "/admin",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;
