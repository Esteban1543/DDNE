import React, { useState } from "react";
import { toast } from 'sonner';
import axios from "axios";
import { URI } from "../../../../config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Icono de Editar
import Edit from "../../../../assets/imgs/icons/edit.svg";

function ModalDeleteTransacciones({transaccion, tipoInsumo, tipoProducto, cliente_frm, proveedor_frm, recargarTabla}){

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [datosTransaccion, setDatosTransaccion] = useState({
        id: transaccion.id_transacciones,
        tp_transaccion: transaccion.tp_transaccion,
        doc_transaccion: transaccion.doc_transaccion,
        articulo: transaccion.tp_transaccion === 'Venta' ? transaccion.producto : transaccion.nombre_insumo,
        persona: `${transaccion.persona_id} ${transaccion.fk_tipo_identificacion}`,
        precio: transaccion.precio,
    })

    const almacenarActualizacionProdcutos = (e) => {
        setDatosTransaccion({
            ...datosTransaccion,
            [e.target.name] : e.target.value,
        })
        console.log(`${e.target.name}: ${e.target.value}`)
    }

    const actualizarTransaccion = async () => {
        try{
            const response = await axios.put(`${URI}/update_Transacciones`, datosTransaccion);
            console.log(response.data);
            toast.success(<h6><strong>Registro Actualizado con Exito ✅</strong></h6>)
            recargarTabla()
            handleClose()
        }catch(err){
          toast.error(<h6><strong>Error al Enviar los Datos ❌</strong></h6>)
          console.error(err);
        }
    }

    return (
        <div>
            <Button onClick={handleShow} variant="secundary" style={{padding: '0'}}>
                <img src={Edit} alt='Editar.jpg' width='28px'/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text">Editar Tipo:{transaccion.tp_transaccion} ID:{transaccion.id_transacciones} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Select size="sm"className="mb-3" defaultValue={transaccion.tp_transaccion} name="tp_transaccion">
                            <option value={transaccion.tp_transaccion} hidden>{transaccion.tp_transaccion}</option>
                        </Form.Select>
                        
                        <div className="radios-estados mb-3" style={{ textAlign: "center", gridTemplateColumns: "1fr 1fr" }}>
                            <div style={{ borderRight: "1px solid black" }}>
                                <input
                                type="radio"
                                name="doc_transaccion"
                                value="Remisión"
                                id="remision"
                                defaultChecked={transaccion.doc_transaccion === 'Remisión'}
                                onChange={almacenarActualizacionProdcutos}
                                />
                                <label htmlFor="remision"> Remisión </label>
                            </div>

                            <div>
                                <input
                                type="radio"
                                name="doc_transaccion"
                                value="Factura"
                                id="factura"
                                defaultChecked={transaccion.doc_transaccion === 'Factura'}
                                onChange={almacenarActualizacionProdcutos}
                                />
                                <label htmlFor="factura"> Factura </label>
                            </div>
                        </div>
                        <Form.Select size="sm"className="mb-3" name="articulo" defaultValue={transaccion.tp_transaccion === 'Venta' ? transaccion.producto : transaccion.nombre_insumo} onChange={almacenarActualizacionProdcutos}>
                            <option value="N/A" hidden>Elija articulo</option>
                            {
                                transaccion.tp_transaccion === 'Venta' ? (
                                    tipoProducto.map((producto, index) => (
                                        <option key={index} value={producto.producto}>{producto.producto}</option>
                                    ))
                                ) : transaccion.tp_transaccion === 'Compra' ? (
                                    tipoInsumo.map((insumo, index) => (
                                        <option key={index} value={insumo.nombre_insumo}>{insumo.nombre_insumo}</option>
                                    ))
                                ) : (null)                            
                            }
                        </Form.Select>

                        <Form.Select size="sm"className="mb-3" name="persona" defaultValue={transaccion.tp_transaccion === 'Venta' ? `${transaccion.persona_id} ${transaccion.fk_tipo_identificacion}`:`${transaccion.persona_id} ${transaccion.fk_tipo_identificacion}`} onChange={almacenarActualizacionProdcutos}>
                            <option value="N/A" hidden>Elija persona</option>
                            {
                                transaccion.tp_transaccion === 'Venta' ? (
                                    cliente_frm.map((cliente, index) => (
                                        <option key={index} value={`${cliente.persona_id} ${cliente.fk_tipo_identificacion}`}>{cliente.nombre_empresa}</option>
                                    ))
                                ) : transaccion.tp_transaccion === 'Compra' ? (
                                    proveedor_frm.map((proveedor, index) => (
                                        <option key={index} value={`${proveedor.persona_id} ${proveedor.tipo_id}`}>{proveedor.nombre_empresa}</option>
                                    ))
                                ) : (null)                            
                            }
                        </Form.Select>
                        
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Precio</InputGroup.Text>
                            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="precio" defaultValue={transaccion.precio} onChange={almacenarActualizacionProdcutos}/>
                        </InputGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="primary" onClick={actualizarTransaccion}>
                        Guardar Cambios
                        </Button>
                    </Modal.Footer>
                    </Modal>
        </div>
    );
  }

  export default ModalDeleteTransacciones;