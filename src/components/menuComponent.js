import React,{ useEffect, useState } from "react"
import HeaderComponent from "./headerComponent"
import '../Css/menu.css'
import image1 from '../Images/vegetables.jpg'
import SpinnerComponent from './spinnerComponent'
import FooterComponent from '../components/footerComponent'
import  {ToastContainer, toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart } from 'react-icons/fa';




function MenuComponent() {

    const [isLoading, setIsLoading] = useState(false )
    const [orderArrayChange,setOrderArrayChange] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [orderArray, setOrderArray] = useState([])
    const [dishArray, setDishArray] = useState([])
    const [burgers, setBurgers]= useState([])
    const [pizzas, setPizzas]= useState([])
    const [salads, setSalads] = useState([])
    const [fishes, setFishes]= useState([])
    const [apitizers,setApitizers]=useState([])
    const [deserts,setDeserts] = useState([])
    const [breakfast,setBreakfast] = useState([])
    const [drinks, setDrinks] = useState([])
    

    const Burger =[]
    const Pizza =[]
    const Fish = []
    const Salad =[]
    const Breakfast =[]
    const Apitizer =[]
    const Desert =[]
    const Drink = []
    const Other = []


    useEffect(() => {
         getDishes()
      }, []);

      useEffect(() => {

        const price = totalPrice

        setTotalPrice(price)
        setOrderArrayChange(false)

 
      }, [orderArrayChange]);

      useEffect(() => {
        separateCategories()
      }, [dishArray]);


      function separateCategories(){


        dishArray.map((element, index)=> {

            if (element.Category === 'Burger'){

                Burger.push(element)
            }
            else if(element.Category === 'Pizza') {
                Pizza.push(element)
            }
            else if (element.Category === 'Salad') {
                Salad.push(element)
            }
            else if (element.Category === 'Apitizer') {
                Apitizer.push(element)
            }
            else if (element.Category === 'Desert') {
                Desert.push(element)
            }
            else if (element.Category === 'BreakFast') {
                Breakfast.push(element)
            }
            else if (element.Category === 'Drink') {
                Drink.push(element)
            }
            else if (element.Category === 'Fish') {
                Fish.push(element)
            }
            else {
                Other.push(element)
            }

        })

        setApitizers(Apitizer)
        setBreakfast(Breakfast)
        setBurgers(Burger)
        setDeserts(Desert)
        setDrinks(Drink)
        setFishes(Fish)
        setPizzas(Pizza)
        setSalads(Salad)


      }


      function HandleOrderDish() {

        if(orderArray.length === 0){
            toast.warning("Select one Food atleast!" , {
                duration: 2500,
                position: 'top-center', 
              })
            return
        }
        
        const userToken  = localStorage.getItem('lemon-user')
        if (userToken !== null) {

            const Order = {
                Ordered_Meal: orderArray,
                Total_Price: totalPrice
            }

                fetch('http://localhost:3232/user/Order', {
        
                    method: 'Post',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${userToken}`
                    },
                    body: JSON.stringify(Order)
                    })

                    .then ((response)=> {
                        if(response.ok) 
                        {
                             response.json().then((data) =>{
            
                                if (data.message === 'success') {
                                    toast.success("Ordered Successfully!", {
                                        duration: 2500,
                                        position: 'top-center', 
                                      })
                                }
                                else if (data.message === 'invalid_token'){
                                    toast.error("Invalid Token, Login Again!", {
                                        duration: 2500,
                                        position: 'top-center', 
                                      })
                                }
                                else {
                                    toast.error('Error!', {
                                        duration: 2500,
                                        position: 'top-center', 
                                      })
                                }
                             
                             })

                            }
                            else {
                                response.json().then((errorData) => {
                                    toast.error(errorData.message[0])
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
        else {

            toast.error('Please Login First!', {
                duration: 2500,
                position: 'top-center', 
              });
                            
        }


      }

  
      function HandleAddToCart(dishName, dishPrice) {

        const newOrder = {
            Name: dishName,
            Price: dishPrice
        }

        const NumberPrice =  Number(dishPrice)

        setOrderArray(prevArray => Array.isArray(prevArray) ? [...prevArray, newOrder] : [newOrder]); 
        setTotalPrice(totalPrice + NumberPrice)



    }


        function HandleRemoveDish(index, dishPrice){
            
            const updatedOrder= orderArray.filter((element, i) => i !== index);
            const NumberPrice =  Number(dishPrice)

            setOrderArray(updatedOrder)
            setTotalPrice(totalPrice - NumberPrice)
            
            
        }

        function getDishes(){

                fetch('http://localhost:3232/user/Get-Dishes', {
        
                method: 'Get',
                headers: {
                'Content-Type': 'application/json',
                },
                })

                .then ((response)=>{

                    if(response.ok) {
                        response.json().then((data)=>{
                            if (data.message === 'success') {

                                const dishes = data.dishs 
                                setDishArray(dishes)
                                
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

    return(

<>
    <HeaderComponent  caller = {'Menu'}/>



    <div className="container">

        <section className="section1-container">
            
            <h1>All Dishes</h1>
            
            <div className="card-container">
        
                {dishArray.map((Dish,index) =>
                    <div className="card" key={index}>
                            <img src={Dish.Img_Url} alt={Dish.Name}/>
                            <h3>{Dish.Name}   |{Dish.Category}.</h3>
                            <p>{Dish.Description}</p>
                            <h4>Price: {Dish.Price}</h4> <br/>
                            <button onClick={()=>HandleAddToCart(Dish.Name,  Dish.Price)}><FaShoppingCart /> Add to Cart</button>             
                    </div>
                )}
            </div>
            <div className="card-container">
        
        {dishArray.map((Dish,index) =>
            <div className="card" key={index}>
                    <img src={Dish.Img_Url} alt={Dish.Name}/>
                    <h3>{Dish.Name}   |{Dish.Category}.</h3>
                    <p>{Dish.Description}</p>
                    <h4>Price: {Dish.Price}</h4> <br/>
                    <button onClick={()=>HandleAddToCart(Dish.Name,  Dish.Price)}>Add to Cart</button>             
            </div>
        )}
    </div>


            {/* <h1>Burgers</h1>
            <div className="card-container">
        
        {burgers.map((Dish,index) =>
            <div className="card" key={index}>
                    <img src={image1} alt="Dish"/>
                    <h3>{Dish.Name}   |{Dish.Category}.</h3>
                    <p>{Dish.Description}</p>
                    <h4>Price: {Dish.Price}</h4> <br/>
                    <button onClick={()=>HandleAddToCart(Dish.Name, Dish.Price)}>Add to Cart</button>             
            </div>
        )}
    </div> */}

        </section>

        






        <section className="button-section">
                
            <h2 >List of Orders</h2>
            
            <div className="orderlistdiv">

                {orderArray.map((food,index)=>
                        <li key={index}> 
                            {food.Name}
                            <button onClick={()=> HandleRemoveDish (index, food.Price)} className="x-btn">X</button>
                        </li>
                )}

            </div>


            {/* <p>{isLoggedIn ? '': 'Please Login First'}</p> */}
            <p>Total Price: <span style={{color: 'darkgreen'}}>{totalPrice} birr</span> </p>
            <button onClick={HandleOrderDish} className="order-button">Order Now</button>

        </section>
    </div>

    {isLoading &&  <SpinnerComponent />
    }

    <ToastContainer />
    <FooterComponent />

            </>
    )
}

export default MenuComponent;