

import '../Css/footer.css'


function FooterComponent( caller) {

    return (
        <footer class="footer">
        {/* <div class="social-icons">
            <a href="#" target="_blank">Facebook</a>
            <a href="#" target="_blank">Twitter</a>
            <a href="#" target="_blank">Instagram</a>
        </div> */}
        <div class="address">
            Bethel, Addis Ababa, Ethiopia
            <br/>
            {/* Open hours: Mon-Fri, 9:00 AM - 6:00 PM */}
        </div>
        <div class="copyright">
            &copy; 2024 Lemon Zest. All rights reserved.
    </div>

    <p className="credit">Developed by:  <span >Fuad Sultan</span ></p> 

</footer>

    )


}

export default FooterComponent;