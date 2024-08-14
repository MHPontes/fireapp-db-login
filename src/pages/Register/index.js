import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    // Função para fazer login no sistema passando por parametro o evento do formulário
    e.preventDefault(); // Previne o comportamento padrão do formulário que é recarregar a página ao enviar

    if (email !== "" && password !== "") {

      await createUserWithEmailAndPassword(auth, email, password)

        .then(() => {
          navigate("/admin", { replace: true }); // Redireciona para a rota /admin após o login com o replace: true para não permitir o usuário voltar para a tela de login
        })
        .catch(() => {
          console.log("Erro ao fazer o cadastro");
        });
    } else {
      alert("Preencha os campos corretamente");
    }
  }

  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta!</span>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          autoComplete="off"
          type="password"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>

      <Link className="button-link" to="/">
        Já possui uma conta? Faça o login!
      </Link>
    </div>
  );
}

