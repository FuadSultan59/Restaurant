import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import homeBackground from '../Images/bg-picture.webp' 
import {jwtDecode} from 'jwt-decode';
import '../Css/home.css';
import UpdateUserModal from '../components/modal/updateuserModal'
import UserOrderModal from './modal/userOrderModal';





function HomeComponent() {

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [Name, setName] = useState ('')
    const [orderModal, setOrderModal] = useState(false)
    const [userData, setUserData] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const [accountModal, setAccountModal] = useState(false)


    useEffect(() => {
        isLoggedin()
     }, []);



    function HandleMenuButtonClick(){
        navigate('/Menu')
    }

    function isLoggedin() {

        const storedToken = localStorage.getItem('lemon-user')

        if (storedToken !== null) {

            const decoded = jwtDecode(storedToken)
            const user = decoded.isEmailExist
            setUserData(user)
            const userName = user.Name 
            const userId = user.id
            
            setName(userName)
            setLoggedIn(true)

        }
        else {

        }



    }

    function logout () {

        localStorage.removeItem('lemon-user');

               
        setTimeout(() => {
            setLoggedIn(false)
            
        }, 1000);


    }


      
        const toggleDropdown = () => {
          setIsOpen(!isOpen);
        };
    

    return (
        <>
        <div className="fullscreen-bg">
            <div className="navbar">
                <div className="left-nav">

                    <a href="/" style={{color: 'rgba(80, 240, 52, 0.796)'}}>Home</a>
                    <a href="/Menu">Menu</a>
                    <a href="/About-us">About Us</a>
                    <a href="/Contact-us">Contact Us</a>

                </div>
                
                
                <div className="right-nav">
                    {loggedIn ? <a style={{color: 'rgba(62, 241, 31, 0.714)', marginRight:'0px', paddingRight:'1px'}}>{Name} </a>  : <a href="/Signin" style={{    color: 'rgba(62, 241, 31, 0.714)'}}>Login</a> }
                    {loggedIn ? 
                              <>
                                <a style={{paddingLeft:'0px', marginLeft:'0px', color:'greenyellow'}} href='#' className="toggle-button" onClick={toggleDropdown}>{isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}</a>
                               {isOpen && (
                                <>
                                <ul className='dropdown-ul'>

                                    <li className='dropdownfirst-li' onClick={()=>{setAccountModal(true)}}>My Account</li>
                                    <li className='dropdown-li' onClick={()=>{setOrderModal(true)}}>Orders</li>
              

                                </ul>
                                </>

                               )}
                            </>
                    
                    : ''}
                    {loggedIn ? <a href="#" style={{color: 'red'}} onClick={logout}>LogOut</a>: <a href="/Signup" >Sign Up</a>}
                </div>
            </div>
            <hr></hr>

            <div className='content'>
                <h1>Welcome to “<span style={{color: '#0fc94a', fontFamily:'cursive'}}>Lemon Zest</span>”</h1>
                <p>At Lemon Zest, we believe that every meal should be an unforgettable experience. 
                    Our culinary journey combines fresh ingredients, innovative flavors, and warm hospitality.</p>
                <button onClick={HandleMenuButtonClick}>Check our Menu</button>
            </div>
        </div>

        {accountModal && <UpdateUserModal user = {userData} onClose={()=> setAccountModal(false)} />}
        {orderModal && <UserOrderModal onClose={()=> setOrderModal(false)}/>}
        </>
    );
}

export default HomeComponent;