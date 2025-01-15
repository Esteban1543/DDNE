import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Styles✨
import '../../../../assets/styles/modales.css'

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter';
import consultaPatchBackend from '../../../../helpers/consultaPatchBackend';

// API ⚙️
import { URI } from '../../../../config';
const ENDPOINT = `${URI}/inv/medianos`;


function EditRollosMedianos({ data_id, consecutivo, color1, color2, peso, actualizar }) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  //🔸 Manejo de Datos del Formulario 
  const initialState = {
    color1: color1,
    color2: color2,
    peso_inicial: peso
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };


  //🔸 Envío de Datos Formulario a Backend 
  const handleSubmit = async (event) => {
    const { success, message, error } = await consultaPatchBackend(event, `${ENDPOINT}/${data_id}`, formData);
    // success ? (()=>{alert(message); actualizar(true)})() : (() => { console.error(error); alert(message) })();
    success ? (()=>{toast.success(<h6><strong>{message}</strong></h6>); actualizar(true)})() : (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })();

    handleClose();
    setFormData(initialState)
  };
  

  //🔸 Array para Selects de Colores
  const colores = [
    { nombre: "Transparente" },
    { nombre: "Blanco" },
    { nombre: "Negro" },
    { nombre: "Verde" },
    { nombre: "Rojo" },
    { nombre: "Azul" },
    { nombre: "Amarillo" },
    { nombre: "Naranja" },
    { nombre: "Custom" }
  ];


  return (
    <>
      <img
        className='boton-editar'
        onClick={handleShow}
        src={require('../../../../assets/imgs/editar.png')}
        alt="editar"
      />

      <Modal show={show} onHide={handleClose}>

        <Modal.Header>
          <Modal.Title >Editar Rollo Mediano</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            {/* <!-- Id rollo Mediano --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">ID Rollo Mediano</span>
              <input type="text" name="id" value={data_id} className="form-control" disabled />
            </div>

            {/* <!-- Consecutivo de Inv-Insumos --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" >Consecutivo</span>
              <input type="text" name="consecutivo_insumo" value={consecutivo} className="form-control" disabled />
            </div>

            {/* <!-- Color 1 --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Color 1</span>

              <select name="color1" value={formData.color1} onChange={handleChange} className="form-control">
                <option value="null" disabled defaultValue hidden >Seleccione un Color 🔻</option>

                {colores.map(row => <option key={data_id+row.nombre} value={row.nombre}>{row.nombre}</option>)}
              </select>
            </div>

            {/* <!-- Color 2 --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Color 2</span>

              <select name="color2" value={formData.color2} onChange={handleChange} className="form-control">
                <option value="null" disabled defaultValue hidden >Seleccione un Color 🔻</option>

                {colores.map(row => <option key={data_id+row.nombre} value={row.nombre}>{row.nombre}</option>)}
              </select>
            </div>

            {/* <!-- Peso Inicial --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Peso</span>
              <input type="number" name="peso_inicial" value={formData.peso_inicial} onChange={handleChange} className="form-control" placeholder="Kg" required />
            </div>

          </Modal.Body>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>
    </>
  )
}

export default EditRollosMedianos;