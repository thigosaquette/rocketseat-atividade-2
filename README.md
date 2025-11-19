# 🍽️ Daily Diet API

API REST desenvolvida em Node.js para gerenciamento de refeições e controle de dieta. Esta aplicação permite que usuários registrem suas refeições, acompanhem métricas de dieta e mantenham um histórico alimentar organizado.

## 📋 Funcionalidades

### Usuários
- ✅ Criar um novo usuário
- ✅ Identificar usuário entre requisições através de cookies (sessionId)

### Refeições
- ✅ Registrar uma refeição com:
  - Nome
  - Descrição
  - Data e Hora
  - Status (dentro ou fora da dieta)
- ✅ Editar uma refeição (todos os campos)
- ✅ Apagar uma refeição
- ✅ Listar todas as refeições de um usuário (ordenadas por data)
- ✅ Visualizar uma única refeição

### Métricas
- ✅ Quantidade total de refeições registradas
- ✅ Quantidade total de refeições dentro da dieta
- ✅ Quantidade total de refeições fora da dieta
- ✅ Melhor sequência de refeições dentro da dieta

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web rápido
- **Knex.js** - Query builder SQL
- **SQLite** - Banco de dados (desenvolvimento/testes)
- **PostgreSQL** - Banco de dados (produção)
- **Zod** - Validação de schemas
- **Vitest** - Framework de testes
- **Supertest** - Testes de API

## 📦 Pré-requisitos

- Node.js 20.10.0 ou superior
- pnpm (ou npm/yarn)
- PostgreSQL (apenas para produção)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd rocketseat-atividade-2
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
# Crie um arquivo .env na raiz do projeto
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

4. Execute as migrations:
```bash
pnpm run knex migrate:latest
```

## 🏃 Como executar

### Desenvolvimento
```bash
pnpm run dev
```
O servidor estará rodando em `http://localhost:3333`

### Produção
```bash
pnpm run build
node build/server.js
```

## 🧪 Testes

### Executar todos os testes
```bash
pnpm run test
```

### Executar testes em modo watch
```bash
pnpm run test:watch
```

### Executar testes com interface visual (Vitest UI)
```bash
pnpm run test:ui
```

Os testes utilizam um banco de dados SQLite temporário que é criado automaticamente e limpo após a execução.

## 🔐 Autenticação

A aplicação utiliza cookies para identificar usuários entre requisições. Quando um usuário é criado, um cookie `sessionId` é definido automaticamente e deve ser enviado em todas as requisições subsequentes para acessar as rotas protegidas.

## 🗄️ Banco de Dados

### Desenvolvimento/Testes
- **SQLite** - Banco de dados em arquivo (`db/app.db` para desenvolvimento, `db/test.db` para testes)

### Produção
- **PostgreSQL** - Configurado através da variável de ambiente `DATABASE_URL`

### Migrations
```bash
# Executar migrations
pnpm run knex migrate:latest

# Reverter última migration
pnpm run knex migrate:rollback
```

## 🛠️ Scripts Disponíveis

- `pnpm run dev` - Inicia o servidor em modo desenvolvimento
- `pnpm run build` - Compila o projeto TypeScript
- `pnpm run test` - Executa os testes uma vez
- `pnpm run test:watch` - Executa os testes em modo watch
- `pnpm run test:ui` - Executa os testes com interface visual
- `pnpm run knex` - Executa comandos do Knex CLI
- `pnpm run lint` - Executa o linter e corrige problemas

## 📝 Notas

- O cookie `sessionId` tem validade de 7 dias
- As refeições são ordenadas por data (mais recentes primeiro)
- A melhor sequência de refeições dentro da dieta é calculada considerando a ordem cronológica
- Todos os endpoints de refeições (exceto criação) requerem autenticação via cookie

## 📄 Licença

ISC

---

Desenvolvido para parte do curso de Node.js da Rocketseat 🚀

