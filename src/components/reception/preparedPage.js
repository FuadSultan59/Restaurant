import { useState, useEffect } from 'react';
import React from "react";
import '../../Css/admin/prepared.css'
import  {ToastContainer, toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import {FaCheckCircle } from 'react-icons/fa';

function PreparedPage() {
    
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
        GetPreparedOrders()
     }, []);


    const ReceptionToken = localStorage.getItem('lemon-reception')

    function GetPreparedOrders() {

        fetch('http://localhost:3232/reception/Prepared-Orders', {
        
            method: 'Get',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${ReceptionToken}`
            },
            })
    
            .then((response)=> {
                if (response.ok){
                    response.json().then((data)=>{
    
                        if(data.message === 'prepared_orders'){
                           
                            const Data = data.data
                            Data.map((elem,index) =>{
                                orderArray.push(elem)
                            })
                            setOrders(orderArray)
                            orderArray = []

                    

                        }
                        else if(data.message === 'no_prepared_order') {

                            toast.error('Opss... No Prepared Orders.' , {
                                duration: 3500,
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

    function HandleFinishClick(stat) {

        
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
                        else if (data.message === 'served'){
                            toast.success('Success, Order Updated as Served!' , {
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


<main className="prepared-container">
        <section className="prepared-left">

            <h1>Prepared Orders Queue</h1>


            <div className="preparedlistdiv">
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
        <section className="prepared-right">

            <h1>Prepared Order Detail</h1>

            <p>Name: <span style={{color:'#cdf169'}}>{Name}</span> </p>
            <p>Email: <span style={{color:'#cdf169'}}>{Email}</span></p>
            <p>Phone: <span style={{color:'#cdf169'}}>{Phone}</span></p>
            <p>Address: <span style={{color:'#cdf169'}}>{Address}</span> </p>

            <div className='prepared-div'>
                <div className='preparedleft-div'>
                    <h2>Prepared Meal</h2>
                    
                    <div className='preparedleftorder-div'>
                        <ul>
                                {Meals.map((item, index) => (
                                    
                                    <li key={index}><FaCheckCircle /> {item.Name} </li>
                    
                                ))}

                        </ul> 
                    </div>

                </div>

                <div className='preparedright-div'>
                    <h2>Order Info</h2>

                    <p>Ordered-Time: <span style={{color:'#cdf169'}}>{orderTime}</span> </p>
                    <p>Price: <span style={{color:'#cdf169'}}>{price} birr</span> </p>
                    <p>Status: <span style={{color:'#cdf169'}}>{status}</span></p>

                    <div className='pending-btns'>
                        <button className='finish-btn' onClick={()=>{HandleFinishClick( 'served')}}>Finish</button>
                    </div>

                </div>

            </div>



        </section>
    </main>

    <ToastContainer />

</>

    )
}
export default PreparedPage;