# Sistema de Votação — LOTY Awards

## Objetivo

Desenvolver a infraestrutura de votação anual do LOTY Awards, premiação literária do projeto de extensão Clube do Livro da Bia.

## Tecnologias utilizadas

- Google Sheets para armazenamento dos votos.
- Google Apps Script para implementação da API.
- JavaScript para validação e processamento dos dados.
- React para a interface de votação e divulgação dos resultados.

## Funcionalidades desenvolvidas

- Consulta dos livros cadastrados na Nossa Estante.
- Organização das votações por ano.
- Regra de abertura automática ao atingir 12 livros distintos cadastrados na edição.
- Recebimento e validação dos votos por categoria.
- Verificação básica de duplicidade por nome e sobrenome em cada edição.
- Cálculo dos resultados por categoria.
- Disponibilização de resultados agregados por meio de uma API.

## Testes realizados

Em 19/11/2026, foi realizada a implantação inicial da API no Google Apps Script.

O teste de consulta da edição de 2026 retornou:

- `sucesso: true`
- `ano: 2026`
- `quantidadeLivros: 12`
- `minimoLivros: 12`
- `aberta: true`

As listas de resultados estavam vazias porque ainda não havia votos registrados.

## Estado atual

O backend foi implementado e passou pelo teste inicial de consulta. Ainda estão pendentes os testes de envio de votos e a integração completa com a interface React.

## Próximas etapas

- Integrar a API à página de votação.
- Criar a página pública de resultados.
- Implementar atualização periódica dos resultados.
- Testar o registro de votos e a prevenção de duplicidades.
- Validar o funcionamento das próximas edições anuais.

## Privacidade

A planilha de votos é privada e não deve ser publicada no repositório. A API pública deve disponibilizar apenas os resultados agregados, sem nomes ou sobrenomes das participantes.