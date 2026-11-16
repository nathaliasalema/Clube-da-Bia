
import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import {
  ArrowLeft,
  ArrowRight,
  BookHeart,
  Check,
  CheckCircle2,
  Heart,
  LoaderCircle,
  PartyPopper,
  Sparkles,
  Trophy
} from 'lucide-react'
import './Premios.css'

const PLANILHA_LIVROS =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3kpBfZlGs7DosCsSz5t8uVhbxvFO9LZ553bHPACLCLQtwoniPoroV2viT-tlvvJDgvkazqS2tpCCn/pub?gid=1392192016&single=true&output=csv'

// Futuramente colocarei aqui a URL do Apps Script
const API_VOTOS = ''

// Enquanto for false, a página funciona como prévia.
// O envio de votos reais fica bloqueado.
const VOTACAO_ABERTA = false

const CATEGORIAS = [
  {
    id: 'livro-do-ano',
    titulo: 'Livro do Ano',
    apelido: 'LOTY',
    emoji: '🏆',
    descricao: 'Qual foi o seu livro favorito de 2026?'
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
    emoji: '🥹',
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

const TOTAL_ETAPAS = CATEGORIAS.length + 2

function limparTexto(valor) {
  return String(valor || '').trim()
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

function normalizarLivros(csv) {
  const resultado = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: titulo => titulo.trim()
  })

  if (resultado.errors.length && !resultado.data.length) {
    throw new Error('Não foi possível interpretar a planilha.')
  }

  const livros = resultado.data
    .filter(linha => limparTexto(linha.Ano) === '2026')
    .filter(linha => limparTexto(linha.Título))
    .map(linha => ({
      id: criarIdLivro(
        linha.Ano,
        linha.Mês,
        linha.Título
      ),
      titulo: limparTexto(linha.Título),
      autor: limparTexto(linha.Autor),
      mes: limparTexto(linha.Mês),
      capa: limparTexto(linha['URL da capa'])
    }))

  // Evita duplicatas caso a planilha tenha linhas repetidas.
  return [...new Map(livros.map(livro => [livro.id, livro])).values()]
}

function CapaLivro({ livro }) {
  const [falhou, setFalhou] = useState(false)

  useEffect(() => {
    setFalhou(false)
  }, [livro.capa])

  if (!livro.capa || falhou) {
    return (
      <div className="premios-capa-vazia">
        <BookHeart size={34} aria-hidden="true" />
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
            <Check size={17} aria-hidden="true" />
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

function Premios() {
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroLivros, setErroLivros] = useState('')

  const [etapa, setEtapa] = useState(-1)
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [votos, setVotos] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    let ativo = true

    async function buscarLivros() {
      try {
        const resposta = await fetch(PLANILHA_LIVROS)

        if (!resposta.ok) {
          throw new Error('Falha ao buscar a planilha.')
        }

        const csv = await resposta.text()
        const lista = normalizarLivros(csv)

        if (ativo) {
          setLivros(lista)
        }
      } catch (erro) {
        if (ativo) {
          setErroLivros(
            'Não conseguimos carregar os livros agora. Tente atualizar a página.'
          )
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    buscarLivros()

    return () => {
      ativo = false
    }
  }, [])

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

  const progresso = Math.round(
    ((etapa + 1) / TOTAL_ETAPAS) * 100
  )

  function escolherLivro(categoriaId, livroId) {
    setVotos(anteriores => ({
      ...anteriores,
      [categoriaId]: livroId
    }))
  }

  function avancar() {
    setErroEnvio('')
    setEtapa(atual => Math.min(atual + 1, CATEGORIAS.length))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function voltar() {
    setErroEnvio('')
    setEtapa(atual => Math.max(atual - 1, -1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function confirmarVotos() {
    if (!nomeValido) {
      setErroEnvio('Informe seu nome e sobrenome.')
      return
    }

    if (!VOTACAO_ABERTA || !API_VOTOS) {
      setErroEnvio(
        'A votação ainda não está aberta. Esta é uma prévia da página.'
      )
      return
    }

    setEnviando(true)
    setErroEnvio('')

    try {
      const dados = new URLSearchParams()

      dados.set('acao', 'votar')
      dados.set('nome', nome.trim())
      dados.set('sobrenome', sobrenome.trim())
      dados.set('ano', '2026')
      dados.set('votos', JSON.stringify(votos))

      const resposta = await fetch(API_VOTOS, {
        method: 'POST',
        body: dados
      })

      if (!resposta.ok) {
        throw new Error('Não foi possível registrar os votos.')
      }

      const dadosResposta = await resposta.json()

      if (!dadosResposta.sucesso) {
        throw new Error(
          dadosResposta.mensagem ||
          'Não foi possível registrar os votos.'
        )
      }

      // O backend deverá devolver os resultados oficiais.
      setResultado(dadosResposta.resultados)
      setEtapa(CATEGORIAS.length + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (erro) {
      setErroEnvio(
        erro.message ||
        'Ocorreu um erro. Tente novamente.'
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
            ✦ PRIMEIRA EDIÇÃO ✦
          </span>

          <div className="premios-trofeu">
            <Trophy size={42} strokeWidth={1.6} />
          </div>

          <h1>
            LOTY <span>Awards 2026</span>
          </h1>

          <p>
            Os livros que marcaram nosso ano merecem
            uma premiação especial. ♡
          </p>

          <div className="premios-hero-detalhes">
            <span>5 categorias</span>
            <span aria-hidden="true">✦</span>
            <span>12 leituras previstas</span>
            <span aria-hidden="true">✦</span>
            <span>1 clube apaixonado</span>
          </div>
        </section>

        {carregando ? (
          <section className="premios-painel premios-centralizado">
            <LoaderCircle className="premios-girando" size={30} />
            <p>Preparando os livros para a premiação...</p>
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
              Você vai escolher seus favoritos em cinco
              categorias. É uma categoria por vez,
              sem pressa e com muito amor pelos livros!
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
                Seu nome será usado apenas para evitar
                votos duplicados. Ele não aparecerá
                publicamente nos resultados.
              </p>
            </div>

            <div className="premios-status">
              {livros.length} livros de 2026 encontrados
              na nossa estante.
              {livros.length < 12 &&
                ' A lista será atualizada quando os próximos livros forem adicionados.'}
            </div>

            <button
              type="button"
              className="premios-botao-principal"
              onClick={avancar}
              disabled={!nomeValido || livros.length === 0}
            >
              Começar a votação
              <ArrowRight size={18} />
            </button>

            {!VOTACAO_ABERTA && (
              <p className="premios-previa">
                ✨ Estamos preparando a primeira edição.
                Você pode explorar as categorias, mas
                os votos ainda não serão enviados.
              </p>
            )}
          </section>
        ) : etapaResultado ? (
          <section className="premios-painel premios-resultados">
            <div className="premios-centralizado">
              <PartyPopper size={43} color="#ec3778" />

              <h2>Seus votos foram registrados! ♡</h2>

              <p>
                Obrigada por participar do LOTY Awards 2026!
              </p>
            </div>

            <h3>Resultados da votação</h3>

            {resultado ? (
              CATEGORIAS.map(categoria => {
                const itens = resultado[categoria.id] || []
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
                        .sort((a, b) => b.votos - a.votos)
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
                                  {livrosPorId.get(item.livroId)
                                    ?.titulo || item.titulo}
                                </span>

                                <strong>
                                  {porcentagem.toFixed(1)}%
                                </strong>
                              </div>

                              <div className="premios-barra">
                                <div
                                  style={{
                                    width: `${porcentagem}%`
                                  }}
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
              })
            ) : (
              <p>
                Os resultados ainda não estão disponíveis.
              </p>
            )}
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
                  : `${Math.min(progresso, 100)}%`}
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
                    Confira suas escolhas antes de
                    confirmar a participação.
                  </p>
                </div>

                <div className="premios-revisao-nome">
                  Votação de <strong>{nome} {sobrenome}</strong>
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
                  enviar uma segunda votação com o
                  mesmo nome e sobrenome.
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
                    !VOTACAO_ABERTA ||
                    !API_VOTOS ||
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

            {etapaRevisao && !VOTACAO_ABERTA && (
              <p className="premios-previa">
                ✨ Esta é a prévia da votação.
                O envio será liberado em breve
              </p>
            )}
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
