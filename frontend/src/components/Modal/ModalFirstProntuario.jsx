import React from "react";
// Importa a modal do react-modal
import Modal from "react-modal";
import { AiOutlineClose, AiOutlineFileAdd } from "react-icons/ai";
import NewRecords from "../Forms/NewRecords";

// Código necessário para os recursos de acessibilidade
Modal.setAppElement("#root");

function ModalFirstProntuario() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // Função que abre a modal
  function abrirModal() {
    setIsOpen(true);
  }

  // Função que fecha a modal
  function fecharModal() {
    setIsOpen(false);
  }

  // Código JSX necessário para criar uma modal simples que abre e fecha
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
        <NewRecords />
      </Modal>
    </div>
  );
}

export default ModalFirstProntuario;
