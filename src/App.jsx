
import Header from './components/Header'
import './App.css'
import logoClube from './assets/logo-clube.png'

function App() {
  return (
    <>
      <Header />

      <main>
        <section id="inicio" className="hero">

          {/* Detalhes decorativos do fundo */}
          <span className="hero-decoration decoration-star-1" aria-hidden="true">
            ✧
          </span>

          <span className="hero-decoration decoration-star-2" aria-hidden="true">
            ✦
          </span>

          <span className="hero-decoration decoration-heart" aria-hidden="true">
            ♡
          </span>

          <div className="hero-content">

            {/* Frase de boas-vindas */}
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

            <a href="#sobre" className="hero-button">
              Conheça nosso clube →
            </a>

            <div className="hero-little-details" aria-hidden="true">
              ✧ &nbsp; ♡ &nbsp; ✧
            </div>
          </div>

          <div className="hero-image-wrapper">

            {/* Brilhinhos ao redor da logo */}
            <span className="logo-sparkle sparkle-top" aria-hidden="true">
              ✦
            </span>

            <span className="logo-sparkle sparkle-bottom" aria-hidden="true">
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
      </main>
    </>
  )
}

export default App
