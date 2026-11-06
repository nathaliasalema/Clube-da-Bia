
# PLANEJAMENTO DO PROJETO — CLUBE DO LIVRO DA BIA

**Aluna:** Nathália Salema Quintanilha  
**Projeto:** Clube do Livro da Bia  
**Cliente:** Beatriz Costa  
**Tecnologias:** React, Vite, JavaScript, CSS, React Router e Google Sheets  
**Prazo previsto para conclusão:** 16/12/2026

---

## 1. Apresentação do projeto

O projeto Clube do Livro da Bia consiste no desenvolvimento de um site para uma comunidade de leitura já existente, organizada por Beatriz Costa e com participação de leitores por meio de um grupo no Telegram.

A proposta é criar um ambiente digital para apresentar o clube, organizar o histórico de leituras, divulgar encontros, disponibilizar estatísticas literárias e incentivar a participação dos membros por meio de sugestões, avaliações e votações.

O desenvolvimento será realizado de forma incremental, com planejamento, implementação, testes, validação e documentação das funcionalidades.

---

## 2. Objetivos do projeto

### 2.1 Objetivo geral

- [ ] Desenvolver e entregar um site funcional, responsivo e acessível para o Clube do Livro da Bia.

### 2.2 Objetivos específicos

- [x] Criar a estrutura inicial da aplicação.
- [x] Desenvolver a identidade visual do site.
- [x] Implementar a página inicial.
- [x] Implementar a navegação entre páginas.
- [x] Organizar o histórico de leituras do clube.
- [x] Criar uma estante virtual com os livros lidos.
- [x] Integrar a estante ao Google Sheets.
- [ ] Melhorar a experiência de navegação em dispositivos móveis.
- [ ] Apresentar a história do clube e de sua organizadora.
- [ ] Divulgar a leitura atual e os próximos encontros.
- [ ] Desenvolver um dashboard com estatísticas literárias.
- [ ] Permitir o envio de sugestões de livros e temas.
- [ ] Criar uma seção de premiações literárias.
- [ ] Implementar avaliações e votação dos livros de 2026.
- [ ] Validar as funcionalidades com a cliente.
- [ ] Publicar o site na internet.
- [ ] Preparar a documentação e realizar a entrega final.

---

## 3. Funcionalidades já desenvolvidas

### 3.1 Estrutura inicial

- [x] Criar o projeto utilizando React e Vite.
- [x] Configurar a estrutura inicial de pastas.
- [x] Organizar os arquivos de componentes.
- [x] Organizar os arquivos de páginas.
- [x] Criar os arquivos de estilização.
- [x] Configurar o ambiente de desenvolvimento.
- [x] Executar a aplicação localmente.
- [x] Configurar o repositório no GitHub.

### 3.2 Identidade visual

- [x] Definir a paleta de cores.
- [x] Escolher a tipografia.
- [x] Integrar a logo do clube.
- [x] Criar elementos decorativos.
- [x] Estilizar a página inicial.
- [x] Estilizar o cabeçalho.
- [x] Criar botões e elementos de navegação.
- [x] Realizar ajustes visuais no navegador.

### 3.3 Navegação

- [x] Instalar o React Router.
- [x] Configurar o BrowserRouter.
- [x] Criar as rotas iniciais.
- [x] Implementar navegação para a página Início.
- [x] Implementar navegação para a página Nossa Estante.
- [x] Integrar o cabeçalho à estrutura da aplicação.
- [x] Configurar o botão Entrar no Clube com o convite do Telegram.

### 3.4 Nossa Estante

- [x] Organizar o histórico de livros do clube.
- [x] Criar a planilha de gerenciamento dos livros.
- [x] Definir campos de título, autor, ano e mês.
- [x] Definir campo de avaliação.
- [x] Definir campo para URL da capa.
- [x] Definir campo de status de publicação.
- [x] Pesquisar e inserir links de capas.
- [x] Criar a aba Dados do site.
- [x] Publicar os dados em formato CSV.
- [x] Instalar a biblioteca Papa Parse.
- [x] Implementar carregamento de dados com Fetch API.
- [x] Interpretar os dados recebidos do CSV.
- [x] Criar o componente LivroCard.
- [x] Exibir capas dos livros.
- [x] Exibir títulos e autores.
- [x] Exibir mês e ano de leitura.
- [x] Implementar avaliações em corações.
- [x] Tratar livros sem avaliação.
- [x] Implementar filtros por ano.
- [x] Implementar contagem de livros.
- [x] Filtrar registros pelo status Publicado.
- [x] Criar mensagens de carregamento e erro.
- [x] Estilizar os cards.
- [x] Ajustar o layout da estante.
- [x] Verificar a exibição dos livros de 2026.

