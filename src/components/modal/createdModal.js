import React from 'react'
import '../../Css/Modals/modals.css'
import {  FaUser, FaSearchLocation, FaPhone, FaSignal, FaPersonBooth, FaHotel, FaMailBulk, FaPlusCircle, FaUserPlus, FaInfoCircle, FaSyncAlt, FaTrash} from 'react-icons/fa';


function CreatedModal ( {header, para, email, onClose}) {


    return (
        

        <div className="Modalpopup">
        <div className="Created-content">

          <h2 style={{textAlign:'start', color: 'Green'}}>  {header}</h2>
          <br></br>
          <p style={{ color:'green'}}>
            {para} <span style={{color:'blue', fontWeight:'bold'}}>{email}</span> 
          </p>

            <br></br>

          <button className ="closeBtnn" onClick={onClose} >Close</button>
        </div>
        </div> 


    )
}

export default CreatedModal;