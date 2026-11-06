
function LivroCard({ livro }) {
  const nota = Number(livro.avaliacao)
  const temNota = livro.avaliacao !== '' &&
    Number.isInteger(nota) &&
    nota >= 1 &&
    nota <= 5

  return (
    <article className="livro-card">
      
<div className="livro-capa">
  {livro.capa ? (
    <img
      src={livro.capa}
      alt={`Capa do livro ${livro.titulo}`}
      onError={(evento) => {
        evento.currentTarget.style.display = 'none'
      }}
    />
  ) : (
    <span className="livro-capa-placeholder">
      📖
    </span>
  )}
</div>


      <div className="livro-informacoes">
        <span className="livro-mes">
          {livro.mes} de {livro.ano}
        </span>

        <h2>{livro.titulo}</h2>
        <p className="livro-autor">{livro.autor}</p>

        {temNota ? (
          <p
            className="livro-avaliacao"
            aria-label={`Avaliação: ${nota} de 5 corações`}
          >
            {'♥'.repeat(nota)}
            <span>{'♡'.repeat(5 - nota)}</span>
          </p>
        ) : (
          <p className="livro-sem-nota">
            Avaliação pendente ♡
          </p>
        )}
      </div>
    </article>
  )
}

export default LivroCard
