
import logoClube from '../assets/logo-clube.png'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">

        
<a href="#inicio" className="site-brand">
  <span>Clube da Bia</span>

  <svg
    className="brand-book"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 7v14" />
    <path d="M3 18V5a1 1 0 0 1 1-1h3a5 5 0 0 1 5 5 5 5 0 0 1 5-5h3a1 1 0 0 1 1 1v13h-4a5 5 0 0 0-5 3 5 5 0 0 0-5-3H3Z" />
  </svg>
</a>

        <nav
          className="site-nav"
          aria-label="Menu principal"
        >
          <a href="#inicio">Início</a>
          <a href="#estante">Nossa Estante</a>
          <a href="#estatisticas">Clube em Números</a>
          <a href="#premios">Prêmios</a>
          <a href="#sobre">Sobre</a>
          <a href="#sugestoes">Indique um Livro</a>
        </nav>

        <a href="#sobre" className="header-button">
          Entrar no Clube
        </a>

      </div>
    </header>
  )
}

export default Header
