
const CONFIG = {
  ABA_VOTOS: 'Votos',
  ABA_EDICOES: 'Edicoes',
  CATEGORIAS: [
    'livro-do-ano',
    'pior-livro',
    'mais-emocionante',
    'plot-twist',
    'maior-surpresa'
  ],
  MINIMO_LIVROS: 12,
  ANO_INICIAL: 2026,
  FUSO_HORARIO: 'America/Sao_Paulo'
};

const URL_LIVROS =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3kpBfZlGs7DosCsSz5t8uVhbxvFO9LZ553bHPACLCLQtwoniPoroV2viT-tlvvJDgvkazqS2tpCCn/pub?gid=1392192016&single=true&output=csv';

// =====================================
// PREPARAÇÃO DA PLANILHA
// =====================================

function prepararPlanilha() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();

  criarAbaSeNecessario_(planilha, CONFIG.ABA_VOTOS, [
    'Data',
    'Ano',
    'Nome',
    'Sobrenome',
    ...CONFIG.CATEGORIAS
  ]);

  criarAbaSeNecessario_(planilha, CONFIG.ABA_EDICOES, [
    'Ano',
    'Status'
  ]);
}

function criarAbaSeNecessario_(planilha, nome, cabecalho) {
  let aba = planilha.getSheetByName(nome);

  if (!aba) {
    aba = planilha.insertSheet(nome);
  }

  if (aba.getLastRow() === 0) {
    aba.appendRow(cabecalho);
    aba.setFrozenRows(1);
  }

  return aba;
}

// =====================================
// FUNÇÕES AUXILIARES
// =====================================

function resposta_(dados) {
  return ContentService
    .createTextOutput(JSON.stringify(dados))
    .setMimeType(ContentService.MimeType.JSON);
}

function limpar_(valor) {
  return String(valor == null ? '' : valor).trim();
}

