# n8n-nodes-random

[![n8n](https://img.shields.io/badge/built%20for-n8n-1A82E2?logo=n8n\&logoColor=fff)](#) [![license](https://img.shields.io/badge/license-MIT-green.svg)](#)

> ⚠️ **Aviso**
> Este repositório faz parte de um **desafio técnico da Onfly**.
> Objetivo: implementar um **custom node** no n8n que gera números randômicos consumindo a API do [Random.org](https://www.random.org/).

---

## 📖 Desafio

Como desenvolvedor, você deve criar um conector personalizado para a plataforma de automação n8n.
Esse conector permite estender a capacidade da ferramenta de workflows low-code, tornando a experiência dos usuários mais simples e prática.

**O que iremos construir:**
Um **node do n8n** chamado **Random**, que recebe um input de **mínimo** e **máximo** (inteiros inclusivos) e retorna um número aleatório obtido pela API do Random.org.

---

## 📋 Pré-requisitos técnicos

* **Node.js 22 (LTS)**
* **Docker + Docker Compose** para subir o n8n e o Postgres

Infra esperada:

* n8n instalado com Docker (versão self-hosted mais recente: `@latest = 1.85.4`)
* Banco de dados Postgres
* Desenvolvimento programático de um custom node
* Node instalado e rodando localmente

---

## ⚙️ Requisitos funcionais

* O conector deve se chamar **Random** e possuir uma única operação: **True Random Number Generator**.
* A operação deve possuir dois inputs: **Min** e **Max** (apenas números).
* O método `execute` deve usar obrigatoriamente o endpoint da Random.org:

  ```
  https://www.random.org/integers/?num=1&min=1&max=60&col=1&base=10&format=plain&rnd=new
  ```
* O retorno esperado no formato JSON:

  ```json
  { "result": 42, "min": 1, "max": 60, "source": "random.org" }
  ```

---

## 🎨 Requisitos não funcionais

* Usar **nomes amigáveis** para os parâmetros (`displayName` e `description` claros e explicativos).
* Adicionar um **ícone SVG** para o node (ex.: `icons/random.svg`).

---

## 🗂️ Estrutura do projeto

```
custom-nodes/n8n-nodes-random/
├─ src/
│  ├─ index.ts
│  └─ nodes/Random.node.ts
├─ dist/           ← build gerado
├─ icons/random.svg
├─ package.json
└─ tsconfig.json
docker-compose.yml ← sobe n8n + Postgres e monta os custom nodes
```

---

## 🚀 Como rodar localmente

### 1. Instalar dependências e buildar (opcional)

```bash
cd custom-nodes/n8n-nodes-random
npm install
npm run build   # só se precisar gerar o dist/
cd ../../
```

### 2. Subir a stack com Docker

```bash
docker compose up -d
```

### 3. Acessar o n8n

Abra [http://localhost:5678](http://localhost:5678) no navegador.

O pacote é montado em `/home/node/.n8n/custom`. O n8n detecta automaticamente os nodes em `dist/` pelo campo `n8n.nodes` do `package.json`.

---

## 🔌 Como usar no n8n

* Procure pelo node **Random** na paleta.
* Operação: **True Random Number Generator**
* Parâmetros:

  * **Min** → inteiro mínimo (ex.: `1`)
  * **Max** → inteiro máximo (ex.: `60`)

**Resultado disponível em:**

```twig
{{$json.result}}
```

---

## 🛠️ Detalhes de implementação

* **Validações**:

  * `Min` e `Max` devem ser inteiros
  * `Min ≤ Max`
* **Retorno esperado**:

  ```json
  { "result": 42, "min": 1, "max": 60, "source": "random.org" }
  ```
* Observação: em alguns testes o retorno pode aparecer apenas como número cru vindo da API.

---

## 🧪 Teste rápido

1. Crie um workflow: **Manual Trigger → Random**
2. Configure **Min** e **Max**
3. Execute e verifique a saída no editor do n8n

---



✍️ Notas sobre o desenvolvimento

Este projeto foi desenvolvido como parte de um desafio técnico da Onfly.
Foi bem interessante explorar os custom nodes do n8n, entender a estrutura do pacote e trabalhar com a API do Random.org
.

Principais aprendizados:

Estrutura do projeto de custom nodes no n8n.

Integração direta com um serviço externo via HTTP (Random.org).

Configuração de ambiente com Docker Compose + Postgres.

Ajustes de parâmetros amigáveis e inclusão de ícone SVG para o node.

No geral, foi um desafio legal e deu pra praticar bastante a parte de infra, TypeScript e integração.

---


