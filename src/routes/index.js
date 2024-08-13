import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";

function RoutesApp() {
  // Criando o componente RoutesApp que irá conter as rotas da aplicação
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Rotas */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RoutesApp;
