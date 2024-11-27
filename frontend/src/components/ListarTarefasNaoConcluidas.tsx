import { useEffect, useState } from "react";
import axios from "axios";
import type { Tarefa } from "../models/Tarefa";
import { Link } from "react-router-dom";

function ListaTarefasNaoConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get<Tarefa[]>("http://localhost:5000/api/tarefas/naoconcluidas");
        setTarefas(response.data);
      } catch (error) {
        new Error("Erro ao buscar tarefas.");
      }
    };

    fetchTarefas();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefas) => (
            <tr key={tarefas.tarefaId}>
              <td>{tarefas.titulo}</td>
              <td>{tarefas.descricao}</td>
              <td>{tarefas.categoria?.nome}</td>
              <td>{tarefas.status}</td>
              <td>
                  <Link to={`/pages/tarefa/alterar/${tarefas.tarefaId}`}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaTarefasNaoConcluidas;
