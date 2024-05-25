# Projeto  Desenvolvedor fullstack js/ts


## Pré-requisitos
 - Node.js

## Setup o Backend
Navegue até a pasta Backend do projeto.
Abra um terminal na pasta Backend.
 - instale as dependências:

```
npm install --save-dev nodemon
```
```
npm install
```


### Variáveis de ambiente:
Crie o arquivo .env, adicione a variável a baixo e gere sua chave para decodificar o token JWT. Você pode gerar sua chave em: https://www.convertsimple.com/random-base64-generator/
```
TOKEN_SECRET=
```
- Em seguida, inicie o servidor:

```
npm start
```
Isso iniciará o servidor backend. Por padrão, ele será executado na porta 3000.

## Setup Frontend
Navegue até a pasta Frontend do projeto.
Abra um terminal na pasta Frontend.
 - instale as dependências:
```
npm install
```
### Variáveis de ambiente:
Crie o arquivo .env e adicione a URL da api, por padrão: http://localhost:3000/
```
VITE_API_BASE=
```
- Em seguida, inicie o app:

```
npm run dev
```
Isso iniciará o app Frontend. Por padrão, ele será executado na porta 5173.

Acessando o Aplicativo
Depois de iniciar tanto o backend quanto o frontend, você poderá acessar o aplicativo em seu navegador usando a URL http://localhost:5173.

## Rotas:
 - /
 - /cadastro
 - /prodruto (Privada)
 - /SalvarProduto (Privada)


