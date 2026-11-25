import { useState } from 'react'
import { BookHeart, Heart, Send, Sparkles } from 'lucide-react'
import './Indicacao.css'

const API_URL = 'https://script.google.com/macros/s/AKfycbyyJmSKZfJ443SgcqJJDsDIDYJBr0MbzKQRXgc5JctVfAKq3SWXMWbOg2fcoWyYke6N2g/exec'
function Indicacao() {

  const [tipo, setTipo] = useState('livro')
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  async function enviarIndicacao(evento) {
    evento.preventDefault()

    if (enviando) return

    const formulario = evento.currentTarget
    const dados = new URLSearchParams(
      new FormData(formulario)
    )

    dados.set('tipo', tipo)

    setEnviando(true)
    setMensagem(null)

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        body: dados
      })

      if (!resposta.ok) {
        throw new Error('Falha na comunicação com a API.')
      }

      const resultado = await resposta.json()

      if (!resultado.sucesso) {
        throw new Error(resultado.mensagem)
      }

      setMensagem({
        tipo: 'sucesso',
        texto: 'Indicação enviada com sucesso! Obrigada por contribuir com nossas próximas leituras. ♡'
      })

      formulario.reset()

    } catch (erro) {
      setMensagem({
        tipo: 'erro',
        texto: erro.message || 'Não foi possível enviar sua indicação. Tente novamente.'
      })

    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="indicacao-page">
      <div className="indicacao-container">

        <section className="indicacao-hero">
          <span className="indicacao-etiqueta">
            ✦ NOSSA PRÓXIMA LEITURA ✦
          </span>

          <div className="indicacao-icone">
            <BookHeart size={42} strokeWidth={1.6} />
          </div>

          <h1>Indique um <span>Livro</span></h1>

          <p>
            Grandes histórias merecem ser compartilhadas.
            Ajude a escolher nossas próximas leituras! ♡
          </p>
        </section>

        <section className="indicacao-painel">

          <div className="indicacao-cabecalho">
            <Sparkles size={28} />
            <h2>Qual será nossa próxima aventura?</h2>
            <p>
              Compartilhe uma indicação com o clubinho.
            </p>
          </div>

          <div className="indicacao-tipos">
            <button
              type="button"
              className={tipo === 'livro' ? 'ativo' : ''}
              onClick={() => setTipo('livro')}
            >
              📚 Indicar um livro
            </button>

            <button
              type="button"
              className={tipo === 'tema' ? 'ativo' : ''}
              onClick={() => setTipo('tema')}
            >
              ✨ Sugerir um tema
            </button>
          </div>

          <form
            className="indicacao-formulario"
            onSubmit={enviarIndicacao}
          >
            <div className="indicacao-antispam" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="indicacao-campos">
              <label>
                Nome
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  required
                />
              </label>

              <label>
                Sobrenome
                <input
                  type="text"
                  name="sobrenome"
                  placeholder="Seu sobrenome"
                  required
                />
              </label>
            </div>

            {tipo === 'livro' ? (
              <>
                <label>
                  Título do livro
                  <input
                    type="text"
                    name="titulo"
                    placeholder="Qual livro você indica?"
                    required
                  />
                </label>

                <label>
                  Autor(a)
                  <input
                    type="text"
                    name="autor"
                    placeholder="Quem escreveu o livro?"
                    required
                  />
                </label>

                <label>
                  Gênero literário
                  <input
                    type="text"
                    name="genero"
                    placeholder="Romance, fantasia, suspense..."
                  />
                </label>
              </>
            ) : (
              <label>
                Tema sugerido
                <input
                  type="text"
                  name="tema"
                  placeholder="Qual tema você gostaria de sugerir?"
                  required
                />
              </label>
            )}

            <label>
              Por que você fez essa indicação? (opcional)
              <textarea
                name="motivo"
                rows={4}
                placeholder="Conta um pouquinho pra gente..."
              />
            </label>

            <button
              type="submit"
              className="indicacao-enviar"
              disabled={enviando}
            >
              {enviando ? 'Enviando indicação...' : 'Enviar minha indicação'}
              <Send size={18} />
            </button>

            {mensagem && (
              <div
                className={`indicacao-feedback ${mensagem.tipo}`}
                role={mensagem.tipo === 'erro' ? 'alert' : 'status'}
              >
                {mensagem.texto}
              </div>
            )}

            <p className="indicacao-aviso">
              Sua sugestão será encaminhada para a Bia
              com muito carinho. ♡
            </p>
          </form>
        </section>

        <div className="indicacao-rodape">
          <Heart size={17} />
          <span>
            Feito com amor pelo Clube do Livro da Bia ♡
          </span>
        </div>

      </div>
    </main>
  )
}

export default Indicacao