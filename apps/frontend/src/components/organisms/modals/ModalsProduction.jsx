import { useState, useEffect } from 'react';
import { Modal} from 'react-bootstrap';

import BotonAgregar from '../../molecules/BotonAgregar';
import CreateRolloMediano from './Inserts/CreateRolloMediano';
import CreateRolloJumbo from './Inserts/CreateRolloJumbo';
import CreateInvProduccion from './Inserts/CreateInvProduccion';

function ModalsProduction({actualizar, modal}) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    
    if (modal === 'seguimiento'){      
      setTimeout(() => {
        setInicial(true)
        setContenido(<ModalInicial/>)
      }, 1000);
    }
  };

  //🔸 Contenido Inicial 
  const ModalInicial = () => {
    return (
      <>
        <Modal.Header>
          <Modal.Title >Modales Inv. Producción</Modal.Title>
        </Modal.Header>

        <Modal.Body className='modales-produccion'>

          <section onClick={modalMedianos}>
            <i>
              <img src={require('../../../assets/imgs/inv-medianos.png')} alt="icon" />
            </i>
            <h4> Impresión</h4>
          </section>

          <section onClick={modalJumbos}>
            <i>
              <img src={require('../../../assets/imgs/inv-jumbos.png')} alt="icon" />
            </i>
            <h4>Parafinado</h4>
          </section>

          <section onClick={modalProduccion}>
            <i>
              <img src={require('../../../assets/imgs/inv-produccion.png')} alt="icon" />
            </i>
            <h4> Producción</h4>
          </section>

        </Modal.Body>

      </>
    )
  }

  const [contenido, setContenido] = useState(<ModalInicial />);
  const [inicial, setInicial] = useState(true);

  //🔸 Funciones para Cambio de Modal
  const modalMedianos = () => {
    setContenido(<CreateRolloMediano cerrar={handleClose} actualizar={()=> actualizar(true)} />); 
    setInicial(false);
  }

  const modalJumbos = () => {
    setContenido(<CreateRolloJumbo cerrar={handleClose} actualizar={()=> {actualizar(true)}} />); 
    setInicial(false);
  }

  const modalProduccion = () => {
    setContenido(<CreateInvProduccion cerrar={handleClose} actualizar={()=> {actualizar(true)}} />); 
    setInicial(false);
  }  

  const handleModal = () => {
    if (modal === 'medianos') {
      modalMedianos();
    } else if (modal === 'jumbos') {
      modalJumbos();
    } else if (modal === 'produccion') {
      modalProduccion();
    } else {
      setContenido(<ModalInicial />);
    }
  };

  useEffect(() => handleModal , [modal]);
  

  return (
    <>
      <BotonAgregar openModal={handleShow} />

      <Modal show={show} onHide={handleClose}>

        {
          modal === 'seguimiento' &&
          <i><img
            className={inicial ? 'hide button-back' : 'button-back'}
            onClick={() => {
              setContenido(<ModalInicial />);
              setInicial(true)
            }}
            src={require('../../../assets/imgs/back1.png')}
            alt="volver atrás" />            
          </i>
        }

        {contenido}

      </Modal>

    </>
  )
}

export default ModalsProduction