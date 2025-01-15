import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster } from 'sonner';
import { URI } from '../../config';
import TitulosPaginas from '../molecules/TitulosPaginas';
import ItemsBar from '../organisms/ItemsBar';

import ModalEditProduct from '../organisms/modals/Updates/ModalEditarProducto'

import '../../assets/styles/Productos.css';
import '../../assets/styles/tabla-principal.css'


function Productos() {

    const [productos, setProductos] = useState([]);

    const getDatos = async () => {
        try {
            const response = await axios.get(`${URI}/productos`)
            setProductos(response.data.data)
            console.log(response.data.data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDatos()
    }, []);

    const productosAgrupados = productos.reduce((producto_tipo, producto) => {
        const tipoProducto = producto.fk_tipo_producto;

        if (!producto_tipo[tipoProducto]) {
            producto_tipo[tipoProducto] = {
                productos: [],
                existencias: 0
            };
        }

        producto_tipo[tipoProducto].productos.push(producto);
        producto_tipo[tipoProducto].existencias++;

        return producto_tipo;
    }, {})

    const productosExistencias = Object.values(productosAgrupados);

    const actualizarProductor = () => {
        getDatos();
    }
    return (
        <div>
            <TitulosPaginas titulo={'Lista de precios'} />
            <ItemsBar Nombre={'Productos'} />
            <div className="productos-contenido">
                
                
                {
                    productosExistencias.map((producto, index) => (
                        <div className='tarjeta-Producto' key={index}>
                            <div className='contenido-pro'>
                                {/* IMAGEN PRODUCTO */}
                                <section className='section_image'>
                                    <div className='img-productos'>
                                        {/* <img src={require('../../assets/imgs/shopping-bag-solid-120.png')} alt="Producto" /> */}
                                        {producto.productos[0].fk_tipo_producto === 'Resma' && ( <img src={require('../../assets/imgs/ilustracion-resmas.png')} alt="Resma" loading='lazy'width='50%' />)}
                                        {producto.productos[0].fk_tipo_producto === 'Rollito' && ( <img src={require('../../assets/imgs/ilustracion-rollo-pequeño.png')} alt="Rollito" loading='lazy'width='50%' /> )}
                                        {producto.productos[0].fk_tipo_producto === 'Jumbo' && ( <img src={require('../../assets/imgs/ilustracion-rollo-jumbo.png')} alt="Rollo Jumbo" loading='lazy'width='50%' /> )}
                                        {producto.productos[0].fk_tipo_producto === 'Vinipel' && ( <img src={require('../../assets/imgs/ilustracion-vinipel.png')} alt="Vinipel" loading='lazy' width='40%' /> )}
                                    </div>

                                    <div className='informacion-producto'>
                                        <ul>
                                            <li><b>Producto: </b>{producto.productos[0].fk_tipo_producto}</li>
                                            {/* <li><b>Existencia: </b>{producto.existencias}</li> */}
                                            <li><b>Comentario: </b>
                                                {
                                                    producto.productos[0].comentario ? (
                                                        producto.productos[0].comentario
                                                    ) : (
                                                        'N/A'
                                                    )
                                                }
                                            </li>
                                            {/* <li><b>Precio/Peso: </b>#PROXIMAMENTE</li> */}
                                        </ul>
                                    </div>
                                </section>
                                {/* INFORMACION PRODUCTO */}
                                {/* <div className='informacion-producto'>
                                    <ul>
                                        <li><b>Producto: </b>{producto.productos[0].fk_tipo_producto}</li>
                                        <li><b>Existencia: </b>{producto.existencias}</li>
                                        <li><b>Comentario: </b>
                                            {
                                                producto.productos[0].comentario ? (
                                                    producto.productos[0].comentario
                                                ) : (
                                                    'N/A'
                                                )
                                            }
                                        </li>
                                        <li><b>Precio/Peso: </b>#PROXIMAMENTE</li>
                                    </ul>
                                </div> */}
                                
                                
                                <div className='tabla-producutos'>
                                <div className='diseño-tabla'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>ID</td>
                                                <td>MEDIDA/PESO</td>
                                                <td>PRECIO</td>
                                                {/* <td>COLOR</td> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            productos.map((pro, index) => {
                                                if(pro.fk_tipo_producto === producto.productos[0].fk_tipo_producto){
                                                    return (
                                                        <tr key={index}>
                                                            <td>{pro.id_producto}</td>
                                                            <td>{pro.fk_precio}</td>
                                                            <td>{pro.precio}</td>
                                                            {/* <td>{pro.fk_color}</td> */}
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                {/* BOTON EDITAR */}
                                <div className='editar-productos'>
                                    <ModalEditProduct Id={producto.productos[0].id_producto} Producto={producto.productos[0].fk_tipo_producto} Comentario={producto.productos[0].comentario} ActualizarProductor={actualizarProductor}/>
                                </div>
                            </div>
                            {/* TABLA DE PORDUCTOS */}
                            {/* <div className='tabla-producutos'>                                     
                                <div className='diseño-tabla'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>ID</td>
                                                <td>MEDIDA/PESO</td>
                                                <td>PRECIO</td>
                                                <td>COLOR</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            productos.map((pro, index) => {
                                                if(pro.fk_tipo_producto === producto.productos[0].fk_tipo_producto){
                                                    return (
                                                        <tr key={index}>
                                                            <td>{pro.id_producto}</td>
                                                            <td>{pro.fk_precio}</td>
                                                            <td>{pro.precio}</td>
                                                            <td>{pro.fk_color}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                        </div>
                ))    
            }
            </div>
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default Productos;