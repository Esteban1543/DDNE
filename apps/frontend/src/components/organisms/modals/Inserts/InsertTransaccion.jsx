import React, { useState } from "react";
import axios from "axios";
import { URI } from "../../../../config";
import { toast } from 'sonner';
import "../../../../assets/styles/modals.css";

// Importaciones Bootstrap

import BotonAgregar from "../../../molecules/BotonAgregar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalFooter from "../../../molecules/ModalFooter";
// Icono de Editar
// import Edit from "../../../assets/imgs/icons/edit.svg";
import Iconsearch from "../../../../assets/imgs/icons/search.svg";


export default function ModalAddTranscv({ eviarTipoTransaccion, recargarTabla, tipoInsumo, tipoProducto, cliente_frm, proveedor_frm }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [tipoTransaccion, setTipoTransaccion] = useState('Todos')
  
    const definirTransacion = (e) => setTipoTransaccion(e.target.value)
  
    eviarTipoTransaccion(tipoTransaccion);

     //BUSQUEDA
    const [busqueda, setBusqueda] = useState('');

    const almacenaBusqueda = (e) => {
        setBusqueda(e.target.value)
    }

    const searchComponent = () => {
        window.find(busqueda);
    }

    
    const fomulario_plantilla = {
        tipoTransaccion: '',
        tipo_factura: '',
        tipo_insumo: '',
        precio: '',
        tipo_persona: '',
        archivo: null
    }

    const [fomularioTran, setFomularioTran] = useState(fomulario_plantilla)

    const almacenarFormularioTransaccion = (e) => {
        if (e.target.name === 'archivo'){
            setFomularioTran({
                ...fomularioTran,
                [e.target.name]: e.target.files[0],
            })
            console.log(`${e.target.name}  ${e.target.files[0]}`)
            return;
        }

        setFomularioTran({
            ...fomularioTran,
            [e.target.name]: e.target.value,
        })
        // console.log(`${e.target.name}  ${e.target.value}`)
        return;
    }

    const enviarTransaccion = async (e) => {
        e.preventDefault()

        if(fomularioTran.tipoTransaccion != '' && fomularioTran.tipo_persona != '' && fomularioTran.tipo_insumo != ''){
            try{
                const formData = new FormData();
                
                // ESTRUCTURA HTTP
                formData.append('tipoTransaccion', fomularioTran.tipoTransaccion);
                formData.append('tipo_factura', fomularioTran.tipo_factura);
                formData.append('tipo_insumo', fomularioTran.tipo_insumo);
                formData.append('precio', fomularioTran.precio);
                formData.append('tipo_persona', fomularioTran.tipo_persona);
                formData.append('archivo', fomularioTran.archivo);
    
                const response = await axios.post(`${URI}/registro-transaccion`, formData, {
                    validateStatus: function (status) {
                        return status < 500; // Resuelve error solo si el código de estado es 5xx
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                
                if (!response.data.success){
                    // alert ('Se genero un error al cargar los datos!');
                    toast.error(<h6><strong>No se ha podido cargar los Datos ❌ {typeof(response.data.message) != 'object' && response.data.message }</strong></h6>)
                    console.log(response.data)
                    return;
                }
    
                // alert ('Los datos se cargaron exitosamente!');
                toast.success(<h6><strong>Registro Creado con Exito ✅</strong></h6>)
                recargarTabla()
                handleClose()
                return;
            }catch(err){
                toast.error(<h6><strong> Error al enviar los Datos ❌</strong></h6>)
                console.error(`Error al generar consulta: ${err}`);
                return;
            }
        }
        // alert('Hacen falta datos en el formulario');
        toast.info(<h6><strong>📌 Hacen falta datos en el formulario</strong></h6>)
    }

    return (
        <div className="ItemsBar">
            <div className="ItemsBarTools">
                <div>
                    <input type="search" placeholder="Buscar" onChange={almacenaBusqueda}/>
                    <button onClick={searchComponent}>
                    <img src={Iconsearch} alt="Buscar.jpg" />
                    </button>
                </div>
            </div>
            <div className="ButtonAddAction">
                <form style={{ margin: "15px 15px 0 0" }}>
                    <Form.Select size="sm"className="mb-3" defaultValue={"Todos"} onChange={definirTransacion} style={{padding:'8px 1rem', textAlign: 'left', width: '12rem', fontSize: '.9rem', fontWeight: '500'}}>
                        <option value="Todos">Todos</option>
                        <option value="Compra">Compras</option>
                        <option value="Venta">Ventas</option>
                    </Form.Select>
                    </form>
            
                    <BotonAgregar openModal={handleShow} />
                    

                    {/* MODAL */}
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text">Nueva Transacción</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={enviarTransaccion}>
                            <Form.Select size="sm"className="mb-3" defaultValue={"N/A"} name="tipoTransaccion"  onChange={almacenarFormularioTransaccion} required>
                                <option value="N/A" disabled hidden>Elija tipo transaccion</option>
                                <option value="Venta">Venta</option>
                                <option value="Compra">Compra</option>
                            </Form.Select>
                            
                            <div className="radios-estados mb-3" style={{ textAlign: "center", gridTemplateColumns: "1fr 1fr" }}>
                                <div style={{ borderRight: "1px solid black" }}>
                                    <input
                                    type="radio"
                                    name="tipo_factura"
                                    value="Remisión"
                                    id="remision"
                                    onChange={almacenarFormularioTransaccion}
                                    required
                                    />
                                    <label for="remision"> Remisión </label>
                                </div>

                                <div>
                                    <input
                                    type="radio"
                                    name="tipo_factura"
                                    value="Factura"
                                    id="factura"
                                    onChange={almacenarFormularioTransaccion}
                                    />
                                    <label for="factura"> Factura </label>
                                </div>
                            </div>
                            <Form.Select size="sm"className="mb-3" defaultValue={"N/A"} name="tipo_insumo" onChange={almacenarFormularioTransaccion} required>
                                <option value="N/A" hidden disabled>Elija articulo</option>
                                {
                                    fomularioTran.tipoTransaccion === 'Venta' ? (
                                        tipoProducto.map((producto, index) => (
                                            <option key={index} value={producto.producto}>{producto.producto}</option>
                                        ))
                                    ) : fomularioTran.tipoTransaccion === 'Compra' ? (
                                        tipoInsumo.map((insumo, index) => (
                                            <option key={index} value={insumo.nombre_insumo}>{insumo.nombre_insumo}</option>
                                        ))
                                    ) : (null)                            
                                }
                            </Form.Select>
                            
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-sm">Precio</InputGroup.Text>
                                <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="precio" onChange={almacenarFormularioTransaccion} required pattern="^\d+(\.\d+)?$" title="Por favor ingrese solo números y un punto opcional"/>
                            </InputGroup>
                            
                            <Form.Select size="sm"className="mb-3" defaultValue={"N/A"} name="tipo_persona" onChange={almacenarFormularioTransaccion} required>
                                <option value="N/A" hidden disabled>Elija persona</option>
                                {
                                    fomularioTran.tipoTransaccion === 'Venta' ? (
                                        cliente_frm.map((cliente, index) => (
                                            <option key={index} value={`${cliente.persona_id} ${cliente.fk_tipo_identificacion}`}>{cliente.nombre_empresa}</option>
                                        ))
                                    ) : fomularioTran.tipoTransaccion === 'Compra' ? (
                                        proveedor_frm.map((proveedor, index) => (
                                            <option key={index} value={`${proveedor.persona_id} ${proveedor.tipo_id}`}>{proveedor.nombre_empresa}</option>
                                        ))
                                    ) : (null)                            
                                }
                            </Form.Select>

                            <Form.Group controlId="formFile" className="mb-3" >
                                <Form.Control type="file" size="sm" name="archivo" onChange={almacenarFormularioTransaccion} required/>
                            </Form.Group>
                            
                            <ModalFooter click={handleClose} submit={enviarTransaccion} />
                            {/* <div className="boton-submit-form mb-3">
                                <Button variant="primary" type="submit">
                                    Guardar Cambios
                                </Button>
                            </div> */}
                        </Form>

                    </Modal.Body>
                    </Modal>
            </div>
      </div>
    );
  }