---

# 4. ETAPAS FUTURAS DE DESENVOLVIMENTO

---

## ETAPA 1 — Melhorias no cabeçalho e responsividade

**Prioridade:** Alta  
**Previsão de início:** 07/11/2026

### 4.1 Análise da interface atual

- [ ] Revisar o cabeçalho no computador.
- [ ] Revisar o cabeçalho no celular.
- [ ] Identificar problemas de espaçamento.
- [ ] Verificar a quebra dos links de navegação.
- [ ] Avaliar o espaço ocupado pelo cabeçalho.
- [ ] Definir a organização ideal para telas pequenas.

### 4.2 Menu mobile

- [ ] Planejar o comportamento do menu mobile.
- [ ] Criar um botão de menu com ícone.
- [ ] Implementar estado de abertura e fechamento com React.
- [ ] Exibir os links quando o menu estiver aberto.
- [ ] Ocultar os links quando o menu estiver fechado.
- [ ] Implementar fechamento após selecionar uma página.
- [ ] Configurar atributos de acessibilidade do botão.
- [ ] Permitir navegação pelo teclado.
- [ ] Ajustar o comportamento do menu em telas maiores.

### 4.3 Estilização

- [ ] Ajustar tamanho da logo no celular.
- [ ] Ajustar espaçamento do cabeçalho.
- [ ] Ajustar posicionamento do botão Entrar no Clube.
- [ ] Estilizar o menu aberto.
- [ ] Estilizar os links do menu.
- [ ] Adicionar efeitos de interação.
- [ ] Revisar cores e contrastes.
- [ ] Preservar o layout desktop.

### 4.4 Testes

- [ ] Testar em largura de 320 px.
- [ ] Testar em largura de 375 px.
- [ ] Testar em largura de 400 px.
- [ ] Testar em tablets.
- [ ] Testar em desktop.
- [ ] Verificar ausência de rolagem horizontal.
- [ ] Testar todos os links.
- [ ] Testar o convite do Telegram.
- [ ] Corrigir problemas encontrados.

---

## ETAPA 2 — Página Sobre o Clube e Beatriz Costa

**Prioridade:** Alta

### 4.5 Levantamento de informações

- [ ] Conversar com a cliente sobre a história do clube.
- [ ] Solicitar informações sobre a criação do clube.
- [ ] Levantar os objetivos da comunidade.
- [ ] Solicitar uma apresentação de Beatriz Costa.
- [ ] Solicitar fotografias autorizadas.
- [ ] Solicitar os links das redes sociais.
- [ ] Solicitar o link do canal do YouTube.
- [ ] Selecionar vídeos para destaque.
- [ ] Validar os textos e materiais com a cliente.

### 4.6 Estrutura da página

- [ ] Criar o arquivo Sobre.jsx.
- [ ] Criar o arquivo Sobre.css.
- [ ] Adicionar a rota da página.
- [ ] Atualizar o link Sobre no cabeçalho.
- [ ] Criar seção de apresentação.
- [ ] Criar seção sobre a história do clube.
- [ ] Criar seção sobre Beatriz Costa.
- [ ] Criar seção sobre a comunidade.
- [ ] Criar seção de redes sociais.
- [ ] Criar seção de vídeos do YouTube.
- [ ] Criar chamada para participar do clube.

### 4.7 Componentes e conteúdo

- [ ] Criar componente para apresentação da Bia, se necessário.
- [ ] Criar componente reutilizável para redes sociais.
- [ ] Criar componente para vídeos.
- [ ] Inserir textos aprovados pela cliente.
- [ ] Inserir fotografias autorizadas.
- [ ] Adicionar links para redes sociais.
- [ ] Incorporar vídeos selecionados do YouTube.
- [ ] Adicionar títulos e descrições dos vídeos.
- [ ] Configurar abertura de links externos.
- [ ] Verificar acessibilidade dos vídeos incorporados.

