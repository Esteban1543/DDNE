import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner';
import { URI } from '../../config';
import TitulosPaginas from '../molecules/TitulosPaginas';
import ItemsBar from '../organisms/ItemsBar';
import ModalEditProver from '../organisms/modals/Updates/EditProvider';
import DeleteProvider from '../organisms/modals/Deletes/DeleteProver';

import '../../assets/styles/Proveedores.css';

function Clientes() {

    const [proveedores, setProveedores] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch(`${URI}/proveedores`)
            .then(response => response.json())
            .then(data => {
                setProveedores(data.data);
            }
            )
            .catch(error => {
                console.error('Error al traer la informacion:', error);
            });
    }, [reload]);

    const zctualizar = () => {
        // setReload(!reload);
        setReload(Math.random());
    }

    const user_proveedor = proveedores.map(proveedores => (
        <div className="bordes-pro" key={proveedores.persona_id}>
            <div className="user-pro">
                <div className='pro-img'>
                    <div>
                        <img src={require('../../assets/imgs/user-circle-regular-120.png')} alt="" />
                    </div>
                </div>
                <div className='informacion-pro'>
                    <ul>
                        <li><b>Nombres: </b>{`${proveedores.nombre_1} ${proveedores.nombre_2}`}</li>
                        <li><b>Apellidos: </b>{`${proveedores.apellido_1} ${proveedores.apellido_2}`}</li>
                        <li><b>Telefono: </b>{proveedores.telefono}</li>
                        <li><b>Direccion: </b>{proveedores.correo}</li>
                        <li><b>Empresa: </b>{proveedores.nombre_empresa}</li>
                    </ul>
                </div>
                <div className='boton-pro'>
                    <ModalEditProver
                        data_id={proveedores.persona_id}
                        nombres={`${proveedores.nombre_1} ${proveedores.nombre_2}`}
                        apellidos={`${proveedores.apellido_1} ${proveedores.apellido_2}`}
                        telefono={proveedores.telefono}
                        direccion={proveedores.direccion}
                        correo={proveedores.correo}
                        nit={proveedores.NIT}
                        nombre_empresa={proveedores.nombre_empresa}
                        desc_empresa={proveedores.descripcion_empresa}
                        reload={zctualizar}
                    />
                    <DeleteProvider
                        data_id={proveedores.persona_id}
                        titulo={proveedores.nombre_empresa}
                        reload={zctualizar}
                    />
                </div>
            </div>
        </div>
    ))

    return (
        <div className="conte-pro">
            <TitulosPaginas titulo={'Proveedores'} />
            <ItemsBar Nombre={'Proveedores'}
                actualizarpro={() => setReload(!reload)}
            />
            {user_proveedor}
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default Clientes;