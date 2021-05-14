import React from 'react';
import Tilt from 'react-parallax-tilt';
import Brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
      <div className='ma4 mt0'>
         <Tilt className="Tilt br3 shadow-2" tiltMaxAngleX={40} tiltMaxAngleY={40} style= {{ width:'150px', height:'140px' }}>
            <div className="Tilt-inner pa3">
            <img sytle={{ paddingTop: '5px', width: '100%', height:'100%' }} src={Brain} alt="Did not load"/>
            </div>
         </Tilt>
      </div>
  );
}

export default Logo;     