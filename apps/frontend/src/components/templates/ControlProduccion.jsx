import { useState } from 'react'
import Form from "react-bootstrap/Form";

// Styles ✨
import '../../assets/styles/control-produccion.css'

// Componentes🎗️
import TitulosPaginas from '../molecules/TitulosPaginas';
import InventarioRollosMedianos from './InventarioRollosMedianos';
import InventarioRollosJumbo from './InventarioRollosJumbo';
import InventarioProduccion from './InventarioProduccion';

function ControlProduccion() {

  //Contenido Inicial
  const [contenido, setContenido] = useState(false);
  const [title, setTitle] = useState('Control de Inventario Producción');
  const [valueSelect, setValueSelect] = useState(false)

  const handleClick = (tipo) => {
    if (tipo === 'rollos_medianos') {
      setContenido(<InventarioRollosMedianos />);
      setTitle('Control Impresión');
      setValueSelect('rollos_medianos')      
    } else if (tipo === 'rollos_jumbo') {
      setContenido(<InventarioRollosJumbo />);
      setTitle('Control Parafinado');
      setValueSelect('rollos_jumbo')
    } else if (tipo === 'produccion') {
      setContenido(<InventarioProduccion />);
      setTitle('Inventario Producción');
      setValueSelect('produccion')
    }
  };

  return (
    <>
      <TitulosPaginas titulo={title} />

      {/* Select que cambia el contenido */}
      <Form.Select size="sm" className="mb-3 select-change"
        value={valueSelect}
        onChange={(e) => handleClick(e.target.value)}
        style={contenido === false ? { display: 'none' } :null }
      >
        <option value="false" defaultValue disabled hidden>Seleccionar Sección</option>
        <option value="rollos_medianos">Impresión</option>
        <option value="rollos_jumbo">Parafinado</option>
        <option value="produccion">Producción</option>
      </Form.Select>

      {/* Icono para volver atrás */}
      <i><img
        className='boton-atras_produccion'
        style={contenido === false ? { display: 'none' } : null}
        onClick={() => {
          setContenido(false)
          setTitle('Control de Inventario Producción');
        }}
        src={require('../../assets/imgs/back2.png')}
        alt="volver atrás" />
      </i>

      {
        contenido ? contenido : (
          <section className="contenedor-produccion">
            <div className="produccion_card" onClick={() => handleClick('rollos_medianos')}>
              <i>
                <img src={require('../../assets/imgs/medianos.png')} alt="icon" />
              </i>
              <h2> Impresión</h2>
            </div>

            <div className="produccion_card" onClick={() => handleClick('rollos_jumbo')}>
              <i>
                <img src={require('../../assets/imgs/jumbo-1.png')} alt="icon" />
              </i>
              <h2> Parafinado</h2>
            </div>

            <div className="produccion_card" onClick={() => handleClick('produccion')}>
              <i>
                <img src={require('../../assets/imgs/produccion.png')} alt="icon" />
              </i>
              <h2> Producción</h2>
            </div>
          </section>
        )
      }
    </>
  )
}

export default ControlProduccion