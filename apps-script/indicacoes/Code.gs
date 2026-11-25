function doGet() {
  return responder({
    sucesso: true,
    mensagem: 'API de indicações funcionando!'
  });
}

function doPost(e) {
  try {
    const dados = e.parameter || {};

    const nome = limpar(dados.nome);
    const sobrenome = limpar(dados.sobrenome);
    const tipo = limpar(dados.tipo);
    const titulo = limpar(dados.titulo);
    const autor = limpar(dados.autor);
    const genero = limpar(dados.genero);
    const tema = limpar(dados.tema);
    const motivo = limpar(dados.motivo);

    if (!nome || !sobrenome) {
      return responder({
        sucesso: false,
        mensagem: 'Preencha seu nome e sobrenome.'
      });
    }

    if (tipo !== 'livro' && tipo !== 'tema') {
      return responder({
        sucesso: false,
        mensagem: 'Tipo de indicação inválido.'
      });
    }

    if (tipo === 'livro' && (!titulo || !autor)) {
      return responder({
        sucesso: false,
        mensagem: 'Informe o título e o autor do livro.'
      });
    }

    if (tipo === 'tema' && !tema) {
      return responder({
        sucesso: false,
        mensagem: 'Informe o tema sugerido.'
      });
    }

    if (
      nome.length > 80 ||
      sobrenome.length > 120 ||
      titulo.length > 250 ||
      autor.length > 200 ||
      genero.length > 100 ||
      tema.length > 250 ||
      motivo.length > 1500
    ) {
      return responder({
        sucesso: false,
        mensagem: 'Um dos campos excedeu o limite de caracteres.'
      });
    }

    // Campo invisível para reduzir spam automatizado
    if (dados.website) {
      return responder({
        sucesso: false,
        mensagem: 'Envio inválido.'
      });
    }

    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getSheetByName('Indicacoes');

    if (!aba) {
      throw new Error('Aba Indicacoes não encontrada.');
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      aba.appendRow([
        new Date(),
        textoSeguro(nome),
        textoSeguro(sobrenome),
        tipo === 'livro' ? 'Livro' : 'Tema',
        tipo === 'livro' ? textoSeguro(titulo) : '',
        tipo === 'livro' ? textoSeguro(autor) : '',
        tipo === 'livro' ? textoSeguro(genero) : '',
        tipo === 'tema' ? textoSeguro(tema) : '',
        textoSeguro(motivo)
      ]);

      SpreadsheetApp.flush();

    } finally {
      lock.releaseLock();
    }

    return responder({
      sucesso: true,
      mensagem: 'Indicação enviada com sucesso!'
    });

  } catch (erro) {
    console.error(erro);

    return responder({
      sucesso: false,
      mensagem: 'Não foi possível enviar sua indicação. Tente novamente.'
    });
  }
}

function limpar(valor) {
  return String(valor || '').trim();
}

function textoSeguro(valor) {
  return /^[=+\-@]/.test(valor)
    ? "'" + valor
    : valor;
}

function responder(dados) {
  return ContentService
    .createTextOutput(JSON.stringify(dados))
    .setMimeType(ContentService.MimeType.JSON);
}