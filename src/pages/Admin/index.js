import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConnection";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./admin.css";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState(""); //useState para armazenar o valor do input de tarefa
  const [user, setUser] = useState({}); //useState para armazenar o id do usuário
  const [edit, setEdit] = useState({}); //useState para armazenar o valor do input de edição

  const [tarefas, setTarefas] = useState([]); //useState para armazenar as tarefas do usuário em lista

  useEffect(() => {
    //useEffect é um hook que executa uma função sempre que o componente é renderizado

    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser"); //Pegando o id do usuário no localStorage
      setUser(JSON.parse(userDetail)); //Setando o id do usuário no useState user

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefasRef = collection(db, "tarefas"); //Referência da coleção tarefas

        const q = query(
          tarefasRef,
          where("userUid", "==", data?.uid), //Query para filtrar as tarefas do usuário logado
          orderBy("created", "desc") //Ordenando as tarefas pela data de criação
        );

        const unsub = onSnapshot(q, (snapshot) => {
          //onSnapshot é um método que escuta as mudanças em tempo real no banco de dados e executa uma função sempre que há uma mudança
          let listaTarefas = []; //Criando uma lista vazia para armazenar as tarefas

          snapshot.forEach((doc) => {
            //forEach é um método que percorre cada documento da coleção
            listaTarefas.push({
              id: doc.id, //Adicionando o id do documento na lista
              tarefa: doc.data().tarefa, //Adicionando a tarefa do documento na lista
              userUid: doc.data().userUid, //Adicionando o id do usuário do documento na lista
            });
          });

          setTarefas(listaTarefas); //Setando a lista de tarefas no useState tarefas}
        });
      }
    }
    loadTarefas(); //Chamando a função getTarefas
  }, []);

  async function handleRegister(e) {
    //Função para registrar a tarefa no localStorage ao clicar no botão com onSubmit
    e.preventDefault(); //Prevenindo o comportamento padrão do formulário pois não queremos que a página seja recarregada

    if (tarefaInput === "") {
      //Se o input de tarefa estiver vazio, exibe um alerta pedindo para preencher o campo
      alert("Preencha o campo de tarefa!");
      return;
    }

    if (edit.id) {
      //Se o objeto edit tiver um id, chama a função handleUpdateTarefa
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      //addDoc é um método que adiciona um documento a uma coleção
      tarefa: tarefaInput, //Adicionando a tarefa no documento
      created: new Date(), //Adicionando a data de criação da tarefa no documento
      userUid: user?.uid, //Adicionando o id do usuário no documento, se vier vazio?, não adiciona nada e não dá erro
    })
      .then(() => {
        console.log("Tarefa registrada com sucesso!");
        setTarefaInput("");
      })
      .catch((error) => {
        console.log("Erro ao registrar tarefa" + error);
      });
  }

  async function handleLogout() {
    //Função para deslogar o usuário ao clicar no botão de sair
    await signOut(auth); //signOut é um método que desloga o usuário
  }

  async function deleteTarefa(id) {
    //Função para deletar a tarefa ao clicar no botão de concluir
    const docRef = doc(db, "tarefas", id); //Referência do documento que será deletado
    await deleteDoc(docRef); //deleteDoc é um método que deleta um documento
  }

  function editarTarefa(item) {
    //Função para editar a tarefa ao clicar no botão de editar
    setTarefaInput(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit.id); //Referência do documento que será atualizado
    await updateDoc(docRef, {
      tarefa: tarefaInput,
    })
      .then(() => {
        console.log("Tarefa atualizada com sucesso!");
        setTarefaInput("");
        setEdit({});
      })
      .catch((error) => {
        console.log("Erro ao atualizar tarefa" + error);
        setTarefaInput("");
        setEdit({});
      });
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

        {Object.keys(edit).length > 0 ? ( //Object.keys retorna um array com as chaves de um objeto, se o objeto edit tiver mais de 0 chaves, exibe o botão de atualizar tarefa
          <button
            className="btn-register"
            style={{ backgroundColor: "#6add39" }}
            type="submit"
          >
            Atualizar tarefa
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Registrar tarefa
          </button>
        )}
      </form>

      {tarefas.map((item) => (
        //Mapeando a lista de tarefas para exibir na tela
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>

          <div>
            <button onClick={() => editarTarefa(item)} className="btn-edit">
              Editar
            </button>
            <button
              onClick={() => deleteTarefa(item.id)}
              className="btn-delete"
            >
              Concluir
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
