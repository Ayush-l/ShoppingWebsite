import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel } from "@mui/material";

const steps=[
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
]

const OrderTracking = ({activeStep}) => {
    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step>
                        <StepLabel sx={{color: "#9155d",fontSize:"44px"}}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}
export default OrderTracking