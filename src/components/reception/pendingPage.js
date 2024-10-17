import { useState, useEffect } from 'react';
import React from "react";
import { useNavigate } from 'react-router-dom';
import '../../Css/admin/pending.css'
import  {ToastContainer, toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';

function PendingPage() {
    
    const navigate = useNavigate()
    const [Token, setToken] = useState(null)
    const [Orders, setOrders] =useState ([])
   
    const [Meals, setMeals] = useState([]) 
    const [price, setPrice] = useState('-')
    const [status, setStatus] = useState (null)
    const [orderTime, setOrderTime]= useState('-')
    const [orderId, setOrderId] = useState(null)

    const [user, setUser] = useState(null)
    const [Name, setName] = useState('-')
    const [Phone, setPhone] = useState('-')
    const [Email, setEMail] = useState('-')
    const [Address, setAddress] = useState('-')
    let orderArray = []
    let mealArray = []

    useEffect(() => {
        GetNewOrders()
     }, []);


    const ReceptionToken = localStorage.getItem('lemon-reception')
    // const AdminToken = localStorage.getItem('lemon-admin')



    // if (ReceptionToken && AdminToken){

    //         toast.error('More Than One Login Detected In Your Device!' , {
    //             duration: 2500,
    //             position: 'top-center', 
    //           })
    //           toast.warning('Redirecting You to Home!' , {
    //             duration: 3500,
    //             position: 'top-center', 
    //           })

    //           setTimeout(() => {

    //             localStorage.removeItem('lemon-reception')
    //             localStorage.removeItem('lemon-admin')
    //             navigate('/')
    //           }, 3600);
     
    // }

    


    function GetNewOrders() {

        fetch('http://localhost:3232/reception/New-Orders', {
        
            method: 'Get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${ReceptionToken}`
            },
            })
    
            .then((response)=> {
                if (response.ok){
                    response.json().then((data)=>{
    
                        if(data.message === 'Pending_Orders'){
                           
                            const Data = data.data
                            Data.map((elem,index) =>{
                                orderArray.push(elem)
                            })
                            setOrders(orderArray)
                            orderArray = []

                    

                        }
                        else if(data.message === 'No_Orders') {

                            toast.success('Order Accepted Successfully!' , {
                                duration: 2500,
                                position: 'top-center', 
                              })

    
                        }
                        else if (data.message === 'invalid_token'){
                            
                            toast.error('Invalid Token, PLease Login Again!' , {
                                duration: 3500,
                                position: 'top-center', 
                              })

    
                        }
                        else {

                            toast.error('Error, Something Went Wrong!' , {
                                duration: 3500,
                                position: 'top-center', 
                              })
                        }
    
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
    function HandleOrderClick(order) {

            setOrderTime(order.Ordered_Time.replace('T', ' ').substring(0,16))
            setPrice(order.Total_Price)
            setStatus(order.Order_Status)
            setUser(order.user)
            setName(order.user.Name)
            setEMail(order.user.Email)
            setPhone(order.user.Phone)
            setAddress(order.user.Address)
            setOrderId(order.id)

            const meal = JSON.parse(order.Ordered_Meal);
            meal.map((dish,index)=>{
                mealArray.push(dish)
            })
            setMeals(mealArray)
            mealArray = []

    }

    function HandleOrderAcceptance(stat) {

        
        const ReceptionToken = localStorage.getItem('lemon-reception')
        const setStatusData = {
            status: stat,
            id:orderId
        }

        

        fetch('http://localhost:3232/reception/Set-Order-Status', {
        
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${ReceptionToken}`
            },
            body: JSON.stringify(setStatusData)
            })
            
            .then((response)=> {

                if(response.ok){
                    response.json().then((data) =>{

                        if(data.message === 'invalid_token'){

                            toast.error('Invalid Token, PLease Login Again!' , {
                                duration: 3500,
                                position: 'top-center', 
                              })

                        }
                        else if (data.message === 'declined'){
                            toast.error('Order Declined Successfully' , {
                                duration: 2500,
                                position: 'top-center', 
                              })
                              setOrders(Orders.filter(item=> item.id !== orderId))

                        }
                        else if (data.message ==='Preparing'){
                            toast.success('Order Accepted Successfully!' , {
                                duration: 2500,
                                position: 'top-center', 
                              })
                              setOrders(Orders.filter(item=> item.id !== orderId))

                        }
                        else {

                            toast.error('Error, Something went wrong!' , {
                                duration: 2500,
                                position: 'top-center', 
                              })

                        }


                    })
                }
                else {
                    response.json().then((errorData)=>{
                        toast.error(errorData.message[0] , {
                            duration: 2500,
                            position: 'top-center', 
                          })

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


    return (
        <>


    <main className="Pending-container">
        <section className="pending-left">

            <h1>Pending Queue</h1>


            <div className="orderlistdiv">
              <ul>

              {Orders.map((order,index)=>
                        <li key={index} onClick={()=>{HandleOrderClick(order)}}> 
                            {order.user.Name}<br></br>
                            {order.Ordered_Time.replace('T', ' ').substring(0,16)}
                        </li>
                )}

              </ul>  
     


            </div>        
        </section>
        <section className="pending-right">

            <h1>Order Detail</h1>

            <p>Name: <span style={{color:'#cdf169'}}>{Name}</span> </p>
            <p>Email: <span style={{color:'#cdf169'}}>{Email}</span></p>
            <p>Phone: <span style={{color:'#cdf169'}}>{Phone}</span></p>
            <p>Address: <span style={{color:'#cdf169'}}>{Address}</span> </p>

            <div className='order-div'>
                <div className='left-div'>
                    <h2>Ordered Meal</h2>
                    
                    <div className='leftorder-div'>
                        <ul>
                                {Meals.map((item, index) => (
                                    
                                    <li key={index}>{item.Name} <input type='checkbox' value={item.Name} className="checkbox" /></li>
                    
                                ))}

                        </ul> 
                    </div>
                    <p style={{color:'yellow'}}>*check/select items that are not available to decline order</p>

                </div>

                <div className='right-div'>
                    <h2>Order Info</h2>

                    <p>Ordered-Time: <span style={{color:'#cdf169'}}>{orderTime}</span> </p>
                    <p>Price: <span style={{color:'#cdf169'}}>{price} birr</span> </p>
                    <p>Status: <span style={{color:'#cdf169'}}>{status}</span></p>

                    <div className='pending-btns'>
                        <button className='accept-btn' onClick={()=>{HandleOrderAcceptance( 'Preparing')}}>Accept</button>
                        <button className='decline-btn' onClick={()=>{HandleOrderAcceptance( 'declined')}}>Decline</button>
                    </div>

                </div>

            </div>



        </section>
    </main>

    <ToastContainer />

</>

    )
}
export default PendingPage;