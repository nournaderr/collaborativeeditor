import { useEffect, useState } from "react"
import Deal from './Deal'

import fireicon from '../../Assets/fire.svg'
export default function Deals(){
    const [dealsList,setDealsList] = useState([])
    
    useEffect(()=>{
        const loadDeals = () => {
        const deal =[
            {
                title: 'Cox\'s Bazar - the never ending beach',
                imageUrl: '../../Assets/Capture.png',
                price: 2500,
                duration: 5
            },{
                title: 'Cox\'s Bazar - the never ending beach',
                imageUrl: '../../Assets/Capture.png',
                price: 2500,
                duration: 5
            },{
                title: 'Cox\'s Bazar - the never ending beach',
                imageUrl: '../../Assets/Capture.png',
                price: 2500,
                duration: 5
            },{
                title: 'Cox\'s Bazar - the never ending beach',
                imageUrl: '../../Assets/Capture.png',
                price: 2500,
                duration: 5
            },
        ]
        setDealsList(deal);
        }
        loadDeals()
    },[])
    return(
        <>

        <div className="deals-header"><img src={fireicon} style={{height:30,width:30, position:"relative",top:5, marginRight:10, marginTop:10}}/>Hot Deals</div>
        <div className="deals-container">
            {dealsList.map((deal) =>
                (<Deal deal={deal} />)
            )}
        </div>
        </>
    )
}