
import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'

import {
  BookOpen,
  Star,
  Globe2,
  Heart,
  TrendingUp,
  RefreshCw
} from 'lucide-react'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts'

import './ClubeEmNumeros.css'

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3kpBfZlGs7DosCsSz5t8uVhbxvFO9LZ553bHPACLCLQtwoniPoroV2viT-tlvvJDgvkazqS2tpCCn/pub?gid=1392192016&single=true&output=csv'

const CORES = [
  '#D96C9F',
  '#8F77CE',
  '#F1AD63',
  '#6AB7A2',
  '#74A7D8',
  '#E58B89',
  '#B9A36C',
  '#B78CBF'
]

function texto(valor) {
  return String(valor ?? '').trim()
}

function notaNumero(valor) {
  const original = texto(valor)

  if (!original) return null

  const numero = Number(
    original.replace(',', '.').replace(/[^\d.-]/g, '')
  )

  return Number.isFinite(numero) &&
    numero >= 0 &&
    numero <= 5
    ? numero
    : null
}

function normalizarLivro(linha) {
  return {
    ano: texto(linha[0]),
    mes: texto(linha[1]),
    titulo: texto(linha[2]),
    autor: texto(linha[3]),
    nota: notaNumero(linha[4]),
    capa: texto(linha[5]),
    status: texto(linha[6]),
    maratona: texto(linha[7]),
    genero: texto(linha[8]),
    pais: texto(linha[9]),
    idioma: texto(linha[10]),
    generoAutor: texto(linha[11])
  }
}

function contarPorCampo(livros, campo) {
  const contagem = {}

  livros.forEach((livro) => {
    const valor = livro[campo] || 'Não informado'

    contagem[valor] = (contagem[valor] || 0) + 1
  })

  return Object.entries(contagem)
    .map(([nome, quantidade]) => ({
      nome,
      quantidade
    }))
    .sort((a, b) => b.quantidade - a.quantidade)
}

function media(notas) {
  if (!notas.length) return null

  return (
    notas.reduce((total, nota) => total + nota, 0) /
    notas.length
  )
}

function mediasPorCampo(livros, campo) {
  const grupos = {}

  livros.forEach((livro) => {
    if (livro.nota === null) return

    const nome = livro[campo] || 'Não informado'

    if (!grupos[nome]) {
      grupos[nome] = []
    }

    grupos[nome].push(livro.nota)
  })

  return Object.entries(grupos)
    .map(([nome, notas]) => ({
      nome,
      media: Number(media(notas).toFixed(2)),
      quantidade: notas.length
    }))
    .sort((a, b) => b.media - a.media)
}

function Cartao({ icone: Icone, titulo, valor, cor }) {
  return (
    <div
      className="numeros-card"
      style={{ '--card-cor': cor }}
    >
      <div className="numeros-card-icone">
        <Icone size={23} />
      </div>

      <div className="numeros-card-valor">
        {valor}
      </div>

      <div className="numeros-card-titulo">
        {titulo}
      </div>
    </div>
  )
}

function SecaoGrafico({ titulo, subtitulo, children }) {
  return (
    <section className="numeros-grafico-card">
      <div className="numeros-grafico-cabecalho">
        <h2>{titulo}</h2>
        <p>{subtitulo}</p>
      </div>

      <div className="numeros-grafico-conteudo">
        {children}
      </div>
    </section>
  )
}

