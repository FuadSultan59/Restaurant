import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../Css/auth.css';
import SpinnerComponent from './spinnerComponent'

function SignInComponent() {

    const [isLoading, setIsLoading] = useState (false)
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [info, setInfo] = useState('');

    function sign_up () {
        navigate('/Signup')
    }

    function HandleEmailInputChange(event)
    {
        setUserEmail(event.target.value);

    }

    function HandlePasswordInputChange(event) 
    {
      setUserPassword(event.target.value); 
    }

    function HandleSignin (event) {

        event.preventDefault(false)

        setIsLoading(true)
       
        setTimeout(() => {
            setIsLoading(false)
            
        }, 500);

        const signinData = {
            Email: userEmail,
            Pswrd: userPassword
        }

        fetch('http://localhost:3232/auth/Signin', {
  
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signinData),
      })

      .then ( (response)=> {
        if (response.ok)
        {
            response.json().then((data) => {

                if (data.message === 'success'){
                    //decode the token
                    const token = data.token
                    const decodedToken = jwtDecode(token)
                    const userData = decodedToken.isEmailExist
                    const Role = userData.Role

                    // check role
                    if (Role === 'user') {

                        localStorage.setItem('lemon-user', `Bearer ${token}`);
                        navigate('/')


                    }
                    else if (Role === 'reception') {
                        localStorage.setItem('lemon-reception', `Bearer ${token}`);
                        navigate('/Reception-Dashboard')

                    }
                    else if (Role === 'admin') {
                        localStorage.setItem('lemon-admin', `Bearer ${token}`);
                        navigate('/Admin-Dashboard')


                    }
                    else {
                        setInfo ("Unauthorized account!")
                    }


                    //save token to locla storage based on user reception admin
                    //navigate to home/receptio/admin
                }
                else if (data.message === 'Not_Found') {
                    setInfo('Incorrect Email or Password!')
                }
                else {
                    setInfo('Login Error!')
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


    return (
<>
        
    <main className="Auth-container">
        <section className="left">
        <h1>Login</h1>
        
        </section>
        <section className="right">
        <form className='signup-form' type='submit' >

        
            <input className='signup-input' type="text" placeholder="Email Address.." value={userEmail} onChange={HandleEmailInputChange} />
            <input className='signup-input' type="password" placeholder="Password.." value={userPassword} onChange={HandlePasswordInputChange}/>
            <p style={{ color: 'red'}}>{info}</p>
            <button className="btn btn-green" onClick={HandleSignin}>Signin</button>
            <p className='donthaveacoount'>Don't have an account? <a className='signuplink' href="/Signup" >Sign Up</a></p> 
            


        </form>
        </section>
    </main>

    {isLoading &&  <SpinnerComponent />
    }
</>
    )
}
export default SignInComponent;