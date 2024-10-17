import { useState } from 'react';
import React from "react";
import '../../Css/admin/createDelete.css'
import NotficationModal from '../modal/NotificationModal';

function DeleteUser() {

    const [Email, setEmail] = useState("");
    const [info, setinfo] = useState("");
    const [modal, setModal] = useState("");
    const [header, setHeader] = useState("");
    const [Paragraph, setParagraph] = useState('')



    function HandleEmailInputChange(event)
    {
        setEmail(event.target.value);
    }


    function HandleDelete (event) {

        event.preventDefault(false)

        const DeleteData = {
            Email: Email,
        }

        const cachedtoken = localStorage.getItem('lemon-admin');

        fetch('http://localhost:3232/user/Delete-User', {
  
            method: 'Post',
            headers: {
            'Authorization': `Bearer ${cachedtoken}`, 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(DeleteData),
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data) =>{

                    if (data.message === 'success') {
                        setHeader('Successfully Deleted!')
                        setParagraph('User Succesfully Deleted with Email Address: ')
                        setModal(true)
                    }
                    else if(data.message ==='Not_Found'){  
                        setHeader("USer Not Found")
                        setParagraph('User Not Found with Email Address: ')   
                        setModal(true)    
                    }
                    else if (data.message === 'invalid_token') {
                        setHeader('Invalid Token')
                        setParagraph(' Please Login Again! Failed Deleting Email: ')
                        setModal(true)
                    }
                    else if (data.message === 'admin'){
                        setHeader('It Is Not User! ')
                        setParagraph('The account You are trying to delete is Admin, with Email:')
                        setModal(true)
                    }
                    else if (data.message === 'reception'){
                        setHeader('It Is Not User! ')
                        setParagraph('The account You are trying to delete is Reception, with Email: ')
                        setModal(true)
                    }
                    else {
                        setinfo("Error!")
                    }

                })

            }
            else {
                response.json().then((errorData) => {
                    setinfo(errorData.message[0])
                })
            }
            
        })

        .catch(()=>{
            setinfo('Server Error!')
        })


    }


    return (
        <>


    <main className="Delete-User-container">
        <section className="left">
        <h1 style={{color: 'red',fontWeight: 'bolder'}}> <span style={{color: 'red',fontWeight: 'bolder'}}>Delete-</span>User</h1>
        
        </section>
        <section className="right">
        <form className='recep-delete-form' type='submit' >

            <input className='recep-signup-input' type="text" placeholder="User Email" value={Email} onChange={HandleEmailInputChange} />
            
            <p style={{ color: 'red'}}>{info}</p>
            <button className="Delete-button" onClick={HandleDelete}>Delete</button>


        </form>
        </section>
    </main>

    {modal && <NotficationModal header = {header} para = {Paragraph} email = {Email} onClose={()=> setModal(false)} />}

</>

    )


}
export default DeleteUser;