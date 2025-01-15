import React from 'react'
import Tooltip from '../molecules/Tooltip'

function BotonesPaginacion({ inicio, fin, click1, disable1, click2, disable2, pagina }) {
  return (
    <article className="botones-paginacion">
      <section>
        <Tooltip texto="Ir al Inicio">
          <button
            onClick={inicio}
            disabled={disable1}
            style={disable1 ? { opacity: '.1' } : null}
          >
            <img src={require('../../assets/imgs/atras.png')} alt="Inicio" />
          </button>
        </Tooltip>
      </section>

      <section>
        <Tooltip texto="Anterior">
          <button
            onClick={click1}
            disabled={disable1}
            style={disable1 ? { opacity: '.1' } : null}
          >
            <img src={require('../../assets/imgs/atras-single.png')} alt="Atras" />
          </button>
        </Tooltip>

        <span>Página {pagina}</span>

        <Tooltip texto="Siguiente">
          <button
            onClick={click2}
            disabled={disable2}
            style={disable2 ? { opacity: '.1' } : null}
          >
            <img src={require('../../assets/imgs/siguiente-single.png')} alt="Siguiente" />
          </button>
        </Tooltip>
        {/* {console.log(Math.ceil(registros.length / registrosPorPagina))} */}
      </section>

      <section>
        <Tooltip texto="Ir al Final">
          <button
            onClick={fin}
            disabled={disable2}
            style={disable2 ? { opacity: '.1' } : null}
          >
            <img src={require('../../assets/imgs/siguiente.png')} alt="Final" />
          </button>
        </Tooltip>
      </section>

    </article>
  )
}

export default BotonesPaginacion