### 4.8 Estilização e testes

- [ ] Definir o layout da página.
- [ ] Aplicar a identidade visual do clube.
- [ ] Ajustar tipografia e espaçamento.
- [ ] Estilizar cards e seções.
- [ ] Adaptar a página para celulares.
- [ ] Adaptar a página para tablets.
- [ ] Testar os links das redes sociais.
- [ ] Testar a reprodução dos vídeos.
- [ ] Verificar o carregamento das imagens.
- [ ] Corrigir problemas encontrados.

---

## ETAPA 3 — Leitura atual e próximo encontro na página inicial

**Prioridade:** Alta

### 4.9 Planejamento das informações

- [ ] Definir as informações da leitura atual.
- [ ] Definir como será exibida a capa.
- [ ] Definir como será exibido o título.
- [ ] Definir como será exibido o autor.
- [ ] Definir como será exibida a data da reunião.
- [ ] Definir como será exibido o horário da reunião.
- [ ] Definir como será exibido o local ou formato do encontro.
- [ ] Validar as informações com a cliente.

### 4.10 Organização dos dados

- [ ] Avaliar o uso do Google Sheets para atualizar a leitura atual.
- [ ] Definir a estrutura dos campos necessários.
- [ ] Criar uma aba específica, se necessário.
- [ ] Configurar a publicação dos dados.
- [ ] Testar o acesso às informações.
- [ ] Definir comportamento para dados ausentes.
- [ ] Definir como atualizar a próxima reunião.

### 4.11 Desenvolvimento

- [ ] Criar componente LeituraAtual.
- [ ] Criar estrutura visual para o livro atual.
- [ ] Exibir capa do livro.
- [ ] Exibir título e autor.
- [ ] Criar destaque para a data da reunião.
- [ ] Criar destaque para o horário.
- [ ] Adicionar botão de participação no clube.
- [ ] Integrar as informações ao Google Sheets, se aprovado.
- [ ] Implementar estados de carregamento.
- [ ] Implementar tratamento de erros.
- [ ] Integrar o componente à página inicial.

### 4.12 Estilização e testes

- [ ] Definir o layout da seção.
- [ ] Estilizar capa e informações.
- [ ] Aplicar identidade visual.
- [ ] Ajustar layout mobile.
- [ ] Testar atualização da leitura.
- [ ] Testar atualização da data.
- [ ] Testar atualização do horário.
- [ ] Testar informações ausentes.
- [ ] Validar o resultado com a cliente.

---

## ETAPA 4 — Clube em Números: dashboard literário

**Prioridade:** Alta

### 4.13 Planejamento do dashboard

- [ ] Definir os indicadores principais.
- [ ] Definir os gráficos que serão exibidos.
- [ ] Definir o formato de apresentação dos dados.
- [ ] Pesquisar bibliotecas de gráficos compatíveis com React.
- [ ] Avaliar a utilização de Recharts.
- [ ] Definir filtros disponíveis.
- [ ] Definir a organização do dashboard.
- [ ] Planejar o layout para celular.

### 4.14 Ampliação da planilha

- [ ] Revisar os campos atuais da planilha.
- [ ] Definir coluna de gênero literário.
- [ ] Definir coluna de país de origem do autor.
- [ ] Definir coluna de idioma original da obra.
- [ ] Definir coluna de gênero da autoria, quando informado.
- [ ] Definir como tratar dados desconhecidos.
- [ ] Definir como registrar livros com múltiplos gêneros.
- [ ] Definir como tratar obras com mais de um autor.
- [ ] Atualizar a estrutura da planilha.
- [ ] Atualizar a aba Dados do site.
- [ ] Conferir a publicação dos novos campos.

### 4.15 Pesquisa e preenchimento dos dados

