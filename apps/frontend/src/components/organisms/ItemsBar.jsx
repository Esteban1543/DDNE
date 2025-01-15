import React, { useState, useEffect } from "react";
import "../../assets/styles/ItemsBar.css";
import Iconsearch from "../../assets/imgs/icons/search.svg";
import { handleSearch } from "../../helpers/BusquedaObjetos";

import ModalAddProduct from "./modals/Inserts/CreateProduct";
import CreateInvInsumo from "./modals/Inserts/CreateInvInsumo";
import ModalsProduction from "./modals/ModalsProduction";

// Formularios "Persona"
import ModalAddProver from "./modals/Inserts/CreateProvider";
import ModalAddClient from "./modals/Inserts/CreateClient";
import ModalAddUser from "./modals/Inserts/CreateUser";

function ItemsBar({registros_busqueda, actualizar_registros, Nombre, actualizar, actualizarcli, actualizarpro, Permisos, Tipo_identicacion, ActualizarUsuarios }) {

  const [ModalRender, setModalRender] = useState(null);

  useEffect(() => {
    // Lógica para determinar qué modal renderizar
    switch (Nombre) {

      case 'Inventario de Insumos':
        setModalRender(<CreateInvInsumo actualizar={() => actualizar(true)} />);
        break;

      case 'Produccion':
        setModalRender(<ModalsProduction actualizar={() => actualizar(true)} modal='seguimiento' />);
        break;

      case 'Medianos':
        setModalRender(<ModalsProduction actualizar={() => actualizar(true)} modal='medianos' />);
        break;

      case 'Jumbo':
        setModalRender(<ModalsProduction actualizar={() => actualizar(true)} modal='jumbos' />);
        break;

      case 'Inventario de Produccion':
        setModalRender(<ModalsProduction actualizar={() => actualizar(true)} modal='produccion' />);
        break;

      // Falta la logica para que cambie de "ventas" a "compras"
      case 'Productos':
        setModalRender(<ModalAddProduct />);
        break;

      case 'Proveedores':
        setModalRender(<ModalAddProver actualizarpro={() => actualizarpro(true)} />);
        break;

      case 'Usuarios':
        setModalRender(<ModalAddUser Permisos={Permisos} Tipo_identicacion={Tipo_identicacion} ActualizarUsuarios={ActualizarUsuarios} />);
        break;

      case 'Clientes':
        setModalRender(<ModalAddClient actualizarcli={() => actualizarcli(true)} />);
        break;

      default:
        setModalRender(null);
        break;
    }
  }, [Nombre, actualizar, actualizarcli, actualizarpro, Permisos, Tipo_identicacion, ActualizarUsuarios]);


  //BUSQUEDA
  const [busqueda, setBusqueda] = useState('');

  const almacenaBusqueda = (e) => {
    setBusqueda(e.target.value)
  }
  const searchComponent = async () => {
    if(!!registros_busqueda) {
      // console.log('Procesando busqueda en ItemBars ⏳');
      const result_busqueda = await handleSearch(busqueda, registros_busqueda);
      actualizar_registros(result_busqueda);
    }
    window.find(busqueda);
  }

  return (
    <nav className="ItemsBar">

      <div className="ItemsBarTools">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input type="search" placeholder="Buscar" onChange={almacenaBusqueda} />
            <button onClick={searchComponent} >
              <img src={Iconsearch} alt="Buscar" />
            </button>
          </div>
        </form>
      </div>

      <div className="ButtonAddAction">
        {ModalRender}
      </div>

    </nav>
  );
}

export default ItemsBar;