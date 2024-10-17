import { useState } from 'react';
import React from "react";
import '../../Css/admin/createDelete.css'
import CreatedModal from '../modal/createdModal';

function CreateAdmin() {

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [Password, setPassword] = useState("");
    const [info, setinfo] = useState("");
    const [modal, setModal] = useState("");
    const [header, setHeader] = useState("");
    const [Paragraph, setParagraph] = useState('')

    
    function HandleNameInputChange(event)
    {
        setName(event.target.value);
    }


    function HandleEmailInputChange(event)
    {
        setEmail(event.target.value);
    }

    function HandlePhoneInputChange(event)
    {
        setPhone(event.target.value);
    }

    function HandleAddressInputChange(event)
    {
        setAddress(event.target.value);

    }

    function HandlePasswordInputChange(event)
    {
        setPassword(event.target.value);
    }


    function HandleSignup (event) {
        event.preventDefault(false)

        const signupData = {
            Name: Name,
            Email: Email,
            Phone: phone,
            Pswrd: Password,
            Address: address

        }

        const cachedtoken = localStorage.getItem('lemon-admin');

        fetch('http://localhost:3232/admin/Create-Admin', {
  
            method: 'Post',
            headers: {
            'Authorization': `Bearer ${cachedtoken}`, 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data) =>{

                    if (data.message === 'email_exist') {
                        setinfo('Already Existing Email!')
                    }
                    else if(data.message ==='success'){
                        setHeader('Successfully Registered!')
                        setParagraph('Admin Succesfully Created with Email Address: ')
                        setModal(true)      
                    }
                    else if(data.message === 'invalid_token') {
                        setHeader('Invalid Token')
                        setParagraph(' Please Login Again! Failed Regestering Admin with Email: ')
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

        .catch(()=> {
            setinfo("Server Error")
        })

    }


    return (
        <>


    <main style={{width:'188%'}} className="Recption-container">
        <section className="left">
        <h1 style={{color: 'darkgreen'}}> Add<span style={{color: 'darkgreen',fontWeight: 'bolder'}}>-Admin</span></h1>
        
        </section>
        <section className="right">
        <form className='recep-signup-form' type='submit' >

            <input className='recep-signup-input' type="text" placeholder="Name" value={Name} onChange={HandleNameInputChange}/>
            <input className='recep-signup-input' type="text" placeholder="Email" value={Email} onChange={HandleEmailInputChange} />
            <input className='recep-signup-input' type="text" placeholder="Phone" value={phone} onChange={HandlePhoneInputChange} />
            <input className='recep-signup-input' type="text" placeholder="Address" value={address} onChange={HandleAddressInputChange} />
            <input className='recep-signup-input' type="password" placeholder="Password" value={Password} onChange={HandlePasswordInputChange}/>
            <p style={{ color: 'red'}}>{info}</p>
            <button className="button-green" onClick={HandleSignup}>Add</button>


        </form>
        </section>
    </main>

    {modal && <CreatedModal header = {header} para = {Paragraph} email = {Email} onClose={()=> setModal(false)} />}

</>

    )


}
export default CreateAdmin;