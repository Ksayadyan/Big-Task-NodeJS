import React, { Component } from 'react';
import Particles from 'react-particles-js'
const particleOPT = {
  particles: {
    number : {
          value : 100,
          density : {
            enable:true,
            value_area: 700
          }
        },
        
        
      }
    }
  

class ParticlesStyle extends Component {
  render() {
    return (
      <Particles  params={particleOPT}/>
    );
  }
}       

export default ParticlesStyle;
