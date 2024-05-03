import logo from '../Assets/Your-Airlines.svg'
import plane from '../Assets/Small_white_airplane.svg'
import barcode from '../Assets/Barcode.svg'
export default function Ticket({ticket}){
    return(
        <div className="ticket-card">
            <div className="ticket-left"><img src={logo} style={{width:55,objectFit:'cover', marginLeft:'10px', marginTop:'20px',fontFamily:'Montserrat'}} /></div>
            <div className="ticket-middle">
                <div className="middle-top">
                    <div className='mid-top-title'>
                        <img src={plane} style={{marginTop:6,height:24, objectFit:'cover', marginRight:30}}/> BOARDING PASS
                    </div>
                    
                </div>
                <div className='middle-content'>
                    <div className='ticket-details'>
                        <div className='details-title'>From<br/><span>{ticket.from}</span></div>
                        <div className='details-title'>To<br/><span>{ticket.to}</span></div>
                        <div className='gates'>
                        <>
                            <div className='details-title'>Gate<br /><span>{ticket.gate}</span></div>
                        </>
                        <>
                            <div className='details-title'>Seat<br/><span>{ticket.seat}</span></div>
                        </>
                        {/* <img src={}></img> */}
                        </div>
                        <div className='details-note'>*Gate Closes 30 Minutes Before Departure</div>
                    </div>
                    <div className='details-right'>
                        <div className='price-date'>
                    <div className='details-title'>Price<br/><span>${ticket.price}</span></div>
                    <div>
                    <div className='details-title'>Date<br/><span>{ticket.date}</span><br/></div>
                    <div className='details-title'>Time<br/><span id='time'>{ticket.time}</span>
                    </div>
                    </div>
                    
                    </div>
                    <div className='barcode'>
                    <img src={barcode} style={{ height:30,width:210,objectFit:'cover', margin:'auto'}}/>
                    </div>
                    
                    </div>
                </div>
            </div>
            <div className='dotted' />
            <div className="ticket-right">
                <div className="right-top">
                    <p>BOARDING PASS</p>
                </div>
                <div className='right-bottom'>
                <div className='details-title smaller'>From<br/><span>{ticket.from}</span></div>
                <div className='details-title smaller'>To<br/><span>{ticket.to}</span></div>
                <div className='right-date'>
                <div className='details-title smaller'>Flight<br/><span>{ticket.flight}</span></div>
                <div className='details-title smaller'>Date<br/><span>{ticket.date}</span></div>
                </div>
                <div className='right-date'>
                <div className='details-title smaller gatess'>Gate<br/><span>{ticket.gate}</span></div>
                <div className='details-title smaller gatess'>Seat<br/><span>{ticket.seat}</span></div>
                <div className='details-title smaller gatess'>Time<br/><span>{ticket.time}</span></div>
                </div>
                </div>
            </div>
        </div>
    )
}