- [ ] Pesquisar os gêneros literários dos livros.
- [ ] Preencher os gêneros literários.
- [ ] Pesquisar os países de origem dos autores.
- [ ] Preencher os países de origem.
- [ ] Pesquisar os idiomas originais.
- [ ] Preencher os idiomas originais.
- [ ] Verificar informações de autoria disponíveis.
- [ ] Preencher informações de autoria com critérios consistentes.
- [ ] Conferir registros incompletos.
- [ ] Revisar a consistência dos dados.
- [ ] Validar informações com fontes confiáveis.

### 4.16 Indicadores gerais

- [ ] Criar componente de indicador estatístico.
- [ ] Calcular quantidade total de livros lidos.
- [ ] Calcular quantidade de anos registrados.
- [ ] Calcular quantidade de autores diferentes.
- [ ] Calcular quantidade de gêneros literários.
- [ ] Calcular quantidade de países representados.
- [ ] Calcular quantidade de idiomas originais.
- [ ] Exibir indicadores na interface.
- [ ] Testar os cálculos.

### 4.17 Gráfico de gêneros literários

- [ ] Definir a forma de agrupar os gêneros.
- [ ] Implementar contagem por gênero.
- [ ] Criar gráfico de barras.
- [ ] Exibir nomes dos gêneros.
- [ ] Exibir quantidades de livros.
- [ ] Ordenar os gêneros por frequência.
- [ ] Tratar livros com múltiplos gêneros.
- [ ] Testar o gráfico com os dados reais.

### 4.18 Gráfico de países

- [ ] Definir o critério de país utilizado.
- [ ] Implementar contagem por país.
- [ ] Criar gráfico de países mais representados.
- [ ] Exibir nomes dos países.
- [ ] Exibir quantidades.
- [ ] Ordenar resultados.
- [ ] Tratar informações desconhecidas.
- [ ] Testar os cálculos.

### 4.19 Gráfico de idiomas originais

- [ ] Implementar agrupamento por idioma.
- [ ] Calcular quantidade por idioma.
- [ ] Calcular percentuais.
- [ ] Criar gráfico de pizza.
- [ ] Exibir legenda.
- [ ] Exibir percentuais.
- [ ] Tratar idiomas desconhecidos.
- [ ] Testar os resultados.

### 4.20 Gráfico de autoria

- [ ] Definir critérios para classificação.
- [ ] Implementar agrupamento dos dados disponíveis.
- [ ] Calcular quantidades por categoria.
- [ ] Criar gráfico de distribuição.
- [ ] Exibir legenda.
- [ ] Exibir percentuais.
- [ ] Incluir categoria não informado, quando necessário.
- [ ] Testar os resultados.

### 4.21 Página e integração

- [ ] Criar página ou seção ClubeEmNumeros.
- [ ] Criar arquivo de estilização.
- [ ] Adicionar rota ou âncora de navegação.
- [ ] Atualizar o cabeçalho.
- [ ] Integrar dados da planilha.
- [ ] Criar estados de carregamento.
- [ ] Criar mensagens de erro.
- [ ] Organizar indicadores e gráficos.
- [ ] Adicionar filtros por ano, se necessário.
- [ ] Implementar atualização dinâmica.
- [ ] Adaptar gráficos para celulares.
- [ ] Testar os gráficos em diferentes telas.
- [ ] Validar os resultados com a planilha.

---

## ETAPA 5 — Indique um Livro: formulário de sugestões

**Prioridade:** Alta

### 4.22 Planejamento do formulário

- [ ] Definir o objetivo do formulário.
- [ ] Definir os tipos de sugestão aceitos.
- [ ] Permitir indicação de um livro.
- [ ] Permitir indicação de um tema.
- [ ] Permitir indicação de tema e livro.
- [ ] Definir quais campos serão obrigatórios.
- [ ] Definir quais campos serão opcionais.
- [ ] Planejar como a cliente receberá as sugestões.
- [ ] Definir critérios para moderação das sugestões.

### 4.23 Campos do formulário

- [ ] Criar campo de tipo de indicação.
- [ ] Criar campo de título do livro.
- [ ] Criar campo de nome do autor.
- [ ] Criar campo de tema sugerido.
- [ ] Criar campo de justificativa opcional.
- [ ] Criar botão de envio.
- [ ] Criar mensagem de confirmação.
- [ ] Criar mensagem de erro.
- [ ] Definir se algum dado pessoal será necessário.
- [ ] Evitar coleta de dados pessoais desnecessários.

