import React, { Component } from 'react';
import './css/ModalRegis.css'
import { Modal,FormGroup,Form,ControlLabel,FormControl,Col} from 'react-bootstrap';

class ModalRegis extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        email : '',
        pass : '',
    }
}

  onChange(e){
    this.setState({[e.target.id]: e.target.value});
  }
  
    render() {
        return (
          <Modal
            {...this.props}
            bsSize="large"
            aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Registrarse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form horizontal>
                   <FormGroup controlId="formHorizontalUser">
                    <Col componentClass={ControlLabel} sm={2}>
                     Usuario
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Usuario" id="user" onChange={(e) => this.onChange(e)} />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                     Correo
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="Correo" id="email" onChange={(e) => this.onChange(e)}/>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPass">
                    <Col componentClass={ControlLabel} sm={2}>
                      Contraseña
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Contaseña"  id="pass" onChange={(e) => this.onChange(e)}/>
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
                        <button type="button" id="saveImage" class="btn btn-primary btn-hover-green" data-action="save" role="button" onClick={this.props.onHide} >Registrarse</button>
                    </div>
                  </div>
            </Modal.Footer>
          </Modal>
        );
      }
  }
  export default ModalRegis;