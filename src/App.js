import { BrowserRouter } from "react-router-dom";    // Importando o BrowserRouter para utilizar as rotas da aplicação 
import RoutesApp from "./routes";    // Importando o componente RoutesApp que contém as rotas da aplicação


export default function App() {
  return (
    <BrowserRouter>     {/* Utilizando o BrowserRouter para englobar as rotas da aplicação */}
      <RoutesApp />     {/* Utilizando o componente RoutesApp que contém as rotas da aplicação */}
    </BrowserRouter>
  );
}
