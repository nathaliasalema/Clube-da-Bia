
import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import {
  ArrowLeft, ArrowRight, BookHeart, Check,
  CheckCircle2, Heart, LoaderCircle,
  PartyPopper, Sparkles, Trophy
} from 'lucide-react'
import './Premios.css'

const PLANILHA_LIVROS =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3kpBfZlGs7DosCsSz5t8uVhbxvFO9LZ553bHPACLCLQtwoniPoroV2viT-tlvvJDgvkazqS2tpCCn/pub?gid=1392192016&single=true&output=csv'

const API_VOTOS =
  'https://script.google.com/macros/s/AKfycbwPQ19QhmZpvYP0DHbjlm96zxqV5rttE0WYEziJQRn7Qe4qYPFTETz5KPnG9kUNW4IC/exec'

const ANO_INICIAL = 2026
const MINIMO_LIVROS = 12
const INTERVALO_ATUALIZACAO = 30000

const CATEGORIAS = [
  {
    id: 'livro-do-ano',
    titulo: 'Livro do Ano',
    emoji: '🏆',
    descricao: 'Qual foi o seu livro favorito do ano?'
  },
  {
    id: 'pior-livro',
    titulo: 'Pior Livro do Ano',
    emoji: '💔',
    descricao: 'Qual foi a maior decepção literária?'
  },
  {
    id: 'mais-emocionante',
    titulo: 'Livro que Mais Emocionou',
    emoji: '😭',
    descricao: 'Qual história mais mexeu com você?'
  },
  {
    id: 'plot-twist',
    titulo: 'Maior Plot Twist',
    emoji: '⚡',
    descricao: 'Qual livro teve a reviravolta mais surpreendente?'
  },
  {
    id: 'maior-surpresa',
    titulo: 'Maior Surpresa do Ano',
    emoji: '✨',
    descricao: 'Qual livro superou suas expectativas?'
  }
]

function dataBrasilia() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).formatToParts(new Date())

  const valores = Object.fromEntries(
    partes.map(parte => [parte.type, Number(parte.value)])
  )

  return {
    ano: valores.year,
    mes: valores.month,
    dia: valores.day
  }
}

function anoEdicaoAtual() {
  const data = dataBrasilia()

  if (data.mes === 1 && data.dia <= 10) {
    return Math.max(ANO_INICIAL, data.ano - 1)
  }

  return Math.max(ANO_INICIAL, data.ano)
}

function prazoEncerrado(ano) {
  const data = dataBrasilia()

  if (data.ano > ano + 1) return true

  if (data.ano === ano + 1) {
    return data.mes > 1 ||
      (data.mes === 1 && data.dia > 10)
  }

  return false
}

function limparTexto(valor) {
  return String(valor ?? '').trim()
}

function criarIdLivro(ano, mes, titulo) {
  return [ano, mes, titulo]
    .map(parte =>
      limparTexto(parte)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
    )
    .join('|')
}

function normalizarLivros(csv, ano) {
  const dados = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: titulo => titulo.trim()
  })

  if (dados.errors.length && !dados.data.length) {
    throw new Error('Não foi possível ler a planilha.')
  }

  const livros = dados.data
    .filter(linha => limparTexto(linha.Ano) === String(ano))
    .filter(linha => limparTexto(linha.Título))
    .map(linha => ({
      id: criarIdLivro(
        linha.Ano,
        linha.Mês,
        linha.Título
      ),
      titulo: limparTexto(linha.Título),
      autor: limparTexto(linha.Autor),
      capa: limparTexto(linha['URL da capa'])
    }))

  return [
    ...new Map(
      livros.map(livro => [livro.id, livro])
    ).values()
  ]
}

function CapaLivro({ livro }) {
  const [falhou, setFalhou] = useState(false)

  useEffect(() => {
    setFalhou(false)
  }, [livro.capa])

  if (!livro.capa || falhou) {
    return (
      <div className="premios-capa-vazia">
        <BookHeart size={34} />
        <span>Clube da Bia</span>
      </div>
    )
  }

  return (
    <img
      src={livro.capa}
      alt={`Capa de ${livro.titulo}`}
      loading="lazy"
      onError={() => setFalhou(true)}
    />
  )
}

