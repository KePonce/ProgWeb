import React, { Component } from 'react';
import './css/Content.css';
import ModalEdit from './Modals/ModalEdit'
import ModalAdd from './Modals/ModalAdd'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Button} from 'react-bootstrap';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
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
        edad : '',
        usuario : '',
        pais : ''
      };
    }
  async componentDidMount(){
    try {
      const response = await fetch('https://backend-224314.appspot.com/api/V1/Persona/');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      this.setState({Personas:data});
    } catch (error) {
      console.log(error);
    }
  }
  
    replaceModalItem(index,_id,nombre,apellido,edad,usuario,pais) {
      this.setState({ lgShow: true });
      this.setState({ requiredItem: index });
      this.setState({ _id: _id });
      this.setState({ nombre: nombre });
      this.setState({ apellido: apellido });
      this.setState({ edad: edad });
      this.setState({ usuario: usuario });
      this.setState({ pais: pais });
    }
  
    async saveModalDetails(item) {
      try {
        const response = await fetch('https://backend-224314.appspot.com/api/V1/Persona/', {
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
          const response = await fetch('https://backend-224314.appspot.com/api/V1/Persona/', {
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
      const response = await fetch('https://backend-224314.appspot.com/api/V1/Persona/', {
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
    const PersonList = this.state.Personas;
 
    return (
      <div className="Listado Personas">
      <button type="button" class="btn btn-info"  onClick={() => this.setState({ adShow: true })}>Agregar Nuevo</button>
             <h1 className="labelP"> Listado de Personas </h1>
                <Table  border="1">
                    <Thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Apellido</Th>
                            <Th>Edad</Th>
                            <Th>Usuario</Th>
                            <Th>Pais</Th>
                            <Th>Acciones</Th> 
                        </Tr>
                    </Thead>
                    <Tbody>
                        {PersonList.map((PersonList, _id) => (
                            <tr key={_id} id={_id}>
                                <td>
                                    {PersonList.nombre}
                                </td>
                                <td>
                                    {PersonList.apellido}
                                </td>
                                <td>
                                    {PersonList.edad}
                                </td>
                                <td>
                                    {PersonList.usuario}
                                </td>
                                <td>
                                    {PersonList.pais}
                                </td>
                                <td>
                                  <Button bsStyle="primary" onClick={() => this.replaceModalItem(_id,PersonList._id, PersonList.nombre, PersonList.apellido,
									PersonList.edad, PersonList.usuario,PersonList.pais,PersonList.img)}>Editar</Button>
                                  <Button bsStyle="danger" onClick={() => this.deleteItem(PersonList._id)}>Eliminar</Button>
                                </td>
                            </tr>

                        ))}
                    </Tbody>
                    <ModalEdit 
          _id={this.state._id}
          nombre={this.state.nombre} 
          apellido={this.state.apellido}
          edad={this.state.edad}
          usuario={this.state.usuario}
          pais={this.state.pais} 
          show={this.state.lgShow} 
          onHide={lgClose}
          saveModalDetails={this.saveModalDetails} />
          <ModalAdd 
          saveModalAdd={this.saveModalAdd} 
          show={this.state.adShow} 
          onHide={adclose} />    
                </Table>
        </div>  
    );
  }
}

export default Content;
