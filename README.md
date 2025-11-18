# Daily Diet API

API para controle de dieta diária desenvolvida com Node.js, Fastify, TypeScript e Knex.

## Funcionalidades

- ✅ Criar usuário
- ✅ Autenticação de usuário (JWT)
- ✅ Registrar refeição
- ✅ Editar refeição
- ✅ Apagar refeição
- ✅ Listar todas as refeições de um usuário
- ✅ Visualizar uma única refeição
- ✅ Recuperar métricas do usuário

## Tecnologias

- Node.js
- Fastify
- TypeScript
- Knex.js
- PostgreSQL
- bcryptjs
- Zod

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto:

```
DATABASE_URL=postgresql://user:password@localhost:5432/daily_diet
JWT_SECRET=your-secret-key-here
PORT=3333
```

3. Execute as migrations:

```bash
npm run migrate
```

4. Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

## Endpoints

### Usuários

- `POST /users` - Criar usuário
- `POST /sessions` - Autenticar usuário

### Refeições

- `POST /meals` - Criar refeição (requer autenticação)
- `GET /meals` - Listar todas as refeições do usuário (requer autenticação)
- `GET /meals/:id` - Visualizar uma refeição (requer autenticação)
- `PUT /meals/:id` - Editar uma refeição (requer autenticação)
- `DELETE /meals/:id` - Apagar uma refeição (requer autenticação)
- `GET /meals/metrics` - Obter métricas do usuário (requer autenticação)

## Estrutura do Projeto

```
src/
  ├── database/
  │   ├── migrations/
  │   ├── index.ts
  │   └── knexfile.ts
  ├── middleware/
  │   └── verify-jwt.ts
  ├── routes/
  │   ├── users.ts
  │   └── meals.ts
  ├── utils/
  │   └── hash.ts
  ├── @types/
  │   ├── fastify-jwt.d.ts
  │   └── knex.d.ts
  └── server.ts
```

