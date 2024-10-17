import React from 'react'
import '../../Css/Modals/modals.css'
import {  FaUtensils, FaMailBulk,  FaInfoCircle , FaMoneyBill, FaList, FaPenFancy} from 'react-icons/fa';


function DishInfoModal ( {Data, onClose}) {


    return (
        

        <div className="Modalpopup">
        <div className="dishinfopopup-content">
          {/* <h1 className='popupHeading'> <FaInfoCircle />&nbsp; Info.. </h1> */}

          <h2 style={{textAlign:'center', color: 'black'}}> <FaUtensils /> {Data.Category.toUpperCase()}</h2>
          <br></br>
          
          <p className='infopopupText'>
           <span><FaUtensils />&nbsp; Food Name:</span> {Data.Name} 
          </p>

          <p className='infopopupText'>
           <span> <FaPenFancy/>&nbsp;Description:</span> {Data.Description} 
          </p>

          <p className='infopopupText'>
          <span><FaMoneyBill />&nbsp; Price:</span> {Data.Price}  birr
          </p>

          <p className='infopopupText'>
          <span><FaList /> &nbsp;Category:</span> {Data.Category} 
          </p>

<br></br>
          <button className ="closeBtnn" onClick={onClose} >Close</button>
        </div>
        </div> 


    )
}

export default DishInfoModal;