### 4.24 Interface React

- [ ] Criar página ou seção IndiqueUmLivro.
- [ ] Criar arquivo CSS.
- [ ] Adicionar rota ou âncora.
- [ ] Atualizar o cabeçalho.
- [ ] Criar estados dos campos com React.
- [ ] Implementar campos condicionais.
- [ ] Implementar validação de preenchimento.
- [ ] Implementar validação de tamanho dos textos.
- [ ] Implementar botão de envio.
- [ ] Implementar estado de envio.
- [ ] Implementar feedback de sucesso.
- [ ] Implementar feedback de erro.
- [ ] Limpar formulário após envio confirmado.

### 4.25 Armazenamento das sugestões

- [ ] Pesquisar opções de armazenamento.
- [ ] Avaliar Google Apps Script.
- [ ] Avaliar alternativa com banco de dados.
- [ ] Escolher a solução adequada.
- [ ] Configurar o recebimento dos envios.
- [ ] Criar estrutura de armazenamento.
- [ ] Implementar comunicação com o formulário.
- [ ] Proteger dados e credenciais.
- [ ] Implementar proteção básica contra spam.
- [ ] Definir tratamento de sugestões repetidas.
- [ ] Testar o armazenamento.
- [ ] Verificar se a cliente consegue consultar os registros.

### 4.26 Moderação e testes

- [ ] Definir processo de aprovação das sugestões.
- [ ] Evitar inclusão automática nas votações.
- [ ] Testar indicação apenas de livro.
- [ ] Testar indicação apenas de tema.
- [ ] Testar indicação de livro e tema.
- [ ] Testar campos vazios.
- [ ] Testar textos longos.
- [ ] Testar falha de conexão.
- [ ] Testar envios repetidos.
- [ ] Testar o formulário no celular.
- [ ] Verificar acessibilidade dos campos.
- [ ] Validar o funcionamento com a cliente.

---

## ETAPA 6 — LOTY: Livro of the Year

**Prioridade:** Média

### 4.27 Planejamento das premiações

- [ ] Definir a identidade visual do LOTY.
- [ ] Pesquisar referências de premiações literárias.
- [ ] Definir categorias de premiação.
- [ ] Definir critérios de classificação.
- [ ] Definir critérios de desempate.
- [ ] Definir como serão exibidos os vencedores.
- [ ] Validar categorias e critérios com a cliente.

### 4.28 Categorias previstas

- [ ] Livro mais bem avaliado de 2023.
- [ ] Livro mais bem avaliado de 2024.
- [ ] Livro mais bem avaliado de 2025.
- [ ] Livro mais bem avaliado de 2026, quando definido.
- [ ] Livro com menor avaliação de todos os anos.
- [ ] Livro mais amado pela comunidade.
- [ ] Definir possíveis categorias adicionais.
- [ ] Validar as informações da categoria Livro Mais Amado.

### 4.29 Tratamento dos dados

- [ ] Revisar avaliações existentes.
- [ ] Conferir notas ausentes.
- [ ] Definir como tratar notas pendentes.
- [ ] Implementar agrupamento por ano.
- [ ] Implementar identificação da maior nota por ano.
- [ ] Implementar identificação da menor nota geral.
- [ ] Implementar critérios de desempate.
- [ ] Preparar dados para os cards de premiação.
- [ ] Testar os resultados.

### 4.30 Desenvolvimento da interface

- [ ] Criar página ou seção LOTY.
- [ ] Criar arquivo CSS.
- [ ] Configurar navegação.
- [ ] Criar componente de card de premiação.
- [ ] Criar destaque para os vencedores anuais.
- [ ] Criar destaque para o livro de menor avaliação.
- [ ] Criar destaque para o livro mais amado.
- [ ] Exibir capas dos livros.
- [ ] Exibir títulos e autores.
- [ ] Exibir avaliações.
- [ ] Criar elementos visuais de premiação.
- [ ] Aplicar a identidade visual do clube.
- [ ] Adaptar o layout para dispositivos móveis.
- [ ] Testar dados e navegação.

---

## ETAPA 7 — Votação LOTY 2026 e avaliações dos leitores

