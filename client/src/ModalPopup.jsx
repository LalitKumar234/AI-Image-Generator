import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const ModalPopup = ({ setPopup, image, setImage, handleSave }) => {

  const saveImage = () => {
    setPopup(false)
    handleSave()
    setImage('')
  }
  return (
    <div className="popupOverlay" onClick={() => setPopup(false)}>
      <div className='popUp'>
        {
          image ? <img src={image} alt="" /> : 
          <div className='spinner-container'>
            <InfinitySpin
            width='200'
            color="#61dafb"
          />
          </div>
        }


        <div className="popupFooter">
          <button className='save-btn' onClick={saveImage}>Save</button>
        </div>

      </div>
    </div>
  )
}

export default ModalPopup