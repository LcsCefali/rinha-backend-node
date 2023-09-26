#### 💪🏼

#### Instalando as dependencias

```bash
yarn
```

#### Banco de dados (Postgresql)

Cria a imagem do postgres

```bash
docker run --name rinha-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

Coloque a env de conexão com o postgres e rode as migrations

```bash
npx knex migrate:latest
```

#### Rodando o projeto

```bash
yarn dev
```

#### Docker

```bash
docker network create -d bridge rinha-network
```

```bash
npm run docker:build:api
```

ou

```bash
yarn docker:build:api
```

```bash
docker compose up
```