**Prioridade:** Alta

### 4.31 Planejamento

- [ ] Definir quais livros de 2026 participarão.
- [ ] Definir a pergunta da votação.
- [ ] Definir se o voto poderá ser alterado.
- [ ] Definir o período de votação.
- [ ] Definir como serão divulgados os resultados.
- [ ] Definir a escala de avaliação dos livros.
- [ ] Diferenciar voto de favorito e nota individual.
- [ ] Definir como tratar livros ainda não lidos.
- [ ] Definir regras para reduzir votos repetidos.
- [ ] Validar as regras com a cliente.

### 4.32 Estrutura de dados

- [ ] Pesquisar opções de banco de dados.
- [ ] Avaliar a viabilidade de uma solução sem login.
- [ ] Escolher a tecnologia de armazenamento.
- [ ] Criar estrutura para registrar votos.
- [ ] Criar estrutura para registrar avaliações.
- [ ] Definir identificação mínima necessária para controle.
- [ ] Definir regras de acesso aos dados.
- [ ] Proteger credenciais e operações de escrita.
- [ ] Definir tratamento de envios inválidos.
- [ ] Testar gravação e leitura dos registros.

### 4.33 Votação de livro favorito

- [ ] Criar componente de votação.
- [ ] Exibir livros elegíveis de 2026.
- [ ] Exibir capa e título dos livros.
- [ ] Permitir seleção do favorito.
- [ ] Criar botão para confirmar o voto.
- [ ] Implementar envio do voto.
- [ ] Exibir confirmação.
- [ ] Tratar falhas de envio.
- [ ] Implementar proteção básica contra votos duplicados.
- [ ] Definir comportamento após o voto.
- [ ] Testar a votação.

### 4.34 Avaliação dos livros

- [ ] Criar componente de avaliação.
- [ ] Definir escala de 1 a 5.
- [ ] Implementar seleção de nota.
- [ ] Exibir avaliação selecionada.
- [ ] Implementar envio da avaliação.
- [ ] Registrar avaliações no armazenamento.
- [ ] Calcular média por livro.
- [ ] Calcular quantidade de avaliações.
- [ ] Exibir média das notas.
- [ ] Exibir quantidade de participantes que avaliaram.
- [ ] Tratar livros sem avaliações.
- [ ] Testar cálculos e arredondamentos.
- [ ] Testar envio de avaliações.

### 4.35 Resultados e segurança

- [ ] Criar área de resultados.
- [ ] Calcular quantidade de votos por livro.
- [ ] Calcular percentuais.
- [ ] Definir se os resultados serão públicos durante a votação.
- [ ] Exibir ranking, quando permitido.
- [ ] Implementar regras de encerramento.
- [ ] Testar votos repetidos.
- [ ] Testar envios inválidos.
- [ ] Testar múltiplos dispositivos.
- [ ] Verificar comportamento sem conexão.
- [ ] Avaliar limitações do controle sem login.
- [ ] Validar o funcionamento com a cliente.

---

## ETAPA 8 — Testes gerais, acessibilidade e qualidade

**Prioridade:** Alta

### 4.36 Testes de navegação

- [ ] Testar página inicial.
- [ ] Testar Nossa Estante.
- [ ] Testar página Sobre.
- [ ] Testar Clube em Números.
- [ ] Testar Indique um Livro.
- [ ] Testar LOTY.
- [ ] Testar votação de 2026.
- [ ] Testar links do cabeçalho.
- [ ] Testar navegação pelo menu mobile.
- [ ] Testar botão Entrar no Clube.
- [ ] Testar links externos.
- [ ] Testar rotas após atualizar o navegador.

### 4.37 Testes de dados

- [ ] Testar carregamento da planilha.
- [ ] Testar atualização de registros.
- [ ] Testar filtros por ano.
- [ ] Testar registros sem avaliação.
- [ ] Testar registros sem imagem.
- [ ] Testar URLs de imagens inválidas.
- [ ] Testar registros não publicados.
- [ ] Testar indisponibilidade da planilha.
- [ ] Testar os cálculos do dashboard.
- [ ] Testar resultados do LOTY.
- [ ] Testar armazenamento de sugestões.
- [ ] Testar armazenamento de votos.
- [ ] Testar cálculo das avaliações.