function CardLivro({ livro, selecionado, onClick }) {
  return (
    <button
      type="button"
      className={`premios-livro ${
        selecionado ? 'premios-livro-selecionado' : ''
      }`}
      onClick={onClick}
      aria-pressed={selecionado}
    >
      <div className="premios-livro-imagem">
        <CapaLivro livro={livro} />

        {selecionado && (
          <span className="premios-livro-check">
            <Check size={17} />
          </span>
        )}
      </div>

      <span className="premios-livro-titulo">
        {livro.titulo}
      </span>

      <span className="premios-livro-autor">
        {livro.autor}
      </span>
    </button>
  )
}

function PainelResultados({ resultados, categorias, livrosPorId }) {
  if (!resultados) {
    return (
      <p>Os resultados ainda não estão disponíveis.</p>
    )
  }

  return (
    <div className="premios-resultados">
      {categorias.map(categoria => {
        const itens = resultados[categoria.id] || []

        const total = itens.reduce(
          (soma, item) => soma + Number(item.votos || 0),
          0
        )

        return (
          <article
            className="premios-resultado-categoria"
            key={categoria.id}
          >
            <h4>
              {categoria.emoji} {categoria.titulo}
            </h4>

            {total === 0 ? (
              <p>Ainda não há votos nesta categoria.</p>
            ) : (
              [...itens]
                .sort((a, b) => Number(b.votos) - Number(a.votos))
                .map((item, indice) => {
                  const porcentagem =
                    (Number(item.votos) / total) * 100

                  return (
                    <div
                      className="premios-ranking-item"
                      key={item.livroId}
                    >
                      <div className="premios-ranking-info">
                        <span>
                          {indice === 0 ? '🥇 ' : ''}
                          {livrosPorId.get(item.livroId)?.titulo ||
                            item.titulo}
                        </span>

                        <strong>
                          {porcentagem.toFixed(1)}%
                        </strong>
                      </div>

                      <div className="premios-barra">
                        <div
                          style={{ width: `${porcentagem}%` }}
                        />
                      </div>

                      <small>
                        {item.votos}{' '}
                        {Number(item.votos) === 1
                          ? 'voto'
                          : 'votos'}
                      </small>
                    </div>
                  )
                })
            )}
          </article>
        )
      })}
    </div>
  )
}

