import React, { useEffect, useState } from 'react'
import '../../Css/Modals/modals.css'
import {  FaInfoCircle, FaSyncAlt, FaTrash} from 'react-icons/fa';
import  {ToastContainer, toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';
import 'animate.css';



function UserOrderModal ( {user, onClose}) {

    const [Name, setName] = useState('')
    const [TotalOreders, setTotalOreders] = useState([])
    const [PendingOrders, setPendingOrders] = useState([])
    const [AcceptedOrders, setAcceptedOrders] = useState([])
    const [ServedOrders, setServedOrders] = useState([])
    const [DeclinedOrders, setDeclinedOrders] = useState([])
    const [PreparedOrders, setPreparedOrders] = useState([])
    const [magicAray, setMagicArray] = useState([])

    useEffect(()=>{

        getOrders();
    }, [])

    function getOrders() {

         const userToken = localStorage.getItem('lemon-user')
         const decoded = jwtDecode(userToken)
         const user = decoded.isEmailExist
         setName(user.Name)

         fetch('http://localhost:3232/user/User-Orders', {
        
            method: 'Get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${userToken}`
            },
            })   
            
            .then((response)=>{
                if(response.ok) {
                    response.json().then((data)=>{

                        if (data.message === 'invalid_token'){

                            toast.error('Invalid Token! Login again..' , {
                                duration: 4500,
                                position: 'top-center', 
                              }) 
                        }
                        else if (data.message === 'No_order'){

                            toast.warning('No Oreders Yet....' , {
                                duration: 4500,
                                position: 'top-center', 
                              }) 

                        }
                        else if (data.message === 'Success'){
                            const orders = data.Orders
                            setTotalOreders(orders)

                            setAcceptedOrders(orders.filter(order => order.Order_Status === 'Preparing'))
                            setPreparedOrders(orders.filter(order => order.Order_Status === 'prepared'))
                            setServedOrders(orders.filter(order => order.Order_Status === 'served'))
                            setDeclinedOrders(orders.filter(order => order.Order_Status === 'declined'))
                            setPendingOrders(orders.filter(order => order.Order_Status === 'Pending'))

                        }
                        else {

                            toast.error('Error, Something Went Wrong!' , {
                                duration: 4500,
                                position: 'top-center', 
                              }) 

                        }

                    })

                }
                else {

                    
                    toast.error('Error, Something Went Wrong!' , {
                        duration: 4500,
                        position: 'top-center', 
                      }) 


                }
            })

            .catch(()=>{

                toast.error('Server Error!' , {
                    duration: 4500,
                    position: 'top-center', 
                  }) 


            })
        
        
        }

        function MapOrderArray(arr) {

            let newArray = []
            arr.map((data,index)=>{
                newArray.push(data)
            })

            setMagicArray(newArray)

        }





    return (
      
        <>

     <div className="Modalpopup">
         <div className="userOrder-content">
         <h3 style={{color:'red'}} className='xclose-btn' onClick={onClose}>X</h3>

            <h2 style={{textAlign:'center', color: 'yellow'}}>User Order</h2> 

            <p style={{backgroundColor:'#074225',color:'yellow', padding:'1%', borderRadius:'3px'}}>Name: {Name}</p>

            <div  className="ordercard-container">

                <div className="ordercard" onClick={()=>{MapOrderArray(TotalOreders)}}>
                <h1 style={{textAlign:'center', color:'rgb(131, 250, 117)'}}>{TotalOreders.length}</h1>
                <p style={{textAlign:'center',color:'yellow', backgroundColor: '#074225', }}>Total Orders</p>
                </div>


                <div className="ordercard" onClick={()=>{MapOrderArray(PendingOrders)}}>
                <h1 style={{textAlign:'center', color:'rgb(131, 250, 117)'}}>{PendingOrders.length}</h1>
                <p style={{textAlign:'center', color:'yellow', backgroundColor: '#074225'}}>Pending Orders</p>
                </div>

                <div  className="ordercard" onClick={()=>{MapOrderArray(AcceptedOrders)}}>
                <h1 style={{textAlign:'center', color:'rgb(131, 250, 117)'}}>{AcceptedOrders.length}</h1>
                <p style={{textAlign:'center',color:'yellow', backgroundColor: '#074225'}}>Under Cooking</p>
                </div>

                <div className="ordercard" onClick={()=>{MapOrderArray(PreparedOrders)}}>
                <h1 style={{textAlign:'center', color:'rgb(131, 250, 117)'}}>{PreparedOrders.length}</h1>
                <p style={{textAlign:'center', color:'yellow', backgroundColor: '#074225'}}>Ready Order</p>
                </div>

                <div className="ordercard" onClick={()=>{MapOrderArray(ServedOrders)}}>
                <h1 style={{textAlign:'center', color:'rgb(131, 250, 117)'}}>{ServedOrders.length}</h1>
                <p style={{textAlign:'center', color:'yellow', backgroundColor: '#074225'}}>Served Orders</p>
                </div>

                <div className="ordercard" onClick={()=>{MapOrderArray(DeclinedOrders)}}>
                <h1 style={{textAlign:'center', color:'rgb(131, 250, 117)'}}>{DeclinedOrders.length}</h1>
                <p style={{textAlign:'center' ,color:'yellow', backgroundColor: '#074225'}}>Declined Orders</p>
                </div>

            </div>


            <div className='userOrderrs'>
                <h4  className='order-li'>Order Status  
                    <span style={{marginLeft:'100px', fontWeight:'bold'}}>Ordered Time</span>  
                    <span style={{marginLeft:'100px', fontWeight:'bold'}}>Total Price</span>
                    <span style={{marginLeft:'120px', fontWeight:'bold'}}>Ordered Meals</span>
                </h4>
                <ul>
                    {magicAray.map((elem, index) => (
                    <li key={index} className='order-li'> {elem.Order_Status} 
                        <span style={{marginLeft:'120px'}}>{elem.Ordered_Time.replace('T', ' ').substring(0,16)}</span>  
                        <span style={{marginLeft:'120px'}}>{elem.Total_Price}</span>
                        <span style={{marginLeft:'120px'}}>
                            {JSON.parse(elem.Ordered_Meal).map((data,i)=>(
                                <span key={i}>
                                    {data.Name}
                                    {i < JSON.parse(elem.Ordered_Meal).length - 1 && ',     '}
                              </span>
                                
                            ))}
                        </span>
                        
                    </li>
                    ))}
                </ul>
            </div>

        </div>
        </div> 




            <ToastContainer />

        </>



    )
}

export default UserOrderModal;