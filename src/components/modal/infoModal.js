import React from 'react'
import '../../Css/Modals/modals.css'
import {  FaUser, FaSearchLocation, FaPhone, FaSignal, FaPersonBooth, FaHotel, FaMailBulk, FaPlusCircle, FaUserPlus, FaInfoCircle, FaSyncAlt} from 'react-icons/fa';


function InfoModal ( {Data, onClose}) {


    return (
        

        <div className="Modalpopup">
        <div className="infopopup-content">
          <h1 className='popupHeading'> <FaInfoCircle />&nbsp; Info.. </h1>

          <h2 style={{textAlign:'center', color: 'black'}}> <FaUser /> {Data.Role.toUpperCase()}</h2>
          
          <p className='infopopupText'>
           <span><FaUser />&nbsp; Name:</span> {Data.Name} 
          </p>

          <p className='infopopupText'>
           <span> <FaMailBulk/>&nbsp;Email:</span> {Data.Email} 
          </p>

          <p className='infopopupText'>
          <span><FaPhone />&nbsp; Phone:</span> {Data.Phone} 
          </p>

          <p className='infopopupText'>
          <span><FaSearchLocation /> &nbsp;Address:</span> {Data.Address} 
          </p>

          <p className='infopopupText'>
          <span><FaSignal />&nbsp; Account Created On:</span> {Data.CreatedAt.slice(0,10)} 
          </p>
<br></br>
          <button className ="closeBtnn" onClick={onClose} >Close</button>
        </div>
        </div> 


    )
}

export default InfoModal;