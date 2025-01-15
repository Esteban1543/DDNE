import React, { useState } from "react";
// import { toast } from 'sonner';
import "../../../../assets/styles/modals.css";

// Importaciones Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Icono de Editar
import Edit from "../../../../assets/imgs/icons/edit.svg";

function ModalEditUser({ Permisos, Tipo_identicacion, ActualizarUsuarios, Usuario }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [datosUsuarioEdit, setDatosUsuarioEdit] = useState({
      n_identificacion: Usuario.persona_id,
      t_identificacion: Usuario.fk_tipo_identificacion,
      nombres: Usuario.nombre_2 === null ? Usuario.nombre_1 : Usuario.nombre_1+' '+Usuario.nombre_2,
      apellidos: Usuario.apellido_2 === null ? Usuario.apellido_1 : Usuario.apellido_1+' '+Usuario.apellido_2,
      telefono: Usuario.telefono,
      direccion: Usuario.direccion,
      email: Usuario.correo,
      usuario: Usuario.alias,
      contraseña: '',
      permisos: Usuario.permisos
    })

    const almacenarUsuario = (e) => {
      if (e.target.name === 'permisos'){
        if (e.target.checked === true){
          setDatosUsuarioEdit({
            ...datosUsuarioEdit,
            [e.target.name]: datosUsuarioEdit.permisos === '' ? e.target.value : datosUsuarioEdit.permisos + ',' + e.target.value,
          })
          console.log(datosUsuarioEdit.permisos)
          return;
        }else if(e.target.checked === false){
          setDatosUsuarioEdit({
            ...datosUsuarioEdit,
            [e.target.name]: datosUsuarioEdit.permisos.replace(e.target.value, '').trim(),
          })
          return;
        }
      }
      
      setDatosUsuarioEdit({
        ...datosUsuarioEdit,
        [e.target.name]: e.target.value,
      })
      return;
    }
    
    return (
      <>
        <Button onClick={handleShow}>
          <img src={Edit} alt="Editar.png" />
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text">Nuevo Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/createuser" method="post">
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
                  defaultValue={datosUsuarioEdit.n_identificacion}
                  onChange={almacenarUsuario}
                />
              </InputGroup>
  
              {/* Tipo identificacion */}
              <Form.Select size="sm" name="t_identificacion" id="tipo_id" className="mb-3" defaultValue={datosUsuarioEdit.t_identificacion} onChange={almacenarUsuario}>
                <option value="null" hidden>Seleccione un tipo de Identificación</option>
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
                  defaultValue={datosUsuarioEdit.nombres}
                  onChange={almacenarUsuario}
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
                  defaultValue={datosUsuarioEdit.apellidos}
                  onChange={almacenarUsuario}
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
                  defaultValue={datosUsuarioEdit.telefono}
                  onChange={almacenarUsuario}
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
                  defaultValue={datosUsuarioEdit.direccion}
                  onChange={almacenarUsuario}
                />
              </InputGroup>
  
              {/* Email */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Correo Electronico
                </InputGroup.Text>
                <Form.Control
                  id="email"
                  name="email"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={datosUsuarioEdit.email}
                  onChange={almacenarUsuario}
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
                  defaultValue={datosUsuarioEdit.usuario}
                  onChange={almacenarUsuario}
                />
              </InputGroup>
  
              {/* Contraseña */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Contraseña
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  id="password"
                  name="contraseña"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={'N/A'}
                  onChange={almacenarUsuario}
                />
              </InputGroup>
  
              {/* Permisos */}
              <h4
                className="text"
                style={{ textIndent: "15px", fontWeight: "400" }}
              >
                Permisos
              </h4>
          
              <div className="checks mb-3">
               
               {
                  Permisos.map((permisos, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        name="permisos"
                        id={permisos.permiso_sistema}
                        value={permisos.permiso_sistema}
                        defaultChecked={datosUsuarioEdit.permisos.includes(permisos.permiso_sistema)}
                        onChange={almacenarUsuario}
                      />
                      <label htmlFor={permisos.permiso_sistema} className="label-user">
                        {permisos.permiso_sistema}
                      </label>
                    </div>
                  ))
                }

              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalEditUser;