import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

import TitulosPaginas from '../molecules/TitulosPaginas';
import ItemsBar from '../organisms/ItemsBar';
import ModalFooter from '../molecules/ModalFooter';
// import Showinforms from '../organisms/modals/Inserts/ShowInform';

import '../../assets/styles/Inventarios.css';

function InformeInventario() {
  const [show, setShow] = useState(true);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const inicilState = {
  desde: undefined,
  hasta: undefined,
  tipo_informe: undefined,
}

const [tableData, setTableData] = useState([]);

const url = 'http://localhost:5000/generarInfInv';

const [formData, setFormData] = useState(inicilState);

const handleChange = (e) => {
setFormData((prevdata) => ({
  ...prevdata,
  [e.target.name] :e.target.value,
}));
};

const showInforIns = async (e) => {
e.preventDefault();

// console.log(formData);

try {
  const response = await axios.post(`${url}`, formData)
  // console.log(response.data);

  if (response.data.success) {
    setTableData(response.data.data);
    alert('Se ha generado el informe correctamente');
    handleClose();
  } else {
    alert('No se ha podido generar el informe');
    handleClose();
  }
} catch (error) {
  alert('Error al enviar datos')
}

}
  return (
    <>
      <TitulosPaginas titulo={"Informe de Inventarios"} />
      <ItemsBar />
      {/* <Showinforms /> */}
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ position: "absolute", right: 70, top: 100 }}
      >
        Generar Informe
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Informe de inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <section>
              <div className="div-form-date">
                <label
                  htmlFor="desde"
                  className="text labels_fechas"
                  // style={{ marginRight: "30px" }}
                >
                  Fecha Inicial:
                </label>
                <input
                  type="date"
                  name="desde"
                  id="desde"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-form-date">
                <label htmlFor="hasta" className="text labels_fechas">
                  Fecha Limite:
                </label>
                <input
                  type="date"
                  name="hasta"
                  id="hasta"
                  onChange={handleChange}
                  required
                />
              </div>
            </section>
            <div className="select-inf">
              <Form.Select
                size="sm"
                className=""
                name="tipo_informe"
                id="tipo_informe"
                onChange={handleChange}
                style={{
                  marginTop: "10px",
                  position: "relative",
                  rigth: "10px",
                  padding: '.6rem',
                  marginBottom: '0px'
                }}
                required
              >
                <option
                  value="null"
                  disabled
                  selected
                  hidden
                  onChange={handleChange}
                >
                  Seleccion de Informe
                </option>

                <option value="1">Insumos</option>
                <option value="2">Produccion</option>
              </Form.Select>
            </div>
          </Form>
        </Modal.Body>

        <ModalFooter click={handleClose} submit={showInforIns} />
      </Modal>

      <section className="section-tabla-principal">
        <table className="tabla-principal">
          <thead>
            <tr>
              {formData.tipo_informe === "1" ? (
                <>
                  <th>Tipo Insumo</th>
                  <th>Unidades</th>
                  <th>Peso Insumo</th>
                  <th>Estado</th>
                  <th>Proveedor</th>
                  <th>Usuario</th>
                </>
              ) : formData.tipo_informe === "2" ? (
                <>
                  <th>Producto</th>
                  <th>Color</th>
                  <th>Cantidad</th>
                  <th>Usuario</th>
                  <th>Fecha Registro</th>
                </>
              ) : (
                <th>No hay registros de inventario</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {formData.tipo_informe === "1" ? (
                  <>
                    <td>{row.fk_tipo_insumo}</td>
                    <td>{row.unidades}</td>
                    <td>{row.peso_insumo}</td>
                    <td>{row.fk_estado}</td>
                    <td>{row.nombre_empresa}</td>
                    <td>{row.alias}</td>
                  </>
                ) : formData.tipo_informe === "2" ? (
                  <>
                    <td>{row.Producto}</td>
                    <td>{row.Color}</td>
                    <td>{row.Cantidad}</td>
                    <td>{row.Usuario}</td>
                    <td>
                      {formData.tipo_informe === "2" ? (
                        <>
                          {!!row["Fecha Registro"] && row["Fecha Registro"].split("T")[0]}
                        </>
                      ) : null}
                    </td>
                  </>
                ) : (
                  <td>...</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default InformeInventario