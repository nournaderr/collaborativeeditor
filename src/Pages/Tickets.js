import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import '../styles/Tickets.css';
import ticketicon from "../Assets/airplane-ticket.svg"
import Ticket from "../Components/Ticket";
import TicketArea from "../Components/TicketArea";
import airplogo from "../Assets/Small_white_airplane.svg";
import greyplane from '../Assets/grey_airplane.svg'
import { useEffect, useState } from "react";
export default function Tickets () {
    const [tickets,setTickets] = useState([])
    
    useEffect(()=>{
        const fetchTickets = () => {
            const response = [
                {
                    from:'Cairo',
                    to:'Alexandria',
                    price: 200,
                    date:'20 DEC 2023',
                    time:'19:00',
                    gate:'02',
                    seat:'19C',
                    flight:'92ER5'
                },
                {
                    from:'Cairo',
                    to:'Alexandria',
                    price: 220,
                    date:'22 DEC 2023',
                    time:'11:00',
                    gate:'03',
                    seat:'12E',
                    flight:'36D8O'
                },
                {
                    from:'Cairo',
                    to:'Alexandria',
                    price: 130,
                    date:'17 DEC 2023',
                    time:'22:00',
                    gate:'01',
                    seat:'01a',
                    flight:'127RU3'
                },
                {
                    from:'Cairo',
                    to:'Alexandria',
                    price: 220,
                    date:'22 DEC 2023',
                    time:'11:00',
                    gate:'03',
                    seat:'12E',
                    flight:'36D8O'
                }
            ]
            setTickets(response)
        }
        fetchTickets()
    },[])

    return(
        <>
            <Nav />
            <div className="tickets">
            <h2 className="ticket-header"><img src={ticketicon} style={{height:30, marginRight:15, position: 'relative', top:5}}/>Tickets List</h2>
            <div>
            {tickets.map((ticket)=>(
                <>
                <TicketArea ticket={ticket}/>
                <div className="ticket-line">
                    <img src={greyplane} className="line-logo"></img>
                    <div className="line"></div>
                    <img src={greyplane} className="line-logo mirror"></img>
                </div>
                </>
            ))}
            
            </div>
            </div>
            <Footer />
        </>
    )
}