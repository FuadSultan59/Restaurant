import React from 'react'
import '../../Css/Modals/modals.css'
import {  FaUser, FaSearchLocation, FaPhone, FaSignal, FaPersonBooth, FaHotel, FaMailBulk, FaPlusCircle, FaUserPlus, FaInfoCircle, FaSyncAlt, FaTrash} from 'react-icons/fa';


function NotficationModal ( {header, para, email, onClose}) {


    return (
        

        <div className="Modalpopup">
        <div className="Notfication-content">

          <h2 style={{textAlign:'start', color: 'red'}}>  {header}</h2>
          <br></br>
          <p >
            {para} <span style={{color:'red', fontWeight:'bold'}}>{email}</span> 
          </p>

            <br></br>

          <button className ="closeBtnn" onClick={onClose} >Close</button>
        </div>
        </div> 


    )
}

export default NotficationModal;