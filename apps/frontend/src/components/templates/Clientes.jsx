import React, { useEffect, useState } from 'react'
import { Toaster } from 'sonner';
import '../../assets/styles/Clientes.css';
import TitulosPaginas from '../molecules/TitulosPaginas';
import ItemsBar from '../organisms/ItemsBar';
import { URI } from '../../config';
import ModalEditClient from '../organisms/modals/Updates/EditClient';
import DeleteModal from '../organisms/modals/Deletes/DeleteClient';

function Proveedores() {

    const [clientes, setClientes] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch(`${URI}/clientes`)
            .then(response => response.json())
            .then(data => {
                setClientes(data.data);
            }
        )
        .catch(error => {
            console.error('Error al traer la informacion:', error);
        });
    }, [reload]);

    const zctualizar = () => {
        // setReload(!reload)
        setReload(Math.random());
    }


    const user_cliente = clientes.map (clientes => (
        <div className="bordes-cli" key={clientes.persona_id}>
                <div className="user-cli">
                    <div className='cli-img'>
                        <div>
                            <img src={require('../../assets/imgs/user-circle-solid-120.png')} alt="" />
                        </div>
                    </div>
                    <div className='informacion-cli'>
                        <ul >
                            <li><b>Nombre: </b>{clientes.nombre_1} {clientes.nombre_2}</li>
                            <li><b>Apellido: </b>{clientes.apellido_1} {clientes.apellido_2}</li>
                            <li><b>Telefono: </b>{clientes.telefono}</li>
                            <li><b>Direccion: </b>{clientes.correo}</li>
                            <li><b>Empresa: </b>{clientes.nombre_empresa}</li>
                        </ul>
                    </div>
                    <div className='boton-cli'>
                        <ModalEditClient 
                            id={clientes.persona_id}
                            nombres= {`${clientes.nombre_1} ${clientes.nombre_2 === null ? '' : clientes.nombre_2}`}
                            apellidos={`${clientes.apellido_1} ${clientes.apellido_2 === null ? '' : clientes.apellido_2}`}
                            telefono={clientes.telefono}
                            direccion={clientes.direccion}
                            email={clientes.correo}
                            nit={clientes.nit}
                            empresa={clientes.nombre_empresa}
                            desc_empresa={clientes.descripcion_empresa}
                            reload={zctualizar}
                        />
                        <DeleteModal 
                            data_id={clientes.persona_id}
                            titulo={clientes.nombre_empresa}
                            reload={zctualizar}
                        />
                    </div>
                </div>
            </div>
    ))

    return (
        <div className="conte-cli">
            <TitulosPaginas titulo={'Clientes'} />
            <ItemsBar Nombre={'Clientes'} 
                actualizarcli={() => setReload(!reload)}
            />
            {user_cliente}
            <Toaster position="top-right" richColors />
        </div>
  )
}

export default Proveedores;