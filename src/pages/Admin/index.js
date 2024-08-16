import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./admin.css";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");    //useState para armazenar o valor do input de tarefa
  const [user, setUser] = useState("");    //useState para armazenar o id do usuário

  useEffect(() => {   //useEffect é um hook que executa uma função sempre que o componente é renderizado 
    
    async function loadTarefas() {   
      const userDetail = localStorage.getItem("@detailUser");   //Pegando o id do usuário no localStorage
      setUser(JSON.parse(userDetail));   //Setando o id do usuário no useState user
    }
    
    loadTarefas();   //Chamando a função getTarefas
  }, []);


  async function handleRegister(e) {     //Função para registrar a tarefa no localStorage ao clicar no botão com onSubmit
    e.preventDefault();   //Prevenindo o comportamento padrão do formulário pois não queremos que a página seja recarregada

    if (tarefaInput === "") {   //Se o input de tarefa estiver vazio, exibe um alerta pedindo para preencher o campo
      alert("Preencha o campo de tarefa!");
      return;
    }

    await addDoc(collection(db, "tarefas"), {   //addDoc é um método que adiciona um documento a uma coleção
      tarefa: tarefaInput,   //Adicionando a tarefa no documento
      created: new Date(),   //Adicionando a data de criação da tarefa no documento
      userUid: user?.uid,   //Adicionando o id do usuário no documento, se vier vazio?, não adiciona nada e não dá erro 
    })
    .then(() => {
      console.log("Tarefa registrada com sucesso!");
      setTarefaInput("");
    })
    .catch((error) => {
      console.log("Erro ao registrar tarefa" + error);
    });
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
