import ReactModal from "react-modal";

// Stelle sicher, dass das Modal-Element an den Body angehängt wird.
ReactModal.setAppElement("#__next");

//STYLES
import styles from '../../styles/Modal.module.css'

const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      className={styles.container}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
