import { useState, useEffect } from "react";

import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from "react-router-dom";

export default function Private({ children }) {
  const [loading, setLoading] = useState(true);    //useState para verificar se a página está carregando
  const [signed, setSigned] = useState(false);     //useState para verificar se o usuário está logado

  useEffect(() => {
    //Usando UseEffect pois com o useEffect, podemos fazer a verificação de login do usuário assim que a página for carregada.
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        //onAuthStateChanged é um método que verifica se o usuário está logado ou não, e retorna um objeto com as informações do usuário.

        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };

          localStorage.setItem("@detailUser", JSON.stringify(userData)); //Salvando os dados do usuário no localStorage

          setSigned(true);
          setLoading(false);

        } else {
          setSigned(false);
          setLoading(false);
        }
      })
    }

    checkLogin();    //Chamando a função checkLogin para verificar se o usuário está logado se não estiver, ele será redirecionado para a página de login
  }, [])
  
  if (loading) {      //Se a página estiver carregando, será exibido a mensagem " Carregando... "
    return <div></div>;
  }


  if (!signed) {
    return <Navigate to="/" />;    //Se o usuário não estiver logado, ele será redirecionado para a página de login
  }

  return children;   //Se o usuário estiver logado, ele será redirecionado para a página que ele tentou acessar no nosso caso Admin
}
