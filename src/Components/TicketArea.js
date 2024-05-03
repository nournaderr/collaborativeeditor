import { useState } from "react";
import Ticket from "./Ticket";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../styles/Home.css';
import '../styles/TicketArea.css';
import { useNavigate } from "react-router-dom";

export default function TicketArea({ticket}) {
    const [amount,setAmount] = useState(0);
    const navigate = useNavigate();
    const handleAdd = () => {
        setAmount(amount+1)
    }
    const handleSub = () => {
        if(amount > 0){
            setAmount(amount-1)
        }
    }
    const handleGetTicket = () => {
        navigate('/payment')
    }
    return(
        <div className="ticket-area">
            <Ticket ticket={ticket}/>
            <div className="qty">
                Quantity
                <div className="counter">
                    <button className="add-sub" onClick={handleSub}><RemoveIcon /></button>
                    {amount}
                    <button className="add-sub" onClick={handleAdd}><AddIcon /></button>
                </div>
                <button className="offers-btn ticket-btn" onClick={handleGetTicket}>Get Ticket</button>
            </div>
        </div>
    )
}