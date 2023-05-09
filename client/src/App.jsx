import './App.css';
import ModalPopup from './ModalPopup';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const items = JSON.parse(localStorage.getItem("generatedImages") || '[]');

  const [popup, setPopup] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [savedImages, setSavedImages] = useState(items)

  const baseURL = 'http://localhost:5500'

  const handleGenerate = async () => {
    setPopup(true)
    const { data } = await axios.post(`${baseURL}/generate`, { prompt }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(data)
    setImage(data)
    setSavedImages([...savedImages, {imageLink: data}]);
  }
  const handleSave = () => {
    localStorage.setItem('generatedImages', JSON.stringify(savedImages))
  }

  return (
    <div className="App">
      {popup && <ModalPopup setPopup={setPopup} image={image} setImage={setImage} handleSave={handleSave} />}
      <h1>Generate Image using Open AI API</h1>
      <div className="chatBox">
        <input type="text" placeholder="Type descriptive prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} />
        <button className='generate-btn' onClick={handleGenerate}>Generate</button>
      </div>
      <h4>Recently saved Images</h4>
      <div className="imageGallery">
        {items && items.map((image) => {
          return <img src={image.imageLink} alt="" />
        })}
      </div>
    </div>
  );
}

export default App;
