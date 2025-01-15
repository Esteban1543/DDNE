import React from 'react'
import { Link } from 'react-router-dom';

// Logo DDNE
import Logoddne from '../../assets/imgs/Logo DDNE sin fondo.png';

import '../../assets/styles/Loginmain.css';

function LogoDDNE() {
  return (
    // Logo DDNE superior izquierdo 
    <Link to="/">
      <img src={Logoddne} alt='DDNE.png' className='logo-ddne' />
    </Link>

  )
}

export default LogoDDNE;