### 4.38 Responsividade

- [ ] Testar em celulares pequenos.
- [ ] Testar em celulares médios.
- [ ] Testar em tablets.
- [ ] Testar em notebooks.
- [ ] Testar em monitores maiores.
- [ ] Verificar imagens e capas.
- [ ] Verificar espaçamentos.
- [ ] Verificar legibilidade.
- [ ] Verificar botões e formulários.
- [ ] Verificar gráficos.
- [ ] Corrigir rolagem horizontal indevida.

### 4.39 Acessibilidade

- [ ] Revisar estrutura semântica do HTML.
- [ ] Revisar hierarquia de títulos.
- [ ] Revisar textos alternativos das imagens.
- [ ] Revisar contraste de cores.
- [ ] Revisar foco visível.
- [ ] Testar navegação pelo teclado.
- [ ] Revisar rótulos dos formulários.
- [ ] Revisar mensagens de erro.
- [ ] Revisar acessibilidade do menu mobile.
- [ ] Revisar acessibilidade dos gráficos.
- [ ] Testar ferramentas de avaliação de acessibilidade.
- [ ] Corrigir problemas encontrados.

### 4.40 Organização do código

- [ ] Revisar a estrutura de pastas.
- [ ] Revisar componentes reutilizáveis.
- [ ] Remover código não utilizado.
- [ ] Remover estilos duplicados.
- [ ] Revisar nomes de variáveis e componentes.
- [ ] Organizar funções de tratamento de dados.
- [ ] Verificar mensagens de erro no console.
- [ ] Executar verificações do projeto.
- [ ] Corrigir avisos relevantes.
- [ ] Revisar dependências utilizadas.

---

## ETAPA 9 — Publicação do site

**Prioridade:** Alta

### 4.41 Preparação

- [ ] Pesquisar opções de hospedagem.
- [ ] Escolher a plataforma de publicação.
- [ ] Revisar configurações do Vite.
- [ ] Verificar variáveis de ambiente.
- [ ] Verificar ausência de credenciais expostas.
- [ ] Executar build de produção.
- [ ] Corrigir erros de build.
- [ ] Verificar arquivos gerados.
- [ ] Preparar configurações de rotas.

### 4.42 Implantação

- [ ] Conectar repositório à hospedagem.
- [ ] Configurar comando de build.
- [ ] Configurar diretório de publicação.
- [ ] Configurar suporte às rotas do React Router.
- [ ] Realizar a primeira publicação.
- [ ] Obter endereço público do site.
- [ ] Testar acesso pelo computador.
- [ ] Testar acesso pelo celular.
- [ ] Testar atualização direta das páginas.
- [ ] Verificar funcionamento dos dados externos.

### 4.43 Testes em produção

- [ ] Testar carregamento da página inicial.
- [ ] Testar carregamento da Nossa Estante.
- [ ] Testar carregamento do dashboard.
- [ ] Testar formulário de sugestões.
- [ ] Testar votação.
- [ ] Testar links externos.
- [ ] Testar imagens.
- [ ] Testar desempenho.
- [ ] Corrigir problemas encontrados.
- [ ] Realizar nova publicação após correções.

---

## ETAPA 10 — Validação com a cliente

**Prioridade:** Alta

### 4.44 Apresentação

- [ ] Preparar demonstração do site.
- [ ] Apresentar a página inicial.
- [ ] Apresentar a Nossa Estante.
- [ ] Apresentar a página Sobre.
- [ ] Apresentar o dashboard.
- [ ] Apresentar o formulário de sugestões.
- [ ] Apresentar o LOTY.
- [ ] Apresentar a votação de 2026.
- [ ] Demonstrar atualização de dados pela planilha.

### 4.45 Coleta de retorno

- [ ] Solicitar avaliação da navegação.
- [ ] Solicitar avaliação da identidade visual.
- [ ] Confirmar informações apresentadas.
- [ ] Verificar facilidade de atualização da planilha.
- [ ] Solicitar sugestões de melhoria.
- [ ] Registrar problemas apontados.
- [ ] Priorizar correções.
- [ ] Implementar ajustes aprovados.
- [ ] Confirmar o funcionamento final com a cliente.

