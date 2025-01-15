import React, { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import "../../../../assets/styles/modals.css";
import { URI } from "../../../../config";
// Importaciones Bootstrap
import BotonAgregar from "../../../molecules/BotonAgregar";
import Modal from "react-bootstrap/Modal";
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// Icono de Editar
// import Edit from "../../../../assets/imgs/icons/edit.svg";
import ModalFooter from "../../../molecules/ModalFooter";

function ModalAddUser({ Permisos, Tipo_identicacion, ActualizarUsuarios }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const datosIniciales = {
      n_identificacion: '',
      t_identificacion: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      direccion: '',
      email: '',
      usuario: '',
      contraseña: 'contra123',
      permisos: ''
    }

    const [datosUsuario, setDatosUsuario] = useState(datosIniciales)

    const almacenarUsuario = (e) => {
      if (e.target.name === 'permisos'){
        if (e.target.checked === true){
          setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: datosUsuario.permisos === '' ? e.target.value : datosUsuario.permisos + ' ' + e.target.value,
          })
          console.log(datosUsuario.permisos)
          return;
        }else if(e.target.checked === false){
          setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: datosUsuario.permisos.replace(e.target.value, '').trim(),
          })
          return;
        }
      }
      
      setDatosUsuario({
        ...datosUsuario,
        [e.target.name]: e.target.value,
      })
      return;
    }

    const crearUsuario = async (e) => {
      e.preventDefault()
      
      if(datosUsuario.t_identificacion != 'null' && datosUsuario.permisos != ''){
        try {
          const response = await axios.post(`${URI}/createuser`, datosUsuario)
  
          if(response.data.success){
            ActualizarUsuarios()
            // console.log('Datos ingresados exitosamente');
            toast.success(<h6><strong>Usuario Creado con Exito ✅</strong></h6>)
            setDatosUsuario(datosIniciales)
            handleClose()
            return;
          }
          // console.log('Datos erroneos!');
          toast.error(<h6><strong>No se ha podido agregar el Usuario ❌</strong></h6>)
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }

      // alert('Seleccion tipo de identificacion o permiso!');
      toast.info(<h6><strong>📌 Seleccione el Tipo de identificación o Permiso</strong></h6>)
    }

    return (
      <>
        <BotonAgregar openModal={handleShow} />
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text">Nuevo Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={crearUsuario}>
              {/* Identificacion */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  N° Identificación
                </InputGroup.Text>
                <Form.Control
                  id="identificacion"
                  name="n_identificacion"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  type="text"
                  pattern="^\d+$"
                  title="Solo permitido numeros"
                  required
                />
              </InputGroup>
  
              {/* Tipo identificacion */}
              <Form.Select size="sm" name="t_identificacion" id="tipo_id" className="mb-3" defaultValue={'null'} onChange={almacenarUsuario} required>
                <option value="null" disabled={true} hidden={true}>Seleccione un tipo de Identificación</option>
                {
                  Tipo_identicacion.map((identificacion, index) => (
                    <option key={index} value={identificacion.tipo_id}>{identificacion.tipo_id}</option>
                  ))
                }
              </Form.Select>
  
              {/* Nombres */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombres
                </InputGroup.Text>
                <Form.Control
                  id="nombres"
                  name="nombres"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$"
                  title="Maximo dos nombres, solo letras"
                  required
                />
              </InputGroup>
  
              {/* Apellidos */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Apellidos
                </InputGroup.Text>
                <Form.Control
                  id="apellidos"
                  name="apellidos"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$"
                  title="Maximo dos nombres, solo letras"
                  required
                />
              </InputGroup>
  
              {/* Telefono */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Telefono
                </InputGroup.Text>
                <Form.Control
                  id="telefono"
                  name="telefono"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  pattern="^\d+$"
                  title="Solo permitido numeros"
                  required
                />
              </InputGroup>
  
              {/* Direccion */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Dirrección
                </InputGroup.Text>
                <Form.Control
                  id="direccion"
                  name="direccion"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  required
                />
              </InputGroup>
  
              {/* Email */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Correo Electronico
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Por favor ingrese un correo electrónico válido"
                  required
                />
              </InputGroup>
  
              {/* Alias */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombre de usuario
                </InputGroup.Text>
                <Form.Control
                  id="alias"
                  name="usuario"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={almacenarUsuario}
                  required
                />
              </InputGroup>
  
              {/* Contraseña */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Contraseña
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  id="password"
                  name="contraseña"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={'contra123'}
                  onChange={almacenarUsuario}
                  required
                />
              </InputGroup>
  
              {/* Permisos */}
              <h5
                className="text"
                style={{ textIndent: "15px", fontWeight: "400" }}
              >
                Permisos
              </h5>
          
              <div className="checks mb-3">
               
               {
                  Permisos.map((permisos, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        name="permisos"
                        id={permisos.permiso_sistema}
                        value={permisos.permiso_sistema}
                        onChange={almacenarUsuario}
                      />
                      <label htmlFor={permisos.permiso_sistema} className="label-user">
                        {permisos.permiso_sistema}
                      </label>
                    </div>
                  ))
                }

              </div>
              <ModalFooter click={handleClose} submit={crearUsuario} />
              {/* <div className="boton-submit-form">
                <Button variant="primary" type="submit">
                  Guardar Cambios
                </Button>
              </div> */}
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default ModalAddUser;