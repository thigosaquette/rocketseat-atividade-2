# Daily Diet API - Documentação

## Endpoints

### Autenticação

Todas as rotas de refeições requerem autenticação via JWT. O token deve ser enviado no header `Authorization` no formato:
```
Authorization: Bearer <token>
```

### 1. Criar Usuário

**POST** `/users`

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Autenticar Usuário

**POST** `/sessions`

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

### 3. Criar Refeição

**POST** `/meals` (Requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Café da manhã",
  "description": "Pão integral com ovos e suco de laranja",
  "date_time": "2024-01-01T08:00:00.000Z",
  "is_diet": true
}
```

**Response (201):**
```json
{
  "meal": {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Café da manhã",
    "description": "Pão integral com ovos e suco de laranja",
    "date_time": "2024-01-01T08:00:00.000Z",
    "is_diet": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Listar Todas as Refeições

**GET** `/meals` (Requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "meals": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "name": "Café da manhã",
      "description": "Pão integral com ovos e suco de laranja",
      "date_time": "2024-01-01T08:00:00.000Z",
      "is_diet": true,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 5. Visualizar Uma Refeição

**GET** `/meals/:id` (Requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "meal": {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Café da manhã",
    "description": "Pão integral com ovos e suco de laranja",
    "date_time": "2024-01-01T08:00:00.000Z",
    "is_diet": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "message": "Meal not found"
}
```

### 6. Editar Refeição

**PUT** `/meals/:id` (Requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Body (todos os campos são opcionais):**
```json
{
  "name": "Almoço",
  "description": "Salada com frango grelhado",
  "date_time": "2024-01-01T12:00:00.000Z",
  "is_diet": true
}
```

**Response (200):**
```json
{
  "meal": {
    "id": "uuid",
    "user_id": "uuid",
    "name": "Almoço",
    "description": "Salada com frango grelhado",
    "date_time": "2024-01-01T12:00:00.000Z",
    "is_diet": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 7. Apagar Refeição

**DELETE** `/meals/:id` (Requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204):** Sem conteúdo

**Response (404):**
```json
{
  "message": "Meal not found"
}
```

### 8. Métricas do Usuário

**GET** `/meals/metrics` (Requer autenticação)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalMeals": 10,
  "totalDietMeals": 7,
  "totalNonDietMeals": 3,
  "bestSequence": 5
}
```

**Explicação dos campos:**
- `totalMeals`: Quantidade total de refeições registradas
- `totalDietMeals`: Quantidade total de refeições dentro da dieta
- `totalNonDietMeals`: Quantidade total de refeições fora da dieta
- `bestSequence`: Melhor sequência de refeições dentro da dieta (consecutivas)

## Códigos de Status

- `200` - Sucesso
- `201` - Criado com sucesso
- `204` - Sucesso sem conteúdo
- `401` - Não autorizado
- `404` - Não encontrado
- `409` - Conflito (usuário já existe)

