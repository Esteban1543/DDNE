import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter.jsx';

// Funciones 📌
import consultaPostBackend from '../../../../helpers/consultaPostBackend.js';
import { getData } from '../../../../helpers/getData.js';
import { form_rollos_jumbo } from '../../../../schemas/inventarios.js';

// API ⚙️
import { URI } from '../../../../config.js';
const ENDPOINT = `${URI}/inv/jumbos`;


function CreateRolloJumbo({ cerrar, actualizar }) {

  //🔸 Manejo de Datos del Formulario
  const idUser = JSON.parse(sessionStorage.getItem('user_session')).id_user;

  const [formData, setFormData] = useState({
    id_rolloMdno: 'null',
    id_rolloJumbo: '',
    peso_jumbo: '',
    color: 'null',
    idUser: parseInt(idUser)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: (name === 'id_rolloMdno' || name === 'peso_jumbo' || name === 'id_rolloJumbo') && value.trim() !== '' && !isNaN(value) ? parseFloat(value) : value.trim(),
    }));
  };

  //🔸 Validación y Envío de Datos Formulario a Backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const validacion = form_rollos_jumbo.safeParse(formData);

      if (validacion.success) {
        const { success, message, error } = await consultaPostBackend(event, ENDPOINT, formData);
        // success ? alert(message) : (() => { console.log(error); alert(message) })();
        success ? toast.success(<h6><strong>Registro Creado con Exito ✅</strong></h6>) :  (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })() ;

        cerrar();
        actualizar(true);
        console.log('Paso verificación! ✅')
        return
      }

      const errores = JSON.parse(validacion.error)
      const mensajes_error = errores.map(i => i.path).join('\n');
      
      console.log('Datos Incorrectos en Formulario ❌', mensajes_error);
      
      alert(`❌ Datos Incorrectos en: \n\n ${mensajes_error} `);

    } catch (error) {
      alert('Error en Verificación de Formulario ❌');
      console.error('Error de validación: ', error.error);
    }
  };


  //🔸 Consulta para Select (ID Rollo Mediano)
  const [rollosMedianos, setRollosMedianos] = useState([]);
  useEffect(() => {
    getData(`${URI}/inv/medianos`, setRollosMedianos);
  }, [])


  //🔸 Definir colores y corte jumbo disponibles con base al rollo seleccionado
  const [colorRollo, setColorRollo] = useState([]);

  useEffect(() => {

    //🔹 Filtrar y establecer los colores del Rollo
    const color_rollo_mediano = rollosMedianos.filter(rm => rm.id_rollos_medianos === parseInt(formData.id_rolloMdno))
    setColorRollo(color_rollo_mediano);

    //🔹 Filtrar y Extraer Numero de Corte Jumbo
    const n_corte_jumbo = rollosMedianos
      .filter(rm => rm.id_rollos_medianos === parseInt(formData.id_rolloMdno))
      .map(rm => rm.corte_jumbo)
      ;

    //🔹 Resetear Select ante cambio de Rollo
    setFormData((prevData) => ({
      ...prevData,
      color: 'null',
      id_rolloJumbo: parseInt(n_corte_jumbo) + 1
    }))

  }, [rollosMedianos, formData.id_rolloMdno]);


  return (
    <>
      <Modal.Header>
        <Modal.Title >Registro Parafinado</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>

          {/* <!-- Id Rollo Mediano --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >N° Rollo Mediano</span>

            <select name="id_rolloMdno" value={formData.id_rolloMdno} onChange={handleChange} className="form-control" >
              <option value="null" disabled defaultValue hidden >Seleccione Rollo Mediano 🔻</option>
              {
                !!rollosMedianos && rollosMedianos.length > 0 ?
                  rollosMedianos.map((row) => (
                    <option key={row.id_rollos_medianos} value={row.id_rollos_medianos}> {row.consecutivo_insumo} - {row.id_rollos_medianos} </option>
                  ))
                  : <option key={null} value="null" disabled>No hay Información Disponible ✖️</option>
              }
            </select>
          </div>

          {/* <!-- Numero de Rollo/Corte --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Numero de Rollo/Corte</span>
            <input type="text" name="id_rolloJumbo" value={formData.id_rolloMdno === 'null' ? '⏳ Pendiente' : formData.id_rolloJumbo} className="form-control" required disabled />
          </div>

          {/* <!-- Color --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Color</span>

            <select name="color" value={formData.color} onChange={handleChange} className="form-control">
              <option value="null" disabled defaultValue hidden >Seleccione un Color 🔻</option>
              {
                !!colorRollo && colorRollo.length > 0 ?
                  colorRollo.map((row) => (
                    <>
                      <option value={row.fk_color_1} key="color1">{row.fk_color_1}</option>
                      <option value={row.fk_color_2} key="color2">{row.fk_color_2}</option>
                    </>
                  ))
                  : <option key={null} value="null" disabled>📌 Primero seleccione un Rollo </option>
              }
            </select>
          </div>

          {/* <!-- Peso Rollo Jumbo --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Peso Corte</span>
            <input type="number" name="peso_jumbo" value={formData.peso_jumbo} onChange={handleChange} className="form-control" placeholder="Kg" required pattern="[0-9]*" />
          </div>

        </Modal.Body>

        <ModalFooter click={cerrar} submit={handleSubmit} />
      </Form>
    </>
  )
}

export default CreateRolloJumbo;