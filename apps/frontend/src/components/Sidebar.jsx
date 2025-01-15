import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URI } from '../config';

import InicioCharts from './templates/InicioCharts';

import Usuarios from './templates/Usuarios';
import Clientes from './templates/Clientes';
import Proveedores from './templates/Proveedores';

import Productos from './templates/Productos';
import Transacciones from './templates/Transacciones';
import InformeInventario from './templates/InformeInventario';

import InventarioInsumos from './templates/InventarioInsumos';
import ControlProduccion from './templates/ControlProduccion';
import SeguimientoLote from './templates/SeguimientoLote';

import '../assets/styles/Sidebar.css';

function Sidebar(props) {
	const [claseContenidoI, setClaseContenidoI] = useState('oculto');
	const [claseContenidoC, setClaseContenidoC] = useState('oculto');

	const toggleContabilidad = () => {
		setClaseContenidoC(claseContenidoC === 'visible' ? 'oculto' : 'visible');
	};

	const toggleInventario = () => {
		setClaseContenidoI(claseContenidoI === 'visible' ? 'oculto' : 'visible');
	}

	//ENVIO DE COMPONENTES
	const handleClick = (componente) => {
		props.enviarComponente(componente);
	};

	const sesionActiva = JSON.parse(sessionStorage.getItem('user_session'));

	// console.log(sesionActiva.username)

	//🔸 Renderizar de acuerdo a permisos asignados
	const permisosDB = !!sesionActiva && JSON.parse(sessionStorage.getItem('user_session')).allowed;
	const permisos = !!sesionActiva && permisosDB.split(',');

	//🔸 Eliminar Información al Cerrar Sesión en Frontend y Backend
	const redirect = useNavigate();

	function removeSession() {
		sessionStorage.removeItem('user_session');

		axios.post(`${URI}/cerrar-sesion`)
			.then(response => {
				if (response.data.success) {
					console.log('Sesión cerrada exitosamente');
					redirect('/');
				} else {
					console.error('Error al cerrar sesión:', response.data.message);
					alert('Error al Cerrar Sesión');
				}
			})
			.catch(error => {
				console.error('Error en la llamada a la API:', error);
				alert('Error en la llamada a la API:');
			});
	}
	// console.log(props.state)

	// 🔸Mostrar Sub-menus flotantes
	const [hoverInicio, setHoverInicio] = useState(false);
	const [hoverInventarios, setHoverInventarios] = useState(false);
	const [hoverContabilidad, setHoverContabilidad] = useState(false);
	const [hoverProveedores, setHoverProveedores] = useState(false);
	const [hoverClientes, setHoverClientes] = useState(false);
	const [hoverUsuarios, setHoverUsuarios] = useState(false);

	return (
		<div className='sidebar'>

			<div className='icono-sidebar'>
				<div className='name-logo'>
					<i><img src={require('../assets/imgs/doughnut-chart-solid-24.png')} alt='Logo' /></i>
					<span>DDNE</span>
				</div>
			</div>

			<div className='opciones-sidebar'>

				<div className='opciones'
					onClick={() => handleClick(<InicioCharts key={Math.random()} />)}
					onMouseEnter={() => setHoverInicio(true)}
					onMouseLeave={() => setHoverInicio(false)}
				>
					<i><img src={require('../assets/imgs/icons/home-alt-2-regular-24.png')} alt="Home" width='30px' /></i>
					<span>Inicio</span>
					{
						props.state && hoverInicio && (
							<ul className="submenus-float"
								onMouseEnter={() => setHoverInicio(true)}
								onMouseLeave={() => setHoverInicio(false)}
							>

								<li
									className='titulo-float_li' >
									<p>Inicio</p>
								</li>
							</ul>
						)
					}
				</div>

				<section style={{ position: 'relative' }}>
					<div className='opciones drop1' onClick={!props.state ? toggleInventario : undefined}
						onMouseEnter={() => setHoverInventarios(true)}
						onMouseLeave={() => setHoverInventarios(false)}
					>
						<i><img src={require('../assets/imgs/icons/book-solid-24.png')} alt="Book" width='30px' /></i>
						<span>Inventario</span>
						<i hidden={props.state ? true : false}><img src={require('../assets/imgs/chevron-down-regular-22.png')} alt="arrow-down" /></i>
					</div>

					<div id='inventario' className={`inventario ${!props.state ? claseContenidoI : 'oculto'}`} >
						<div className='opciones submenu'
							style={!permisos.includes('Insumos') ? { cursor: 'not-allowed', opacity: '.5' } : null}
							onClick={() => permisos.includes('Insumos') && handleClick(<InventarioInsumos key={Math.random()} />)}
						>
							<span>Control Insumos</span>
						</div>

						<div className='opciones submenu'
							style={!permisos.includes('Produccion') ? { cursor: 'not-allowed', opacity: '.5' } : null}
							onClick={() => permisos.includes('Produccion') && handleClick(<ControlProduccion key={Math.random()} />)}
						>
							<span>Control Produccion</span>
						</div>

						<div className='opciones submenu'
							style={!permisos.includes('Produccion') ? { cursor: 'not-allowed', opacity: '.5' } : null}
							onClick={() => permisos.includes('Produccion') && handleClick(<SeguimientoLote key={Math.random()} />)}
						>
							<span>Seguimiento de Lote</span>
						</div>
					</div>

					{/* Sub-menu Flotante Inventarios*/}
					{
						props.state && hoverInventarios && (
							<ul className="submenus-float"
								onMouseEnter={() => setHoverInventarios(true)}
								onMouseLeave={() => setHoverInventarios(false)}
							>
								<li
									style={{borderBottom: '0.5px solid #cccccc96', marginBottom: '10px', paddingBottom: '5px'}}
									className='titulo-float_li' >
									<p>Inventarios</p>
								</li>

								<li
									style={!permisos.includes('Insumos') ? { cursor: 'not-allowed', opacity: '.5' } : null}
									onClick={() => permisos.includes('Insumos') && handleClick(<InventarioInsumos key={Math.random()} />)}
									className='submenu-float_li' >
									<small>Control Insumos</small>
								</li>

								<li
									style={!permisos.includes('Produccion') ? { cursor: 'not-allowed', opacity: '.5' } : null}
									onClick={() => permisos.includes('Produccion') && handleClick(<ControlProduccion key={Math.random()} />)}
									className='submenu-float_li' >
									<small>Control Produccion</small>
								</li>

								<li
									style={!permisos.includes('Produccion') ? { cursor: 'not-allowed', opacity: '.5' } : null}
									onClick={() => permisos.includes('Produccion') && handleClick(<SeguimientoLote key={Math.random()} />)}
									className='submenu-float_li' >
									<small>Seguimiento de Lote</small>
								</li>
							</ul>
						)
					}
				</section>

				<section style={{ position: 'relative' }}>
					<div className='opciones drop2' onClick={!props.state ? toggleContabilidad : undefined}
						onMouseEnter={() => setHoverContabilidad(true)}
						onMouseLeave={() => setHoverContabilidad(false)}
					>
						<i><img src={require('../assets/imgs/icons/buildings-solid-24.png')} alt="Buildings" width='29px' /></i>
						<span>Contabilidad</span>
						<i hidden={props.state ? true : false}><img src={require('../assets/imgs/chevron-down-regular-22.png')} alt="arrow-down" /></i>
					</div>

					<div id='contabilidad' className={`contabilidad ${!props.state ? claseContenidoC : 'oculto'}`}>

						<div className='opciones submenu'
							style={!permisos.includes('Informes') ? { cursor: 'not-allowed', opacity: '.5' } : null}
							onClick={() => permisos.includes('Informes') && handleClick(<InformeInventario key={Math.random()} />)}
						>
							<span>Informe inventario</span>
						</div>

						<div className='opciones submenu'
							style={!permisos.includes('Transacciones') ? { cursor: 'not-allowed', opacity: '.5' } : null}
							onClick={() => permisos.includes('Transacciones') && handleClick(<Transacciones key={Math.random()} />)}
						>
							<span>Transacciones</span>
						</div>

						<div className='opciones submenu'
							style={!permisos.includes('Productos') ? { cursor: 'not-allowed', opacity: '.5' } : null}
							onClick={() => permisos.includes('Productos') && handleClick(<Productos key={Math.random()} />)}
						>
							<span>Productos</span>
						</div>
					</div>

					{/* Sub-menu Flotante Contabilidad*/}
					{
						props.state && hoverContabilidad && (
							<ul className="submenus-float"
								onMouseEnter={() => setHoverContabilidad(true)}
								onMouseLeave={() => setHoverContabilidad(false)}
							>
								<li
									className='titulo-float_li' 
									style={{borderBottom: '0.5px solid #cccccc96', marginBottom: '10px', paddingBottom: '5px'}}
								>									
									<p>Contabilidad</p>
								</li>

								<li
									style={!permisos.includes('Informes') ? { cursor: 'not-allowed', opacity: '.5' } : null}
									onClick={() => permisos.includes('Informes') && handleClick(<InformeInventario key={Math.random()} />)}
									className='submenu-float_li'>
									<small>Informe inventario</small>
								</li>

								<li
									style={!permisos.includes('Transacciones') ? { cursor: 'not-allowed', opacity: '.5' } : null}
									onClick={() => permisos.includes('Transacciones') && handleClick(<Transacciones key={Math.random()} />)}
									className='submenu-float_li'>
									<small>Transacciones</small>
								</li>

								<li
									style={!permisos.includes('Productos') ? { cursor: 'not-allowed', opacity: '.5' } : null}
									onClick={() => permisos.includes('Productos') && handleClick(<Productos key={Math.random()} />)}
									className='submenu-float_li'>
									<small>Productos</small>
								</li>
							</ul>
						)
					}
				</section>

				<div className='opciones'
					style={!permisos.includes('Proveedores') ? { cursor: 'not-allowed', opacity: '.5' } : null}
					onClick={() => permisos.includes('Proveedores') && handleClick(<Proveedores key={Math.random()} />)}
					onMouseEnter={() => setHoverProveedores(true)}
					onMouseLeave={() => setHoverProveedores(false)}
				>
					<i><img src={require('../assets/imgs/icons/user-solid-24.png')} alt="User-solid" width='29px' /></i>
					<span>Proveedores</span>
					{
						props.state && hoverProveedores && (
							<ul className="submenus-float"
								onMouseEnter={() => setHoverProveedores(true)}
								onMouseLeave={() => setHoverProveedores(false)}
							>							
								<li
									style={!permisos.includes('Proveedores') ? { cursor: 'not-allowed'} : null}
									className='titulo-float_li' >
									<p>Proveedores</p>
								</li>
							</ul>
						)
					}
				</div>

				<div className='opciones'
					style={!permisos.includes('Clientes') ? { cursor: 'not-allowed', opacity: '.5' } : null}
					onClick={() => permisos.includes('Clientes') && handleClick(<Clientes key={Math.random()} />)}
					onMouseEnter={() => setHoverClientes(true)}
					onMouseLeave={() => setHoverClientes(false)}
				>
					<i><img src={require('../assets/imgs/icons/user-regular-24.png')} alt="User-regular" width='28px' height='26px' /></i>
					<span>Clientes</span>
					{
						props.state && hoverClientes && (
							<ul className="submenus-float"
								onMouseEnter={() => setHoverClientes(true)}
								onMouseLeave={() => setHoverClientes(false)}
							>

								<li
									style={!permisos.includes('Clientes') ? { cursor: 'not-allowed'} : null}
									className='titulo-float_li' >
									<p>Clientes</p>
								</li>
							</ul>
						)
					}
				</div>

				<div className='opciones'
					style={!permisos.includes('Usuarios') ? { cursor: 'not-allowed', opacity: '.5' } : null}
					onClick={() => permisos.includes('Usuarios') && handleClick(<Usuarios key={Math.random()} />)}
					onMouseEnter={() => setHoverUsuarios(true)}
					onMouseLeave={() => setHoverUsuarios(false)}
				>
					<i><img src={require('../assets/imgs/icons/user-circle-solid-24.png')} alt="User-circle" width='29px' /></i>
					<span>Usuarios</span>
					{
						props.state && hoverUsuarios && (
							<ul className="submenus-float"
								onMouseEnter={() => setHoverUsuarios(true)}
								onMouseLeave={() => setHoverUsuarios(false)}
							>

								<li
									style={!permisos.includes('Usuarios') ? { cursor: 'not-allowed'} : null}
									className='titulo-float_li' >
									<p>Usuarios</p>
								</li>
							</ul>
						)
					}
				</div>
			</div>

			<div className='sesion-sidebar'>
				<div className='sesion' style={props.state ? { gridTemplateColumns: '1fr' } : null}>
					<div className='sesion-imagen' hidden={props.state ? true : false}>
						<i><img src={require('../assets/imgs/icons/user-rectangle-solid-24.png')} alt="Persona" /></i>
					</div>
					<div className='sesion-persona' hidden={props.state ? true : false}>
						<span className='nombre-sesion'>{sesionActiva.names}</span>
						<span>{sesionActiva.username}</span>
					</div>
					<div className='sesion-cerrar' onClick={removeSession} style={{ cursor: 'pointer' }}>
						<i><img src={require('../assets/imgs/icons/exit-solid-243.png')} alt="Logout" /></i>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Sidebar;
