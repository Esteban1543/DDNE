import React, { useState } from 'react';
import { URI } from '../config.js';
import { Toaster, toast } from 'sonner';

import LogoDDNE from '../components/molecules/Redhome';

// Importaciones Boostrap react
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

// Estilos
import '../assets/styles/Loginmain.css';
import '../assets/styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    usuario: '',
    password: 'contra123'
  });

  const dataInto = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URI}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        const userData = data.user.session;
        sessionStorage.setItem('user_session', JSON.stringify(userData));
        toast.success(<h6><strong>{data.message}</strong></h6>)
        window.location.href = '/Dashboard';
      } else {
        console.log(data.message);
        toast.error(<h6><strong>{data.message}</strong></h6>)
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      toast.error(<h6><strong>❌ Error al Enviar los Datos</strong></h6>)
    }
  };

  return (
    <div className='contenedor'>
      <LogoDDNE />
      <div className='div-login'>
        <p>Bienvenido</p>
        <form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Usuario" className="mb-3 ancho" style={{opacity: '0.7'}}>
            <Form.Control
              type="text"
              name="usuario"
              placeholder="name@example.com"
              onChange={dataInto}
              value={formData.usuario}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Contraseña" className='mb-4 ancho' >
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={dataInto}
              value={formData.password}
            />
          </FloatingLabel>

          <button type='submit' className='btn-grad'>Ingresar</button>
        </form>
        {/* <Link to="/CorreoRecuperacion" className='olv-contrasena'>
          ¿Has olvidado tu contraseña?
        </Link> */}
      </div>

      <Toaster richColors />

    </div>
  )
}

export default Login;