import React from "react";
// Importa a modal do react-modal
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import NewDoc from "../Forms/newDoc";

import accessmemoriespc from "../../assets/upload-na-nuvem.png";

// Código necessário para os recursos de acessibilidade
Modal.setAppElement("#root");

function ModalNewDocument() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // Função que abre a modal
  function abrirModal() {
    setIsOpen(true);
  }
  // Função que fecha a modal
  function fecharModal() {
    setIsOpen(false);
  }
  //Código JSX necessário para criar uma modal simples que abre e fecha
  return (
    <div>
      <h2 className="uploadFile">Carregar arquivo:</h2>
      <button onClick={abrirModal} className="btnOpenModal">
        <img src={accessmemoriespc} alt="Foto de Perfil" width={130} />
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
        <NewDoc />
      </Modal>
    </div>
  );
}

export default ModalNewDocument;
