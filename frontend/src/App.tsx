import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastroTarefa from "./components/CadastroTarefa";
import ListaTarefas from "./components/ListaTarefas";
import AlterarTarefa from "./components/AlterarTarefa";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/cadastrar">
                Cadastrar Tarefa
              </Link>
            </li>
            <li>
              <Link to="/pages/tarefa/alterar">
                Alterar Tarefa
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListaTarefas />} />
          <Route
            path="/pages/tarefa/listar"
            element={<ListaTarefas />}
          />
          <Route
            path="/pages/tarefa/cadastrar"
            element={<CadastroTarefa />}
          />
          <Route
            path="/pages/tarefa/alterar/:id"
            element={<AlterarTarefa />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
