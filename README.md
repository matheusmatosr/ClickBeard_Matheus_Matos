# Sistema de barbearia

Sistema de barbearia com login e cadastro, após logado é disponibilizado o sistema que possui as páginas de Agendamento, Meus agendamentos, e Painel Administrador.

Tecnologias usadas para o backend foi NodeJS e para o frontend foi o React, utilizando o banco PgAdmin.

## Para rodar o projeto, siga o tutorial abaixo.

## 🖥️ Instalação

É necessiario possuir o Git instalado em sua máquina e o banco PgAdmin (PostgreSQL).

Clone este repositório
```bash
git clone https://github.com/matheusmatosr/ClickBeard_Matheus_Matos
```

Abra o terminal e faça os seguintes códigos:

### Backend
1. Acesse o repositorio do backend:

```bash
cd backend
```

2. Para instalar as dependências:
```bash
npm install
```

3. Crie o arquivo .env na raiz da pasta backend, substitua pelos seus dados do banco PgAdmin em DB_USER e DB_PASSWORD:
```bash
PORT=3001
DB_NAME=barber_shop_db
DB_USER='seu_usuario'
DB_PASSWORD='sua_senha'
DB_HOST=localhost
DB_DIALECT=postgres
JWT_SECRET=your_jwt_secret
```

4. Para criar as migrações do banco, rode no terminal:

```bash
npx sequelize db:create
``` 

5. Para executar as migrações do banco, rode no terminal:

```bash
npx sequelize db:migrate
``` 

6. Para rodar o backend:

```bash
npm run start
```

### Frontend
1. Acesse o repositorio do frontend:

```bash
cd frontend
```

2. Para instalar as dependências:
```bash
npm install
```

3. Para rodar o frontend:

```bash
npm run start
```

Acesse o link que aparecerá no terminal para obter acesso ao projeto.