function normalizarNome_(valor) {
  return limpar_(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function criarIdLivro_(ano, mes, titulo) {
  return [ano, mes, titulo]
    .map(parte =>
      limpar_(parte)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
    )
    .join('|');
}

// =====================================
// DATAS E EDIÇÕES
// =====================================

function dataBrasilia_() {
  const agora = new Date();

  const data = Utilities.formatDate(
    agora,
    CONFIG.FUSO_HORARIO,
    'yyyy-MM-dd'
  );

  const partes = data.split('-').map(Number);

  return {
    ano: partes[0],
    mes: partes[1],
    dia: partes[2]
  };
}

function anoEdicaoAtual_() {
  const data = dataBrasilia_();

  if (data.mes === 1 && data.dia <= 10) {
    return Math.max(CONFIG.ANO_INICIAL, data.ano - 1);
  }

  return Math.max(CONFIG.ANO_INICIAL, data.ano);
}

function prazoEncerrado_(ano) {
  const data = dataBrasilia_();

  if (data.ano > ano + 1) {
    return true;
  }

  if (data.ano === ano + 1) {
    return data.mes > 1 ||
      (data.mes === 1 && data.dia > 10);
  }

  return false;
}

function edicaoJaComecou_(ano) {
  const data = dataBrasilia_();

  return data.ano >= ano;
}

// =====================================
// LEITURA DOS LIVROS
// =====================================

function lerCsv_(csv) {
  return Utilities.parseCsv(csv);
}

function buscarLivros_() {
  const resposta = UrlFetchApp.fetch(URL_LIVROS, {
    muteHttpExceptions: true
  });

  if (resposta.getResponseCode() !== 200) {
    throw new Error('Não foi possível consultar a estante.');
  }

  const linhas = lerCsv_(
    resposta.getContentText('UTF-8')
  );

  if (!linhas.length) {
    throw new Error('A planilha da estante está vazia.');
  }

  const cabecalho = linhas.shift().map(limpar_);

  const colunaAno = cabecalho.indexOf('Ano');
  const colunaMes = cabecalho.indexOf('Mês');
  const colunaTitulo = cabecalho.indexOf('Título');

  if ([colunaAno, colunaMes, colunaTitulo].includes(-1)) {
    throw new Error(
      'Colunas obrigatórias não encontradas na estante.'
    );
  }

  const livros = [];

  linhas.forEach(linha => {
    const ano = limpar_(linha[colunaAno]);
    const mes = limpar_(linha[colunaMes]);
    const titulo = limpar_(linha[colunaTitulo]);

    if (!/^\d{4}$/.test(ano) || !titulo) {
      return;
    }

    livros.push({
      ano: Number(ano),
      id: criarIdLivro_(ano, mes, titulo),
      titulo
    });
  });

  return [
    ...new Map(
      livros.map(livro => [livro.id, livro])
    ).values()
  ];
}

// =====================================
// STATUS DA VOTAÇÃO
// =====================================

function statusEdicao_(ano, livros) {
  const quantidade = livros.filter(
    livro => livro.ano === ano
  ).length;

  const atingiuMinimo =
    quantidade >= CONFIG.MINIMO_LIVROS;

  const comecou = edicaoJaComecou_(ano);
  const encerrada = prazoEncerrado_(ano);

  const aberta =
    comecou &&
    atingiuMinimo &&
    !encerrada &&
    ano === anoEdicaoAtual_();

  let situacao = 'aguardando';

  if (encerrada) {
    situacao = 'encerrada';
  } else if (aberta) {
    situacao = 'aberta';
  }

  return {
    ano,
    quantidadeLivros: quantidade,
    minimoLivros: CONFIG.MINIMO_LIVROS,
    aberta,
    encerrada,
    situacao,
    dataLimite: `10/01/${ano + 1}`,
    horarioLimite: '23:59:59',
    fusoHorario: CONFIG.FUSO_HORARIO
  };
}

// =====================================
// RESULTADOS PÚBLICOS
// =====================================

function resultados_(ano, livros) {
  const aba = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.ABA_VOTOS);

  const resultado = {};
  const contagens = {};

  CONFIG.CATEGORIAS.forEach(categoria => {
    resultado[categoria] = [];
    contagens[categoria] = {};
  });

  if (!aba || aba.getLastRow() < 2) {
    return resultado;
  }

  const linhas = aba.getDataRange().getValues();
  linhas.shift();

  linhas.forEach(linha => {
    if (Number(linha[1]) !== ano) {
      return;
    }

    CONFIG.CATEGORIAS.forEach((categoria, indice) => {
      const id = limpar_(linha[indice + 4]);

      if (!id) {
        return;
      }

      contagens[categoria][id] =
        (contagens[categoria][id] || 0) + 1;
    });
  });

  const livrosPorId = new Map(
    livros.map(livro => [livro.id, livro])
  );

  CONFIG.CATEGORIAS.forEach(categoria => {
    resultado[categoria] = Object.entries(
      contagens[categoria]
    )
      .map(([livroId, votos]) => ({
        livroId,
        titulo:
          livrosPorId.get(livroId)?.titulo || livroId,
        votos
      }))
      .sort((a, b) => b.votos - a.votos);
  });

  return resultado;
}

// =====================================
// CONSULTAR STATUS E RESULTADOS
// =====================================

function doGet(e) {
  try {
    prepararPlanilha();

    const parametros = e && e.parameter
      ? e.parameter
      : {};

    const ano = Number(
      parametros.ano || anoEdicaoAtual_()
    );

    if (
      !Number.isInteger(ano) ||
      ano < CONFIG.ANO_INICIAL
    ) {
      throw new Error('Ano inválido.');
    }

    const livros = buscarLivros_();
    const status = statusEdicao_(ano, livros);

    return resposta_({
      sucesso: true,
      status,
      resultados: resultados_(ano, livros)
    });
  } catch (erro) {
    return resposta_({
      sucesso: false,
      mensagem: erro.message
    });
  }
}

// =====================================
// REGISTRAR VOTOS
// =====================================

function doPost(e) {
  const bloqueio = LockService.getScriptLock();

  try {
    bloqueio.waitLock(30000);
    prepararPlanilha();

    const dados = e && e.parameter
      ? e.parameter
      : {};

    const ano = Number(dados.ano);
    const nome = limpar_(dados.nome);
    const sobrenome = limpar_(dados.sobrenome);

    const votos = JSON.parse(dados.votos || '{}');

    if (
      !Number.isInteger(ano) ||
      ano < CONFIG.ANO_INICIAL
    ) {
      throw new Error('Ano inválido.');
    }

    if (
      nome.length < 2 ||
      sobrenome.length < 2
    ) {
      throw new Error('Informe nome e sobrenome.');
    }

    if (
      !votos ||
      typeof votos !== 'object' ||
      Array.isArray(votos)
    ) {
      throw new Error('Formato dos votos inválido.');
    }

    const livros = buscarLivros_();
    const status = statusEdicao_(ano, livros);

    if (status.encerrada) {
      throw new Error(
        'A votação desta edição foi encerrada em ' +
        status.dataLimite + '.'
      );
    }

    if (!status.aberta) {
      throw new Error(
        'A votação desta edição ainda não está aberta.'
      );
    }

    const idsValidos = new Set(
      livros
        .filter(livro => livro.ano === ano)
        .map(livro => livro.id)
    );

    const escolhas = CONFIG.CATEGORIAS.map(categoria => {
      const livroId = limpar_(votos[categoria]);

      if (livroId && !idsValidos.has(livroId)) {
        throw new Error(
          'Foi selecionado um livro inválido.'
        );
      }

      return livroId;
    });

    if (!escolhas.some(Boolean)) {
      throw new Error(
        'Selecione pelo menos um livro.'
      );
    }

    const aba = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(CONFIG.ABA_VOTOS);

    const linhas = aba.getDataRange().getValues();

    const identificacao = [
      normalizarNome_(nome),
      normalizarNome_(sobrenome)
    ].join('|');

    const jaVotou = linhas.slice(1).some(linha => {
      if (Number(linha[1]) !== ano) {
        return false;
      }

      const identificacaoExistente = [
        normalizarNome_(linha[2]),
        normalizarNome_(linha[3])
      ].join('|');

      return identificacaoExistente === identificacao;
    });

    if (jaVotou) {
      throw new Error(
        'Já existe uma votação com esse nome neste ano.'
      );
    }

    aba.appendRow([
      new Date(),
      ano,
      nome,
      sobrenome,
      ...escolhas
    ]);

    SpreadsheetApp.flush();

    return resposta_({
      sucesso: true,
      mensagem: 'Votos registrados com sucesso!',
      resultados: resultados_(ano, livros)
    });
  } catch (erro) {
    return resposta_({
      sucesso: false,
      mensagem: erro.message
    });
  } finally {
    if (bloqueio.hasLock()) {
      bloqueio.releaseLock();
    }
  }
}