---

## ETAPA 11 — Documentação e entrega final

**Prioridade:** Alta  
**Prazo:** 16/12/2026

### 4.46 Documentação técnica

- [ ] Atualizar o README.md.
- [ ] Descrever o objetivo do projeto.
- [ ] Descrever as tecnologias utilizadas.
- [ ] Documentar a estrutura de pastas.
- [ ] Documentar os comandos de execução.
- [ ] Documentar as funcionalidades.
- [ ] Documentar a integração com Google Sheets.
- [ ] Documentar a solução de armazenamento de sugestões.
- [ ] Documentar a solução de votação.
- [ ] Informar o endereço do site publicado.

### 4.47 Manual da cliente

- [ ] Criar instruções para acessar a planilha.
- [ ] Explicar como adicionar livros.
- [ ] Explicar como preencher avaliações.
- [ ] Explicar como inserir links de capas.
- [ ] Explicar o status de publicação.
- [ ] Explicar como atualizar a leitura atual.
- [ ] Explicar como atualizar a próxima reunião.
- [ ] Explicar como consultar sugestões recebidas.
- [ ] Explicar como acompanhar as votações.
- [ ] Revisar o manual com a cliente.

### 4.48 Registro acadêmico

- [ ] Manter o TIMESHEET.md atualizado.
- [ ] Registrar as horas efetivamente trabalhadas.
- [ ] Manter os registros anteriores.
- [ ] Atualizar os totais acumulados.
- [ ] Atualizar os percentuais por etapa.
- [ ] Associar evidências às atividades.
- [ ] Conferir os links das evidências.
- [ ] Organizar commits relevantes no GitHub.
- [ ] Atualizar o PLANEJAMENTO.md.
- [ ] Registrar atividades concluídas.
- [ ] Preparar o relatório final.
- [ ] Revisar os requisitos da disciplina.

### 4.49 Entrega

- [ ] Conferir o funcionamento completo do site.
- [ ] Conferir a publicação.
- [ ] Conferir o repositório.
- [ ] Conferir a documentação.
- [ ] Conferir o timesheet.
- [ ] Conferir as evidências.
- [ ] Confirmar o retorno final da cliente.
- [ ] Preparar a apresentação final.
- [ ] Realizar a entrega até 16/12/2026.

---

## 5. Organização das atividades e carga horária

**Carga horária total prevista:** 280 horas.

As atividades serão distribuídas entre levantamento de requisitos, planejamento, desenvolvimento, testes, implantação, validação e documentação.

O planejamento considera a realização das atividades ao longo das semanas, com um dia de descanso semanal sempre que possível.

As estimativas poderão ser ajustadas conforme a complexidade das funcionalidades e as necessidades identificadas durante o desenvolvimento.

O tempo efetivamente dedicado a cada atividade será registrado no arquivo TIMESHEET.md, acompanhado da evidência correspondente.

---

## 6. Acompanhamento do progresso

O andamento das tarefas será acompanhado por meio deste checklist.

**Legenda:**

- [x] Atividade concluída.
- [ ] Atividade pendente.

As tarefas serão marcadas conforme forem finalizadas.

O planejamento poderá receber novas atividades ou ajustes de prioridade de acordo com o andamento do projeto e o retorno da cliente.

---

## 7. Critérios de conclusão do projeto

O projeto será considerado concluído quando:

- [ ] As funcionalidades acordadas com a cliente estiverem implementadas.
- [ ] O site estiver responsivo.
- [ ] A navegação estiver funcionando corretamente.
- [ ] Os dados dos livros estiverem atualizados.
- [ ] O dashboard apresentar informações consistentes.
- [ ] O formulário de sugestões estiver funcionando.
- [ ] A votação estiver funcionando conforme as regras definidas.
- [ ] As principais funcionalidades tiverem sido testadas.
- [ ] A cliente tiver recebido orientações de utilização.
- [ ] O site estiver publicado e acessível.
- [ ] A documentação estiver organizada.
- [ ] As evidências acadêmicas estiverem conferidas.
- [ ] A entrega final tiver sido realizada.

---

## 8. Prazo final

**Data prevista para conclusão: 16/12/2026.**