import React, { Component } from 'react';

import Header from './Contenido/Header';
import Content from './Contenido/Content';
import Footer from './Contenido/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">      
        <Header />  
        <Content />  
        <Footer />  
      </div>
    );
  }
}

export default App;
