import { useState } from 'react';
import React from "react";
import '../../Css/admin/createDelete.css'
import NotficationModal from '../modal/NotificationModal';

function DeleteDish() {

    const [Name, setName] = useState("");
    const [info, setinfo] = useState("");
    const [modal, setModal] = useState(false)
    const [header, setHeader] = useState('')
    const [Paragraph, setParagraph] = useState('')


    function HandleNameInputChange(event)
    {
        setName(event.target.value);
    }


    function HandleDeleteDish (event) {

        event.preventDefault(false)

        const DeleteDishData = {
            Name: Name,
        }

        const cachedtoken = localStorage.getItem('lemon-admin');

        fetch('http://localhost:3232/admin/Delete-Dish', {
  
            method: 'Post',
            headers: {
            'Authorization': `Bearer ${cachedtoken}`, 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(DeleteDishData),
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data) =>{

                    console.log(data.message)
                    if (data.message === 'success') {
                        setinfo('Deletion success')
                        setHeader('Successfully Deleted!')
                        setParagraph('Dish Succesfully Deleted with Dish Name: ')
                        setModal(true) 
                    }
                    else if(data.message ==='Not_Found'){         
                        setinfo('Not Found')
                        setHeader('Dish Not Found!')
                        setParagraph('Dish Not Found with Name: ')
                        setModal(true)
                    }
                    else if (data.message === 'invalid_token') {
                        setinfo('Invalid Token, Please Login Again!')
                    }
                    else {
                        setinfo('Error!')
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
            setinfo("Servere Error!")
        })

    }


    return (
        <>


    <main className="Delete-User-container">
        <section className="left">
        <h1 style={{color: 'red',fontWeight: 'bolder'}}> <span style={{color: 'red',fontWeight: 'bolder'}}>Delete-</span>Dish</h1>
        
        </section>
        <section className="right">
        <form className='recep-delete-form' type='submit' >

            <input className='recep-signup-input' type="text" placeholder="Food Name" value={Name} onChange={HandleNameInputChange} />
            
            <p style={{ color: 'red'}}>{info}</p>
            <button className="Delete-button" onClick={HandleDeleteDish}>Delete</button>


        </form>
        </section>
    </main>

    {modal && <NotficationModal header = {header} para = {Paragraph} email = {Name} onClose={()=>{ setModal(false); setinfo('')}} />}

</>

    )


}
export default DeleteDish;