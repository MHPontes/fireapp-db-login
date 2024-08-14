import React, { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e) {      // Função para fazer login no sistema passando por parametro o evento do formulário
    e.preventDefault();      // Previne o comportamento padrão do formulário que é recarregar a página ao enviar

    if(email !== '' && password !== '') {
      alert('Teste');
      } else {
        alert('Preencha os campos corretamente');
      }
  }

  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span>Gerencia sua agenda de forma facil.</span>

      <form className='form' onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          autoComplete='off'
          type="password" 
          placeholder="***********"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>

      <Link className="button-link" to="/register">Não tem uma conta? Cadastre-se</Link>

    </div>
  );
}

