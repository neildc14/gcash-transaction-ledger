const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    transaction_type: {
      type: String,
      default: "cash-in",
      enum: ["cash-in", "cash-out", "bank-transfer"],
      required: true,
    },
    customer: { type: String, required: true },
    account_number: { type: String, required: true },
    service_fee: {
      type: Number,
      required: true,
    },
    sub_total: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
