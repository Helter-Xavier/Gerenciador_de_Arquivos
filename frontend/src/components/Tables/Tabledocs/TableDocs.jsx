import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Moment from "react-moment";

import Swal from "sweetalert2";

import axios from "axios";
import { api } from "../../../services/api";

import { AiOutlineSearch } from "react-icons/ai";
import { BiFileFind, BiTrash } from "react-icons/bi";

import ModalNewDocument from "../../Modal/ModalNewDocument";
import ModalFirstDocument from "../../Modal/ModalFirstDocument";

const TableDocs = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [busca, setBusca] = useState("");
  const [profile, setProfile] = useState({});
  const [mensagemService, setMensagemService] = useState("");
  const [mensagem, setMensagem] = useState("");

  //Paginação
  const [page, setPage] = useState("");
  const [lastPage, setLastPage] = useState("");

  const getImages = async (page) => {
    if (page === undefined) {
      page = 1;
    }

    setPage(page);

    await api
      .get(`/list-files?page=${page}`)

      .then((response) => {
        setUrl(response.data.url);
        //Documentos em ordem alfabética
        setData(
          response.data.files.sort((a, b) => a.name.localeCompare(b.name))
        );
        setLastPage(response.data.pagination.lastPage);
      })
      .catch((err) => {
        if (err.response) {
          setMensagemService(err.response.data.mensagem);
        } else {
          setMensagem("Erro: Tente mais tarde!");
        }
      });
  };

  //Confirm Delete
  const handleConfirm = async (id) => {
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

    getImages();
  }, []);

  return (
    <div>
      <div className="container-table">
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
          <ModalNewDocument />
          <h1>Arquivos do Sistema</h1>

          <table className="customTable">
            <thead>
              <tr>
                <th className="head-title">Nome</th>
                <th className="head-title">Tipo do documento</th>
                <th className="head-title">Documento</th>
                <th className="head-title">Código do documento</th>
                <th className="head-title">Data</th>
                <th className="head-title">Adicionado em</th>
                <th></th>
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
                    <td>{file.name}</td>
                    <td className="title-docs">{file.documentType}</td>
                    <td>
                      <span>
                        <a href={url + file.image} target="blank">
                          {file.image}
                        </a>
                      </span>
                    </td>
                    <td className="trash-icon">{file.documentCode}</td>
                    <td className="trash-icon">
                      <Moment format="DD/MM/YYYY">{file.documentDate}</Moment>
                    </td>
                    <td>
                      <span>
                        <Moment format="DD/MM/YYYY">{file.createdAt}</Moment>
                      </span>
                    </td>

                    {profile.permissions === "administrador" ||
                    profile.permissions === "supervisor" ? (
                      <td className="trash-icon">
                        <button
                          title="APAGAR DOCUMENTO!"
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
                      <button title="VISUALIZAR DOCUMENTO!" className="editbtn">
                        <NavLink to={`/visualizar-documento/${file.id}`}>
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
                <ModalFirstDocument />
                <p>{mensagemService}</p>
              </button>
            ) : (
              ""
            )}

            {mensagem ? <span className="message-error">{mensagem}</span> : ""}
          </div>
          <div className="buttonPagination">
            {page !== 1 ? (
              <button type="button" onClick={() => getImages(1)}>
                Primeira
              </button>
            ) : (
              <button type="button" disabled>
                Primeira
              </button>
            )}{" "}
            {page !== 1 ? (
              <button type="button" onClick={() => getImages(page - 1)}>
                {page - 1}
              </button>
            ) : (
              ""
            )}{" "}
            <button type="button" disabled>
              {page}
            </button>{" "}
            {page + 1 <= lastPage ? (
              <button type="button" onClick={() => getImages(page + 1)}>
                {page + 1}
              </button>
            ) : (
              ""
            )}{" "}
            {page !== lastPage ? (
              <button type="button" onClick={() => getImages(lastPage)}>
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
    </div>
  );
};

export default TableDocs;
