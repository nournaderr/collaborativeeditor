import abtpic from '../../Assets/Group 162.png'
export default function About() {
    return(
        <div className="about">
        <div className="about-text">
            <h1>Your Passport <br /> To The <span className="world">World</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
            <button className="offers-btn">Offers</button>
        </div>
        <img src={abtpic} className='about-pic'></img>
        </div>
    )
}