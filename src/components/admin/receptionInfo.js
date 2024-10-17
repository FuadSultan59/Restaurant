import { useEffect, useState } from 'react';
import React from "react";
import '../../Css/admin/info.css'
import InfoModal from '../modal/infoModal';
import NotficationModal from '../modal/NotificationModal';

function InfoUser() {

    const [Email, setEmail] = useState("");
    const [info, setinfo] = useState("");
    const [header, setHeader] = useState('')
    const [Paragraph, setParagraph] = useState('')
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: null,
        Name: null,
        Email: null,
        Phone: null,
        Role: null,
        Address: null,
        CreatedAt: null
    })
    let userData = {
            
        id: null,
        Name: null,
        Email: null,
        Phone: null,
        Role: null,
        Address: null,
        CreatedAt: null
    }
 




    function HandleEmailInputChange(event)
    {
        setEmail(event.target.value);
    }

    function HandleUserInfo (event) {

        event.preventDefault(false)

        const userInfoData = {
            Email: Email
        }

 
        

        const cachedtoken = localStorage.getItem('lemon-admin');

        fetch('http://localhost:3232/user/User-info', {
  
            method: 'Post',
            headers: {
            'Authorization': `Bearer ${cachedtoken}`, 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfoData),
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data) =>{

                    if (data.message === 'found') {
                        
                        const Datas =data.data
                        Object.assign(userData, Datas)
                        setUserInfo( userData)
                        setModal(true)
                        
                    }
                    else if(data.message ==='Not_Found'){         
                        setHeader("Reception Not Found")
                        setParagraph('Reception Not Found with Email Address: ')   
                        setModal1(true)                       }
                    else if (data.message === 'invalid_token') {
                        setinfo('invalid Token!')
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


    <main className="info-container">
        <section className="left">
        <h1 style={{color: 'blue',fontWeight: 'bolder'}}> Reception <span style={{color: 'blue',fontWeight: 'bolder'}}>-Info</span></h1>
        
        </section>
        <section className="right">
        <form className='recep-info-form' type='submit' >

            <input className='recep-signup-input' type="text" placeholder="Receptionist Email" value={Email} onChange={HandleEmailInputChange} />
            
            <p style={{ color: 'red'}}>{info}</p>
            <button className="info-button" onClick={HandleUserInfo}>Info</button>


        </form>
        </section>
    </main>

    {modal && <InfoModal Data={userInfo}     onClose={()=> setModal(false)}/>}
    {modal1 && <NotficationModal header = {header} para = {Paragraph} email = {Email} onClose={()=> setModal1(false)} />}


</>

    )

}
export default InfoUser;