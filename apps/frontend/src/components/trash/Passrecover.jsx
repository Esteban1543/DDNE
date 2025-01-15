import React from 'react';

// Importaciones Boostrap react
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Logoddne from '../molecules/Redhome';
import '../assets/styles/Loginmain.css';

// Recuperar contraseña
function PasswordRecover(){
    return(
      <div className='contenedor'>
      <Logoddne />
        <form action='' className='ItemLogin'>
          <>
            <FloatingLabel controlId="floatingPassword" label="Contraseña nueva" className='mb-4 ancho'>
                  <Form.Control type="password" placeholder="Contraseña" />
            </FloatingLabel>
  
            <FloatingLabel controlId="floatingPassword" label="Confirmar contraseña" className='mb-4 ancho'>
                  <Form.Control type="password" placeholder="Contraseña" />
            </FloatingLabel>
  
            <Button variant="primary" style={{width: "75%"}}>Cambiar contraseña</Button>
          </>
        </form>
      </div>
    )
  }

  export default PasswordRecover;