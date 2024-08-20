## Firebase - Projeto do Curso React JS Udemy
Este projeto foi desenvolvido durante o curso React JS do zero ao avançado na prática na Udemy: https://www.udemy.com/course/curso-reactjs/ 

Funcionalidades
- Integração com o Firebase.
- Edição do banco.
- Exclusão do banco.
- Controle de acessos.
- Autenticação de Usuários: Login e cadastro com email e senha.


## Rodando a Aplicação Localmente

Siga estas instruções para executar o projeto na sua máquina:

Pré-requisitos
Node.js e npm instalados. Verifique a versão com node -v e npm -v.
Um gerenciador de pacotes como yarn ou npm.
Uma conta Firebase configurada com um projeto.

## Passo a Passo

Clone o Repositório.


## Instale as Dependências:

npm install

ou

yarn install

## Configure o Firebase:

Crie um arquivo .env na raiz do projeto.

Copie as configurações do seu projeto Firebase (apiKey, authDomain, etc.) para o arquivo .env.
Exemplo:
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY


## Inicie o Servidor:

npm start

ou

yarn start

Isso iniciará o servidor de desenvolvimento. Acesse o projeto em seu navegador: http://localhost:3000

Observações
Este projeto utiliza o Firestore como banco de dados. Certifique-se de ter as regras de segurança configuradas corretamente no seu projeto Firebase.
O código fonte é fornecido como está, sem garantia de qualquer tipo.
Adapte o arquivo .env.example para .env e coloque as suas credenciais do firebase.