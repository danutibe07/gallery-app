import React, { useState } from 'react';
import Title from '../Components/Title';
import SelectFiles from '../Components/SelectFiles';
import Images from '../Components/Images';
import Modal from '../Components/Modal';


function Homepage() {
  const [selectedImage , setSelectedImage] = useState(null)
  return (
    <div className="App">
      <Title/>
      <SelectFiles />
      <Images  setSelectedImage={setSelectedImage}/>
      {selectedImage && <Modal  selectedImage = {selectedImage} setSelectedImage={setSelectedImage}/>}
    </div>
  );
}

export default Homepage;