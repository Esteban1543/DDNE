import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter.jsx';

// Funciones 📌
import consultaPostBackend from '../../../../helpers/consultaPostBackend.js';
import { getData } from '../../../../helpers/getData.js';
import { form_inv_produccion } from '../../../../schemas/inventarios.js';

// API ⚙️
import { URI } from '../../../../config.js';
const ENDPOINT = `${URI}/inv/produccion`;


function CreateInvProduccion({ cerrar, actualizar }) {  

  //🔸 Manejo de Datos del Formulario
  const idUser = JSON.parse(sessionStorage.getItem('user_session')).id_user;

  const [formData, setFormData] = useState({
    id_rolloMdno: 'null',
    id_rolloJumbo: 'null',
    producto_final: 'null',
    color: 'null',
    peso_producto: '',
    idUser: parseInt(idUser)
  });

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: (name === 'id_rolloMdno' || name === 'id_rolloJumbo' || name === 'producto_final' || name === 'peso_producto')
        && value.trim() !== '' && !isNaN(value) ? parseFloat(value) : value.trim(),
    }));
  };


  //🔸 Validación y Envío de Datos Formulario a Backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
      const validacion = form_inv_produccion.safeParse(formData);

      if (validacion.success) {
        const { success, message, error } = await consultaPostBackend(event, ENDPOINT, formData);
        // success ? alert(message) : (() => { console.log(error); alert(message) })();
        success ? toast.success(<h6><strong>Registro Creado con Exito ✅</strong></h6>) : (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })();

        cerrar();
        actualizar(true);
        console.log('Paso verificación !✅');
        return
      }

      const errores = JSON.parse(validacion.error)
      const mensajes_error = errores.map(i => i.path).join('\n');

      console.log('Datos Incorrectos en Formulario ❌', errores);

      alert(`❌ Datos Incorrectos en: \n\n ${mensajes_error} `);

    } catch (error) {
      alert('Error en Verificación de Formulario ❌');
      console.error('Error de validación: ', error.errors);
    }
  };


  //🔸 Consultas GET para Selects (ID Rollo Mediano, Total de Productos )
  const [rollosMedianos, setRollosMedianos] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getData(`${URI}/inv/medianos`, setRollosMedianos);
    getData(`${URI}/productos`, setProductos);
  }, [])


  //🔸 Establecer IDs de Rollos Jumbo acorde al rollo mediano
  const [rollosJumbo, setRollosJumbo] = useState([]);

  useEffect(() => {

    //🔹 Resetear Select de R. jumbo ante cambio de R. Mediano
    setFormData((prevData) => ({
      ...prevData,
      id_rolloJumbo: 'null',
    }))

    //🔹 Filtrar y establecer los Rollos Jumbos disponibles 
    const rollo_mediano = !!rollosMedianos && rollosMedianos.filter(rm => rm.id_rollos_medianos === parseInt(formData.id_rolloMdno))
    setRollosJumbo(rollo_mediano);

    const id_rollo_mdno = rollo_mediano.length > 0 ? rollo_mediano[0].id_rollos_medianos : 0;
    getData(`http://localhost:5000/inv/jumbos/${id_rollo_mdno}`, setRollosJumbo)

  }, [rollosMedianos, formData.id_rolloMdno])


  //🔸 Establecer productos disponibles de acuerdo a la medida
  const [medidaProducto, setMedidaProducto] = useState('');

  useEffect(() => {

    //🔹 Resetear color ante cambio de Rollo Mdno
    setFormData((prevData) => ({
      ...prevData,
      color: 'null'
    }))

    //🔹 Establecer color de acuerdo al Rollo Jumbo seleccionado
    const colorJumbo = formData.id_rolloJumbo.split('-')[1];
    if (!!colorJumbo) {
      setFormData((prevData) => ({
        ...prevData,
        color: colorJumbo
      }))
    }

  }, [formData.id_rolloMdno, formData.id_rolloJumbo]);

  //🔸 Formatear select de productos ante cambio de medida seleccionada
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      producto_final: 'null'
    }))

    // 🔹 Asignar 0 al peso cuando no sea por kg el producto final
    if(medidaProducto !== 'kg'){
      setFormData((prevData) => ({
        ...prevData,
        peso_producto: 0
      }))
    }
  }, [medidaProducto])

  return (
    <>
      <Modal.Header>
        <Modal.Title >Registro Inv. Producción</Modal.Title>
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
                    <option key={row.id_rollos_medianos} value={row.id_rollos_medianos}>{row.id_rollos_medianos} - {row.consecutivo_insumo}</option>
                  ))
                  : <option value="null" disabled>No hay Información Disponible ✖️</option>
              }
            </select>
          </div>

          {/* <!-- Id Corte Jumbo --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >N° Rollo Jumbo</span>

            <select name="id_rolloJumbo" value={formData.id_rolloJumbo} onChange={handleChange} className="form-control" >
              <option value="null" disabled defaultValue hidden >Seleccione Rollo Jumbo 🔻</option>
              {
                !!rollosJumbo && rollosJumbo.length > 0 ?
                  rollosJumbo.map(row => <option key={row.pfk_rollo_mediano + row.rollo_jumbo} value={`${row.rollo_jumbo}-${row.fk_color}`}>Corte {row.rollo_jumbo} - {row.fk_color} </option>)
                  : formData.id_rolloMdno === 'null' && !!rollosJumbo ?
                    <option value="null" disabled>📌 Primero seleccione un Rollo Mdno</option>
                    : <option value="null" disabled>✖️ No hay Rollos Jumbos Disponibles</option>
              }
            </select>
          </div>

          {/* <!-- Color Producto --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Color Producto</span>
            <input type="text" name="peso_producto" value={formData.color === 'null' ? '⏳ Pendiente por Rollo Jumbo' : formData.color} className="form-control" disabled />
          </div>

          {/* <!-- Filtro de Medición para productos --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text input-group-text-big" id="inputGroup-sizing-sm" style={{ marginBottom: '13px' }}>Medición</span>

            <button
              type='button'
              className={medidaProducto === 'kg' ? 'boton-medicion boton-medicion_select' : 'boton-medicion not-select'}
              style={{borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}}
              onClick={() => setMedidaProducto('kg')}
            >Kg</button>

            <button
              type='button'
              className={medidaProducto === 'hjs' ? 'boton-medicion boton-medicion_select' : 'boton-medicion not-select'}
              onClick={() => setMedidaProducto('hjs')}
            >Hojas</button>

            <button
              type='button'
              className={medidaProducto === 'mts' ? 'boton-medicion boton-medicion_select' : 'boton-medicion not-select'}
              onClick={() => setMedidaProducto('mts')}
            >Mts</button>

          </div>

          {/* <!-- Producto Final --> */}
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" >Producto Final</span>

            <select name="producto_final" value={formData.producto_final} onChange={handleChange} className="form-control">
              <option value="null" disabled defaultValue hidden >Seleccione un Producto 🔻</option>
              {
                !!productos && productos.length > 0 ?
                  medidaProducto === '' ?
                    <option value="null" disabled>📌 Primero seleccione una medida </option>
                    : (productos
                      .filter(f => f.unidad_medida === medidaProducto)
                      .map(row => <option key={row.id_producto} value={row.id_producto}> {row.fk_tipo_producto} - {row.fk_precio} {medidaProducto !== 'kg' && row.unidad_medida}</option>))
                  : <option value="null" disabled>✖️ No hay Productos Disponibles</option>
              }
            </select>
          </div>

          {/* <!-- Peso --> */}
          {
            medidaProducto === 'kg' &&
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm" >Peso Producto</span>
                <input type="number" name="peso_producto" value={formData.peso_producto} onChange={handleChange} className="form-control" placeholder="Kg" required />
              </div>
          }

        </Modal.Body>

        <ModalFooter click={cerrar} submit={handleSubmit} />
      </Form>
    </>
  )
}

export default CreateInvProduccion;