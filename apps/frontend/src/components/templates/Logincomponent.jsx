import React from 'react';
import '../assets/styles/Login.css';

// Logo DDNE
import Logoddne from '../assets/imgs/Logo DDNE sin fondo.png';

// Importaciones Boostrap react
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



// Login
function LoginComponent() {
  return (
  <div className='contenedor'>
    {/* Logo DDNE */}
    <a href='#inicio'>
      <img src={Logoddne} alt='DDNE.png' className='logo-ddne'/>
    </a>
    {/* Formulario Login DNNE */}
    
    <div className='div-login'>
      <p>Bienvenido</p>
        <form action=''>
          <>
            <FloatingLabel controlId="floatingInput" label="Correo" className="mb-3 ancho">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Contraseña" className='mb-4 ancho'>
              <Form.Control type="password" placeholder="Contraseña" />
            </FloatingLabel>
          </>

          <button type='submit' className='btn-grad'>Ingresar</button>

        </form>
        <a href='#inicio' className='olv-contrasena'>¿Has olvidado tu contraseña?</a>
    </div>

  </div>
  )
}

// Correo para recuperar contraseña
function EmailPassword() {
  return(
    <div className='contenedor'>
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


// Recuperar contraseña
function PasswordRecover(){
  return(
    <div className='contenedor'>
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

export { LoginComponent, EmailPassword, PasswordRecover };



