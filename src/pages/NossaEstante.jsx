
import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import LivroCard from '../components/LivroCard'
import './NossaEstante.css'

const PLANILHA_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3kpBfZlGs7DosCsSz5t8uVhbxvFO9LZ553bHPACLCLQtwoniPoroV2viT-tlvvJDgvkazqS2tpCCn/pub?gid=1392192016&single=true&output=csv'

function NossaEstante() {
  const [livros, setLivros] = useState([])
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function carregarLivros() {
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

        const livrosOrganizados = resultado.data
          .map((linha) => ({
            ano: String(linha['Ano'] ?? '').trim(),
            mes: String(linha['Mês'] ?? '').trim(),
            titulo: String(linha['Título'] ?? '').trim(),
            autor: String(linha['Autor'] ?? '').trim(),
            avaliacao: String(linha['Avaliação'] ?? '').trim(),
            capa: String(linha['URL da capa'] ?? '').trim(),
            status: String(linha['Status'] ?? '').trim()
          }))
          .filter((livro) =>
            livro.titulo &&
            livro.status.toLowerCase() === 'publicado'
          )

        setLivros(livrosOrganizados)
      } catch (erro) {
        if (erro.name !== 'AbortError') {
          console.error(erro)
          setErro('Não foi possível carregar os livros agora.')
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregarLivros()

    return () => controlador.abort()
  }, [])

  const anos = [
    'Todos',
    ...new Set(livros.map((livro) => livro.ano))
  ]

  const livrosFiltrados = anoSelecionado === 'Todos'
    ? livros
    : livros.filter((livro) => livro.ano === anoSelecionado)

  return (
    <main className="nossa-estante">
      
<section className="estante-introducao">
  <h1>Nossa Estante ♡</h1>

  <p>
    Os livros que marcaram a história do nosso clube.
  </p>
</section>


      {carregando && (
        <p className="estante-mensagem">
          Carregando nossos livrinhos... 📚
        </p>
      )}

      {erro && (
        <p className="estante-mensagem" role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && (
        <>
          <div className="estante-filtros">
            {anos.map((ano) => (
              <button
                key={ano}
                type="button"
                className={
                  anoSelecionado === ano ? 'ativo' : ''
                }
                onClick={() => setAnoSelecionado(ano)}
              >
                {ano}
              </button>
            ))}
          </div>

          <p className="estante-contagem">
            {livrosFiltrados.length} livros na estante ♡
          </p>

          <section
            className="estante-grid"
            aria-label="Livros lidos pelo clube"
          >
            {livrosFiltrados.map((livro, indice) => (
              <LivroCard
                key={`${livro.ano}-${livro.mes}-${indice}`}
                livro={livro}
              />
            ))}
          </section>

          {livrosFiltrados.length === 0 && (
            <p className="estante-mensagem">
              Ainda não temos livros para mostrar aqui.
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default NossaEstante
