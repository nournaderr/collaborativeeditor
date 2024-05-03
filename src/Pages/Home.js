import Footer from "../Components/Footer"
import About from "../Components/Home/About"
import FlightSearch from "../Components/Home/FlightSearch"
import Nav from "../Components/Nav"
import Deals from "../Components/Home/Deals"
import '../styles/Home.css'
import Offers from "../Components/Home/Offers"
export default function Home() {
    return(
        <div>
            <Nav />
            <div className="home-body">
                <About />
                <FlightSearch />
                <Deals id="deals"/>
                <Offers />
            </div>
            <Footer/>
        </div>
        
    )
}