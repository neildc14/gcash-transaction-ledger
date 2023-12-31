import Modal from "./Modal";
import PropTypes from "prop-types";
const ViewTransactionModal = ({ modalOpen, closeModal, transaction_slip }) => {
  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <h2 className="text-xl font-semibold mb-4">
        Tran. Slip ID: {transaction_slip?._id?.slice(0, 8).toUpperCase()}
      </h2>
      <section>
        <p className="py-1 text-lg">
          <span className="font-semibold "> Account #: </span>
          <span className="text-gray-600">
            {transaction_slip?.account_number}
          </span>
        </p>
        <p className="py-1 text-lg">
          <span className="font-semibold "> Customer: </span>
          <span className="text-gray-600">{transaction_slip?.customer}</span>
        </p>
        <p className="py-1 text-lg">
          <span className="font-semibold "> Type: </span>
          <span className="text-gray-600">
            {transaction_slip?.transaction_type}
          </span>
        </p>
        <p className="py-1 text-lg">
          <span className="font-semibold "> Sub Total: </span>
          <span className="text-gray-600">
            {" "}
            <span>&#8369;</span>
            {transaction_slip?.sub_total}.00
          </span>
        </p>
        <p className="py-1 text-lg">
          <span className="font-semibold "> Service Fee: </span>
          <span className="text-gray-600">
            {" "}
            <span>&#8369;</span>
            {transaction_slip?.service_fee}.00
          </span>
        </p>
        <p className="py-1 text-lg">
          <span className="font-semibold "> Total: </span>
          <span className="text-gray-600">
            <span>&#8369;</span>
            {transaction_slip?.total}.00
          </span>
        </p>
        <button
          className="mt-4 p-2 w-full rounded-md active:outline focus:outline-blue-500 border-b-2 shadow-sm bg-blue-500 text-slate-50 font-semibold text-xl"
          onClick={closeModal}
        >
          Close
        </button>
      </section>
    </Modal>
  );
};

ViewTransactionModal.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  transaction_slip: PropTypes.object.isRequired,
};
export default ViewTransactionModal;
