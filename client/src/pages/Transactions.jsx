import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ViewTransactionModal from "../components/ViewTransactionModal";
import UpdateTransactionModal from "../components/UpdateTransactionModal";
import DeleteTransactionModal from "../components/DeleteTransactionModal";
import TransactionRequest from "../services/transactionRequest";
import {
  DeleteIcon,
  MoneyIcon,
  UpdateIcon,
  ViewIcon,
} from "../components/SGVIcons";
import Authorization from "../utils/auth-credentials";
import { useAuth } from "../context/AuthContext";
import useModal from "../hooks/useModal";

const Transactions = () => {
  const [transaction_results, setTransactionResults] = useState([]);
  const [transaction_slip, setTransactionSlip] = useState({});
  const transactionRequest = new TransactionRequest();
  const transactionsLocation = useLocation();

  const { credentials } = useAuth();
  const { token } = credentials || {};
  const headers = token ? Authorization(token) : null;

  const {
    data: transactions_data,
    error,
    isError,
  } = useQuery({
    queryKey: [import.meta.env.VITE_REACT_APP_TRANSACTION_KEY],
    queryFn: () => {
      return transactionRequest.getAllTransactions(headers);
    },
    enabled: !!headers,
  });

  const filterByTabMenu = useCallback(
    function (tabValue) {
      return transactions_data?.filter(
        (transaction) =>
          transaction.transaction_type === tabValue.toLocaleLowerCase()
      );
    },
    [transactions_data]
  );

  useEffect(() => {
    setTransactionResults(transactions_data);
  }, [transactions_data]);

  useEffect(() => {
    if (transactionsLocation.state === "all") {
      setTransactionResults(transactions_data);
      return;
    }

    if (transactionsLocation.state !== null) {
      const filteredResults = filterByTabMenu(transactionsLocation.state);
      setTransactionResults(filteredResults);
    }
  }, [transactionsLocation, filterByTabMenu, transactions_data]);

  const clickTabMenu = (tabEvent) => {
    const tabValue = tabEvent.target.value.toLowerCase();
    let filteredResults = transactions_data;

    if (tabValue !== "all") {
      filteredResults = filterByTabMenu(tabValue);
    }

    setTransactionResults(filteredResults);
  };

  const searchPattern = (searchValue) => {
    const searchWithoutSpaces = searchValue.replace(/\s+/g, "");
    const pattern = searchWithoutSpaces
      .split("")
      .map((char) => `${char}.*`)
      .join("");

    const regexPattern = new RegExp(pattern, "i");
    return regexPattern;
  };

  const searchTransaction = (searchEvent) => {
    searchEvent.preventDefault();
    const searchValue = searchEvent.target.value;
    const regexPattern = searchPattern(searchValue);

    const searchResults = transactions_data.filter((transaction) =>
      regexPattern.test(transaction.customer)
    );

    setTransactionResults(searchResults);
  };

  const [modalViewOpen, openViewModal, closeViewModal] = useModal();
  const [modalUpdateOpen, openUpdateModal, closeUpdateModal] = useModal();
  const [modalDeleteOpen, openDeleteModal, closeDeleteModal] = useModal();

  const tabMenus = ["All", "Cash-In", "Cash-Out", "Bank-Transfer"];

  return (
    <>
      <main className="pt-4 h-screen md:max-w-4xl md:mx-auto">
        <div className="mx-2 ">
          <div className="ps-6 py-8 pe-10 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
              GCash Transactions
            </h2>
            <MoneyIcon />
          </div>
        </div>
        <div className="pt-4 flex justify-evenly">
          {tabMenus?.map((tabmenu) => (
            <input
              key={tabmenu}
              type="button"
              className={`${
                transactionsLocation?.state === tabmenu.toLowerCase() &&
                "text-blue-600 font-semibold "
              }focus:text-blue-600 focus:font-semibold cursor-pointer`}
              value={tabmenu}
              onClick={clickTabMenu}
            />
          ))}
        </div>
        <div className="mt-10 w-100 flex gap-4 mx-2">
          <input
            type="search"
            name="search"
            id=""
            placeholder="Search transaction"
            className="w-full p-2 outline outline-blue-500 rounded-md"
            onChange={searchTransaction}
          />
          <input
            type="submit"
            value="Search"
            className="px-4 rounded-md bg-blue-500 text-slate-50 "
          />
        </div>

        <section className="mt-10  px-2  ">
          {!isError &&
            transaction_results?.map((transaction) => (
              <div
                key={transaction._id}
                className="z-10 mb-2 flex  justify-between px-2 py-2 rounded-md shadow-sm bg-white border-b-2 border border-l-4 border-l-blue-500"
              >
                <div>
                  <p className="font-semibold text-lg text-blue-900">
                    {transaction.customer[0].toLocaleUpperCase() +
                      transaction.customer.slice(1)}
                  </p>
                  <p className="text-semibold text-base text-slate-500">
                    {transaction.transaction_type.toLocaleUpperCase()}
                  </p>
                  <p className=" text-base text-slate-500">
                    <span>&#8369;</span>
                    {transaction.total.toLocaleString()}.00
                  </p>
                </div>

                <div className="flex self-start  gap-3 ">
                  <button
                    className="h-0"
                    onClick={() => {
                      openViewModal();
                      setTransactionSlip(transaction);
                    }}
                  >
                    <ViewIcon />
                  </button>
                  <button
                    className="h-0"
                    onClick={() => {
                      openUpdateModal();
                      setTransactionSlip(transaction);
                    }}
                  >
                    <UpdateIcon />
                  </button>
                  <button
                    className="h-0"
                    onClick={() => {
                      openDeleteModal();
                      setTransactionSlip(transaction);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          {isError ||
            (transaction_results?.length === 0 && (
              <div className=" px-2 py-6 rounded-md shadow-sm bg-white border-l-4 border border-l-red-500">
                <p>{error}</p>
                <p>No Transactions Found</p>
              </div>
            ))}
        </section>
      </main>
      <ViewTransactionModal
        transaction_slip={transaction_slip}
        modalOpen={modalViewOpen}
        closeModal={closeViewModal}
      />
      <UpdateTransactionModal
        transaction_slip={transaction_slip}
        modalOpen={modalUpdateOpen}
        setTransactionSlip={setTransactionSlip}
        closeModal={closeUpdateModal}
      />
      <DeleteTransactionModal
        transaction_slip={transaction_slip}
        modalOpen={modalDeleteOpen}
        closeModal={closeDeleteModal}
      />
    </>
  );
};

// UpdateTransactionModal.propTypes = {
//   modalOpen: PropTypes.func.isRequired,
//   closeModal: PropTypes.func.isRequired,
//   setTransactionSlip: PropTypes.func.isRequired,
// };

export default Transactions;
