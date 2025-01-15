import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Componentes🎗️
import BotonAgregar from '../../../molecules/BotonAgregar.jsx';
import ModalFooter from '../../../molecules/ModalFooter';

// Funciones 📌
import consultaPostBackend from '../../../../helpers/consultaPostBackend';
import { getData } from '../../../../helpers/getData.js';
import { form_inv_insumos } from '../../../../schemas/inventarios.js'

// API ⚙️
import { URI } from '../../../../config.js';
const ENDPOINT = `${URI}/inv/insumos`;


function CreateInvInsumo({ actualizar }) {
  const [show, setShow] = useState(false);

  //🔸 Funcionamiento del Modal en Pantalla 
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //🔸 Manejo de Datos del Formulario
  const idUser = JSON.parse(sessionStorage.getItem('user_session')).id_user;
  
  const initialState = {
    fk_n_transaccion: 'null',
    consecutivo: '',
    tipo_insumo: 'null',
    peso: '',
    estado: 'En Espera',
    unidades: '',
    fecha_planificada: '2024-02-11',
    proveedor: 'null',
    idUser: parseInt(idUser),
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: (name === 'peso' || name === 'unidades') && value.trim() !== '' && !isNaN(value) ? parseFloat(value) : value.trim(),
    }));
  };

  //🔸 Datos de Input consecutivo
  useEffect(() => {

    const consecutivoInput = () => {
      setFormData((prevData) => ({
        ...prevData,
        consecutivo: formData.tipo_insumo === 'Papel' ? '' : 'N/A'
      }))
    }
    consecutivoInput()
  }, [formData.tipo_insumo]);
 

  //🔸 Validación y Envío de Datos Formulario a Backend 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validacion = form_inv_insumos.safeParse(formData);

      if (validacion.success) {
        const { success, message, error } = await consultaPostBackend(event, ENDPOINT, formData);
        // success ? alert(message) : (() => { console.error(error); alert(message) })();
        success ? toast.success(<h6><strong>Registro Creado con Exito ✅</strong></h6>) :  (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })() ;

        handleClose();
        setFormData(initialState);
        actualizar(true);
        console.log('Paso verificación !✅');
        return
      }

      const errores = JSON.parse(validacion.error)
      const mensajes_error = errores.map(i => i.path).join('\n');
      
      console.log('Datos Incorrectos en Formulario ❌', mensajes_error);
      
      alert(`❌ Datos Incorrectos en:  ${mensajes_error} `);

    } catch (error) {
      alert('Error en Verificación de Formulario ❌');
      console.error('Error de validación: ', error.errors);
    }
  };


  //🔸 Consulta para Select (Proveedores) 
  const [allProviders, setAllProviders] = useState([]);
  const [provider, setProvider] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    getData(`${URI}/proveedores`, setAllProviders);
    getData(`${URI}/transacciones-compras`, setTransacciones);
  }, [])

    //🔸 Asignar Proveedor de Acuerdo a la Ref. de Transacciones
  useEffect(() => {
    // 🔹 Resetear Proveedor al cambiar el valor del input
    // setFormData((prevData)=>({
    //   ...prevData,
    //   proveedor : 'null'
    // }))
    
    const transaccion_selec = transacciones.filter( r => r.id_transacciones === parseInt(formData.fk_n_transaccion) );
    const proveedor_transaccion = transaccion_selec.length > 0 && transaccion_selec[0].nombre_empresa;
    const filtrar_proveedor = allProviders.filter( pr => pr.nombre_empresa === proveedor_transaccion );
    setProvider(filtrar_proveedor);

    // console.log('transaccion_selec >> ',proveedor_transaccion)
    // console.log('filtro provider ',filtrar_proveedor)
    const set_id_provider = filtrar_proveedor.length > 0 && filtrar_proveedor[0].persona_id +'.'+ filtrar_proveedor[0].tipo_id
    // console.log(set_id_provider)

    setFormData((prevData)=>({
      ...prevData,
      proveedor: set_id_provider
    }))

  }, [formData.fk_n_transaccion, allProviders, transacciones])


  return (
    <>

      <BotonAgregar openModal={handleShow} />

      <Modal show={show} onHide={handleClose}>

        <Modal.Header>
          <Modal.Title >Registro Inv. Insumos</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            {/* <!-- Ref Transacción --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >N° Transacción</span>

              <select name="fk_n_transaccion" value={formData.fk_n_transaccion} onChange={handleChange} className="form-control " required>
                <option value="null" disabled defaultValue hidden >Seleccione el N° de Transacción 🔻</option>
                {
                  !!transacciones && transacciones.length > 0 ? transacciones.map((row) => (
                    <option key={row.id_transacciones} value={row.id_transacciones}>{`N° ${row.id_transacciones} - ${row.tp_transaccion} de ${row.nombre_insumo}`}</option>
                  )) : <option value="none" disabled>✖️ No hay Transacciones disponibles</option>
                }
              </select>
            </div>

            {/* <!-- Proveedor --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Proveedor</span>
              <input type="text" name="proveedor" value={provider.length > 0 ? provider[0].nombre_empresa : '⏳ Pendiente'} className="form-control" required disabled/>

              {/* <select name="proveedor" value={formData.proveedor} onChange={handleChange} id="proveedor" className="form-control " required>
                <option value="null" disabled defaultValue hidden >Seleccione un Proveedor 🔻</option>
                {
                  !!provider && provider.length > 0 ? provider.map((row) => (
                    <option key={`${row.persona_id}.${row.tipo_id}`} value={`${row.persona_id}.${row.tipo_id}`}>{row.nombre_empresa}</option>
                  )) : <option value="none" disabled>✖️ No hay Proveedores disponibles</option>
                }
              </select> */}
            </div>

            {/* <!-- Tipo de Insumo --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Tipo de Insumo</span>

              <select name="tipo_insumo" value={formData.tipo_insumo} onChange={handleChange} id="tipo-insumo" className="form-control " >
                <option value="null" disabled defaultValue hidden >Seleccione un tipo de insumo 🔻</option>
                {/* Para hacer dinamica esta seccion, se deberia considerar el poder agregar un insumo desde el frontend porque actualmente no se puede hacer. */}
                <option value="Parafina">Parafina</option>,
                <option value="Papel">Papel</option>,
                <option value="Rollo Carton">Rollo Carton</option>
              </select>
            </div>

            {/* <!-- Consecutivo --> */}
            {
              formData.tipo_insumo === 'Papel' ?
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm" >Consecutivo</span>
                  <input type="text" id="consecutivo" name="consecutivo" value={formData.consecutivo} onChange={handleChange} className="form-control place-left" placeholder="PP3A0231046140" required />
                </div>
                : null
            }            

            {/* <!-- Recepcion Planificada --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Recepcion Planificada</span>
              <input type="date" id="fecha-planificada" name="fecha_planificada" value={formData.fecha_planificada} onChange={handleChange} className="form-control place-left" required />
            </div>

            {/* <!-- Estado --> */}
            <div className="input-group input-group-sm mb-3" style={{ gap: "15px" }}>
              <span className="input-group-text input-group-text-big" id="inputGroup-sizing-sm" >Estado</span>

              <div className='radios-estados' style={{ textAlign: "center" }}>

                <div>
                  <input type="radio" name="estado" id="pendiente" value="En Espera" onChange={handleChange} checked={formData.estado.includes("En Espera")} required />
                  <label htmlFor="pendiente" > Pendiente </label>
                </div>

                <div style={{ borderLeft: "1px solid black", borderRight: "1px solid black" }}>
                  <input type="radio" name="estado" id="entregado" value="Recibido" onChange={handleChange} checked={formData.estado.includes("Recibido")} required disabled/>
                  <label htmlFor="entregado" > Entregado </label>
                </div>

                <div>
                  <input type="radio" name="estado" id="cancelado" value="Cancelado" onChange={handleChange} checked={formData.estado.includes("Cancelado")} required disabled/>
                  <label htmlFor="cancelado" > Cancelado</label>
                </div>

              </div>

            </div>

            {/* <!-- Peso --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Peso</span>
              <input type="text" id="peso" name="peso" value={formData.peso} onChange={handleChange} className="form-control" placeholder="Kg" required />
            </div>
            
            {/* <!-- Unidades --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Unidades</span>
              <input type="text" id="unds" name="unidades" value={formData.unidades} onChange={handleChange} className="form-control" required />
            </div>

          </Modal.Body>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>

    </>
  )
}


export default CreateInvInsumo;