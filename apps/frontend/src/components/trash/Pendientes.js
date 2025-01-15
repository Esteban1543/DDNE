

import './assets/styles/pendientes.css'

function Pendientes() {

  const lista_pendientes = [
    {
      nombre: "Formularios de Inserts",
      seccion: "Frontend",
      contabilidad: true,
      inventarios: true,
      personas: true
    },
    {
      nombre: "Formularios de Updates",
      seccion: "Frontend",
      contabilidad: false,
      inventarios: true,
      personas: false
    },
    {
      nombre: "Formularios de Deletes",
      seccion: "Frontend",
      contabilidad: false,
      inventarios: true,
      personas: false
    },
    {
      nombre: "Manejar Permisos en módulos",
      seccion: "Frontend",
      contabilidad: true,
      inventarios: true,
      personas: true
    },
    {
      nombre: "Informe de Inventarios",
      seccion: "Frontend",
      contabilidad: false,
      inventarios: false,
      personas: false
    },
    {
      nombre: "Validaciones en Formularios cliente",
      seccion: "Frontend",
      contabilidad: false,
      inventarios: true,
      personas: false
    },
    {
      nombre: "ORM - DataBase",
      seccion: "Backend",
      contabilidad: false,
      inventarios: false,
      personas: false
    },
    {
      nombre: "Validaciones en Formularios servidor",
      seccion: "Backend",
      contabilidad: false,
      inventarios: false,
      personas: false
    },
  ]

  const rows = [
    ["RF001", "Iniciar Sesión", "100%"],
    ["RF002", "Visualizar Inventario", "100%"],
    ["RF003", "Gestionar Productos", "100%"],
    ["RF004", "Gestionar inventario de insumos", "100%"],
    ["RF005", "Gestionar proveedores", "100%"],
    ["RF006", "Gestionas clientes", "100%"],
    ["RF007", "Almacenar remisiones de compras", "100%"],
    ["RF008", "Almacenar remisiones de ventas", "100%"],
    ["RF009", "Almacenar facturas de compras", "100%"],
    ["RF010", "Almacenar facturas de venta", "100%"],
    ["RF011", "Registrar precio de ventas", "100%"],
    ["RF012", "Realizar seguimiento de lote", "100%"],
    ["RF013", "Generar informe de inventario", "100%"],
    ["RF014", "Gestionar usuarios y permisos", "100%"],
    ["RF015", "Actualización de inventario en tiempo real", "100%"],
    // ["RF016", "Respaldo y recuperación", "0%"]
  ];

  return (
    <>
      <h2>Entregables Trimestre 6</h2>
      <ul>
        <li>En el proyecto se evidencia el desarrollo de la codificación al 100% 🌀</li>
        <li>En el proyecto se evidencia el consumo de la API Rest con aplicaciones móviles. ⚠️</li>
        <li>En el proyecto se evidencia la implementación de la API REST documentada (swagger u otra herramienta). 🌀</li>
        <li>En el proyecto móvil se evidencia la aplicación de una metodología ágil. (Historias de Usuario, roles, sprints, Backlog, etc)⚠️</li>
        <hr />
      </ul>

      <table className="tabla-pendiente">
        <thead>
          <tr>
            <th>N° REQUISITO FUNCIONAL</th>
            <th>DESARROLLO</th>
            <th>PORCENTAJES</th>
            <th>Avances</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.map((x, i) => (
              <tr key={i}>
                <td>{x[0]}</td>
                <td>{x[1]}</td>
                <td
                  style={x[2] === '100%' ? { background: '#6495edc9' } : x[2] < '70%' ? { background: '#f88b8b' } : null}
                >{x[2]}</td>
                <td>{x[3]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <br /><hr /><br />



      <table className="tabla-pendiente">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Sección</th>
            <th>Modulo Inventarios</th>
            <th>Modulo Contabilidad</th>
            <th>Modulo Personas</th>
          </tr>
        </thead>

        <tbody>
          {
            lista_pendientes.map((x) => (
              <tr key={x.nombre}>
                <td>{x.nombre}</td>
                <td>{x.seccion}</td>
                <td><input type="checkbox" checked={x.inventarios} /></td>
                <td><input type="checkbox" checked={x.contabilidad} /></td>
                <td><input type="checkbox" checked={x.personas} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>




      {/* TABLA MODULO INVENTIOS 📌*/}
      {/* <hr/><br/> */}

      {/* <table className="tabla-pendiente">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Inv Insumos</th>
            <th>Inv Medianos</th>
            <th>Inv Jumbo</th>
            <th>Inv Produccion</th>
            <th>Comentario</th>
          </tr>
        </thead>

        <tbody>
          {
            lista_pendientes_inv.map((x) => (
              <tr key={x.nombre}>
                <td>{x.nombre}</td>
                <td><input type="checkbox" checked={x.inv_insumos} /></td>
                <td><input type="checkbox" checked={x.inv_medianos} /></td>
                <td><input type="checkbox" checked={x.inv_jumbo} /></td>
                <td><input type="checkbox" checked={x.inv_produccion} /></td>
                <td style={{ padding: '2px', textAlign: 'left', fontSize:'12px' }}>{x.comentario}</td>
              </tr>
            ))
          }
        </tbody>
      </table> */}
    </>
  )
}

export default Pendientes