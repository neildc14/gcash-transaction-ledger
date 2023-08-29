const TransactionModel = require("../models/TransactionModel");

const getAllTotal = async (req, res) => {
  let total = 0;
  let totalCashIn = 0;
  let totalCashOut = 0;
  let totalBankTransfer = 0;

  function totalPerTransactionType(transaction_type, value) {
    switch (transaction_type) {
      case "cash-in":
        totalCashIn += value;
        break;
      case "cash-out":
        totalCashOut += value;
        break;
      case "bank-transfer":
        totalBankTransfer += value;
        break;
    }
  }

  try {
    const allTransactions = await TransactionModel.find();

    if (allTransactions.length > 0) {
      for (let i = 0; i < allTransactions.length; i++) {
        total += allTransactions[i]["total"];

        totalPerTransactionType(
          allTransactions[i]["transaction_type"],
          allTransactions[i]["total"]
        );
      }
    }

    const totalTransactions = [
      { title: "Overall", type: "all", total: total },
      { title: "Total Cash-In", type: "cash-in", total: totalCashIn },
      { title: "Total Cash-Out", type: "cash-out", total: totalCashOut },
      {
        title: "Total Bank-Transfer",
        type: "bank-transfer",
        total: totalBankTransfer,
      },
    ];

    res.status(200).json(totalTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllTotal };
