# MVP Sigmapa
#### ✨ Esse projeto foi criado como um MVP (minimum viable product) para um sistema de informação geográfica (SIG).
#### 🚀 Uma demo do site pode ser acessada através  do link [https://sigmapa.herokuapp.com/](https://sigmapa.herokuapp.com/)

## Funcionalidades
* Cadastrar e fazer login de usuário
* Visualizar um mapa com marcadores de informações geográficas
* Adicionar uma notificação sobre problemas nas categorias meio ambiente, urbanismo e população
* Admins podem validar as notificações enviadas que passam a ficar disponíveis para todas as pessoas


## Como esse MVP foi construído?
Esse MVP foi desenvolvido utilizando a linguagem de programação Javascript no servidor (back-end) e também no cliente (front-end). Além disso, para o servidor, foi utilizado o
ambiente de execução [Node.js](https://nodejs.org/en/). As páginas web são renderizadas pelo back-end em HTML a partir de arquivos [Pug](https://pugjs.org/api/getting-started.html).
O gerenciador da base de dados relacional escolhido foi o [PostgreSQL](https://www.postgresql.org/), mas nada impede que outro seja utilizado, desde que sejam feitas pequenas 
alterações nos [SQL de migração](https://github.com/valengo/sigmapa/tree/master/details/db/migrations) para condizer com o dialeto do gerenciador escolhido. Para castro e login
de usuário foi utilizado o [Firebase](https://firebase.google.com/). Considerando o front-end, o framework [Bootstrap](https://getbootstrap.com/) foi aplicado para facilitar a construção das telas e o 
[Google Maps Platform](https://developers.google.com/maps/documentation) para exibir os mapas.

## Como ter o seu próprio mapa?
Essas recomendações consideram alguém que já tem um bom conhecimento sobre desenvolvimento de aplicações web com Node.js
### 1. Clonar esse repositório
  ```
  $ git clone https://github.com/valengo/sigmapa.git
  ```
### 2. Setar as variáveis de ambiente necessárias para rodar o projeto
Você pode acessar a lista de variáveis e instruções de como obtê-las [aqui](https://github.com/valengo/sigmapa/blob/master/.env.example).

### 3. Configurar o Firebase no front-end
Você precisa seguir as instruções [aqui](https://firebase.google.com/) e trocar as informações [nesse arquivo](https://github.com/valengo/sigmapa/blob/master/public/javascripts/firebase.js).

### 4. Rodar o projeto localmente ou instalar em alguma nuvem
#### 4.1 Rodando localmente
  ```
  $ npm start
  ```
#### 4.2 Rodando na nuvem
Você pode instalar esse projeto no [Heroku](https://www.heroku.com/), por exemplo. 
