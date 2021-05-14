import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
      <React.Fragment>
      <p className='f3'> 
        {'This Magic Brain will detect faces in your picture. Give it a try'}
      </p>
      <div className='Center'>
         <div className='form Center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
          <button className='w-30 grow f4 link pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button> 
      </div>
      </div>
      </React.Fragment>
  );
}

export default ImageLinkForm;