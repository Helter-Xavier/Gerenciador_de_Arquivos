import React from "react";
// Importa a modal do react-modal
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import NewRegister from "../Forms/newRegister";

import newregister from "../../assets/new-register.png";

///compents dropdown
Modal.setAppElement("#root");

function ModalNewRegister() {
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
      <h2 className="uploadFile">Adicionar Usuário:</h2>
      <button onClick={abrirModal} className="btnOpenModal">
        <img src={newregister} alt="Foto de Perfil" width={130} />
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

        <NewRegister />
      </Modal>
    </div>
  );
}
export default ModalNewRegister;
