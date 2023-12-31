const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getTransaction,
  postTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const requireAuth = require("../middlewares/auth");

router.use(requireAuth);

router.get("/", getAllTransactions);

router.get("/:id", getTransaction);

router.post("/", postTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;
