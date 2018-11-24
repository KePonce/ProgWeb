import React, { Component } from 'react';
import './css/ModalEdit.css'
import { Modal,FormGroup,Form,ControlLabel,FormControl,Col} from 'react-bootstrap';

class ModalEdit extends Component {
  
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      _id:0,
        nombre: '',
        apellido : '',
        edad : '',
        usuario : '',
        pais : ''
    }
}

    componentWillReceiveProps(nextProps) {
      this.setState({
        _id: nextProps._id,
        nombre: nextProps.nombre,
        apellido: nextProps.apellido,
        edad: nextProps.edad,
        usuario: nextProps.usuario,
        pais: nextProps.pais,
      });
    }

    onChange(e){
      this.setState({[e.target.id]: e.target.value});
    }

    handleSave() {
      debugger;
      const item = this.state;

      this.props.saveModalDetails(item);
    }
    
    render() {
        return (
            <Modal
            {...this.props}
            bsSize="large"
            aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form horizontal>
                   <FormGroup controlId="formHorizontalNombre">
                    <Col componentClass={ControlLabel} sm={2}>
                     Nombre
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Nombre" value={this.state.nombre} id="nombre" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPantalla">
                    <Col componentClass={ControlLabel} sm={2}>
                     Apellido
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Apellido" value={this.state.apellido} id="apellido" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalCapacidad">
                    <Col componentClass={ControlLabel} sm={2}>
                      Edad
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Edad" value={this.state.edad} id="edad" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                   <FormGroup controlId="formHorizontalBateria">
                    <Col componentClass={ControlLabel} sm={2}>
                      Usuario
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Usuario" value={this.state.usuario} id="usuario" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                   <FormGroup controlId="formHorizontalRam">
                    <Col componentClass={ControlLabel} sm={2}>
                      Pais
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Pais" value={this.state.pais} id="pais" onChange={(e) => this.onChange(e)}/>
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
                        <button type="button" id="saveImage" class="btn btn-primary btn-hover-green" role="button" onClick={() => { this.handleSave() }} >Guardar</button>
                    </div>
                  </div>
            </Modal.Footer>
          </Modal>
        );
      }
  }
  export default ModalEdit;