import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../../Css/admin/receptionpage.css'
import { FaUserCircle, FaHourglassEnd,FaSpinner,  FaSignOutAlt, FaCheckCircle, FaUtensils, FaHotel, FaTrash, FaPlusCircle, FaUserPlus, FaInfoCircle, FaSyncAlt, FaBan} from 'react-icons/fa';



function ReceptionPage() {

    const navigate = useNavigate()
    const [userclicked, setUserClicked] = useState(false)
    const [dishClicked, setDishClicked] = useState(false)
    const [subReceptionclicked, setSubReceptionclicked] = useState(false)
    const [subUserclicked, setSubUserclicked] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [Name, setName] = useState ('')



    useEffect(() => {
        isLoggedin()
     }, []);




    function isLoggedin() {

        const storedReceptionToken = localStorage.getItem('lemon-reception')

        if (storedReceptionToken !== null) {

            const decoded = jwtDecode(storedReceptionToken)
            const user = decoded.isEmailExist
            const userName = user.Name 
            
            setName(userName)
            setLoggedIn(true)

        }
        else {

           navigate('/')
        }



    }


    function logout () {

        localStorage.removeItem('lemon-reception');
        navigate('/')

    }


    return (
<>
  


        <div className="reception-container">
        <aside className="reception-sidebar">
            
            <nav>

                <h1 className='h1receptiondashboard'><FaHotel />  Reception </h1>
    

                <ul className='parent-link'>
                    <li>
                        <a href="#" onClick={()=> {navigate('/Reception-Dashboard/Pending-Orders')}}>< FaHourglassEnd/><p>&nbsp;</p>PENDING<p>&nbsp;</p><p>&nbsp;</p></a>
                    </li>  
            
                    <li>
                        <a href="#" onClick={()=> {navigate('/Reception-Dashboard/Under-Cooking')}}><FaSpinner /><p>&nbsp;</p> UNDER COOKING<p>&nbsp;</p><p>&nbsp;</p></a>          
                    </li>
                    <li>
                        <a href="#" onClick={()=>{navigate('/Reception-Dashboard/Prepared-Orders')}} ><FaUtensils /><p>&nbsp;</p> PREPARED<p>&nbsp;</p><p>&nbsp;</p></a>
                    </li>
                    <li>
                        <a href="#" onClick={()=>{navigate('/Reception-Dashboard/Served')}} ><FaCheckCircle /><p>&nbsp;</p> SERVED</a>
                    </li>
                    <li>
                        <a href="#" onClick={()=>{navigate('/Reception-Dashboard/Declined-Orders')}} ><FaBan /><p>&nbsp;</p> DECLINED</a>
                    </li>

                    <li>
                        <p href="#" className="settings"><p>&nbsp;</p></p>
                    </li>
                    <li>
                        <p href="#" className="settings"><p>&nbsp;</p></p>
                    </li>
                    <li>
                        <p href="#" className="settings"><p>&nbsp;</p></p>
                    </li>


                    <p style={{marginLeft:'15px', fontSize:'1.5rem'}}><FaUserCircle /> {Name}</p>
                    <li>
                        <a style={{color:'darkred'}} href="#" className="logout" onClick={logout}><FaSignOutAlt /><p>&nbsp;</p>Logout</a>
                    </li>
                </ul>
            </nav>

            
        </aside>
        <main>
        <Outlet />
        </main>
    </div>
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    </>
    )
}

export default ReceptionPage;