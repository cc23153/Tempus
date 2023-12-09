# Tempus

## Descrição

O Tempus é uma aplicação web que oferece uma solução para gerenciar tarefas de forma colaborativa, proporcionando uma experiência similar ao Trello. A aplicação é dividida em dois principais componentes: a API (backend) e a interface do usuário (frontend).

## Instruções para Rodar o Sistema

### API (Backend)
* Clone o repositório com o comando `git clone https://github.com/cc23153/Tempus.git`
* Abra o terminal e navegue até a pasta `Tempus/web/api`.
* Renomeie o arquivo `.env-example` para `.env` e substitua as informações do banco de dados conforme necessário.
* Coloque alguma frase no SECRET
* Execute o comando `npm install` para instalar as dependências.
* Navegue até `web/api/database/prisma/` e execute `npx prisma migrate dev --name init`
* No diretório `web/api/database/prisma/` execute `npx prisma generate`
* No diretório raíz da api, execute o comando `npm run dev` para iniciar a API.

**Nota:** .

### Frontend

1. Abra um novo terminal (separado do terminal da API) e navegue até a pasta `tempus-frontend/`.
2. Execute o comando `npm install` para instalar as dependências.
3. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento do frontend.
* O frontend estará rodando por padrão, em http://localhost:5173/

## Tecnologias Utilizadas

- **Backend (API):**
  - Node.js
  - Express.js
  - Prisma (ORM)
  - Outras dependências (verifique o arquivo `package.json`)

- **Frontend:**
  - Node.js
  - Express.js
  - Vue.js
  - Outras dependências (verifique o arquivo `package.json`)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests.

## Contato

- [Pedro Henrique](mailto:zBl4ckDev@protonmail.com)
- [Ana Clara](mailto:cc23122@g.unicamp.br)
- [Kauã Victor](mailto:cc23142@g.unicamp.br)