import { useEffect, useState } from "react"
import offerPic from '../../Assets/philipp-kammerer-6Mxb_mZ_Q8E-unsplash.png'
import gifticon from'../../Assets/gift.png'
export default function Offers (){
    const [offersList, setOffersList] = useState([])

    useEffect(()=>{
        const loadOffers = () => {
            const offer = [
                {
                    title: 'New Year, New Adventures',
                    description: 'Save 15% or more when you book before 31 March 2024'
                },{
                    title: 'New Year, New Adventures',
                    description: 'Save 15% or more when you book before 31 March 2024'
                },{
                    title: 'New Year, New Adventures',
                    description: 'Save 15% or more when you book before 31 March 2024'
                },
            ]
            setOffersList(offer)
        }
        loadOffers()
    },[])
    return(
        <>
            <div className="offers-header"><img src={gifticon} style={{height:25,width:25, marginRight:10, position:"relative",top:5}}/>Offers</div>
            <div className="offers-container">
                {offersList.map((offer) => (
                    <div className="offer">
                        <img src={offerPic} className="offer-img" />
                        <div className="offer-title">{offer.title}</div>
                        <div className="offer-desc">{offer.description}</div>
                        {/* <button className="offers-btn in-btn">Offers</button> */}
                    </div>
                ))
                
            }
            </div>

        </>
    )
}