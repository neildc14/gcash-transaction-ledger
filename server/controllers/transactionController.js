const Transaction = require("../models/TransactionModel");
const mongoose = require("mongoose");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().exec();

    if (transactions.length === 0) {
      const error = { message: "No Transactions found!" };
      throw error;
    }
    console.log(transactions.length);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    let error;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID" };
      throw error;
    }
    const transaction = await Transaction.findOne({ _id: id }).exec();

    if (!transaction) {
      error = { message: "No Transaction found!" };
      throw error;
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postTransaction = async (req, res) => {
  const { transaction_type, customer, account_number, service_fee, sub_total } =
    req.body;

  try {
    let error;

    const newTransaction = await Transaction.create({
      transaction_type,
      customer: customer,
      account_number,
      service_fee: Number(service_fee),
      sub_total: Number(sub_total),
      total: service_fee + sub_total,
    });

    if (!newTransaction) {
      error = { message: "Transaction failed!" };
      throw error;
    }

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { transaction_type, customer, account_number, service_fee, sub_total } =
    req.body;
  const filter = { _id: id };

  try {
    let error;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      error = { message: "Invalid ID" };
      throw error;
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(filter, {
      transaction_type,
      customer: customer,
      account_number,
      service_fee: Number(service_fee),
      sub_total: Number(sub_total),
      total: Number(service_fee) + Number(sub_total),
    });

    if (!updatedTransaction) {
      error = { message: "Failed to update transaction" };
      throw error;
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: id,
    }).exec();

    if (!deletedTransaction) {
      let error = { message: "Failed to delete transaction!" };
      throw error;
    }
    res.status(200).json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllTransactions,
  getTransaction,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
