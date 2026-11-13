
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header className="site-header">
      <div className="header-container">

        {/* Nome do clube */}
        <Link
          to="/"
          className="site-brand"
          onClick={fecharMenu}
        >
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

        {/* Botão do menu para celular */}
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span className="menu-icon">
            {menuAberto ? '✕' : '☰'}
          </span>
        </button>

        {/* Links de navegação */}
        <nav
          id="menu-principal"
          className={`site-nav ${menuAberto ? 'site-nav-open' : ''}`}
          aria-label="Menu principal"
        >
          <Link to="/" onClick={fecharMenu}>
            Início
          </Link>

          <Link to="/nossa-estante" onClick={fecharMenu}>
            Nossa Estante
          </Link>

          <Link to="/sobre" onClick={fecharMenu}>
            Sobre
          </Link>

          <Link to="/clube-em-numeros" onClick={fecharMenu}>
            Clube em Números
          </Link>

          <Link to="/#premios" onClick={fecharMenu}>
            Prêmios
          </Link>

          <Link to="/#sugestoes" onClick={fecharMenu}>
            Indique um Livro
          </Link>

          {/* Botão dentro do menu no celular */}
          <a
            href="https://t.me/+-ieghNrVNIEyOWQx"
            target="_blank"
            rel="noopener noreferrer"
            className="header-button mobile-button"
            onClick={fecharMenu}
          >
            Entrar no Clube
          </a>
        </nav>

        {/* Botão visível no computador */}
        <a
          href="https://t.me/+-ieghNrVNIEyOWQx"
          target="_blank"
          rel="noopener noreferrer"
          className="header-button desktop-button"
        >
          Entrar no Clube
        </a>

      </div>
    </header>
  )
}

export default Header
