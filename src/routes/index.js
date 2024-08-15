import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Admin  from "../pages/Admin";

import Private from "./Private";



function RoutesApp() {
  // Criando o componente RoutesApp que irá conter as rotas da aplicação
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Rotas */}
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Private> <Admin /> </Private>} />   {/* Envolvendo Admin, para proteger a rota */}
    </Routes>
  );
}

export default RoutesApp;
