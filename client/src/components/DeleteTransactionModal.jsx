import Modal from "./Modal";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionRequest from "../services/transactionRequest";
import Authorization from "../utils/auth-credentials";
import { useAuth } from "../context/AuthContext";

const DeleteTransactionModal = ({
  modalOpen,
  closeModal,
  transaction_slip,
}) => {
  const transactionRequest = new TransactionRequest();
  const queryClient = useQueryClient();

  const { credentials } = useAuth();
  const { token } = credentials || {};
  const headers = token ? Authorization(token) : null;
  const transactionMutation = useMutation({
    mutationFn: (transaction_id) =>
      transactionRequest.deleteTransaction(transaction_id, headers),
    onSuccess: () => {
      queryClient.invalidateQueries(
        import.meta.env.VITE_REACT_APP_TRANSACTION_KEY
      );
      queryClient.invalidateQueries(import.meta.env.VITE_REACT_APP_TOTAL_KEY);

      closeModal();
    },
  });

  const onHandleDeleteTransaction = (deleteEvent) => {
    deleteEvent.preventDefault();
    transactionMutation.mutate(transaction_slip._id);
  };
  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={onHandleDeleteTransaction}
      >
        <p>Are you sure that you want to delete this transaction?</p>
        <button className="mt-4 p-2 rounded-md active:outline focus:outline-red-500 border-b-2 shadow-sm bg-red-500 text-slate-50 font-semibold text-xl">
          Delete Transaction
        </button>
      </form>
    </Modal>
  );
};

DeleteTransactionModal.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  setTransactionSlip: PropTypes.func.isRequired,
  transaction_slip: PropTypes.object.isRequired,
};

export default DeleteTransactionModal;
