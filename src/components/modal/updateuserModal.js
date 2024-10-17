import React from 'react'
import '../../Css/Modals/modals.css'
import {  FaInfoCircle, FaSyncAlt, FaTrash} from 'react-icons/fa';


function UpdateUserModal ( {user, onClose}) {


    return (
      
        <>

     <div className="Modalpopup">
         <div className="userUpdate-content">
         <h3 className='xclose-btn' onClick={onClose}>X</h3>

            <h2 style={{textAlign:'center', color: 'yellow'}}>My Account</h2> 
            <br></br>

            Name:
            <p>
              {user.Name}
            </p> 
            Email:
            <p>
            {user.Email}
            </p> 
            Phone:
            <p>
            {user.Phone}
            </p>
            Address: 
            <p>
            {user.Address}
            </p>

                <br></br>


        </div>
        </div> 




        
        </>



    )
}

export default UpdateUserModal;