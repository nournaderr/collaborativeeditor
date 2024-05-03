import '../styles/Otp.css'
import '../styles/Login.css'
import Lottie from 'lottie-react'
import ap from '../lotties/animation_ljzrexsp.json'
import { useNavigate } from 'react-router-dom'
export default function OTP () {
    const navigate = useNavigate()
    return(
        <div className='otp'>
        <div className="otp-card">
            <div className="title">
            <div className="lottie">
            <Lottie loop={true} animationData={ap} style={{height: 100}}/>
            </div>
            
            <h2>YOUR LOGO <br></br><span className='airline'>AIRLINES</span></h2>
            
            </div>
            <div className='otp-container'>
            <div className='cc'>
                Confirmation Code
            </div>
            <ul className='boxes'>
                <li className='li-box'><input className='single-box' /></li>
                <li className='li-box'><input className='single-box' /></li>
                <li className='li-box'><input className='single-box' /></li>
                <li className='li-box'><input className='single-box' /></li>
                <li className='li-box'><input className='single-box' /></li>
            </ul>
            
            </div>
            <a className='forgot center' href=''>Resend Code!</a>
            <br />
            <button className='login-btn sbmt-btn' onClick={() => navigate('/login')}>Submit</button>
        </div>
        </div>
    )
}