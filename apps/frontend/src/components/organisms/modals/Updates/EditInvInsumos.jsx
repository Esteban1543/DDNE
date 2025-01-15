import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter';

// Styles✨
import '../../../../assets/styles/modales.css'

// Funciones 📌
import consultaPatchBackend from '../../../../helpers/consultaPatchBackend';
import { update_form_inv_insumos } from '../../../../schemas/inventarios';

// API ⚙️
import { URI } from '../../../../config';
const ENDPOINT = `${URI}/inv/insumos`;


function EditInvInsumos({ data_id, estado, insumo, actualizar }) {
  
  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //🔸 Manejo de Datos del Formulario
  const [formData, setFormData] = useState({
    estado: '',
    fecha_recepcion: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? value : value,
    }));
  };

  
  useEffect(() => {
    if (formData.estado === 'Cancelado') {
      setFormData((prevData) => ({
        ...prevData,
        fecha_recepcion: 'null'
      }))
    } else if (formData.estado === 'Recibido') {
      setFormData((prevData) => ({
        ...prevData,
        fecha_recepcion: ''
      }))
    }
  }, [formData.estado]);


  //🔸 Envío de Datos Formulario a Backend 
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData)

    try {
      const validacion = update_form_inv_insumos.safeParse(formData);

      if (validacion.success) {
        
        const { success, message, error } = await consultaPatchBackend(event, `${ENDPOINT}/${data_id}`, formData);
        // success ? (()=>{alert(message); actualizar(true)})() : (() => { console.error(error); alert(message) })();
        success ? (()=>{toast.success(<h6><strong>Registro Actualizado con Exito ✅</strong></h6>); actualizar(true)})() : (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })();
        
        handleClose();
        return
      }

      const errores = JSON.parse(validacion.error)
      const mensajes_error = errores.map(i => i.path).join('\n');
      
      console.log('Datos Incorrectos en Formulario ❌', validacion.error);
      alert(`❌ Datos Incorrectos en: \n\n ${mensajes_error} `);      

    } catch (error) {
      alert('Error en Verificación de Formulario ❌');
      console.error('Error de validación: ', error.errors);
    }
  };

  return (
    <>

      <img
        className='boton-editar'
        style={estado === 'En Espera' ? {} : { cursor: 'not-allowed' }}
        onClick={estado === 'En Espera' ? handleShow : handleClose}
        src={require('../../../../assets/imgs/editar.png')}
        alt="editar"
        // style={{width:}}
      />


      <Modal show={show} onHide={handleClose}>

        <Modal.Header>
          <Modal.Title >Editar Registro</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            {/* <!-- ID Registro --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Registro</span>
              <input type="text" name="id_registro" value={data_id} className="form-control" required disabled/>
            </div>

            {/* <!-- Tipo de Insumo --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Insumo</span>
              <input type="text" name="unidades" value={insumo} className="form-control" required disabled/>
            </div>

            {/* <!-- Estado --> */}
            <div className="input-group input-group-sm mb-3" style={{ gap: "15px" }}>
              <span className="input-group-text input-group-text-big" id="inputGroup-sizing-sm" >Estado</span>

              <div className='radios-estados' style={{ textAlign: "center", gridTemplateColumns: "1fr 1fr" }}>

                <div style={{ borderRight: "1px solid black" }}>
                  <input type="radio" name="estado" id="entregado" value="Recibido" onChange={handleChange} checked={formData.estado.includes("Recibido")} required />
                  <label htmlFor="entregado" > Entregado </label>
                </div>

                <div>
                  <input type="radio" name="estado" id="cancelado" value="Cancelado" onChange={handleChange} checked={formData.estado.includes("Cancelado")} required />
                  <label htmlFor="cancelado" > Cancelado</label>
                </div>

              </div>

            </div>

            {/* <!-- Unidades --> */}
            {/* <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Unidades</span>
              <input type="text" id="unds" name="unidades" value={formData.unidades} onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required />
            </div> */}

            {/* <!-- Recepcion Planificada --> */}
            {/* <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Recepcion Planificada</span>
              <input type="date" id="fecha-planificada" name="fecha_planificada" value={formData.fecha_planificada} onChange={handleChange} className="form-control place-left" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="DD - MM - AA" required />
            </div> */}

            {/* <!-- Fecha de recepcion --> */}
            {/* {
              formData.estado === 'Recibido' ?
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm" >Fecha de recepcion </span>
                  <input type="date" id="fecha_recepcion" name='fecha_recepcion' value={formData.fecha_recepcion} onChange={handleChange} className="form-control place-left" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="DD - MM - AA" required />
                </div>
                : ''
            } */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Fecha de recepcion </span>
              {
                formData.estado === 'Recibido' ?
                <input type="date" name='fecha_recepcion' value={formData.fecha_recepcion} onChange={handleChange} className="form-control" required />
                : <input type="text" name='fecha_recepcion' value={formData.fecha_recepcion} onChange={handleChange} className="form-control"  placeholder="No Disponible" disabled/>
              }
            </div>

          </Modal.Body>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>
    </>
  )
}

export default EditInvInsumos;