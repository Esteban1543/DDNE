import React from "react";
import '../../../../assets/styles/modals.css';

// Importaciones Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

export default function ModalAddProduct() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
    return (
      <>
        {/* <Button onClick={handleShow}>
          Agregar
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="textmodal">
              Agregar Nuevo Producto
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/createproduct" method="post">
              {/* Tipo de producto */}
              <Form.Select
                size="sm"
                className="mb-3"
                name="tipo_producto"
                id="tipo-producto"
                defaultValue={"0"}
              >
                <option value="0" disabled hidden>
                  Tipo de producto
                </option>
  
                <option value="Rollo Jumbo">Rollo Jumbo</option>
                <option value="Rollito">Rollito</option>
                <option value="Resma">Resma</option>
                <option value="Vinipel">Vinipel</option>
              </Form.Select>
  
              {/* Categoria */}
              <Form.Select
                size="sm"
                className="mb-3"
                name="categoria"
                id="categoria"
                defaultValue={0}
              >
                <option value="0" disabled hidden>
                  Categoria
                </option>
  
                <option value="1">Papel Parafinado</option>
                <option value="2">Envoltura</option>
              </Form.Select>
  
              {/* Colores */}
              <div className="checks mb-3">
                <div>
                  <input
                    type="checkbox"
                    name="colores"
                    id="blanco"
                    value="Blanco"
                  />
                  <label htmlFor="blanco">Blanco</label>
                </div>
  
                <div>
                  <input
                    type="checkbox"
                    name="colores"
                    id="negro"
                    value="Negro"
                  />
                  <label htmlFor="negro">Negro</label>
                </div>
  
                <div>
                  <input
                    type="checkbox"
                    name="colores"
                    id="transparente"
                    value="Transparente"
                  />
                  <label htmlFor="transparente">Transparente</label>
                </div>
  
                <div>
                  <input
                    type="checkbox"
                    name="colores"
                    id="verde"
                    value="Verde"
                  />
                  <label htmlFor="verde">Verde</label>
                </div>
  
                <div>
                  <input type="checkbox" name="colores" id="rojo" value="Rojo" />
                  <label htmlFor="rojo">Rojo</label>
                </div>
  
                <div>
                  <input type="checkbox" name="colores" id="azul" value="Azul" />
                  <label htmlFor="azul">Azul</label>
                </div>
  
                <div>
                  <input
                    type="checkbox"
                    name="colores"
                    id="amarillo"
                    value="Amarillo"
                  />
                  <label htmlFor="amarillo">Amarillo</label>
                </div>
  
                <div>
                  <input
                    type="checkbox"
                    name="colores"
                    id="naranja"
                    value="Naranja"
                  />
                  <label htmlFor="naranja">Naranja</label>
                </div>
              </div>
  
            {/* Peso */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm" name="peso">Peso</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
  
            {/* Precio */}
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm" name="precio">Precio</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <InputGroup size="sm" className="mb-3">
  
            {/* Comentario */}
              <InputGroup.Text id="inputGroup-sizing-sm" name="comentario">Comentario</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
  
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
  
  
      </>
    );
  }