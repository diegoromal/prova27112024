import { useEffect, useState } from "react";
import { Tarefa } from "../models/Tarefa";
import { Categoria } from "../models/Categoria";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastroTarefa() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState(0);

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  });

  function enviarTarefa(event: any) {
    event.preventDefault();

    const Tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
    };

    fetch("http://localhost:5000/api/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Tarefa),
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((Tarefa) => {
        console.log("Nova tarefa cadastrada", Tarefa);
      });

      navigate("/")
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
        <div>
          <label htmlFor="nome">Titulo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            required
            onChange={(event: any) => setTitulo(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            onChange={(event: any) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoria">Categorias</label>
          <select
            onChange={(event: any) => setCategoriaId(event.target.value)}
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

        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
}

export default CadastroTarefa;
