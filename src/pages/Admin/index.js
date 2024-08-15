import { useState } from "react";
import { auth } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import "./admin.css";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");    //useState para armazenar o valor do input de tarefa

  function handleRegister(e) {     //Função para registrar a tarefa no localStorage ao clicar no botão com onSubmit
    e.preventDefault();   //Prevenindo o comportamento padrão do formulário pois não queremos que a página seja recarregada

    alert("Tarefa registrada com sucesso!");
    setTarefaInput("");
  }

  async function handleLogout() {   //Função para deslogar o usuário ao clicar no botão de sair
    await signOut(auth);    //signOut é um método que des
    }

  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        <button className="btn-register" type="submit">Registrar tarefa</button>
      </form>

      <article className="list">
        <p>Estudar javascript e reactjs hoje a noite.</p>

        <div>
            <button className="btn-edit">Editar</button>
            <button className="btn-delete">Concluir</button>
        </div>
      </article>

      <button className="btn-logout" onClick={handleLogout}>Sair</button>


    </div>
  );
}
