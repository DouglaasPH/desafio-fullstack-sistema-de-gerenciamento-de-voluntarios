# 📘 **Sistema de Gerenciamento de Voluntários**

Aplicação web para cadastro, edição e listagem de voluntários. Desenvolvido com **React**, **TypeScript**, **Vite**, **React Query**, **Tailwind CSS**, **Shadcn/ui**, **Lucide React**, **Axios**, **Testing Library** e **Vitest**, seguindo princípios de componentização e organização limpa.

---

# 🚀 Como rodar o projeto

### **1. Instale as dependências**

```sh
pnpm install
```

### **2. Inicie o servidor de desenvolvimento**

```sh
pnpm dev
```

---

# 🔐 Configuração do `.env`

Crie um arquivo **.env** na raiz contendo:

```
VITE_API_URL=http://localhost:3000
```

> Ajuste conforme a URL do seu backend.

Nenhuma outra configuração é necessária.

---

# 📄 Lista de Páginas

A aplicação possui as seguintes telas:

### **1. Dashboard**

- Exibe visão geral e atalhos.

### **2. Listagem de Voluntários**

- Lista todos os voluntários retornados pela API.
- Permite aplicar filtros básicos.

### **3. Cadastro de Voluntário (/voluntarios/novo)**

- Formulário completo para criar um novo voluntário.

### **4. Edição de Voluntário (/voluntarios/:id/editar)**

- Reutiliza o mesmo padrão de formulário do cadastro.
- Carrega os dados existentes.

---

# 📁 Estrutura de Pastas

```
src/
 ├── api/                    # Funções de requisição HTTP (axios)
 ├── components/             # Componentes reutilizáveis
 │    ├── ui/                # Componentes base (shadcn/ui)
 │    ├── global/            # componentes reutilizáveis
 │    ├── dashboard/         # componentes para utilizar no dashboard
 │    ├── ErrorPage/         # componente para erro HTTP
 │    └── LoadingScreen/     # componente para estado de carregamento
 ├── hooks/                  # Hooks personalizados (React Query)
 ├── pages/                  # Telas principais e testes da tela
 │    ├── Dashboard/
 │    ├── NewVolunteer/
 │    └── UpdateVolunteer/
 ├── types/                  # Tipos e interfaces TypeScript reutilizáveis
 ├── lib/                    # Combina classes CSS e remove conflitos de Tailwind.
 ├── utils/                  # Validações e funções auxiliares
 ├── tests/                  # Query client para testes
 ├── App.tsx                 # Rotas
 └── main.tsx                # Inicialização do React
```

---

# 🧠 Decisões Técnicas

### **1. React Query**

Utilizado para gerenciar requisições e estados assíncronos:

- cache automático
- revalidação
- controle de loading e error state

### **2. shadcn/ui + Radix**

Aplicado para garantir:

- acessibilidade
- UI padronizada
- estilização via Tailwind

### **3. Arquitetura baseada em separação de responsabilidades**

- `api/` lida somente com requisições
- `pages/` contém apenas o fluxo da tela e testes da tela
- `components/` contém UI desacoplada
- `hooks/` contém lógica de negócio

### **4. Código limpo**

- Nomes consistentes
- Regras de validação isoladas
- Componentes pequenos e reutilizáveis
