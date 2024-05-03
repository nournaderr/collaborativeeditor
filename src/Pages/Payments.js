import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import '../styles/Payments.css'
import '../styles/Login.css'
import cardLogo from '../Assets/_x35_.svg';
import creditCards from '../Assets/Mask Group 3.png'
import Lottie from "lottie-react";
import paylot from '../lotties/animation_lk7ztl26.json'
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Payments (){
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()
  
    const handleClickOpen = () => {
        console.log(open)
        setOpen(true);
        console.log(open)
      };
    
      const handleClose = () => {
        setOpen(false);
        navigate('/')
        console.log(open)
      };
    return(
        <>
            <Nav />
            <div className="payment-body">
                <div className="payment-left">
                <h2 className="payment-header"><img src={cardLogo} className="payment-icon" /> Payment</h2>
                <div className="payment-form" >
                    <label className="payment-label">Card number:</label>
                    <input className="payment-input"></input>
                    <label className="payment-label">Card name:</label>
                    <input className="payment-input"></input>
                    <div className="flex">
                        <div className="hauto">
                        <label className="payment-label">Expiry Date:</label>
                        <input className="payment-input small-input"></input>
                        </div>
                        <div className="hauto">
                        <label className="payment-label">CVV:</label>
                        <input className="payment-input small-input"></input>
                        </div>
                    </div>
                    <button className="offers-btn pay-btn" onClick={handleClickOpen}>Checkout</button>
                </div>
                
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{sx:{'height':'400px','width':'500px','borderRadius':'40px'}}}
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent className="dialog">
          {/* <DialogContentText id="alert-dialog-description" className="dialog">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
          <div className="payment-lottie">
            <Lottie loop={true} animationData={paylot} style={{width: 250, height: 250}} />
            <div className="paydone">Payment Done</div>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
      </div>
                </div>
                <img src={creditCards} className='credit-cards' />
                
            </div>
            <Footer />
        </>
    )
}