import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Toaster } from 'sonner';
import { URI } from '../../config';
import TitulosPaginas from '../molecules/TitulosPaginas';
// import ItemsBar from '../organisms/ItemsBar';

import ModalUpdateTransacciones from '../organisms/modals/Updates/UpdateTransacciones';
import ModalAddTranscv from '../organisms/modals/Inserts/InsertTransaccion'

import '../../assets/styles/Transacciones.css';
import '../../assets/styles/tabla-principal.css'

function Transacciones() {

    const [transaccionTipo, setTransaccionTipo] = useState(null)

    //GET PAGE
    const [transaccion, setTransaccion] = useState([]);
    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);

    const getTransacciones = async () => {
        try{
            const ventas = await axios.get(`${URI}/transacciones-ventas`);
            setVentas(ventas.data.data);
            const compras = await axios.get(`${URI}/transacciones-compras`);
            setCompras(compras.data.data);
            
            // console.log(ventas.data.data)
            // console.log(compras.data.data)

            const transacciones = [...compras.data.data, ...ventas.data.data];

            const ordenDefechas = (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro);

            setTransaccion(transacciones.sort(ordenDefechas));
        }catch(err){
            console.error(`Se encontro un error: ${err}`);   
        }
    }

    //GET MODALES
    const [tipoInsumo, setTipoInsumo] = useState([])
    const [tipoProducto, setTipoProducto] = useState([])
    const [cliente_frm, setCliente_frm] = useState([])
    const [proveedor_frm, setProveedor_frm] = useState([])


    const getTipoProducto = async () => {
        try{
           const tipo_insumo = await axios.get(`${URI}/tipo_insumo`);
           const tipo_producto = await axios.get(`${URI}/tipo_productos`)
           const proveedores = await axios.get(`${URI}/proveedores`);
           const clientes = await axios.get(`${URI}/clientes`)
           setTipoProducto(tipo_producto.data.data);
           setProveedor_frm(proveedores.data.data)
           setTipoInsumo(tipo_insumo.data.data)
           setCliente_frm(clientes.data.data)
        }catch(err){
            console.error(`Error al generar consulta: ${err}`);
        }
    }

    

    useEffect(() => {
        getTransacciones();
        
        getTipoProducto()
    }, [])

    const recargarTablaTransacciones = () => {
        getTransacciones();
    } 

    return (
        <div className='cont-tran'>
            <div className='itembar-transacciones'>
                <TitulosPaginas titulo={'Transacciones'} />
                <ModalAddTranscv 
                    eviarTipoTransaccion={setTransaccionTipo} 
                    recargarTabla={recargarTablaTransacciones}
                    tipoInsumo={tipoInsumo}
                    tipoProducto={tipoProducto}
                    cliente_frm={cliente_frm}
                    proveedor_frm={proveedor_frm}
                />
            </div>
            <div className='contenido-transacciones'>
                <div className='tabla-trans section-tabla-principal'>
                    <table className='tabla-principal'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Articulo</th>
                                <th>Precio</th>
                                <th>Proveedor</th>
                                {/* <th>Descripcion</th> */}
                                <th>Tipo</th>
                                <th>Comprobante</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transaccionTipo === 'Todos' ? (
                                        transaccion.map(transaccion => (
                                        <tr key={transaccion.tp_transaccion === 'Compra' ? `CP${transaccion.id_transacciones}` : `VT${transaccion.id_transacciones}`}>
                                            {
                                                transaccion.tp_transaccion === 'Compra' ? (
                                                    <td>CP{transaccion.id_transacciones}</td>
                                                ) : transaccion.tp_transaccion === 'Venta' ? (
                                                    <td>VT{transaccion.id_transacciones}</td>
                                                ) : (null)
                                            }
                                            <td>{transaccion.tp_transaccion}</td>
                                            <td>{transaccion.fecha_registro.split('T')[0]}</td>
                                            {
                                                transaccion.tp_transaccion === 'Compra' ? (
                                                    <td>{transaccion.nombre_insumo}</td>
                                                ) : transaccion.tp_transaccion === 'Venta' ? (
                                                    <td>{transaccion.producto}</td>
                                                ) : (null)
                                            }
                                            <td>{transaccion.precio}</td>
                                            <td>{transaccion.nombre_empresa}</td>
                                            {/* <td>{transaccion.descripcion_empresa}</td> */}
                                            <td>{transaccion.doc_transaccion}</td>
                                            <td>{transaccion.comprobante}</td>
                                            
                                            <td>
                                                <ModalUpdateTransacciones
                                                    transaccion={transaccion}
                                                    tipoInsumo={tipoInsumo}
                                                    tipoProducto={tipoProducto}
                                                    cliente_frm={cliente_frm}
                                                    proveedor_frm={proveedor_frm}
                                                    recargarTabla={recargarTablaTransacciones}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : transaccionTipo === 'Venta' ? (
                                        ventas.map(transaccion => (
                                            <tr key={transaccion.id_transacciones}>
                                                <td>{transaccion.id_transacciones}</td>
                                                <td>{transaccion.tp_transaccion}</td>
                                                <td>{transaccion.fecha_registro.split('T')[0]}</td>
                                                <td>{transaccion.producto}</td>
                                                <td>{transaccion.precio}</td>
                                                <td>{transaccion.nombre_empresa}</td>
                                                {/* <td>{transaccion.descripcion_empresa}</td> */}
                                                <td>{transaccion.doc_transaccion}</td>
                                                <td>{transaccion.comprobante}</td>
                                                <td>
                                                    <ModalUpdateTransacciones
                                                        transaccion={transaccion}
                                                        tipoInsumo={tipoInsumo}
                                                        tipoProducto={tipoProducto}
                                                        cliente_frm={cliente_frm}
                                                        proveedor_frm={proveedor_frm}
                                                        recargarTabla={recargarTablaTransacciones}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                ) : transaccionTipo === 'Compra' ? (
                                        compras.map(transaccion => (
                                            <tr key={transaccion.id_transacciones}>
                                                <td>{transaccion.id_transacciones}</td>
                                                <td>{transaccion.tp_transaccion}</td>
                                                <td>{transaccion.fecha_registro.split('T')[0]}</td>
                                                <td>{transaccion.nombre_insumo}</td>
                                                <td>{transaccion.precio}</td>
                                                <td>{transaccion.nombre_empresa}</td>
                                                {/* <td>{transaccion.descripcion_empresa}</td> */}
                                                <td>{transaccion.doc_transaccion}</td>
                                                <td>{transaccion.comprobante}</td>
                                                
                                                <td>
                                                    <ModalUpdateTransacciones
                                                        transaccion={transaccion}
                                                        tipoInsumo={tipoInsumo}
                                                        tipoProducto={tipoProducto}
                                                        cliente_frm={cliente_frm}
                                                        proveedor_frm={proveedor_frm}
                                                        recargarTabla={recargarTablaTransacciones}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                ) : ( null )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default Transacciones;



