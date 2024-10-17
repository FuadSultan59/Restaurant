import HeaderComponent from "./headerComponent";
import '../Css/contactus.css'
import lemonIcon from '../Images/lemon-svgrepo-com.svg'
import FooterComponent from '../components/footerComponent'
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import {FaEnvelope, FaLocationArrow, FaPhone, FaPhoneAlt, FaPhoneVolume, FaSearchLocation} from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";


function ContactUsComponent() {

  const [feedback, setFeedBack] = useState(null);

  function HandleFeedback(event) {
    setFeedBack(event.target.value)
  }


    function submitFeedback() {


      if (feedback !== null){

        toast.success('Success! Thank you.' , {
          duration: 4500,
          position: 'top-center', 


        }) 

        setFeedBack(null)
  
      }
      else 
      {
        toast.error('Please write your FeedBack first.' , {
          duration: 4500,
          position: 'top-center', 
        }) 

      }

  
      



    }
    return (
<>
        <HeaderComponent caller = {'Contact-us'}/>

        <div className="contact-container">
              <div className="restaurant-image">
                <h2>Lemon-Zest</h2>
                <img src={lemonIcon} alt="Restaurant" />
              </div>
              <div className="contact-info">
                  <h2>Contact Us</h2>
                  <p>Feel free to reach out to us:</p>
                  <ul>
                    <li><FaEnvelope /> Email: fuadsultan59@gmail.com</li>
                    <li><FaPhoneAlt /> Phone: +251973991059</li>
                    <li><FaLocationArrow /> Location: Bethel, Addis Ababa, Ethiopia</li>

                  </ul>

                <div className="social-icons">
                  <SocialIcon className="social" url="https://twitter.com/" />
                  <SocialIcon className="social" url="https://instagram.com/" />
                  <SocialIcon className="social" url="https://t.me.com/" />
                  <SocialIcon className="social" url="https://tiktok.com/" />
                  <SocialIcon className="social" url="https://facebook.com/" />

                </div>

                <textarea
                  className="feedback-input"
                  placeholder="Your feedback..."
                  rows="4"
                  onChange={HandleFeedback} 
                  value={feedback}
                />
                <button className="submit-button" type="text" onClick={submitFeedback} >Submit</button>
              </div>
            </div>

      <ToastContainer />
      <FooterComponent />

    </>

    )
}
export default ContactUsComponent;