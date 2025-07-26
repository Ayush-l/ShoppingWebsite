import React, { useState,useEffect } from "react";
import {HorizontalLinearStepper} from "./Stepper"
import DeliveryAddressForm from "./DeliveryAddressForm"
import Login from "../Login/Login"
import OrderSummary from "./OrderSummary"


export const CheckOut=()=>{
    const [activeStep, setActiveStep] = useState(1);
    useEffect(() => {
        const querySearch = new URLSearchParams(location.search);
        const step = parseInt(querySearch.get("step"));
        if (step) {
            setActiveStep(step);
        }
      }, [location.search]);
    return(
        <>
        <HorizontalLinearStepper activeStep={activeStep-1}/>
        {(activeStep===2)?<DeliveryAddressForm/>:(activeStep==1)?<Login/>:<OrderSummary/>}
        </>
    )
}