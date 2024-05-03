import "../styles/Footer.css"
import logo from '../Assets/paperplane_logo.svg'
export default function Footer() {
    return(
        <footer>
            <div className="footer-top">
            <div className="logo">
                <img src={logo} style={{width:50, height:50, marginRight:20}} />
                <h2>YOUR LOGO <br></br><span className='airline'>AIRLINE</span></h2>
            </div>
            <div className="footer-lists">
                <ul>
                    <li className="ab-footer">About</li>
                    <li className="footer-items">About Us</li>
                    <li className="footer-items">Resources & Policies</li>
                    <li className="footer-items">Careers</li>
                    <li className="footer-items">Contact Us</li>
                </ul>
                <ul>
                    <li className="ab-footer">About</li>
                    <li className="footer-items">About Us</li>
                    <li className="footer-items">Resources & Policies</li>
                    <li className="footer-items">Careers</li>
                    <li className="footer-items">Contact Us</li>
                </ul>
                <ul>
                    <li className="ab-footer">About</li>
                    <li className="footer-items">About Us</li>
                    <li className="footer-items">Resources & Policies</li>
                    <li className="footer-items">Careers</li>
                    <li className="footer-items">Contact Us</li>
                </ul>
            </div>
            </div>
            <div className="footer-bottom">
                Copyright @2023 BookMe All Rights Reserved
            </div>
        </footer>
    )
    
}