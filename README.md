n8n Random.org Custom Node (Onfly Test)

Random → operação True Random Number Generator usando o endpoint da Random.org.
Gera um inteiro aleatório entre Min e Max (inclusive) e retorna no campo result.

Requisitos

Node.js 22 LTS (para build do pacote, se necessário)

Docker + Docker Compose (para rodar o n8n e Postgres)

Estrutura do projeto
custom-nodes/n8n-nodes-random/   ← pasta local do conector
  ├─ src/
  │  ├─ index.ts
  │  └─ nodes/Random.node.ts
  ├─ dist/                       ← build gerado
  ├─ icons/random.svg
  ├─ package.json
  └─ tsconfig.json
docker-compose.yml                ← sobe n8n + Postgres e monta os custom nodes

Como rodar localmente
1) Instalar dependências e buildar (opcional se já existir dist/)
cd custom-nodes/n8n-nodes-random
npm install
npm run build   # só se precisar gerar o dist/
cd ../../

2) Subir a stack com Docker
docker compose up -d

3) Acessar o n8n

http://localhost:5678

O pacote é montado em /home/node/.n8n/custom.
O n8n detecta automaticamente os nodes em dist/ pelo campo "n8n.nodes" do package.json.

Como usar no n8n

Procure pelo node Random na paleta.

Operação: True Random Number Generator

Parâmetros:

Min → inteiro mínimo (ex.: 1)

Max → inteiro máximo (ex.: 60)

Resultado disponível em:

{{$json.result}}

Detalhes de implementação

Endpoint chamado:

https://www.random.org/integers/?num=1&min=<MIN>&max=<MAX>&col=1&base=10&format=plain&rnd=new


Validações:

Min e Max precisam ser inteiros

Min ≤ Max

Retorno esperado (formato JSON do node):
{
  "result": 42,
  "min": 1,
  "max": 60,
  "source": "random.org"
}


 Observação: em alguns testes, o retorno pode aparecer apenas como número cru vindo da API.

 Teste rápido

Crie um workflow com Manual Trigger → Random

Rode e verifique a saída do node