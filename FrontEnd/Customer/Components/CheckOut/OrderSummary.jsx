import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import { useNavigate, useLocation } from "react-router-dom";


export const OrderSummary=()=>{
    const [address,changeAddress] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const querySearch= new URLSearchParams(location.search);
        const id = querySearch.get("id");
        if(id){
            fetch(`http://localhost:8080/address/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            }).then((res)=>{
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            }).then((result)=>{
                changeAddress(result);
            })
            .catch(()=>{
                localStorage.removeItem("jwt");
                navigate("/login");
            })
        }
    },[location.search]);
    if(address){
        return (
            <div>
                <div className="p-5 shadow-lg rounded-s-md border lg:mx-50 xs:mx-8 sm:mx-9 my-5">
                    <div className="w-[90%] cursor-pointer mb-4">
                        <p>{address.firstName + " " + address.lastName}</p>
                        <div className="space-y">
                            <p className="font-semibold">{address.mobile}</p>
                            <p>{`${address.street}, ${address.city}, ${address.state}`}</p>
                            <p className="font-semibold">{address.zipCode}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="p-5 shadow-lg rounded-s-md border lg:mx-50 xs:mx-8 sm:mx-9 my-5">
                        <h1 className="text-center font-semibold">Cash on Delivery</h1>    
                    </div>
                </div>
                <SummaryCards/>
            </div>
        )
    }
    return <div>Loading...</div>
}

export default OrderSummary