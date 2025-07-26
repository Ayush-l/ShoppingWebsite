import React,{useState} from "react";
import {Grid} from "@mui/material";
import KurtiFunction from "../data/kurtiF";
import OrderCard from "./OrderCard";



const data=KurtiFunction()
for(let i of data){
    i.orderStatus=[1,Math.floor(Math.random() *2),Math.floor(Math.random() *2),Math.floor(Math.random() *2)];
    if(i.orderStatus[3]===1){
        i.orderStatus[1]=0;
        i.orderStatus[2]=0;
        i.orderStatus[0]=0;
    }
    if((i.orderStatus[2]===1)){
        i.orderStatus[1]=0;
        i.orderStatus[0]=0;
    }
    else if(i.orderStatus[1]===1){
        i.orderStatus[0]=0;
    }
}

const Order = () => {
    const orderStatus=[
        {label:"On the way",value:"ontheway"},
        {label:"Delivered",value:"Delivered"},
        {label:"Cancelled",value:"Cancelled"},
        {label:"Returned",value:"Returned"},
    ]
    const [orderData,setOrderData]=useState(data);
    const [requiredClasses,changeRequiredClasses]=useState([false,false,false,false])

    const handle=(index)=>{
        requiredClasses[index]=!requiredClasses[index];
        changeRequiredClasses([...requiredClasses])
        if(requiredClasses[0]==requiredClasses[1]&&requiredClasses[0]==requiredClasses[2]&&requiredClasses[0]==requiredClasses[3]&&requiredClasses[0]==false){
            setOrderData(data)
            return;
        }
        let tempData=[]
        for(let i of data){
            if(requiredClasses[0]&&requiredClasses[0]==i.orderStatus[0]){
                tempData.push(i)
            }
            if(requiredClasses[1]&&requiredClasses[1]==i.orderStatus[1]){
                tempData.push(i)
            }
            if(requiredClasses[2]&&requiredClasses[2]==i.orderStatus[2]){
                tempData.push(i)
            }
            if(requiredClasses[3]&&requiredClasses[3]==i.orderStatus[3]){
                tempData.push(i) 
            }
        }
        setOrderData(tempData)
    }
    return (
        <div>
            <Grid container sx={{justifyContent:"space-x-10"}}>
                <Grid size={{sm:2.5,xs:11}} className="ml-5">
                    <div className="grid sticky h-auto shadow-lg bg-white p-5 top-5 justify-center">
                        <h1 className="font-bold text-lg">Filter</h1>
                        <div className="space-y-4 mt-10">
                            <h1 className="font-semibold">Order Status</h1>
                            <div>
                                {orderStatus.map((option,index)=>(
                                    <div className="flex items-center mb-4" key={index}>
                                        <input type="checkbox" defaultValue={option.value} onClick={()=>handle(index) } className="mr-5 sm:mr-3"/>
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid size={{sm:9,xs:11}}>
                    {
                        orderData.map((item,index)=>(
                            <div key={index} className="shadow-xl m-5 hover:shadow-2xl transition duration-300 ease-in-out">
                                <OrderCard data={item}></OrderCard>
                            </div>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Order;