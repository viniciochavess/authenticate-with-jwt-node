# JWT Authentication API - Node.js

Uma API REST completa em Node.js e TypeScript para autenticação de usuários com JWT (JSON Web Tokens), implementada com arquitetura limpa e sistema de autenticação robusto.

## 🚀 Características

- **Arquitetura Limpa**: Separação clara de responsabilidades com camadas bem definidas
- **JWT Nativo**: Implementação JWT sem dependências externas, usando apenas crypto nativo
- **TypeScript**: Tipagem estática completa para maior segurança
- **Validação de Dados**: Validação robusta com Zod
- **Criptografia**: Hash de senhas com BCryptJS
- **Middleware de Autenticação**: Sistema de proteção de rotas privadas
- **Persistência JSON**: Armazenamento simples em arquivo JSON
- **Clean Architecture**: Factory Pattern, Repository Pattern e Use Cases

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web minimalista
- **BCryptJS** - Hash de senhas
- **Zod** - Validação de esquemas
- **UUIDv7** - Geração de IDs únicos
- **tsx** - Executor TypeScript para desenvolvimento

## 📁 Estrutura do Projeto

```
src/
├── index.ts                      # Entry point da aplicação
├── app/
│   ├── @types/
│   │   └── request.d.ts          # Tipos customizados do Express
│   ├── adapters/
│   │   ├── middlewareAdapter.ts  # Adaptador para middlewares
│   │   └── routerAdapter.ts      # Adaptador para controllers
│   ├── controllers/
│   │   ├── CreateUserController.ts
│   │   └── SignInController.ts
│   ├── err/
│   │   ├── Invalid-credentials-err.ts
│   │   ├── Invalid-token-jwt-err.ts
│   │   └── User-Already-exist-err.ts
│   ├── factories/
│   │   ├── make-create-use.ts
│   │   ├── make-private-middleware.ts
│   │   └── make-sign-in.ts
│   ├── interface/
│   │   ├── IController.ts
│   │   └── IMiddleware.ts
│   ├── middlewares/
│   │   └── MiddlewarePrivate.ts
│   ├── repositories/
│   │   ├── CreateUserRepository.ts
│   │   └── GetUserByEmailRepository.ts
│   └── useCases/
│       ├── SignInUseCase.ts
│       └── SignUpUseCase.ts
├── database/
│   └── users.json               # Banco de dados em JSON
├── jwt/
│   ├── generateJwt.ts           # Geração de tokens JWT
│   ├── sign.ts                  # Interface para assinatura
│   └── verify.ts                # Verificação de tokens
├── server/
│   ├── index.ts                 # Configuração do servidor Express
│   └── routes/
│       ├── auth.ts              # Rotas de autenticação
│       ├── private.ts           # Rotas protegidas
│       └── user.ts              # Rotas de usuário
└── utils/
    ├── read-user-json.ts        # Utilitário para leitura do JSON
    └── save-user-json.ts        # Utilitário para escrita do JSON
```

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/viniciochavess/authenticate-with-jwt-node.git
cd authenticate-jwt-node
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta_super_segura_aqui_com_pelo_menos_32_caracteres
```

4. **Execute o projeto**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📚 API Endpoints

### 🔓 Endpoints Públicos

#### **POST /user** - Cadastrar usuário
Cria um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "message": {
    "id": "019a3ce3-9e7d-72f5-a480-3195d1fa2775",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

**Possíveis Erros:**
- `400` - Dados de validação inválidos
- `409` - Usuário já existe

#### **POST /login** - Fazer login
Autentica um usuário e retorna um token JWT.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "message": {
    "user": {
      "id": "019a3ce3-9e7d-72f5-a480-3195d1fa2775"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Possíveis Erros:**
- `400` - Dados de validação inválidos
- `401` - Credenciais inválidas

### 🔒 Endpoints Protegidos

#### **GET /private** - Rota protegida
Acessa uma rota que requer autenticação.

**Headers:**
```
Authorization: Bearer <seu_jwt_token>
```

**Response (200):**
```json
{
  "message": "This is a private route"
}
```

**Possíveis Erros:**
- `401` - Token não fornecido ou inválido

### 🏥 Health Check

#### **GET /ping** - Health check
Verifica se a API está funcionando.

**Response (200):**
```
pong
```

## 🎯 Exemplos de Uso

### Cadastro de Usuário
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "password": "minhasenha123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "minhasenha123"
  }'
```

### Acessar Rota Protegida
```bash
curl -X GET http://localhost:3000/private \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔐 Segurança

### Sistema JWT

- **Algoritmo**: HS256 (HMAC SHA-256)
- **Expiração**: 1 hora
- **Claims**: `id`, `exp` (expiração), `iat` (emitido em)
- **Validação**: Estrutura, assinatura e expiração

### Hash de Senhas

- **Algoritmo**: BCrypt
- **Salt Rounds**: 8
- **Comparação**: Verificação segura na autenticação

### Validações

- **Zod**: Validação de esquemas de entrada
- **Email**: Formato de email válido
- **Senha**: Mínimo 6 caracteres
- **Nome**: Mínimo 3 caracteres

## 🧪 Arquitetura

### Padrões Utilizados

- **Repository Pattern**: Abstração do acesso a dados
- **Factory Pattern**: Criação de instâncias com dependências
- **Use Case Pattern**: Regras de negócio isoladas
- **Adapter Pattern**: Adaptação entre camadas
- **Dependency Injection**: Inversão de dependências

### Fluxo de Dados

1. **Request** → Router → Adapter
2. **Adapter** → Controller
3. **Controller** → Use Case
4. **Use Case** → Repository
5. **Repository** → Database (JSON)
6. **Response** ← Controller ← Use Case ← Repository

## 📝 Scripts Disponíveis

```bash
# Executar em modo desenvolvimento com hot reload
npm start

# Executar testes (não implementado)
npm test
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatório | Padrão |
|----------|-----------|-------------|--------|
| `PORT` | Porta do servidor | Sim | 3000 |
| `JWT_SECRET` | Chave secreta para JWT | Sim | - |

### Personalização

**Tempo de Expiração do Token:**
```typescript
// src/jwt/generateJwt.ts
const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora
```

**Salt Rounds do BCrypt:**
```typescript
// src/app/useCases/SignUpUseCase.ts
const passwordHash = hashSync(password, 8); // 8 rounds
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Avisos Importantes

- **Desenvolvimento**: Este projeto é adequado para desenvolvimento e aprendizado
- **Produção**: Para produção, considere usar bancos de dados reais e bibliotecas como `jsonwebtoken`
- **Segurança**: Nunca exponha o `JWT_SECRET` em código público
- **Backup**: Os dados estão em JSON, faça backup regularmente

## 👨‍💻 Autor

**Vinícius Chaves**
- GitHub: [@viniciochavess](https://github.com/viniciochavess)
- Email: [contato]

---

⭐ **Se este projeto te ajudou, deixe uma estrela!**