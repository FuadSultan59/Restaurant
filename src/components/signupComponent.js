import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import {  useNavigate } from "react-router-dom";
import '../Css/auth.css';
import React from "react";


function SignUp() {

    const navigate = useNavigate()
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [Password, setPassword] = useState("");
    const [info, setinfo] = useState("");

    
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

        fetch('http://localhost:3232/user/Create-User', {
  
            method: 'Post',
            headers: {
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
                    else if(data.message ==='valid_email'){

                        const token = data.token
                        const decodedToken = jwtDecode(token)
                        const userData = decodedToken.userCreateData
                        const signupEmail = userData.Email
                        const genratedOtp = userData.otp

                        navigate('/Signup-validation', {state: {email: signupEmail, token: token, otp: genratedOtp}})

                    }
                    else {
                        setinfo('Signup Error!')
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
            setinfo('Server Error!')
        })


    }


    return (
        <>


    <main className="Auth-container">
        <section className="left">
        <h1>signup</h1>
        
        </section>
        <section className="right">
        <form className='signup-form' type='submit' >

            <input className='signup-input' type="text" placeholder="Name" value={Name} onChange={HandleNameInputChange}/>
            <input className='signup-input' type="text" placeholder="Email" value={Email} onChange={HandleEmailInputChange} />
            <input className='signup-input' type="text" placeholder="Phone" value={phone} onChange={HandlePhoneInputChange} />
            <input className='signup-input' type="text" placeholder="Address" value={address} onChange={HandleAddressInputChange} />
            <input className='signup-input' type="password" placeholder="Password" value={Password} onChange={HandlePasswordInputChange}/>
            <p style={{ color: 'red'}}>{info}</p>
            <button className="btn btn-green" onClick={HandleSignup}>Signup</button>

            <p className="credit">Developed by:  <span >Fuad Sultan</span ></p> 

        </form>
        </section>
    </main>

</>

    )


}
export default SignUp;