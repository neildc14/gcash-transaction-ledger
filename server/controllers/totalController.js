const TransactionModel = require("../models/TransactionModel");
const TRANSACTION_TYPES = {
  CASH_IN: "cash-in",
  CASH_OUT: "cash-out",
  BANK_TRANSFER: "bank-transfer",
};

const calculateTotalsPerTransactionType = (transactions) => {
  const totals = {
    [TRANSACTION_TYPES.CASH_IN]: { total: 0, profit: 0 },
    [TRANSACTION_TYPES.CASH_OUT]: { total: 0, profit: 0 },
    [TRANSACTION_TYPES.BANK_TRANSFER]: { total: 0, profit: 0 },
  };

  for (const transaction of transactions) {
    const type = transaction.transaction_type;
    totals[type].total += transaction.sub_total;
    totals[type].profit += transaction.service_fee;
  }

  return totals;
};

const getAllTotal = async (req, res) => {
  const filter = {user:req.user.id}
  try {
    const allTransactions = await TransactionModel.find(filter);

    const transactionTypeTotals =
      calculateTotalsPerTransactionType(allTransactions);

    const overallTotal = allTransactions.reduce(
      (acc, transaction) => acc + transaction.sub_total,
      0
    );
    const overallProfit = allTransactions.reduce(
      (acc, transaction) => acc + transaction.service_fee,
      0
    );

    const totalTransactions = [
      {
        title: "Overall",
        type: "all",
        total: overallTotal,
        profit: overallProfit,
      },
      ...Object.entries(transactionTypeTotals).map(
        ([type, { total, profit }]) => ({
          title: type.charAt(0).toUpperCase() + type.slice(1).replace("-", " "),
          type: type,
          total: total,
          profit: profit,
        })
      ),
    ];

    res.status(200).json(totalTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllTotal };
