import React from "react";
// Importa a modal do react-modal
import Modal from "react-modal";
import { AiOutlineClose, AiOutlineFileAdd } from "react-icons/ai";
import NewProntuario from "../Forms/NewProntuario";

Modal.setAppElement("#root");

const FirstDocument = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // Função que abre a modal
  function abrirModal() {
    setIsOpen(true);
  }
  // Função que fecha a modal
  function fecharModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={abrirModal} className="ModalFirstDocument">
        <AiOutlineFileAdd />
      </button>
      <Modal
        className="modalStyle"
        overlayClassName="modal-overlay"
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
      >
        <div className="topModal">
          <div></div>
          <button onClick={fecharModal}>
            <AiOutlineClose />
          </button>
        </div>
        <NewProntuario />
      </Modal>
    </div>
  );
};

export default FirstDocument;
