import { useState } from 'react';
import React from "react";
import '../../Css/admin/info.css'
import DishInfoModal from '../modal/dishInfoModal'

function InfoDish() {

    const [Name, setName] = useState("");
    const [info, setinfo] = useState("");
    const [modal, setModal] = useState(false)
    const [dishInfo, setDishInfo] = useState({
        Name: null,
        Description: null,
        Price: null,
        Category: null,
    })
    let dishData = {
            
        Name: null,
        Description: null,
        Price: null,
        Category: null,
    }



    function HandleNameInputChange(event)
    {
        setName(event.target.value);
    }


    function HandleDishInfo (event) {

        event.preventDefault(false)

        const dishInfoData = {
            Name: Name,
        }

        const cachedtoken = localStorage.getItem('lemon-admin');

        fetch('http://localhost:3232/admin/Dish-Info', {
  
            method: 'Post',
            headers: {
            'Authorization': `Bearer ${cachedtoken}`, 
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishInfoData),
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data) =>{

                    if (data.message === 'success') {
                        setinfo('success')
                        const Datas =data.data
                        Object.assign(dishData, Datas)
                        setDishInfo( dishData)
                        setModal(true)
                    }
                    else if(data.message ==='invalid_token'){         
                        setinfo('invalid_token')
                    }
                    else if (data.message === 'Not_Found') {
                        setinfo('Not Found!')
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
            setinfo("Server Error")
        })


    }


    return (
        <>


    <main className="user-info-container">
        <section className="left">
        <h1 style={{color: 'blue',fontWeight: 'bolder'}}> Dish<span style={{color: 'blue',fontWeight: 'bolder'}}>-Info</span></h1>
        
        </section>
        <section className="right">
        <form className='recep-info-form' type='submit' >

            <input className='recep-signup-input' type="text" placeholder="Food Name" value={Name} onChange={HandleNameInputChange} />
            
            <p style={{ color: 'red'}}>{info}</p>
            <button className="info-button" onClick={HandleDishInfo}>Info</button>


        </form>
        </section>
    </main>
    {modal && <DishInfoModal Data={dishInfo}     onClose={()=> setModal(false)} />}



</>

    )


}
export default InfoDish;