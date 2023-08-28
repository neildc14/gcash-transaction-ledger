import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchTransactions from "../services/fetchTransactions";
import ViewTransactionModal from "../components/ViewTransactionModal";
import UpdateTransactionModal from "../components/UpdateTransactionModal";
import DeleteTransactionModal from "../components/DeleteTransactionModal";

const Transactions = () => {
  const [transaction_results, setTransactionResults] = useState([]);
  const [transaction_slip, setTransactionSlip] = useState({});

  const {
    data: transactions_data,
    error,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  useEffect(() => {
    setTransactionResults(transactions_data);
  }, [transactions_data]);

  const clickTabeMenu = (e) => {
    const tabValue = e.target.value.toLocaleLowerCase();

    switch (tabValue) {
      case "all":
        setTransactionResults(transactions_data);
        break;
      case "cash-in":
        setTransactionResults(filterByTabMenu(tabValue));
        break;
      case "cash-out":
        setTransactionResults(filterByTabMenu(tabValue));
        break;
      case "bank-transfer":
        setTransactionResults(filterByTabMenu(tabValue));
        break;

      default:
        null;
        break;
    }
  };

  function filterByTabMenu(tabValue) {
    return transactions_data?.filter(
      (transaction) =>
        transaction.transaction_type === tabValue.toLocaleLowerCase()
    );
  }

  const searchTransaction = (searchEvent) => {
    searchEvent.preventDefault();
    const searchValue = searchEvent.target.value;

    // Remove spaces from the search value
    const searchWithoutSpaces = searchValue.replace(/\s+/g, "");

    // Create a pattern that allows for partial matches
    const pattern = searchWithoutSpaces
      .split("")
      .map((char) => `${char}.*`)
      .join("");

    const regex = new RegExp(pattern, "i");

    let searchResults = transactions_data.filter((transaction) =>
      regex.test(transaction.customer)
    );

    setTransactionResults(searchResults);
  };

  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const openViewModal = () => {
    setModalViewOpen(true);
  };

  const closeViewModal = () => {
    setModalViewOpen(false);
  };
  const openUpdateModal = () => {
    setModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setModalUpdateOpen(false);
  };
  const openDeleteModal = () => {
    setModalDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDeleteOpen(false);
  };

  return (
    <>
      <main className="pt-4 h-screen ">
        <div className="mx-2">
          <div className="ps-6 py-8 pe-10 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
            <h2 className="text-xl font-semibold text-slate-50">
              GCash Transactions
            </h2>
            <svg
              width={66}
              height={66}
              fill="#fcfcfc"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.8 4.8a2.4 2.4 0 0 0-2.4 2.4V12a2.4 2.4 0 0 0 2.4 2.4V7.2h12a2.4 2.4 0 0 0-2.4-2.4H4.8ZM7.2 12a2.4 2.4 0 0 1 2.4-2.4h9.6a2.4 2.4 0 0 1 2.4 2.4v4.8a2.4 2.4 0 0 1-2.4 2.4H9.6a2.4 2.4 0 0 1-2.4-2.4V12Zm7.2 4.8a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="pt-4 flex justify-evenly">
          <input
            type="button"
            className=" focus:text-blue-600 focus:font-semibold"
            value="All"
            onClick={clickTabeMenu}
          />
          <input
            type="button"
            className=" focus:text-blue-600 focus:font-semibold"
            value="Cash-in"
            onClick={clickTabeMenu}
          />
          <input
            type="button"
            className=" focus:text-blue-600 focus:font-semibold"
            value="Cash-out"
            onClick={clickTabeMenu}
          />
          <input
            type="button"
            className=" focus:text-blue-600 focus:font-semibold"
            value="Bank-transfer"
            onClick={clickTabeMenu}
          />
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
                    {" "}
                    {transaction.total}
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
                    <svg
                      width={25}
                      height={25}
                      fill="none"
                      stroke="#484747"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.121 14.121A3 3 0 1 0 9.88 9.88a3 3 0 0 0 4.242 4.242Z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
                    </svg>
                  </button>
                  <button
                    className="h-0"
                    onClick={() => {
                      openUpdateModal();
                      setTransactionSlip(transaction);
                    }}
                  >
                    <svg
                      width={25}
                      height={25}
                      fill="none"
                      stroke="#484747"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m15.232 5.232 3.536 3.536m-2.036-5.036a2.5 2.5 0 0 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732Z" />
                    </svg>
                  </button>
                  <button
                    className="h-0"
                    onClick={() => {
                      openDeleteModal();
                      setTransactionSlip(transaction);
                    }}
                  >
                    <svg
                      width={25}
                      height={25}
                      fill="none"
                      stroke="#484747"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 11v6m4-6v6M4 7h16m-1 0-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7h14Zm-4 0V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3h6Z" />
                    </svg>
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

export default Transactions;
