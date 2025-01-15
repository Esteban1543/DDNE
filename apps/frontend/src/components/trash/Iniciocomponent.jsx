import React from 'react';

import '../assets/styles/inicio.css';
import Profileimage from '../assets/imgs/profile-image-default.jpg';

function Inicio() {
  return (
    <div className='div-init'>
      {/* Informacion usuario */}
      <div className='dataprofile'>

        <div className='dataimg'>
          <img src={Profileimage} alt='Usuario.png'/>
        </div>

          <div className='data'>
            <ul>
              <li><b>Usuario:</b>   Ejemplo</li>
              <li><b>Estado:</b>    Ejemplo</li>
              <li><b>Usuarios Activos:</b>    Ejemplo</li>
              <li><b>Stock:</b>    Ejemplo</li>
            </ul>
          </div>

      </div>
      {/* Informes */}
      <section className='datainfo'>
        <div></div>
        <div></div>
      </section>

    </div>
  )
}


export default Inicio;