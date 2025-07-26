import React,{useState} from "react";
import {Grid} from "@mui/material";

const OrderCard = ({data}) => {
    return (
        <div className="flex space-x-4 flex-wrap justify-around mx-5 py-5 items-center">
            <img src={data.src} className="h-40"/>
            <Grid size={4}>{data.title}</Grid>
            <p className="font-semibold">${data.currentPrice}</p>
            <Grid size={2}>
                {(data.orderStatus[3]===1)?<p className="text-red-500">Returned</p>:
                (data.orderStatus[2]===1)?<p className="text-red-500">Cancelled</p>:
                (data.orderStatus[1]===1)?<p className="text-green-500">Delivered</p>:
                <p className="text-green-500">On the way</p>}
            </Grid>
        </div>
    )
}

export default OrderCard;