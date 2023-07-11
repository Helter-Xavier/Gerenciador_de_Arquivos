import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Swal from "sweetalert2";

import axios from "axios";
import { api } from "../../../services/api";

import { BiTrash } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import ModalNewRegister from "../../Modal/ModalNewRegister";

const TablesUsers = () => {
  const [user, setUser] = useState([]);

  const [busca, setBusca] = useState("");

  const [mensagem, setMensagem] = useState("");

  //Paginação
  const [page, setPage] = useState("");

  const [lastPage, setLastPage] = useState("");

  //Lista de Usuários
  const getUsers = async (page) => {
    if (page === undefined) {
      page = 1;
    }

    setPage(page);

    await api
      .get(`/listUsers?page=${page}`)
      .then((response) => {
        setUser(
          response.data.users.sort((a, b) => a.name.localeCompare(b.name))
        );
        //Ultima Pagina
        setLastPage(response.data.pagination.lastPage);
      })
      .catch((err) => {
        if (err.response) {
          // Atribuir a mensagem no state message
          setMensagem(err.response.data.mensagem);
        } else {
          // Atribuir a mensagem no state message
          setMensagem("Erro: Tente mais tarde!");
        }
      });
  };
  //Confirm Delete
  const handleConfirm = (id) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este usuário?",
      text: "Você não poderá reverter isso!",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/deleteUsers/${id}`);
        Swal.fire("Usuário Apagado!", "", "success");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="search">
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar Usuário"
        />
        <button className="svgIamge">
          <AiOutlineSearch />
        </button>
      </div>
      <div className="container-table">
        <ModalNewRegister />
        <h1>Usuários do Sistema</h1>

        <table className="customTable">
          <thead>
            <tr>
              <th className="head-title">Nome</th>
              <th className="head-title">Email</th>
              <th className="head-title">Permissão</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="tbody-Style">
            {user
              .filter((user) => {
                return busca.toLocaleLowerCase() === ""
                  ? user
                  : user.name.toLocaleLowerCase().includes(busca) ||
                      user.email.toLocaleLowerCase().includes(busca) ||
                      user.permissions.toLocaleLowerCase().includes(busca);
              })
              .map((user) => (
                <tr key={user.id}>
                  <td className="trash-icon">{user.name}</td>
                  <td className="trash-icon">{user.email}</td>
                  <td className="trash-icon">{user.permissions}</td>
                  <td className="trash-icon">
                    <button
                      title="Apagar usuário!"
                      className="delete-btn"
                      onClick={() => handleConfirm(user.id)}
                    >
                      <BiTrash />
                    </button>
                  </td>
                  <td className="trash-icon">
                    <button className="editbtn">
                      <NavLink
                        title="Editar usuário!"
                        to={`/editar-usuario/${user.id}`}
                      >
                        <FaUserEdit />
                      </NavLink>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {mensagem ? <span className="message-error">{mensagem}</span> : ""}

        <div className="buttonPagination">
          {page !== 1 ? (
            <button type="button" onClick={() => getUsers(1)}>
              Primeira
            </button>
          ) : (
            <button type="button" disabled>
              Primeira
            </button>
          )}{" "}
          {page !== 1 ? (
            <button type="button" onClick={() => getUsers(page - 1)}>
              {page - 1}
            </button>
          ) : (
            ""
          )}{" "}
          <button type="button" disabled>
            {page}
          </button>{" "}
          {page + 1 <= lastPage ? (
            <button type="button" onClick={() => getUsers(page + 1)}>
              {page + 1}
            </button>
          ) : (
            ""
          )}{" "}
          {page !== lastPage ? (
            <button type="button" onClick={() => getUsers(lastPage)}>
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

export default TablesUsers;
