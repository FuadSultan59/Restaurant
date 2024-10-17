import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../../Css/admin/adminpage.css'
import { FaHome, FaChartBar, FaUser, FaCog, FaSignOutAlt, FaSignal, FaUtensils, FaHotel, FaTrash, FaPlusCircle, FaUserPlus, FaInfoCircle, FaSyncAlt, FaSpinner, FaHourglassEnd, FaTruckLoading, FaTruckPickup, FaTicketAlt} from 'react-icons/fa';



function AdminPage() {

    const navigate = useNavigate()
    const [userclicked, setUserClicked] = useState(false)
    const [dishClicked, setDishClicked] = useState(false)
    const [subReceptionclicked, setSubReceptionclicked] = useState(false)
    const [subUserclicked, setSubUserclicked] = useState(false)
    const [orderClicked, setOrderClicked] = useState(false)
    const [settingClicked, setSettingClicked] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [Name, setName] = useState ('')



    useEffect(() => {
        isLoggedin()
     }, []);


    function HandleUserClick(){
        setUserClicked(!userclicked)
    }
    

    function isLoggedin() {

        const storedAdminToken = localStorage.getItem('lemon-admin')

        if (storedAdminToken !== null) {

            const decoded = jwtDecode(storedAdminToken)
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

        localStorage.removeItem('lemon-admin');
        navigate('/')

    }


    return (
<>
        <header>
            <h1 className='h1dashboard'>Admin Dashboard </h1>
            <div className="user-info">
              {loggedIn ?  <span className="user-name">{Name}</span> : 'Error!'}
               {loggedIn ?  <button className="logout-button" onClick={logout}>Logout</button>: 'Error!!'}
            </div>
        </header>


        <div className="admin-container">
        <aside className="sidebar">
            
            <nav>
            <h3 className='h3dashboard'><FaHome /> Dashboard</h3>

            <ul className='parent-link'>
                <li><a href="#" onClick={HandleUserClick}><FaUser /><p>&nbsp;</p>Users</a>
                   
                   {userclicked && (
                    <ul className='submenu'> 
                        
                        <li><a href="#" onClick={()=>{setSubUserclicked(!subUserclicked)}}><FaUser /><p>&nbsp;</p>User</a>
                            {subUserclicked && (
                                <ul className='submenu'>
                                    <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/User-Info')}}><FaInfoCircle /><p>&nbsp;</p>User Info</a></li>
                                    <li><a href="#" onClick={()=> {navigate('/Admin-Dashboard/Delete-User')}}><FaTrash /><p>&nbsp;</p>Delete user</a></li>
                                </ul>
                            )}
                        </li>
                            
                        <li><a href="#" onClick={()=>{setSubReceptionclicked(!subReceptionclicked)}}><FaHotel /><p>&nbsp;</p>Reception</a>
                            {subReceptionclicked && (  
                                <ul className='submenu'>
                                    <li><a href="#" onClick={()=>(navigate('/Admin-Dashboard/Reception-Info'))} ><FaInfoCircle /><p>&nbsp;</p>Reception Info</a></li>
                                    <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/Create-Reception')}}><FaUserPlus /><p>&nbsp;</p>Create Reception</a></li>
                                    <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/Delete-Reception')}}><FaTrash /><p>&nbsp;</p>Delete Reception</a></li>
                                </ul>
                            )}
                        </li>
                    </ul>)}
                </li>
                <li><a href="#" onClick={()=> {setDishClicked(!dishClicked)}}><FaUtensils /><p>&nbsp;</p> Dish</a>
                    {dishClicked && (  
                        <ul className='submenu'>
                            <li><a href="#" onClick={()=>(navigate('/Admin-Dashboard/Dish-Info'))}><FaInfoCircle /><p>&nbsp;</p>Dish Info</a></li>
                            <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/Add-Dish')}}><FaPlusCircle  /><p>&nbsp;</p>Add Dish</a></li>
                            {/* <li><a href="#"><FaSyncAlt /><p>&nbsp;</p>Update Dish</a></li> */}
                            <li><a href="#" onClick={()=>(navigate('/Admin-Dashboard/Delete-Dish'))}><FaTrash /><p>&nbsp;</p>Delete Dish</a></li>
                        </ul>
                    )}
                </li>
                {/* <li><a href="#" onClick={()=> {setOrderClicked(!orderClicked)}}><FaTicketAlt /><p>&nbsp;</p> Order</a>
                    {orderClicked && (  
                        <ul className='submenu'>
                            <li><a href="#" onClick={()=>(navigate('/Admin-Dashboard/Pending-Orders'))}>< FaHourglassEnd/><p>&nbsp;</p>Pending Orders</a></li>
                            <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/Under-Cooking')}}><FaSpinner  /><p>&nbsp;</p>Under Cooking Orders</a></li>
                            <li><a href="#" onClick={()=>(navigate('/Admin-Dashboard/Prepared-Orders'))}><FaUtensils /><p>&nbsp;</p>Prepared Orders</a></li>
                        </ul>
                    )}
                </li> */}
                <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/Analytics')}} ><FaChartBar /><p>&nbsp;</p> Analytics</a></li>
                <li><a href="#" className="settings" onClick={()=>{setSettingClicked(!settingClicked)}}><FaCog /><p>&nbsp;</p>Settings</a>
                {settingClicked && (  
                        <ul className='submenu'>
                            <li><a href="#" onClick={()=>{navigate('/Admin-Dashboard/Create-Admin')}} >< FaUserPlus/><p>&nbsp;</p>Create Admin</a></li>
                            
                         </ul>
                    )}
                
                </li>
           
                <li><a style={{color:'red'}} href="#" className="logout" onClick={logout}><FaSignOutAlt /><p>&nbsp;</p>Logout</a></li>
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

export default AdminPage;