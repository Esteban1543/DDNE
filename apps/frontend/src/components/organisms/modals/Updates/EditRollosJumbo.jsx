import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Styles✨
import '../../../../assets/styles/modales.css'

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter';

// Funciones 📌
import consultaPatchBackend from '../../../../helpers/consultaPatchBackend';
import { getData } from '../../../../helpers/getData';
import { useEffect } from 'react';

// API ⚙️
import { URI } from '../../../../config';
const ENDPOINT = `${URI}/inv/jumbos`;


function EditRollosJumbo({ data_id, peso, color, actualizar }) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //🔸 Manejo de Datos del Formulario
  const [formData, setFormData] = useState({
    peso_jumbo: peso,
    color: color,
  });
  // console.log('color > ', data_id)
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  //🔸 Envío de Datos Formulario a Backend 
  const handleSubmit = async (event) => {
    const { success, message, error } = await consultaPatchBackend(event, `${ENDPOINT}/${data_id}`, formData);
    // success ? (() => { alert(message); actualizar(true) })() : (() => { console.error(error); alert(message) })();
    success ? (()=>{toast.success(<h6><strong>Registro Actualizado con Exito ✅</strong></h6>); actualizar(true)})() : (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })();

    handleClose();
  };

  //🔸 Consulta Colores de Rollo Mediano
  const [coloresMediano, setColoreMedianos] = useState([]);

  useEffect(() => {
    getData(`${URI}/inv/medianos`, setColoreMedianos);
  }, [])


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
          <Modal.Title >Editar Rollo Jumbo</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            {/* <!-- Id rollo Mediano --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Rollo Mediano</span>
              <input type="text" name="id1" value={data_id.split('/')[0]} className="form-control" disabled />
            </div>

            {/* <!-- Id Rollo Jumbo --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Rollo Jumbo</span>
              <input type="text" name="id2" value={data_id.split('/')[1]} className="form-control" disabled />
            </div>

            {/* <!-- Color --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Color</span>

              <select name="color" defaultValue={color} onChange={handleChange} className="form-control">
                {
                  !!coloresMediano && coloresMediano.length > 0 ?
                    coloresMediano
                      .filter(rm => rm.id_rollos_medianos === parseInt(data_id.split('/')[0]))
                      .map((rm) => (
                        <>
                          <option value={rm.fk_color_1} key="color1">{rm.fk_color_1}</option>
                          <option value={rm.fk_color_2} key="color2">{rm.fk_color_2}</option>
                        </>
                      ))
                    : <option key={null} value="null">❌ Error con Id de Rollo Mediano </option>
                }
              </select>
            </div>

            {/* <!-- Peso Rollo Jumbo --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Peso Corte</span>
              <input type="number" name="peso_jumbo" value={formData.peso_jumbo} onChange={handleChange} className="form-control" placeholder="Kg" required pattern="[0-9]*" />
            </div>

          </Modal.Body>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>

    </>
  )
}

export default EditRollosJumbo