import React from "react";
import "../../../../assets/styles/modals.css";
import axios from "axios";
import { URI } from "../../../../config";
// Importaciones Bootstrap
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ModalFooter from "../../../molecules/ModalFooter";


export default function Showinforms() {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const inicilState = {
    desde: undefined,
    hasta: undefined,
    tipo_informe: undefined,
  }

const url = `${URI}/generarInfInv`;

const [formData, setFormData] = useState(inicilState);

const handleChange = (e) => {
  setFormData((prevdata) => ({
    ...prevdata,
    [e.target.name] :e.target.value,
  }));
};

const showInforIns = async (e) => {
  e.preventDefault();

  console.log(formData);

  try {
    const response = await axios.post(`${url}`, formData)
    console.log(response.data);

    if (response.data.success) {
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
        <Button variant="primary" onClick={handleShow} style={{position: 'absolute', right: 70, top: 100}}>
        Generar Informe 
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Informe de inventario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <Form>
            <section>
              <div className="div-form-date">
              <label
                    htmlFor="desde"
                    className="text"
                    style={{ marginRight: "30px" }}
                  >
                    De:
                  </label>
                  <input type="date" name="desde" id="desde" onChange={handleChange} required/>
              </div>
              <div className="div-form-date">
              <label htmlFor="hasta" className="text">
                    Hasta:
                  </label>
                  <input type="date" name="hasta" id="hasta" onChange={handleChange} required/>
              </div>
            </section>
            <div className="select-inf">
              <Form.Select
                  size="sm"
                  className="mb-3"
                  name="tipo_informe"
                  id="tipo_informe"
                  onChange={handleChange}
                  style={{marginTop: "10px", position: "relative", rigth: "10px"}}
                  required
                >
                  <option value="null" disabled selected hidden onChange={handleChange}>
                    Seleccion de Informe
                  </option>
  
                  <option value="1">Insumos</option>
                  <option value="2">Inventario</option>

                </Form.Select>
              </div>
          </Form>

           
          </Modal.Body>

          <ModalFooter click={handleClose} submit={showInforIns} />

        </Modal>
        {/* <ItemsBar /> */}
      </>
    );
  }
  