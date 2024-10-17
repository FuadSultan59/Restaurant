import React from "react";
import '../Css/aboutus.css'
import cheff from '../Images/scheff.jpg';
import cheff2 from '../Images/chef-food-service-us-foods-getty.webp'
import waiters from '../Images/AdobeStock_145819461.jpeg';
import FooterComponent from '../components/footerComponent'
function AboutUsComponent() {

    return(
<>
       

        <div className="about-us">
    <div className="about-content">
        <div className='welcome'>

        <h1>Welcome to "Lemon Zest"</h1> <br></br>
        <p>Where culinary excellence meets warm hospitality. Our story is one of passion, dedication, and a commitment to delivering an exceptional dining experience to our cherished guests. Let me take you on a journey through our restaurant’s rich history and unique offerings.</p>
       
        </div>
       
        <section>
            <h2>Introduction to The Restaurant</h2>
            <p>Our restaurant is more than just a place to eat; it’s a haven for food lovers. We’ve carefully crafted an ambiance that combines elegance with comfort, making every visit memorable. Whether you’re celebrating a special occasion or simply enjoying a meal with loved ones, our doors are open to you.</p>
            <img src={cheff2} alt="Introduction" />
        </section>
        
        <section>
            <h2>Founding Story</h2>
            <p>Our journey began with a dream—a vision of creating a space where flavors come alive. The restaurant was founded because of inspired by a family recipe and a love for a specific cuisine.</p>
            <img src={cheff} alt="Founding Story" />
        </section>
        
        <section>
            <h2>Chef and Team</h2>
            <p>Meet our talented chef and the passionate team behind the scenes. Their expertise, creativity, and dedication elevate every dish we serve. From the kitchen to the front of the house, our team works tirelessly to ensure your dining experience is exceptional.</p>
            <img src={ waiters} alt="Chef and Team" />
        </section>
        
    </div>
</div>

<FooterComponent />

</>
    )
}

export default AboutUsComponent;