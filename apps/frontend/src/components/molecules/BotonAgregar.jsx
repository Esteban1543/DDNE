function BotonAgregar({ openModal }) {

  return (
    <button
      onClick={() => openModal(true)}
      className="boton-agregar"
    >

      {/* <img
        src={require('../../assets/imgs/icons/plus-icon.svg').default}
        alt="Añadir.jpg"
      />       */}

      Agregar
    </button>
  )
}

export default BotonAgregar;