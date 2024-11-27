import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AltetarTarefa } from "../models/Tarefa";
import { Categoria } from "../models/Categoria";

function AlterarTarefa() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get<AltetarTarefa>(
          `http://localhost:5000/api/tarefas/buscar/${id}`
        )
        .then((resposta) => {
          setTitulo(resposta.data.titulo);
          setDescricao(resposta.data.descricao);
          buscarCategorias();
          setStatus(resposta.data.status);
        });
    }
  }, []);

  function buscarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }

  function enviarTarefa(event: any) {
    event.preventDefault();

    const tarefa: AltetarTarefa = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
      status: status,
    };

    axios
      .put(`http://localhost:5000/api/tarefas/alterar/${id}`, tarefa)
      .then((resposta) => {
        console.log(resposta.data);
      });

    navigate("/")
  }

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            required
            onChange={(event: any) => setTitulo(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            name="descricao"
            onChange={(event: any) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categorias</label>
          <select
            onChange={(e: any) => setCategoriaId(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option
                value={categoria.categoriaId}
                key={categoria.categoriaId}
              >
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            value={status}
            name="status"
            onChange={(event: any) => setStatus(event.target.value)}
          />
        </div>

        <button type="submit">Alterar Tarefa</button>
      </form>
    </div>
  );
}

export default AlterarTarefa;