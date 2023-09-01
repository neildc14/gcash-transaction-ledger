import Modal from "./Modal";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionRequest from "../services/transactionRequest";
import Authorization from "../utils/auth-credentials";
import { useAuth } from "../context/AuthContext";

const UpdateTransactionModal = ({
  modalOpen,
  closeModal,
  transaction_slip,
  setTransactionSlip,
}) => {
  const queryClient = useQueryClient();
  const transactionRequest = new TransactionRequest();
  const { credentials } = useAuth();
  const { token } = credentials || {};
  const headers = token ? Authorization(token) : null;

  const transactionMutation = useMutation({
    mutationFn: (updatedTransaction) => {
      transactionRequest.updateTransaction(
        updatedTransaction,
        transaction_slip?._id,
        headers
      );
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        import.meta.env.VITE_REACT_APP_TRANSACTION_KEY
      );
      queryClient.invalidateQueries(import.meta.env.VITE_REACT_APP_TOTAL_KEY);
      closeModal();
    },
  });

  const onHandleUpdateTransaction = (updatedTransactionEvent) => {
    updatedTransactionEvent.preventDefault();
    const { name, value } = updatedTransactionEvent.target;
    setTransactionSlip((prevTransactionSlip) => ({
      ...prevTransactionSlip,
      [name]: value,
    }));
  };

  const onSubmitTransaction = (transactionEvent) => {
    transactionEvent.preventDefault();
    const formData = new FormData(transactionEvent.currentTarget);
    const transactionData = Object.fromEntries(formData);
    transactionMutation.mutate(transactionData);
  };

  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <h2 className="text-lg font-semibold mb-4">Update Transaction</h2>
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={onSubmitTransaction}
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
            value={transaction_slip?.transaction_type}
            onChange={onHandleUpdateTransaction}
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
            value={transaction_slip?.customer}
            onChange={onHandleUpdateTransaction}
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
            value={transaction_slip?.account_number}
            onChange={onHandleUpdateTransaction}
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
            value={transaction_slip?.sub_total}
            onChange={onHandleUpdateTransaction}
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
            value={transaction_slip?.service_fee}
            onChange={onHandleUpdateTransaction}
            required
            className="p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm bg-blue-500 text-slate-50 font-semibold text-xl"
        >
          Update Transaction
        </button>
      </form>
    </Modal>
  );
};

UpdateTransactionModal.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  setTransactionSlip: PropTypes.func.isRequired,
  transaction_slip: PropTypes.object.isRequired,
};
export default UpdateTransactionModal;
