import React, { useState, useEffect } from 'react';

import '../assets/styles/Dashboard.css';
import '../assets/styles/tabla-principal.css';

import FlechaSidebar from '../components/molecules/FlechaSidaber';
import InicioCharts from '../components/templates/InicioCharts';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {

	const [comp, setComp] = useState(<InicioCharts />);

	function recibirComponente(Componente) {
		setComp(Componente);
	}

	//🔸 Apertura y Cierre del Sidebar
	const [close, setClose] = useState(false);

	function toogle() {
		setClose(!close);
	}
	
	//🔸 Manejo de sidebar de acuerdo a la pantalla
	useEffect(() => {
		function handleResize() {
			const screenWidth = window.innerWidth;
			setClose(screenWidth < 1200);
		}

		// Ejecutar la funcion de acuerdo a Resize
		window.addEventListener('resize', handleResize);

		// Dejar de escuchar el evento cuando el componente se desmonta
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='page'>
			<div className={close ? 'sidebar-page sidebar-cerrado' : 'sidebar-page'}>
				<Sidebar enviarComponente={recibirComponente} state={close} />
				<FlechaSidebar isOpen={close} toogle={toogle} />
			</div>
			<div className="content">
				{comp}
			</div>
		</div>
	)
}