import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Toaster } from 'sonner';
import { URI } from '../../config';
import '../../assets/styles/Usuarios.css';

import TitulosPaginas from '../molecules/TitulosPaginas';
import ItemsBar from '../organisms/ItemsBar';
// import ModalEditUser from '../organisms/modals/Updates/EditUser'
import DeleteUser from '../organisms/modals/Deletes/DeleteUser';

function Usuarios() {

    const [usuario, setUsuario] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [tipo_identicacion, setTipo_identicacion] = useState([])

    const getUsuarios = async () => {
        try {
            const usuario = await axios.get(`${URI}/usuarios`);
            const permisos = await axios.get(`${URI}/permisos`);
            const tpo_identicacion = await axios.get(`${URI}/tipo_identificacion`)

            console.log(usuario)
            setUsuario(usuario.data.data);
            setPermisos(permisos.data.data);
            setTipo_identicacion(tpo_identicacion.data.data)
        }catch(err){
            console.error(`Error ${err}`);
        }
    } 

    useEffect(() => {
        getUsuarios()
    }, []);

    const actualizarUsuarios = () => {
        getUsuarios()
    }

    return (
        <div className='conte-usu'>
            <TitulosPaginas titulo={'Usuarios'} />
            <ItemsBar Nombre={'Usuarios'} Permisos={permisos} Tipo_identicacion={tipo_identicacion} ActualizarUsuarios={actualizarUsuarios}/>
            <div>
                {
                    usuario.map((usuario, index) => (
                        <div className="bordes-usu" key={index}>
                                <div className='user-usu'>
                                    <div className='user-img'>
                                        <div>
                                            <img src={require('../../assets/imgs/user-pin-solid-120.png')} alt="User" />
                                        </div>
                                    </div>
                                    <div className='informacion'>
                                        <ul>
                                            <li><b>Alias: </b>{usuario.alias}</li>
                                            <li><b>Nombre: </b>{usuario.nombre_1} {usuario.nombre_2}</li>
                                            <li><b>Apellido: </b>{usuario.apellido_1} {usuario.apellido_2}</li>
                                        </ul>
                                    </div>
                                    <div className='permisos'>
                                    <ul>
                                        {
                                        (usuario.permisos.split(',')).map ((permisos, index) => (
                                            <li key={index}><label htmlFor={permisos}><input type="checkbox" id="insumos" checked disabled /> {permisos}</label></li>
                                        ))
                                        }
                                    </ul>
                                    </div>
                                    <div className='boton-usu'>
                                        {/* <ModalEditUser Usuario={usuario} Permisos={permisos} Tipo_identicacion={tipo_identicacion} ActualizarUsuarios={actualizarUsuarios}/> */}
                                        <DeleteUser  Usuario={usuario} ActualizarUsuarios={actualizarUsuarios}/>
                                    </div>
                                </div>
                            </div>
                    ))
                }
            </div>
            <Toaster position="top-right" richColors />
        </div>
    )
}

export default Usuarios; 