function Premios() {
  const [anoAtual, setAnoAtual] = useState(anoEdicaoAtual)
  const [anoSelecionado, setAnoSelecionado] = useState(anoEdicaoAtual)

  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroLivros, setErroLivros] = useState('')

  const [statusVotacao, setStatusVotacao] = useState(null)
  const [resultadosPublicos, setResultadosPublicos] = useState(null)
  const [erroAPI, setErroAPI] = useState('')

  const [mostrarResultados, setMostrarResultados] = useState(false)
  const [etapa, setEtapa] = useState(-1)

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [votos, setVotos] = useState({})

  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')
  const [resultado, setResultado] = useState(null)

  const edicaoAtual = anoSelecionado === anoAtual

  const votacaoAberta =
    edicaoAtual &&
    statusVotacao?.aberta === true &&
    !prazoEncerrado(anoSelecionado)

  const livrosPorId = useMemo(
    () => new Map(livros.map(livro => [livro.id, livro])),
    [livros]
  )

  const categoriaAtual =
    etapa >= 0 && etapa < CATEGORIAS.length
      ? CATEGORIAS[etapa]
      : null

  const etapaRevisao = etapa === CATEGORIAS.length
  const etapaResultado = etapa === CATEGORIAS.length + 1

  const nomeValido =
    nome.trim().length >= 2 &&
    sobrenome.trim().length >= 2

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      const novoAno = anoEdicaoAtual()

      setAnoAtual(novoAno)
    }, 60000)

    return () => window.clearInterval(intervalo)
  }, [])

  useEffect(() => {
    let ativo = true

    setCarregando(true)
    setErroLivros('')
    setLivros([])

    async function buscarLivros() {
      try {
        const resposta = await fetch(PLANILHA_LIVROS)

        if (!resposta.ok) {
          throw new Error('Falha ao consultar a estante.')
        }

        const csv = await resposta.text()
        const lista = normalizarLivros(csv, anoSelecionado)

        if (ativo) setLivros(lista)
      } catch (erro) {
        if (ativo) {
          setErroLivros(
            'Não foi possível carregar os livros.'
          )
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    buscarLivros()

    return () => {
      ativo = false
    }
  }, [anoSelecionado])

  useEffect(() => {
    let ativo = true

    setStatusVotacao(null)
    setResultadosPublicos(null)
    setErroAPI('')

    async function consultarAPI() {
      try {
        const url =
          `${API_VOTOS}?ano=${anoSelecionado}&t=${Date.now()}`

        const resposta = await fetch(url, {
          cache: 'no-store'
        })

        if (!resposta.ok) {
          throw new Error('Falha ao consultar a API.')
        }

        const dados = await resposta.json()

        if (!dados.sucesso) {
          throw new Error(
            dados.mensagem || 'Erro ao consultar a API.'
          )
        }

        if (ativo) {
          setStatusVotacao(dados.status)
          setResultadosPublicos(dados.resultados)
          setErroAPI('')
        }
      } catch (erro) {
        if (ativo) {
          setStatusVotacao(null)
          setErroAPI(
            'Não foi possível consultar a votação agora.'
          )
        }
      }
    }

    consultarAPI()

    const intervalo = window.setInterval(
      consultarAPI,
      INTERVALO_ATUALIZACAO
    )

    return () => {
      ativo = false
      window.clearInterval(intervalo)
    }
  }, [anoSelecionado])

  function mudarAno(ano) {
    setAnoSelecionado(ano)
    setMostrarResultados(true)
    setEtapa(-1)
    setVotos({})
    setResultado(null)
    setErroEnvio('')
  }

  function avancar() {
    setErroEnvio('')

    setEtapa(atual =>
      Math.min(atual + 1, CATEGORIAS.length)
    )

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function voltar() {
    setErroEnvio('')

    setEtapa(atual => Math.max(atual - 1, -1))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function escolherLivro(categoriaId, livroId) {
    setVotos(anteriores => ({
      ...anteriores,
      [categoriaId]: livroId
    }))
  }

  async function confirmarVotos() {
    if (!nomeValido) {
      setErroEnvio('Informe nome e sobrenome.')
      return
    }

    if (!votacaoAberta) {
      setErroEnvio(
        'A votação não está aberta ou o prazo terminou.'
      )
      return
    }

    if (!Object.values(votos).some(Boolean)) {
      setErroEnvio('Selecione pelo menos um livro.')
      return
    }

    setEnviando(true)
    setErroEnvio('')

    try {
      const dados = new URLSearchParams()

      dados.set('nome', nome.trim())
      dados.set('sobrenome', sobrenome.trim())
      dados.set('ano', String(anoSelecionado))
      dados.set('votos', JSON.stringify(votos))

      const resposta = await fetch(API_VOTOS, {
        method: 'POST',
        body: dados
      })

      if (!resposta.ok) {
        throw new Error('Não foi possível enviar os votos.')
      }

      const dadosResposta = await resposta.json()

      if (!dadosResposta.sucesso) {
        throw new Error(
          dadosResposta.mensagem ||
          'Não foi possível registrar os votos.'
        )
      }

      setResultado(dadosResposta.resultados)
      setResultadosPublicos(dadosResposta.resultados)
      setEtapa(CATEGORIAS.length + 1)

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (erro) {
      setErroEnvio(
        erro.message ||
        'Ocorreu um erro ao enviar os votos.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="premios-page">
      <div className="premios-container">

        <section className="premios-hero">
          <span className="premios-etiqueta">
            ✦ PREMIAÇÃO ANUAL ✦
          </span>

          <div className="premios-trofeu">
            <Trophy size={42} strokeWidth={1.6} />
          </div>

          <h1>
            LOTY <span>Awards {anoSelecionado}</span>
          </h1>

          <p>
            Os livros que marcaram nosso ano merecem
            uma premiação especial. ♡
          </p>

          <div className="premios-hero-detalhes">
            <span>5 categorias</span>
            <span aria-hidden="true">✦</span>
            <span>{MINIMO_LIVROS} leituras</span>
            <span aria-hidden="true"></span>
            
          </div>
        </section>

        <section className="premios-painel premios-selecao-edicao">
          <div className="premios-centralizado">
            <h2>Escolha a edição ♡</h2>

            <p>
              Consulte os resultados de outros anos
              ou participe da edição atual.
            </p>

            {anoAtual === ANO_INICIAL ? (
  <div className="premios-ano-unico">
    <Trophy size={17} />
    <span>{anoSelecionado}</span>
  </div>
) : (
  <div className="premios-seletor-ano">
    <select
      id="premios-ano"
      value={anoSelecionado}
      onChange={evento =>
        mudarAno(Number(evento.target.value))
      }
      aria-label="Selecionar ano da premiação"
    >
      {Array.from(
        { length: anoAtual - ANO_INICIAL + 1 },
        (_, indice) => ANO_INICIAL + indice
      ).reverse().map(ano => (
        <option key={ano} value={ano}>
          {ano}
        </option>
      ))}
    </select>
  </div>
)}

            <div className="premios-navegacao">
              <button
                type="button"
                className="premios-botao-principal"
                onClick={() => {
                  setMostrarResultados(true)
                  setEtapa(-1)
                }}
              >
                Ver resultados
                <Trophy size={18} />
              </button>

              {edicaoAtual && (
                <button
                  type="button"
                  className="premios-botao-voltar"
                  onClick={() => {
                    setMostrarResultados(false)
                    setEtapa(-1)
                  }}
                >
                  Participar da votação
                </button>
              )}
            </div>
          </div>
        </section>

        {erroAPI && (
          <p className="premios-erro" role="alert">
            {erroAPI}
          </p>
        )}

        {mostrarResultados || !edicaoAtual ? (
          <section className="premios-painel">
            
<div className="premios-centralizado premios-resultados-cabecalho">
  <Trophy size={40} color="#ec3778" />

  <h2>
    Resultados do LOTY Awards {anoSelecionado}
  </h2>

  <p>
    Resultados atualizados a cada 30 segundos.
  </p>
</div>


            <PainelResultados
              resultados={resultadosPublicos}
              categorias={CATEGORIAS}
              livrosPorId={livrosPorId}
            />
          </section>
        ) : carregando ? (
          <section className="premios-painel premios-centralizado">
            <LoaderCircle
              className="premios-girando"
              size={30}
            />
            <p>Preparando os livros da premiação...</p>
          </section>
        ) : erroLivros ? (
          <section className="premios-painel premios-centralizado">
            <p role="alert">{erroLivros}</p>
          </section>
        ) : etapa === -1 ? (
          <section className="premios-painel premios-boas-vindas">
            <div className="premios-selo">
              <Sparkles size={19} />
              <span>VOCÊ É O JÚRI!</span>
            </div>

            <h2>Quem merece levar o troféu?</h2>

            <p className="premios-texto">
              Escolha seus livros favoritos em cinco
              categorias. Você pode deixar alguma
              categoria sem voto.
            </p>

            <div className="premios-categorias-resumo">
              {CATEGORIAS.map(categoria => (
                <div
                  key={categoria.id}
                  className="premios-categoria-resumo"
                >
                  <span>{categoria.emoji}</span>
                  <strong>{categoria.titulo}</strong>
                </div>
              ))}
            </div>

            <div className="premios-identificacao">
              <h3>Primeiro, vamos nos conhecer ♡</h3>

              <div className="premios-campos">
                <label>
                  Nome
                  <input
                    type="text"
                    value={nome}
                    onChange={evento =>
                      setNome(evento.target.value)
                    }
                    placeholder="Seu nome"
                    autoComplete="given-name"
                    maxLength={60}
                  />
                </label>

                <label>
                  Sobrenome
                  <input
                    type="text"
                    value={sobrenome}
                    onChange={evento =>
                      setSobrenome(evento.target.value)
                    }
                    placeholder="Seu sobrenome"
                    autoComplete="family-name"
                    maxLength={80}
                  />
                </label>
              </div>

              <p className="premios-aviso">
                Seu nome será utilizado para verificar
                votos duplicados e não será exibido
                nos resultados públicos.
              </p>
            </div>

            <div className="premios-status">
              {livros.length} livros de {anoSelecionado}
              {' '}encontrados na nossa estante.
            </div>

            <p className="premios-aviso">
              A votação abre automaticamente ao atingir
              {` ${MINIMO_LIVROS} livros`} e encerra
              em 10/01/{anoSelecionado + 1},
              às 23h59, horário de Brasília.
            </p>

            <button
              type="button"
              className="premios-botao-principal"
              onClick={avancar}
              disabled={
                !nomeValido ||
                !votacaoAberta ||
                livros.length === 0
              }
            >
              Começar a votação
              <ArrowRight size={18} />
            </button>

            {!votacaoAberta && (
              <p className="premios-previa">
                {prazoEncerrado(anoSelecionado)
                  ? 'A votação desta edição foi encerrada.'
                  : 'A votação ainda não está disponível.'}
              </p>
            )}
          </section>
        ) : etapaResultado ? (
          <section className="premios-painel">
            <div className="premios-centralizado">
              <PartyPopper size={43} color="#ec3778" />

              <h2>Seus votos foram registrados! ♡</h2>

              <p>
                Obrigada por participar do LOTY Awards
                {' '}{anoSelecionado}!
              </p>
            </div>

            <h3>Resultados da votação</h3>

            <PainelResultados
              resultados={resultado}
              categorias={CATEGORIAS}
              livrosPorId={livrosPorId}
            />
          </section>
        ) : (
          <section className="premios-painel">
            <div className="premios-progresso-topo">
              <span>
                {etapaRevisao
                  ? 'REVISÃO FINAL'
                  : `CATEGORIA ${etapa + 1} DE ${CATEGORIAS.length}`}
              </span>

              <span>
                {etapaRevisao
                  ? 'Quase lá!'
                  : `${Math.round(
                      ((etapa + 1) / CATEGORIAS.length) * 100
                    )}%`}
              </span>
            </div>

            <div
              className="premios-progresso-barra"
              aria-hidden="true"
            >
              <div
                style={{
                  width: etapaRevisao
                    ? '100%'
                    : `${((etapa + 1) / CATEGORIAS.length) * 100}%`
                }}
              />
            </div>

            {categoriaAtual ? (
              <>
                <div className="premios-categoria-cabecalho">
                  <span className="premios-categoria-emoji">
                    {categoriaAtual.emoji}
                  </span>

                  <h2>{categoriaAtual.titulo}</h2>
                  <p>{categoriaAtual.descricao}</p>
                </div>

                <div className="premios-livros-grid">
                  {livros.map(livro => (
                    <CardLivro
                      key={livro.id}
                      livro={livro}
                      selecionado={
                        votos[categoriaAtual.id] === livro.id
                      }
                      onClick={() =>
                        escolherLivro(
                          categoriaAtual.id,
                          livro.id
                        )
                      }
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="premios-pular"
                  onClick={() => {
                    escolherLivro(categoriaAtual.id, '')
                    avancar()
                  }}
                >
                  Prefiro não votar nesta categoria
                </button>
              </>
            ) : etapaRevisao ? (
              <div className="premios-revisao">
                <div className="premios-categoria-cabecalho">
                  <CheckCircle2
                    size={40}
                    color="#ec3778"
                  />

                  <h2>Vamos conferir seus votos?</h2>

                  <p>
                    Confira suas escolhas antes
                    de confirmar a participação.
                  </p>
                </div>

                <div className="premios-revisao-nome">
                  Votação de{' '}
                  <strong>{nome} {sobrenome}</strong>
                </div>

                {CATEGORIAS.map((categoria, indice) => {
                  const livro = livrosPorId.get(
                    votos[categoria.id]
                  )

                  return (
                    <div
                      className="premios-revisao-item"
                      key={categoria.id}
                    >
                      <div>
                        <strong>
                          {categoria.emoji} {categoria.titulo}
                        </strong>

                        <span>
                          {livro
                            ? livro.titulo
                            : 'Sem voto nesta categoria'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEtapa(indice)}
                      >
                        Alterar
                      </button>
                    </div>
                  )
                })}

                <p className="premios-aviso">
                  Depois de confirmar, não será possível
                  votar novamente nesta edição.
                </p>
              </div>
            ) : null}

            {erroEnvio && (
              <p className="premios-erro" role="alert">
                {erroEnvio}
              </p>
            )}

            <div className="premios-navegacao">
              <button
                type="button"
                className="premios-botao-voltar"
                onClick={voltar}
                disabled={enviando}
              >
                <ArrowLeft size={18} />
                Voltar
              </button>

              {etapaRevisao ? (
                <button
                  type="button"
                  className="premios-botao-principal"
                  onClick={confirmarVotos}
                  disabled={
                    enviando ||
                    !votacaoAberta ||
                    !Object.values(votos).some(Boolean)
                  }
                >
                  {enviando
                    ? 'Enviando...'
                    : 'Confirmar meus votos'}

                  {!enviando && <Heart size={18} />}
                </button>
              ) : (
                <button
                  type="button"
                  className="premios-botao-principal"
                  onClick={avancar}
                  disabled={!votos[categoriaAtual.id]}
                >
                  {etapa === CATEGORIAS.length - 1
                    ? 'Revisar votos'
                    : 'Próxima categoria'}

                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </section>
        )}

        <div className="premios-rodape">
          <Trophy size={17} aria-hidden="true" />
          <span>
            Feito com amor pelo Clube do Livro da Bia ♡
          </span>
        </div>

      </div>
    </main>
  )
}

export default Premios
