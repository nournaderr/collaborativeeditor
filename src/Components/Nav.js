import '../styles/Nav.css'
import {useNavigate} from 'react-router-dom'
import '../Pages/Home'
import logo from '../Assets/paperplane_logo.svg'
export default function Nav (){
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/register')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return(
        <div className="nav">
            <img src={logo} style={{width:50, height:50, marginRight:20}} />
            <h2>YOUR LOGO <br></br><span className='airline'>AIRLINE</span></h2>
            <ul className='nav-options'>
                <li><a href="/" className='nav-list'>Home</a></li>
                <li><a href="#deals" className='nav-list'>Deals</a></li>
                <li><a href="" className='nav-list'>Offers</a></li>
                <li><a href="" className='nav-list'>Community</a></li>
                <li><button className="sign-up-btn" onClick={handleSignUp}>Sign up</button></li>
                <li><button className="login-btn-nav" onClick={handleLogin}>Login</button></li>
            </ul>
        </div>
    )
}