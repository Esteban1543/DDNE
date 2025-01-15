
import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';

// Styles✨
import '../../../../assets/styles/modales.css'

// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter';
import consultaPatchBackend from '../../../../helpers/consultaPatchBackend';
import { getData } from '../../../../helpers/getData';

// API ⚙️
import { URI } from '../../../../config';
const ENDPOINT = `${URI}/inv/produccion`;


function EditInvProduccion({ data_id, producto, peso_producto, actualizar }) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  //🔸 Manejo de Datos del Formulario
  const [formData, setFormData] = useState({
    producto_final: producto,
    peso_producto: peso_producto
  });

  const handleChange = (e) => {

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };


  //🔸 Envío de Datos Formulario a Backend 
  const handleSubmit = async (event) => {
    // event.preventDefault();
    // console.log(formData, data_id, color)

    const { success, message, error } = await consultaPatchBackend(event, `${ENDPOINT}/${data_id}`, formData);
    success ? (()=>{toast.success(<h6><strong>Registro Actualizado con Exito ✅</strong></h6>); actualizar(true)})() : (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })();
    // success ? (()=>{alert(message); actualizar(true)})() : (() => { console.error(error); alert(message) })();

    handleClose();
  };

  //🔸 Establecer productos disponibles 
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getData(`${URI}/productos`, setProductos);
  }, [])
  // console.log(producto)
  
  // useEffect(() => {
  //   const productosDisponibles = !!productos && productos.map(p => p.id_producto);
  //   console.log(productos);
  // }, [productos, color]);

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
          <Modal.Title >Editar Registro de Inv. Producción</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            {/* <!-- Id registro --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Registro</span>
              <input type="text" name="id1" value={data_id} className="form-control" disabled />
            </div>

            {/* <!-- Producto Final --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Producto Final</span>

              <select name="producto_final" value={formData.producto_final} onChange={handleChange} className="form-control">
                {!!productos && productos.map(row => <option key={row.producto} value={row.id_producto}> {row.fk_tipo_producto} - {row.fk_precio} {row.unidad_medida !== 'kg' && row.unidad_medida} </option>)} 
                {
                // !!idProducto && idProducto.length > 0 ?
                //     idProducto.map(row => <option key={row.id_producto} value={row.id_producto}> {row.fk_tipo_producto} - {row.fk_color} </option>)
                // : <option value="null">✖️ No hay Productos Disponibles</option>
              }
              </select>
            </div>

            {/* <!-- Peso --> */}
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Peso Producto</span>
              <input type="number" name="peso_producto" value={formData.peso_producto} onChange={handleChange} className="form-control" placeholder="Ingrese un numero" required />
            </div>

          </Modal.Body>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>
      </Modal>
    </>
  )
}

export default EditInvProduccion;
