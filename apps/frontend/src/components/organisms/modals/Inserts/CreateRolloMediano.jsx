import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter.jsx';

// Funciones📌
import consultaPostBackend from '../../../../helpers/consultaPostBackend.js';
import consultaGetBackend from '../../../../helpers/consultaGetBackend.js';
import { form_rollos_medianos } from '../../../../schemas/inventarios.js';

// API ⚙️
import { URI } from '../../../../config.js';
const ENDPOINT = `${URI}/inv/medianos`;


function CreateRolloMediano({ cerrar, actualizar }) {


  //🔸 Manejo de Datos del Formulario
  const idUser = JSON.parse(sessionStorage.getItem('user_session')).id_user;

  const [formData, setFormData] = useState({
    consecutivo_insumo: 'null',
    color1: 'null',
    color2: 'null',
    peso_inicial: '',
    idUser:  parseInt(idUser)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: (name === 'consecutivo_insumo' || name === 'peso_inicial') && value.trim() !== '' && !isNaN(value) ? parseFloat(value) : value.trim(),
    }));
  };


  //🔸 Validación y Envío de Datos Formulario a Backend
  const handleSubmit = async (event) => {

    event.preventDefault()
    // console.log(formData)
    try {
      const validacion = form_rollos_medianos.safeParse(formData);

      if (validacion.success) {
        const { success, message, error } = await consultaPostBackend(event, ENDPOINT, formData);
        // success ? alert(message) : (() => { console.log(error); alert(message) })();
        success ? toast.success(<h6><strong>Registro Creado con Exito ✅</strong></h6>) :  (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })() ;

        cerrar();
        actualizar(true);
        console.log('Paso verificación !✅');
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


  //🔸 Consulta para Select (Numero de Consecutivo)
  const [consecutivoInsumo, setConsecutivoInsumo] = useState([]);
  useEffect(() => {
    const getSuppliesIds = async () => {
      const { response, success } = await consultaGetBackend(`${URI}/inv/insumos`);

      if (success) {
        const resp = response.data.data;
        const data = resp.filter(r => r.fk_tipo_insumo === "Papel" && r.fk_estado === "Recibido");
        setConsecutivoInsumo(data);
      }
    }

    getSuppliesIds()
  }, [])


  //🔸 Array para Selects de Colores
  const colores = [
    { nombre: "Transparente" },
    { nombre: "Blanco" },
    { nombre: "Negro" },
    { nombre: "Verde" },
    { nombre: "Rojo" },
    { nombre: "Azul" },
    { nombre: "Amarillo" },
    { nombre: "Naranja" }
  ];


  return (
    <>
      <Modal.Header>
        <Modal.Title >Registro Impresión</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>

          {/* <!-- Consecutivo de Inv-Insumos --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Consecutivo</span>

            <select name="consecutivo_insumo" value={formData.consecutivo_insumo} onChange={handleChange} className="form-control" >
              <option value="null" disabled defaultValue hidden >Seleccione el Insumo correspondiente 🔻</option>

              {
                !!consecutivoInsumo && consecutivoInsumo.length > 0 ?
                  consecutivoInsumo.map((row) => (
                    <option key={row.id_inventario_insumos} value={row.id_inventario_insumos}>{row.consecutivo_insumo}</option>
                  ))
                  : <option key={null} value="null" disabled>No hay Información Disponible ✖️</option>
              }

            </select>
          </div>

          {/* <!-- Color 1 --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Color 1</span>

            <select name="color1" value={formData.color1} onChange={handleChange} className="form-control">
              <option value="null" disabled defaultValue hidden >Seleccione un Color 🔻</option>

              {colores.map(row => <option key={row.nombre} value={row.nombre}>{row.nombre}</option>)}
            </select>
          </div>

          {/* <!-- Color 2 --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Color 2</span>

            <select name="color2" value={formData.color2} onChange={handleChange} className="form-control">
              <option value="null" disabled defaultValue hidden >Seleccione un Color 🔻</option>

              {colores.map(row => <option key={row.nombre} value={row.nombre}>{row.nombre}</option>)}
            </select>
          </div>

          {/* <!-- Peso Inicial --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Peso</span>
            <input type="number" name="peso_inicial" value={formData.peso_inicial} onChange={handleChange} className="form-control" placeholder="Kg" required />
          </div>

        </Modal.Body>

        <ModalFooter click={cerrar} submit={handleSubmit} />
      </Form>

    </>
  )
}

export default CreateRolloMediano;