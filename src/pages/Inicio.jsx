
import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import logoClube from '../assets/logo-clube.png'
import '../App.css'
import './Inicio.css'

const PLANILHA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3kpBfZlGs7DosCsSz5t8uVhbxvFO9LZ553bHPACLCLQtwoniPoroV2viT-tlvvJDgvkazqS2tpCCn/pub?gid=1392192016&single=true&output=csv'

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril',
  'maio', 'junho', 'julho', 'agosto',
  'setembro', 'outubro', 'novembro', 'dezembro'
]

function normalizar(texto) {
  return String(texto ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function Inicio() {
  const [leituraAtual, setLeituraAtual] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const hoje = new Date()
  const mesAtual = hoje.getMonth()
  const anoAtual = hoje.getFullYear()

  useEffect(() => {
    const controlador = new AbortController()

    async function carregarLeitura() {
      try {
        const resposta = await fetch(PLANILHA_URL, {
          signal: controlador.signal
        })

        if (!resposta.ok) {
          throw new Error('Não foi possível acessar a planilha.')
        }

        const csv = await resposta.text()

        const resultado = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true
        })

        const livro = resultado.data.find((linha) => {
          const ano = Number(String(linha['Ano'] ?? '').trim())
          const mes = normalizar(linha['Mês'])
          const titulo = String(linha['Título'] ?? '').trim()

          const mesPorNome = mes === MESES[mesAtual]
          const mesPorNumero = Number(mes) === mesAtual + 1

          return (
            titulo &&
            ano === anoAtual &&
            (mesPorNome || mesPorNumero)
          )
        })

        if (livro) {
          setLeituraAtual({
            titulo: String(livro['Título'] ?? '').trim(),
            autor: String(livro['Autor'] ?? '').trim(),
            capa: String(livro['URL da capa'] ?? '').trim()
          })
        } else {
          setLeituraAtual(null)
        }
      } catch (erro) {
        if (erro.name !== 'AbortError') {
          console.error(erro)
          setErro('Não foi possível carregar a leitura agora.')
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregarLeitura()

    return () => controlador.abort()
  }, [anoAtual, mesAtual])

  return (
    <main>

      {/* SEU BANNER ORIGINAL */}
      <section id="inicio" className="hero">

        <span
          className="hero-decoration decoration-star-1"
          aria-hidden="true"
        >
          ✧
        </span>

        <span
          className="hero-decoration decoration-star-2"
          aria-hidden="true"
        >
          ✦
        </span>

        <span
          className="hero-decoration decoration-heart"
          aria-hidden="true"
        >
          ♡
        </span>

        <div className="hero-content">

          <div className="hero-eyebrow">
            <span aria-hidden="true">✦</span>
            <span>Um cantinho seguro para leitores</span>
            <span aria-hidden="true">✦</span>
          </div>

          <h1>
            Bem-vindo ao
            <span>Clube do Livro</span>
            da Bia!
          </h1>

          <p>
            Entre livros, histórias e boas conversas,
            construímos um lugar onde cada leitor
            tem espaço para ser quem é.
          </p>

          <a href="#leituras-do-mes" className="hero-button">
            Conheça nossa leitura atual →
          </a>

          <div className="hero-little-details" aria-hidden="true">
            ✧ &nbsp; ♡ &nbsp; ✧
          </div>
        </div>

        <div className="hero-image-wrapper">

          <span
            className="logo-sparkle sparkle-top"
            aria-hidden="true"
          >
            ✦
          </span>

          <span
            className="logo-sparkle sparkle-bottom"
            aria-hidden="true"
          >
            ✧
          </span>

          <span className="logo-heart" aria-hidden="true">
            ♡
          </span>

          <div className="hero-image">
            <img
              src={logoClube}
              alt="Logo do Clube do Livro da Bia"
              className="hero-logo"
            />
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: LEITURA ATUAL */}
      <section id="leituras-do-mes" className="leitura-atual">
        <div className="leitura-atual-container">

          <div className="leitura-atual-cabecalho">
            <span className="leitura-atual-etiqueta">
              ✦ NOSSA LEITURA ATUAL ✦
            </span>

            <h2>O que estamos lendo?</h2>

          </div>

          <article className="leitura-atual-card">

            <div className="leitura-atual-livro">

              {carregando ? (
                <p className="leitura-atual-mensagem">
                  Procurando nossa leitura... 📚
                </p>
              ) : erro ? (
                <p
                  className="leitura-atual-mensagem"
                  role="alert"
                >
                  {erro}
                </p>
              ) : leituraAtual ? (
                <>
                  <div className="leitura-atual-capa">
                    {leituraAtual.capa ? (
                      <img
                        src={leituraAtual.capa}
                        alt={`Capa do livro ${leituraAtual.titulo}`}
                      />
                    ) : (
                      <div className="leitura-atual-sem-capa">
                        ♡
                      </div>
                    )}
                  </div>

                  <div className="leitura-atual-informacoes">
                    <span className="leitura-atual-mes">
                      📖 {MESES[mesAtual]} de {anoAtual}
                    </span>

                    <h3>{leituraAtual.titulo}</h3>

                    {leituraAtual.autor && (
                      <p className="leitura-atual-autor">
                        por {leituraAtual.autor}
                      </p>
                    )}

                    <p className="leitura-atual-descricao">
                      Este é o livro que estamos lendo
                      juntos neste mês! Participe das
                      conversas do clube e acompanhe
                      nossa leitura coletiva no Maratona.
                    </p>
                  </div>
                </>
              ) : (
                <div className="leitura-atual-vazia">
                  <span aria-hidden="true">♡</span>
                  <h3>Uma nova história vem aí!</h3>
                  <p>
                    A leitura deste mês ainda não está
                    disponível na planilha publicada.
                  </p>
                </div>
              )}

            </div>

            <div className="leitura-atual-acoes">
              <a
                href="https://t.me/+-ieghNrVNIEyOWQx"
                target="_blank"
                rel="noopener noreferrer"
                className="leitura-atual-botao"
              >
                Participar do Clube →
              </a>

              <a
                href="https://maratona.app/lc/meridiana-abc33"
                target="_blank"
                rel="noopener noreferrer"
                className="leitura-atual-botao leitura-atual-botao-maratona"
              >
                Acompanhar no Maratona →
              </a>
            </div>

          </article>
        </div>
      </section>

    </main>
  )
}

export default Inicio