function GraficoRosca({ dados }) {
  if (!dados.length) {
    return (
      <p className="numeros-sem-dados">
        Sem dados para exibir.
      </p>
    )
  }

  return (
    <div className="numeros-area-grafico">
      <ResponsiveContainer width="100%" height={330}>
        <PieChart>
          <Pie
            data={dados}
            dataKey="quantidade"
            nameKey="nome"
            cx="50%"
            cy="43%"
            innerRadius={62}
            outerRadius={103}
            paddingAngle={3}
          >
            {dados.map((item, index) => (
              <Cell
                key={item.nome}
                fill={CORES[index % CORES.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(valor) => [
              `${valor} livro(s)`,
              'Quantidade'
            ]}
          />

          <Legend
            verticalAlign="bottom"
            wrapperStyle={{
              fontSize: 12,
              lineHeight: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function GraficoBarras({
  dados,
  campo = 'quantidade',
  formatoMedia = false
}) {
  if (!dados.length) {
    return (
      <p className="numeros-sem-dados">
        Não há dados suficientes para comparar.
      </p>
    )
  }

  const altura = Math.max(260, dados.length * 49)

  return (
    <div className="numeros-area-grafico">
      <ResponsiveContainer width="100%" height={altura}>
        <BarChart
          data={dados}
          layout="vertical"
          margin={{
            top: 10,
            right: 28,
            left: 12,
            bottom: 10
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
          />

          <XAxis
            type="number"
            domain={
              formatoMedia ? [0, 5] : [0, 'auto']
            }
            allowDecimals={formatoMedia}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="nome"
            width={105}
            tick={{ fontSize: 11 }}
          />

          <Tooltip
            formatter={(valor, nome, item) => {
              if (formatoMedia) {
                const quantidade =
                  item?.payload?.quantidade ?? 0

                return [
                  `${Number(valor).toFixed(2)} ★ (${quantidade} avaliações)`,
                  'Média'
                ]
              }

              return [
                `${valor} livro(s)`,
                'Quantidade'
              ]
            }}
          />

          <Bar
            dataKey={campo}
            radius={[0, 9, 9, 0]}
            maxBarSize={25}
          >
            {dados.map((item, index) => (
              <Cell
                key={item.nome}
                fill={CORES[index % CORES.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/*
  GRÁFICO DE PAÍSES

  - Mostra todos os países.
  - A largura cresce conforme a quantidade.
  - Centraliza quando cabe no card.
  - Permite rolagem horizontal quando não cabe.
*/
function GraficoColunas({ dados }) {
  if (!dados.length) {
    return (
      <p className="numeros-sem-dados">
        Sem dados para exibir.
      </p>
    )
  }

  const larguraGrafico = Math.max(
    320,
    dados.length * 85
  )

  return (
    <div
      className="numeros-paises-scroll"
      role="region"
      aria-label="Gráfico dos países de origem dos livros"
      tabIndex={0}
    >
      <div
        className="numeros-paises-grafico"
        style={{ width: larguraGrafico }}
      >
        <ResponsiveContainer width="100%" height={370}>
          <BarChart
            data={dados}
            margin={{
              top: 15,
              right: 20,
              left: 0,
              bottom: 90
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="nome"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={110}
              tick={{
                fontSize: 12
              }}
            />

            <YAxis
              allowDecimals={false}
              width={35}
              tick={{
                fontSize: 12
              }}
            />

            <Tooltip
              formatter={(valor) => [
                `${valor} livro(s)`,
                'Quantidade'
              ]}
            />

            <Bar
              dataKey="quantidade"
              radius={[8, 8, 0, 0]}
              maxBarSize={42}
            >
              {dados.map((item, index) => (
                <Cell
                  key={item.nome}
                  fill={CORES[index % CORES.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function ClubeEmNumeros() {
  const [livros, setLivros] = useState([])
  const [anoSelecionado, setAnoSelecionado] =
    useState('todos')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarLivros() {
      try {
        setCarregando(true)
        setErro('')

        const resposta = await fetch(CSV_URL, {
          cache: 'no-store'
        })

        if (!resposta.ok) {
          throw new Error(
            'Não foi possível acessar a planilha.'
          )
        }

        const csv = await resposta.text()

        const resultado = Papa.parse(csv, {
          header: false,
          skipEmptyLines: 'greedy'
        })

        if (resultado.errors.length) {
          console.warn(
            'Avisos ao ler o CSV:',
            resultado.errors
          )
        }

        const registros = resultado.data
          .slice(1)
          .filter(
            (linha) =>
              Array.isArray(linha) && linha[2]
          )
          .map(normalizarLivro)
          .filter((livro) => livro.titulo)

        if (ativo) {
          setLivros(registros)
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.message ||
            'Erro ao carregar os dados.'
          )
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarLivros()

    return () => {
      ativo = false
    }
  }, [])

  const anos = useMemo(() => {
    return [
      ...new Set(
        livros.map((livro) => livro.ano)
      )
    ]
      .filter(Boolean)
      .sort(
        (a, b) => Number(b) - Number(a)
      )
  }, [livros])

  const livrosFiltrados = useMemo(() => {
    if (anoSelecionado === 'todos') {
      return livros
    }

    return livros.filter(
      (livro) => livro.ano === anoSelecionado
    )
  }, [livros, anoSelecionado])

  const estatisticas = useMemo(() => {
    const notas = livrosFiltrados
      .map((livro) => livro.nota)
      .filter((nota) => nota !== null)

    const generos = contarPorCampo(
      livrosFiltrados,
      'genero'
    )

    // Todos os países, sem agrupar em "Outros países".
    const paises = contarPorCampo(
      livrosFiltrados,
      'pais'
    )

    const idiomas = contarPorCampo(
      livrosFiltrados,
      'idioma'
    )

    const autores = contarPorCampo(
      livrosFiltrados,
      'generoAutor'
    )

    const mediasGeneros = mediasPorCampo(
      livrosFiltrados,
      'genero'
    )
      .filter((genero) => genero.quantidade >= 2)
      .slice(0, 6)

    const mediasAnos = mediasPorCampo(
      livros,
      'ano'
    ).sort(
      (a, b) => Number(a.nome) - Number(b.nome)
    )

    const mediaGeral = media(notas)

    const paisesConhecidos = new Set(
      livrosFiltrados
        .map((livro) => livro.pais)
        .filter(
          (pais) =>
            pais &&
            pais.toLowerCase() !== 'a confirmar' &&
            pais.toLowerCase() !== 'não informado'
        )
    )

    const melhoresLivros = livrosFiltrados
      .filter((livro) => livro.nota === 5)
      .sort((a, b) => {
        if (a.ano !== b.ano) {
          return Number(b.ano) - Number(a.ano)
        }

        return a.titulo.localeCompare(
          b.titulo,
          'pt-BR'
        )
      })

    return {
      total: livrosFiltrados.length,
      mediaGeral,
      totalPaises: paisesConhecidos.size,
      generoFavorito:
        generos[0]?.nome || '—',
      generos,
      paises,
      idiomas,
      autores,
      mediasGeneros,
      mediasAnos,
      melhoresLivros
    }
  }, [livros, livrosFiltrados])

  if (carregando) {
    return (
      <main className="numeros-pagina">
        <div className="numeros-mensagem">
          <RefreshCw
            className="numeros-girando"
            size={30}
          />

          <p>
            Preparando nossas estatísticas literárias...
          </p>
        </div>
      </main>
    )
  }

  if (erro) {
    return (
      <main className="numeros-pagina">
        <div className="numeros-mensagem">
          <p>
            Não conseguimos carregar os dados. 💗
          </p>
          <p>{erro}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="numeros-pagina">
      <div className="numeros-container">

        <header className="numeros-topo">
          <span className="numeros-etiqueta">
            ✦ NOSSA HISTÓRIA EM DADOS ✦
          </span>

          <h1>
            Clube em Números <span>♡</span>
          </h1>
        </header>

        <div className="numeros-filtros">
          <label htmlFor="filtro-ano">
            Explorar leituras de:
          </label>

          <select
            id="filtro-ano"
            value={anoSelecionado}
            onChange={(event) =>
              setAnoSelecionado(
                event.target.value
              )
            }
          >
            <option value="todos">
              Todos os anos
            </option>

            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>

        <div className="numeros-cards">
          <Cartao
            icone={BookOpen}
            titulo="Livros na estante"
            valor={estatisticas.total}
            cor="#FBE1EB"
          />

          <Cartao
            icone={Star}
            titulo="Avaliação média"
            valor={
              estatisticas.mediaGeral === null
                ? '—'
                : `${estatisticas.mediaGeral.toFixed(2)} ★`
            }
            cor="#FFF0CE"
          />

          <Cartao
            icone={Globe2}
            titulo="Países explorados"
            valor={estatisticas.totalPaises}
            cor="#DDF2E9"
          />

          <Cartao
            icone={Heart}
            titulo="Gênero mais lido"
            valor={estatisticas.generoFavorito}
            cor="#EAE3FC"
          />
        </div>

        <div className="numeros-grid-graficos">

          <SecaoGrafico
            titulo="Nossos gêneros literários"
            subtitulo="Quais histórias mais apareceram na nossa estante?"
          >
            <GraficoRosca
              dados={estatisticas.generos}
            />
          </SecaoGrafico>

          <SecaoGrafico
            titulo="Gêneros mais bem avaliados"
            subtitulo="Média das notas por gênero. Consideramos apenas gêneros com pelo menos duas avaliações."
          >
            <GraficoBarras
              dados={estatisticas.mediasGeneros}
              campo="media"
              formatoMedia
            />
          </SecaoGrafico>

          <SecaoGrafico
            titulo="Autoras e autores"
            subtitulo="Distribuição dos livros por gênero do autor."
          >
            <GraficoRosca
              dados={estatisticas.autores}
            />
          </SecaoGrafico>

          <SecaoGrafico
            titulo="De onde vêm nossas histórias?"
            subtitulo="Países de origem das obras que lemos."
          >
            <GraficoColunas
              dados={estatisticas.paises}
            />
          </SecaoGrafico>

          <SecaoGrafico
            titulo="Idiomas das histórias"
            subtitulo="Idiomas em que os livros foram escritos originalmente."
          >
            <GraficoRosca
              dados={estatisticas.idiomas}
            />
          </SecaoGrafico>

          <SecaoGrafico
            titulo="Avaliações ao longo dos anos"
            subtitulo="Como a média das nossas leituras mudou com o tempo?"
          >
            <GraficoBarras
              dados={estatisticas.mediasAnos}
              campo="media"
              formatoMedia
            />
          </SecaoGrafico>

        </div>

        {/* PRATELEIRA HORIZONTAL DE 5 ESTRELAS */}
        <section className="numeros-destaque">
          <div className="numeros-destaque-titulo">
            <TrendingUp size={24} />

            <div>
              <h2>
                Os queridinhos do clube ♡
              </h2>

              <p>
                Livros que conquistaram nossas cinco estrelas.
              </p>
            </div>
          </div>

          {estatisticas.melhoresLivros.length ? (
            <div
              className="numeros-ranking"
              role="region"
              aria-label="Prateleira de livros cinco estrelas"
              tabIndex={0}
            >
              {estatisticas.melhoresLivros.map(
                (livro, index) => (
                  <article
                    className="numeros-livro"
                    key={`${livro.ano}-${livro.mes}-${livro.titulo}`}
                  >
                    <span className="numeros-posicao">
                      {index + 1}º
                    </span>

                    {livro.capa ? (
                      <img
                        src={livro.capa}
                        alt={`Capa de ${livro.titulo}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="numeros-sem-capa">
                        <BookOpen size={26} />
                      </div>
                    )}

                    <div className="numeros-livro-info">
                      <h3>{livro.titulo}</h3>
                      <p>{livro.autor}</p>
                      <span>{livro.ano}</span>
                    </div>

                    <strong className="numeros-nota">
                      <Star
                        size={16}
                        fill="currentColor"
                      />
                      {livro.nota.toFixed(1)}
                    </strong>
                  </article>
                )
              )}
            </div>
          ) : (
            <p className="numeros-sem-dados">
              Nenhum livro recebeu cinco estrelas
              neste período.
            </p>
          )}
        </section>

      </div>
    </main>
  )
}
