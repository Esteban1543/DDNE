
// Componentes 🎗️
import HomeCharts from '../organisms/HomeCharts.jsx';
import '../../assets/styles/inicio-charts.css'


function InicioCharts() {

  //🔸 Datos de Usuario para Dashboard
  const user_active = JSON.parse(sessionStorage.getItem('user_session'));
  // console.log(user_active);

  //🔸 Fecha Pc
  const fecha_actual = new Date().toISOString().split("T")[0];
  

  return (
    <div className="container-inicio">
      <section className="row rows-inicio">
        <article className="col cont-inf">

          <div className="perfil">
            <img src={require('../../assets/imgs/user-circle-regular-121.png')} alt="User" />
          </div>

          <div className="datos-general">
            <ul>
              <li><b>Nombres: </b> {user_active ? user_active.names : 'No Disponible'}</li>
              <li><b>Estado: </b>Activo</li>
              <li><b>Usuario activo: </b>{user_active ? user_active.username : 'No Disponible'}</li>
              <li><b>Fecha: </b>{fecha_actual}</li>
              {/* <li><b>Stock: </b>***</li> */}
            </ul>
          </div>

        </article>
      </section>

      <HomeCharts/>
    </div>
  )
}

export default InicioCharts;