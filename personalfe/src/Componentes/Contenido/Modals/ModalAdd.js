import React, { Component } from 'react';
import './css/ModalAdd.css'
import { Modal,FormGroup,Form,ControlLabel,FormControl,Col} from 'react-bootstrap';

class ModalAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
       _id:0,
        nombre: '',
        apellido : '',
        usuario : '',
        edad : '',
        pais : ''
    }
}

  onChange(e){
    this.setState({[e.target.id]: e.target.value});
  }
  
  AddList(){
    var nombre = this.state.nombre;
    var apellido = this.state.apellido;
    var usuario = this.state.usuario;
    var edad = this.state.edad;
    var pais = this.state.pais;
      var persona = {
        nombre:nombre,
        apellido:apellido,
        usuario:usuario,
        edad:edad,
        pais:pais,
      }
      this.props.saveModalAdd(persona);
    }
    render() {
        return (
          <Modal id="addModal"
            {...this.props}
            bsSize="large"
            aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Agregar Persona</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form horizontal>
                   <FormGroup controlId="formHorizontalNombre">
                    <Col componentClass={ControlLabel} sm={2}>
                     Nombre
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Nombre Persona" id="nombre" onChange={(e) => this.onChange(e)} />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPantalla">
                    <Col componentClass={ControlLabel} sm={2}>
                     Apellido
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Tamaño Pantalla" id="apellido" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalCapacidad">
                    <Col componentClass={ControlLabel} sm={2}>
                      Usuario
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Capacidad"  id="usuario" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                   <FormGroup controlId="formHorizontaledaderia">
                    <Col componentClass={ControlLabel} sm={2}>
                      Edad
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="edaderia"  id="edad" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                   <FormGroup controlId="formHorizontalpais">
                    <Col componentClass={ControlLabel} sm={2}>
                      Pais
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="usuarioria pais"  id="pais" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>
                  </Form>
            </Modal.Body>
            <Modal.Footer>
            <div class="btn-group btn-group-justified" role="group" aria-label="group button">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-danger" data-dismiss="modal"  role="button" onClick={this.props.onHide}>Cancelar</button>
                    </div>
                    
                    <div class="btn-group" role="group">
                        <button type="button" id="saveImage" class="btn btn-primary btn-hover-green" data-action="save" role="button" onClick={() => this.AddList()} >Guardar</button>
                    </div>
                  </div>
            </Modal.Footer>
          </Modal>
        );
      }
  }
  export default ModalAdd;