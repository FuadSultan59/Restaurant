import { useState } from 'react';
import React from "react";
import '../../Css/admin/createDelete.css'
import CreatedModal from '../modal/createdModal';

function AddDish() {

    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Category, setCategory] = useState('Pizza');
    const [File, setFile] = useState(null)
    // const [imgUrl, setImgUrl] = useState('')
    
    const [info, setinfo] = useState("");
    const [modal, setModal] = useState("");
    const [header, setHeader] = useState("");
    const [Paragraph, setParagraph] = useState('')

    
    function HandleNameInputChange(event)
    {
        setName(event.target.value);
    }


    function HandleDescriptionChange(event)
    {
        setDescription(event.target.value);
    }

    function HandlePriceInputChange(event)
    {
        setPrice(event.target.value);
    }

    function HandleCategoryInputChange(event)
    {
        setCategory(event.target.value);

    }

    function HandleFileInputChange(event)
    {
        const file = event.target.files[0];
        setFile(file)

    }


    function HandleFoodAdd (event) {
        event.preventDefault(false)

        if (File === null) {
            setinfo('Select Image')
            return
        }

        const formData = new FormData();
        formData.append('Img_Url', File);
        formData.append('Name', Name);
        formData.append('Description', Description);
        formData.append('Price', Price);
        formData.append('Category', Category);



        const cachedtoken = localStorage.getItem('lemon-admin');


        fetch('http://localhost:3232/admin/Add-Dish',  {
  
            method: 'Post',
            body: formData,

            // headers: {
            // 'Authorization': `Bearer ${cachedtoken}`, 
            // 'Content-Type': 'multipart/form-data',
            // },
           
            
        })

        .then ((response)=> {
            if(response.ok) 
            {
                response.json().then((data) =>{

                    if (data.message === 'success') {
                        setinfo('Dish Added Successfully!')
                    }
                    else if(data.message ==='Already Exist'){
                         setinfo('Dish Already Exist!')   
                    }
                    else {
                        setinfo("Error!")
                    }

                })

            }
            else {
                response.json().then((errorData) => {
                    setinfo(errorData.message)
                })
            }
            
        })
    
        .catch(()=>{
            setinfo("Server Error!")
        })


    }


    return (
        <>


    <main className="Add-Dish-container">
        <section className="left">
        <h1 style={{color: 'darkgreen',fontWeight: 'bolder'}}> Add<span style={{color: 'darkgreen',fontWeight: 'bolder'}}>-Dish</span></h1>
        
        </section>
        <section className="right">
        <form className='recep-signup-form' type='submit' >

            <label style={{color: 'green'}}>Food Name</label>
            <input className='recep-signup-input' type="text" placeholder="Beef Pizza" value={Name} onChange={HandleNameInputChange}/>
            
            <label style={{color: 'green'}}>Description</label>
            <input className='recep-signup-input' type="text" placeholder="beef, Tomato sauce, cheese." value={Description} onChange={HandleDescriptionChange} />
            
            <label style={{color: 'green'}}>Price </label>
            <input className='recep-signup-input' type="text" placeholder="359" value={Price} onChange={HandlePriceInputChange} />
            
            <label style={{color: 'green'}}>Category </label>
            <select className='recep-signup-input' onChange={HandleCategoryInputChange} >
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Fish">Fish</option>
                <option value="BreakFast">BreakFast</option>
                <option value="Cultural">Cultural</option>
                <option value="Drink">Drink</option>
            </select>            
            <label style={{color: 'green'}}>Food Image </label>
            <input  style={{marginBottom: '0px'}} className='recep-signup-input' name='Img_Url' type="file"  onChange={HandleFileInputChange} />
            <p style={File !== null ? { color: 'green', marginTop:'0px' } : {}}>{File !== null ? "✔️Image Selected" : ''}</p>
            <p style={{ color: 'red'}}>{info}</p>
            <button style={{marginTop: '30px'}} className="button-green" onClick={HandleFoodAdd}>Add</button>


        </form>
        </section>
    </main>

    {modal && <CreatedModal header = {header} para = {Paragraph} name = {Name} onClose={()=> setModal(false)} />}

</>

    )


}
export default AddDish;