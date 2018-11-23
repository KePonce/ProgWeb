import React, { Component } from 'react';
import './css/Content.css';
import ModalEdit from './Modals/ModalEdit'
import ModalAdd from './Modals/ModalAdd'
import { Button, Col, Row, Grid, Thumbnail, FormGroup, Form, ControlLabel, FormControl} from 'react-bootstrap';
class Content extends Component {
  constructor(props, context) {
      super(props, context);  
      this.replaceModalItem = this.replaceModalItem.bind(this);
      this.saveModalDetails = this.saveModalDetails.bind(this);
      this.saveModalAdd = this.saveModalAdd.bind(this);
      this.state = {
        Personas: [],
        requiredItem: 0,
        lgShow: false,
        adShow: false,
        _id: 0,
        nombre: '',
        apellido : '',
        usuario : '',
        edad : '',
        pais : ''
      };
    }
  async componentDidMount(){
    try {
      const response = await fetch('http://localhost:3001/api/V1/Persona/');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      this.setState({Personas:data.persons});
    } catch (error) {
      console.log(error);
    }
  }
  
    replaceModalItem(index,_id,nombre,apellido,usuario,edad,pais) {
      this.setState({ lgShow: true });
      this.setState({ requiredItem: index });
      this.setState({ _id: _id });
      this.setState({ nombre: nombre });
      this.setState({ apellido: apellido });
      this.setState({ usuario: usuario });
      this.setState({ edad: edad });
      this.setState({ pais: pais });
    }
  
    async saveModalDetails(item) {
      try {
        const response = await fetch('http://localhost:3001/api/V1/Persona/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.componentDidMount();
        this.setState({ lgShow: false });
      } catch (error) {
        console.log(error);
      }
    }

    async saveModalAdd(item) {
        try {
          const response = await fetch('http://localhost:3001/api/V1/Persona/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        this.componentDidMount();
        this.setState({ adShow: false });
      } catch (error) {
        console.log(error);
      }
    }
  
    async deleteItem(index) {
      const response = await fetch('http://localhost:3001/api/V1/Persona/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:index})
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.componentDidMount();
    }

  render() {
    let lgClose = () => this.setState({ lgShow: false });
    let adclose = () => this.setState({ adShow: false });
    const Persons = this.state.Personas;
    const requiredItem = this.state.requiredItem;
    let modalData = this.state.Personas[requiredItem];
    return (
      <Grid >
        <button type="button" class="btn btn-info btn-lg btn-block"  onClick={() => this.setState({ adShow: true })}>Agregar Nuevo</button>
        <hr />
        <Row>
          <Col>   
            {Persons.map((Persons, _id) => (
            <Thumbnail key={_id} id={_id}>
                <h3>{Persons.nombre}</h3>
                
                <Form horizontal>
                <div class="col-sm-6 CentrarInfo">
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={3}>
                     Apellido
                    </Col>
                    <Col sm={9}>
                      <FormControl type="text" placeholder="Apellido" value={Persons.apellido} disabled/>
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={3}>
                      Usuario
                    </Col>
                    <Col sm={9}>
                      <FormControl type="text" placeholder="Usuario"  value={Persons.usuario} disabled/>
                    </Col>
                  </FormGroup>

                   <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={3}>
                      Edad
                    </Col>
                    <Col sm={9}>
                      <FormControl type="text" placeholder="Edad"  value={Persons.edad} disabled/>
                    </Col>
                  </FormGroup>

                   <FormGroup controlId="formHorizontalRam">
                    <Col componentClass={ControlLabel} sm={3}>
                      Pais
                    </Col>
                    <Col sm={9}>
                      <FormControl type="text" placeholder="Pais"  value={Persons.pais} disabled/>
                    </Col>
                  </FormGroup>
                  </div>
              </Form>
              <div className="Centrar">    
                  <p>
                  <Button bsStyle="primary" onClick={() => this.replaceModalItem(_id,Persons._id, Persons.nombre, Persons.apellido,
                    Persons.usuario, Persons.edad,Persons.pais)}>Editar</Button>
                  &nbsp;
                  <Button bsStyle="default" onClick={() => this.deleteItem(Persons._id)}>Eliminar</Button>
                 </p> 
              </div>               
              </Thumbnail>))}
              </Col>
              </Row>
        <ModalEdit 
          _id={this.state._id}
          nombre={this.state.nombre} 
          apellido={this.state.apellido}
          usuario={this.state.usuario}
          edad={this.state.edad}
          pais={this.state.pais} 
          show={this.state.lgShow} 
          onHide={lgClose}
          saveModalDetails={this.saveModalDetails} />
          <ModalAdd 
          saveModalAdd={this.saveModalAdd} 
          show={this.state.adShow} 
          onHide={adclose} />
          </Grid>       
    );
  }
}

export default Content;
