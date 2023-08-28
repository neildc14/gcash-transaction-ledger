import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TransactionRequest from "../services/transactionRequest";

const AddTransaction = () => {
  const [isSuccessful, setSuccessful] = useState(false);
  const transactionRequest = new TransactionRequest();
  const createTransactionMutation = useMutation({
    mutationFn: (new_transaction) =>
      transactionRequest.createTransaction(new_transaction),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setSuccessful(true);
    },
  });

  const submitTransaction = (createEvent) => {
    createEvent.preventDefault();
    const formData = new FormData(createEvent.currentTarget);
    const transaction_slip = Object.fromEntries(formData);
    createTransactionMutation.mutate(transaction_slip);
  };

  const navigationHistory = useNavigate();
  const goBackToPreviousPage = () => {
    navigationHistory(-1);
  };

  const closeMessage = () => {
    setSuccessful(false);
  };

  const showSuccessfulMessage = () => {
    return (
      <div className="mx-2 p-4 flex justify-between items-center bg-violet-500 text-slate-50">
        <span>Successfully added transaction. </span>
        <button onClick={closeMessage}>
          <svg
            width={15}
            height={15}
            fill="none"
            stroke="#fcfcfc"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m6 6 12 12M6 18 18 6 6 18Z" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <main className="pt-4 h-screen ">
      <div className="mx-2">
        <div className="ps-6 py-8 pe-10 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
          <h2 className="text-xl font-semibold text-slate-50">
            Add Transaction
          </h2>

          <svg
            width={46}
            height={46}
            fill="none"
            stroke="#fcfcfc"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm10 0h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2ZM6 20h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" />
          </svg>
        </div>
        <div className="py-4">
          <button
            className=" py-1 px-6 rounded-sm bg-gray-200 text-lg font-semibold"
            onClick={goBackToPreviousPage}
          >
            Back
          </button>
        </div>
        <hr />
      </div>

      {isSuccessful && showSuccessfulMessage()}

      <div className="pt-6 mx-8">
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={submitTransaction}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="transaction_type"
              className="text-lg font-semibold text-slate-800"
            >
              Transaction Type
            </label>
            <select
              name="transaction_type"
              id=""
              className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm "
              required
            >
              <option value="cash-in">Cash-in</option>
              <option value="cash-out">Cash-out</option>
              <option value="bank-transfer">Bank-transfer</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="customer"
              className="text-lg font-semibold text-slate-800"
            >
              Customer
            </label>
            <input
              type="text"
              name="customer"
              required
              className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="account_number"
              className="text-lg font-semibold text-slate-800"
            >
              Account Number
            </label>
            <input
              type="text"
              name="account_number"
              required
              className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sub_total"
              className="text-lg font-semibold text-slate-800"
            >
              Sub Total
            </label>
            <input
              type="number"
              name="sub_total"
              required
              className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="service_fee"
              className="text-lg font-semibold text-slate-800"
            >
              Service Fee
            </label>
            <input
              type="number"
              name="service_fee"
              required
              className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm"
            />
          </div>
          <button className="mt-4 p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm bg-blue-500 text-slate-50 font-semibold text-xl">
            Add Transaction
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddTransaction;
