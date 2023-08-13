import Modal from "./Modal";

const UpdateTransactionModal = ({ modalOpen, closeModal }) => {
  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <h2 className="text-lg font-semibold mb-4">Update Transaction</h2>
      <form action="" className="flex flex-col gap-4">
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
    </Modal>
  );
};

export default UpdateTransactionModal;
