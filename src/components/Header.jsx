
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">

        <Link to="/" className="site-brand">
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
        </Link>

        <nav
          className="site-nav"
          aria-label="Menu principal"
        >
          <Link to="/">Início</Link>
          <Link to="/nossa-estante">Nossa Estante</Link>

          <Link to="/#estatisticas">Clube em Números</Link>
          <Link to="/#premios">Prêmios</Link>
          <Link to="/#sobre">Sobre</Link>
          <Link to="/#sugestoes">Indique um Livro</Link>
        </nav>

        <a
  href="https://t.me/+-ieghNrVNIEyOWQx"
  target="_blank"
  rel="noopener noreferrer"
  className="header-button"
>
  Entrar no Clube
</a>

      </div>
    </header>
  )
}

export default Header
