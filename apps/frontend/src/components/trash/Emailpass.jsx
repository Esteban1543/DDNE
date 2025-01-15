import React from 'react';

// Importaciones Boostrap react
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import LogoDDNE from '../molecules/Redhome';
import '../assets/styles/Loginmain.css';

// Correo para recuperar contraseña
function EmailPassword() {
  return(
    <div className='contenedor'>
    <LogoDDNE />
      <form action='' className='ItemLogin'>
        <>
          <FloatingLabel controlId="floatingInput" label="Correo de recuperación" className="mb-3 ancho">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>

          <Button variant="primary" style={{width: "75%"}}>Enviar</Button>
        </>
        </form>
    </div>
    
  )
}

export default EmailPassword;