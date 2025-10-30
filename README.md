# JWT Authentication Node.js

Um projeto Node.js em TypeScript para geração e verificação de tokens JWT (JSON Web Tokens) sem dependências externas, implementando a funcionalidade de autenticação usando apenas módulos nativos do Node.js.

## Características

- **Implementação Nativa**: Uso apenas de módulos nativos do Node.js (crypto)
- **TypeScript**: Tipagem estática completa
- **JWT HS256**: Algoritmo de assinatura HMAC SHA-256
- **Validação Completa**: Verificação de estrutura, assinatura e expiração
- **Configuração por Ambiente**: Secret configurável via variável de ambiente
- **Expiração Automática**: Tokens com tempo de vida de 1 hora

## Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **tsx** - TypeScript executor para desenvolvimento
- **crypto** - Módulo nativo para operações criptográficas

## Estrutura do Projeto

```
src/
├── index.ts              # Arquivo principal com exemplo de uso
└── jwt/
    ├── generateJwt.ts     # Geração de tokens JWT
    ├── sign.ts            # Interface para assinatura
    └── verify.ts          # Verificação e validação de tokens
```

## Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd authenticate-jwt-node
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
JWT_SECRET=sua_chave_secreta_super_segura_aqui
```

## Como Usar

### Executar o projeto
```bash
npm start
```

### Exemplo de Uso

```typescript
import { sign } from './jwt/sign';
import { verifyJwt } from './jwt/verify';

// Gerar um token JWT
const token = sign({ 
  payload: { 
    userId: 123, 
    cargo: 'admin' 
  } 
});

// Verificar e decodificar o token
const verified = verifyJwt(token);

console.log("Token gerado:", token);
console.log("Token verificado:", verified);
```

## API

### `sign(options)`

Gera um novo token JWT.

**Parâmetros:**
- `options.payload` - Objeto com os dados a serem incluídos no token

**Retorno:**
- `string` - Token JWT assinado

**Exemplo:**
```typescript
const token = sign({ 
  payload: { userId: 123, role: 'user' } 
});
```

### `verifyJwt(token)`

Verifica e decodifica um token JWT.

**Parâmetros:**
- `token` - String do token JWT

**Retorno:**
- `Object` - Objeto com resultado da verificação
  - `verifyJwt: boolean` - Se o token é válido
  - `payload?: Object` - Dados decodificados (se válido)

**Exemplo:**
```typescript
const result = verifyJwt(token);
if (result.verifyJwt) {
  console.log('Dados do usuário:', result.payload);
}
```

## Segurança

### Estrutura do Token JWT

O token gerado segue o padrão JWT com três partes:

1. **Header**: `{"alg": "HS256", "typ": "JWT"}`
2. **Payload**: Dados do usuário + `exp` (expiração) + `iat` (emitido em)
3. **Signature**: Assinatura HMAC SHA-256

### Validações Implementadas

- **Estrutura do Token**: Verifica se o token possui 3 partes
- **Assinatura**: Valida a integridade usando HMAC SHA-256
- **Expiração**: Verifica se o token não expirou
- **Secret**: Requer variável de ambiente JWT_SECRET

## Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `JWT_SECRET` | Chave secreta para assinatura dos tokens | Sim |

### Tempo de Expiração

Por padrão, os tokens têm duração de **1 hora**. Para alterar, modifique a linha em `generateJwt.ts`:

```typescript
const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hora
```

## Scripts Disponíveis

```bash
# Executar em modo desenvolvimento com hot reload
npm start

# Executar testes (não implementado)
npm test
```

## Licença

Este projeto está sob a licença ISC.

## Avisos Importantes

- **Nunca** exponha o `JWT_SECRET` em código público
- Use secrets seguros e complexos em produção
- Este é um projeto educacional - para produção, considere bibliotecas estabelecidas como `jsonwebtoken`
- Tokens expirados não podem ser renovados automaticamente