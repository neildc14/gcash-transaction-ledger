import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TransactionRequest from "../services/transactionRequest";
import {
  ArrowLeftIcon,
  CloseIcon,
  DashboardIcon,
} from "../components/SGVIcons";
import Authorization from "../utils/auth-credentials";
import { useAuth } from "../context/AuthContext";

const AddTransaction = () => {
  const [isSuccessful, setSuccessful] = useState(false);
  const transactionRequest = new TransactionRequest();

  const credentials = useAuth();
  const { token } = credentials || {};
  const headers = token ? Authorization(token) : null;
  const createTransactionMutation = useMutation({
    mutationFn: (new_transaction) =>
      transactionRequest.createTransaction(new_transaction, headers),
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

  const getFieldConfig = (attribute, textContent) => {
    return {
      attribute,
      textContent,
    };
  };

  const formFieldsAttributes = [
    getFieldConfig("customer", "Customer"),
    getFieldConfig("account_number", "Account Number"),
    getFieldConfig("sub_total", "Sub Total"),
    getFieldConfig("service_fee", "Service Fee"),
  ];

  const showSuccessfulMessage = () => {
    return (
      <div className="mx-2 p-4 flex justify-between items-center bg-violet-500 text-slate-50">
        <span>Successfully added transaction. </span>
        <button onClick={closeMessage}>
          <CloseIcon width={15} height={15} />
        </button>
      </div>
    );
  };

  return (
    <main className="pt-4 h-screen md:max-w-4xl md:mx-auto">
      <div className="mx-2">
        <div className="ps-6 py-8 pe-10 flex justify-between items-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 ">
          <h2 className="text-xl md:text-2xl  font-semibold text-slate-50">
            Add Transaction
          </h2>

          <DashboardIcon />
        </div>
        <div className="py-4">
          <button
            className="inline-flex gap-2 py-1 px-2 rounded-sm md:rounded-md bg-gray-200 text-lg font-semibold"
            onClick={goBackToPreviousPage}
          >
            <ArrowLeftIcon /> Back
          </button>
        </div>
        <hr />
      </div>

      {isSuccessful && showSuccessfulMessage()}

      <div className="pt-6 mx-8 md:max-w-2xl md:mx-auto md:pb-10">
        <form
          action=""
          className="flex flex-col gap-4 md:border md:p-10 md:rounded-md"
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
              className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm md:border-slate-300 "
              required
            >
              <option value="cash-in">Cash-in</option>
              <option value="cash-out">Cash-out</option>
              <option value="bank-transfer">Bank-transfer</option>
            </select>
          </div>
          {formFieldsAttributes?.map((form) => (
            <div key={form.attribute} className="flex flex-col gap-2">
              <label
                htmlFor={form.attribute}
                className="text-lg font-semibold text-slate-800"
              >
                {form.textContent}
              </label>
              <input
                type="text"
                name={form.attribute}
                required
                className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm  md:border-slate-300 "
              />
            </div>
          ))}

          <button className="mt-4 p-2 rounded-md active:outline focus:outline-blue-500 hover:bg-blue-600 border-b-2 shadow-sm bg-blue-500 text-slate-50 font-semibold text-xl">
            Add Transaction
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddTransaction;
