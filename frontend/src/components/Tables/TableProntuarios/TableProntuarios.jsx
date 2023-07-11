import React, { useEffect, useState } from "react";

import Moment from "react-moment";

import Swal from "sweetalert2";

import axios from "axios";
import { api } from "../../../services/api";

import ModalProntuario from "../../Modal/ModalProntuario";
import FirstDocument from "../../Modal/ModalFirstDocument";

import { NavLink } from "react-router-dom";

import { BiFileFind } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const TableProntuarios = () => {
  const [profile, setProfile] = useState({});

  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");

  const [busca, setBusca] = useState("");

  const [page, setPage] = useState("");
  const [lastPage, setLastPage] = useState("");

  const [mensagemService, setMensagemService] = useState("");
  const [mensagem, setMensagem] = useState("");

  const getProntuarios = async (page) => {
    if (page === undefined) {
      page = 1;
    }

    setPage(page);

    await api
      .get(`/list-prontuario?page=${page}`)

      .then((response) => {
        setUrl(response.data.url);
        setData(
          response.data.prontuarios.sort((a, b) => a.name.localeCompare(b.name))
        );
        setLastPage(response.data.pagination.lastPage);
      })
      .catch((err) => {
        if (err.response) {
          // Atribuir a mensagem no state message
          setMensagemService(err.response.data.mensagem);
        } else {
          // Atribuir a mensagem no state message
          setMensagem("Erro: Tente mais tarde!");
        }
      });
  };

  const handleConfirm = (id) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este usuário?",
      text: "Você não poderá reverter isso!",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/deleteFiles/${id}`);
        Swal.fire("Usuário Apagado!", "", "success");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setProfile(user);

    getProntuarios();
  }, []);

  return (
    <div>
      <div className="search">
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar Arquivo"
        />
        <button className="svgIamge">
          <AiOutlineSearch />
        </button>
      </div>
      <div className="container-table">
        <ModalProntuario />
        <h1>Prontuários</h1>

        <table className="customTable">
          <thead>
            <tr>
              <th className="head-title">Nome</th>
              <th className="head-title">Tipo do documento</th>
              <th className="head-title">Documento</th>
              <th className="head-title">Código do documento</th>
              <th className="head-title">Adicionado em</th>
              <th className="head-title">Horário</th>
            </tr>
          </thead>
          <tbody className="tbody-Style">
            {data
              .filter((file) => {
                return busca.toLocaleLowerCase() === ""
                  ? file
                  : file.name.toLocaleLowerCase().includes(busca) ||
                      file.documentType.toLocaleLowerCase().includes(busca) ||
                      file.documentCode.toLocaleLowerCase().includes(busca) ||
                      file.image.toLocaleLowerCase().includes(busca);
              })
              .map((file) => (
                <tr key={file.id}>
                  <td className="trash-icon">{file.name}</td>
                  <td className="trash-icon">{file.documentType}</td>
                  <td className="trash-icon">
                    <a href={url + file.image} target="blank">
                      {file.image}
                    </a>
                  </td>
                  <td className="trash-icon">
                    <p>{file.documentCode}</p>
                  </td>
                  <td className="trash-icon">
                    <Moment format="DD/MM/YYYY">{file.updatedAt}</Moment>
                  </td>
                  <td>
                    <Moment format=" h:mm">{file.updatedAt}</Moment>
                  </td>
                  {profile.permissions === "Administrador" ||
                  profile.permissions === "Gerente" ? (
                    <td className="trash-icon">
                      <button
                        title="APAGAR PRONTUÁRIO!"
                        className="delete-btn"
                        onClick={() => handleConfirm(file.id)}
                      >
                        <BiTrash />
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}

                  <td className="trash-icon">
                    <button title="VIZUALIZAR DOCUMENTO!" className="editbtn">
                      <NavLink to={`/vizualizar-documento/${file.id}`}>
                        <BiFileFind />
                      </NavLink>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="custom">
          {mensagemService ? (
            <button className="message-add">
              <FirstDocument />
              <p>{mensagemService}</p>
            </button>
          ) : (
            ""
          )}

          {mensagem ? <span className="message-error">{mensagem}</span> : ""}
        </div>
        <div className="buttonPagination">
          {page !== 1 ? (
            <button type="button" onClick={() => getProntuarios(1)}>
              Primeira
            </button>
          ) : (
            <button type="button" disabled>
              Primeira
            </button>
          )}{" "}
          {page !== 1 ? (
            <button type="button" onClick={() => getProntuarios(page - 1)}>
              {page - 1}
            </button>
          ) : (
            ""
          )}{" "}
          <button type="button" disabled>
            {page}
          </button>{" "}
          {page + 1 <= lastPage ? (
            <button type="button" onClick={() => getProntuarios(page + 1)}>
              {page + 1}
            </button>
          ) : (
            ""
          )}{" "}
          {page !== lastPage ? (
            <button type="button" onClick={() => getProntuarios(lastPage)}>
              Última
            </button>
          ) : (
            <button type="button" disabled>
              Última
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default TableProntuarios;
