import React, { Component } from 'react';
import './css/Header.css';
import ModalRegis from './Modals/ModalRegis'
import ModalAccder from './Modals/ModalAccder'
import { Navbar,Nav, NavItem} from 'react-bootstrap';

class Header extends Component {
    constructor(props, context) {
        super(props, context);  
        this.state = {
          lgShow: false,
          acShow:false
        };
      }
      render() {
        let lgClose = () => this.setState({ lgShow: false });
        let acClose = () => this.setState({ acShow: false });
    return (
      <div className="Header">      
       <Navbar inverse>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">controlpersonal.com</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={() => this.setState({ lgShow: true })}><span class="glyphicon glyphicon-user"></span> Registrarse</NavItem>
                    <NavItem eventKey={2} onClick={() => this.setState({ acShow: true })}><span class="glyphicon glyphicon-log-in"></span> Acceder</NavItem>
                </Nav>
                </Navbar.Collapse>
                <ModalRegis show={this.state.lgShow} onHide={lgClose} />
                <ModalAccder show={this.state.acShow} onHide={acClose} />
            </Navbar>
      </div>
    );
  }
}

export default Header;
