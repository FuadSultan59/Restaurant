import { useState } from "react";
import { useLocation } from "react-router-dom";
import '../Css/auth.css';
import React from "react";


function SignupValidationComponent () {

    const location = useLocation();
    const userEmail = location.state?.email || ''
    const signupToken = location.state?.token  || null 
    const signupOtp = location.state?.otp || ''
    const [validationKey, setValidationKey] = useState('')
    const [info, setInfo]= useState('')


    function HandleValidationInputChange (event) {
        setValidationKey(event.target.value)
    }


    function HandleValidation (event) {

        event.preventDefault(false)

        const validationData = {
            Verfication: validationKey
        }


        fetch('http://localhost:3232/user/Validate-Signup', {

        method: 'Post',
        headers: {  
        'Authorization': `${signupToken}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationData),
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data)=>{
                    if(data.message === 'invalid_token'){
                        setInfo('Vrefication Code Expired, Please Signup Again!')
                    }

                    else if (data.message === 'correct') {
                        setInfo('✅CREATED SUCCESSFULLY!')
                    }
                    else if (data.message === 'incorrect') {
                        setInfo('Incorect Verfication Code!')
                    }
                    else {
                        setInfo('Error!')
                    }
                })
            }
            else {
                response.json().then((errorData)=>{
                    setInfo(errorData.message[0])
                })
            }
        })

        .catch(()=>{
            setInfo("Server Error!")
        })

    }


    return(

        <main className="Auth-container">
    
            <section className="left">
                     <h1>Validation</h1>
            </section>
    
    
            <section className="right">
                <form className="signup-form" type='submit'>
    
                    <p style={{color: 'darkblue',marginBottom:'6%', fontSize: 'bolder'}}>email address: <span style={{color: 'green'}}>{userEmail}</span> <br></br> Verfication code<span style={{color: "red"}}> ONLY VALID FOR 3 minutes</span> <br></br> <br></br>Enter this code: {signupOtp}</p>
                    <input className='signup-input' type="text" placeholder="Verfication-Code" value={validationKey} onChange={HandleValidationInputChange}/>
                    <p style={{ color: 'red'}}>{info}</p>
                    <button className="btn btn-green" onClick={HandleValidation}>Verify</button>
    
                    <p className="credit">Developed by:  <span>Fuad Sultan</span ></p> 
    
                </form>
            </section>
        </main> 
      
    )


}
export default SignupValidationComponent;