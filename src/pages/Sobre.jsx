
import "./Sobre.css";

import {
  BookOpen,
  CalendarDays,
  MessageCircle,
  Send,
  Vote,
} from "lucide-react";

import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const redesSociais = [
  {
    nome: "YouTube",
    url: "https://www.youtube.com/@beatrizrcostac",
    Icone: FaYoutube,
  },
  {
    nome: "Instagram",
    url: "https://www.instagram.com/beatrizrcosta/",
    Icone: FaInstagram,
  },
  {
    nome: "TikTok",
    url: "https://www.tiktok.com/@beatrizrc94",
    Icone: FaTiktok,
  },
  {
    nome: "Maratona",
    url: "https://maratona.social/@beatrizrcosta",
    Icone: BookOpen,
  },
];

const videos = [
  {
    id: "SYCV57XHEzk",
    titulo: "Vídeo de apresentação da Beatriz Costa",
    inicio: 2,
  },
  {
    id: "CYcdsba7v1Q",
    titulo: "Vídeo da Beatriz Costa sobre livros",
  },
  {
    id: "PHpA7lbYHao",
    titulo: "Vídeo da Beatriz Costa",
  },
  {
    id: "gTReU6_hbOE",
    titulo: "Outro vídeo da Beatriz Costa",
  },
];

function Sobre() {
  return (
    <main className="sobre-page">
      <div className="sobre-container">

        {/* INTRODUÇÃO */}
        <section className="sobre-intro">
          <span className="sobre-etiqueta">
            NOSSA HISTÓRIA
          </span>

          <h1>Sobre o Clube da Bia</h1>

          <p className="sobre-subtitulo">
            Um cantinho para compartilhar histórias,
            descobrir livros e construir amizades.
          </p>
        </section>

        {/* HISTÓRIA DO CLUBE */}
        <section className="sobre-historia">
          <div className="sobre-historia-topo">
            <span className="sobre-historia-selo">
              DESDE FEVEREIRO DE 2023
            </span>
          </div>

          <h2>Como tudo começou</h2>

          <p>
            O Clube do Livro da Bia surgiu em fevereiro
            de 2023, criado pela TikToker Beatriz Costa.
            Hoje, reúne leitores de diferentes lugares
            do Brasil, unidos pelo amor aos livros.
          </p>

          <p>
            Mais do que conversar sobre leituras,
            criamos amizades de verdade! Nosso grupo
            é um espaço onde compartilhamos opiniões,
            indicamos histórias e conversamos todos os dias.
          </p>
        </section>

        {/* COMO FUNCIONA */}
        <section className="sobre-secao">
          <h2>Como funciona o clube?</h2>

          <div className="sobre-passos">
            <article className="sobre-passo">
              <div className="sobre-passo-icone">
                <Vote aria-hidden="true" />
              </div>

              <h3>1. Escolhemos o livro</h3>

              <p>
                Todo mês, escolhemos um tema e realizamos
                uma votação. O livro mais votado será
                nossa leitura do mês seguinte.
              </p>
            </article>

            <article className="sobre-passo">
              <div className="sobre-passo-icone">
                <MessageCircle aria-hidden="true" />
              </div>

              <h3>2. Lemos juntos</h3>

              <p>
                Conversamos sobre a leitura no Telegram
                e acompanhamos as atualizações da leitura
                coletiva pelo aplicativo Maratona.
              </p>
            </article>

            <article className="sobre-passo">
              <div className="sobre-passo-icone">
                <CalendarDays aria-hidden="true" />
              </div>

              <h3>3. Nos encontramos</h3>

              <p>
                Geralmente no primeiro domingo do mês
                seguinte, fazemos uma reunião online
                para conversar sobre o livro.
              </p>
            </article>
          </div>
        </section>

        {/* CONVITE PARA PARTICIPAR */}
        <section className="sobre-participar">
          <h2>Quer fazer parte?</h2>

          <p>
            É só entrar no nosso grupo do Telegram,
            se apresentar e começar a compartilhar
            suas leituras com a gente!
          </p>

          <a
            href="https://t.me/+-ieghNrVNIEyOWQx"
            target="_blank"
            rel="noopener noreferrer"
            className="sobre-botao"
          >
            <Send size={18} aria-hidden="true" />
            Entrar no Clube
          </a>
        </section>

        {/* CONHEÇA A BIA */}
        <section className="sobre-bia">
          <h2>Conheça a Bia</h2>

          <p className="sobre-bia-descricao">
            Psicóloga, criadora de conteúdo e amante dos
            livros. Beatriz Costa é a idealizadora do nosso
            clube e compartilha sua paixão pela leitura
            nas redes sociais.
          </p>

          {/* VÍDEOS */}
          <div className="sobre-bia-videos">
            <h3>Um pouquinho mais sobre ela</h3>

            <div className="sobre-videos">
              {videos.map((video) => (
                <article
                  className="sobre-video-card"
                  key={video.id}
                >
                  <div className="sobre-video">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}${
                        video.inicio
                          ? `?start=${video.inicio}`
                          : ""
                      }`}
                      title={video.titulo}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* REDES SOCIAIS */}
          <div className="sobre-bia-redes">
            <h3>Acompanhe a Bia nas redes</h3>

            <div className="sobre-redes">
              {redesSociais.map(
                ({ nome, url, Icone }) => (
                  <a
                    key={nome}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sobre-rede"
                    aria-label={`Visitar ${nome} da Beatriz`}
                  >
                    <Icone
                      className="sobre-rede-icone"
                      aria-hidden="true"
                    />

                    <span>{nome}</span>
                  </a>
                )
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default Sobre;
