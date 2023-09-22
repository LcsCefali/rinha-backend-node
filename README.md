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

#### Para rodar com compose

```bash
docker compose build --no-cache
```

```bash
docker compose up
```