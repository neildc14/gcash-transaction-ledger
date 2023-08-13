import Modal from "./Modal";

const DeleteTransactionModal = ({ modalOpen, closeModal }) => {
  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      Delete Modal
    </Modal>
  );
};

export default DeleteTransactionModal;
