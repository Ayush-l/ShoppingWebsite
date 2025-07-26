import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const AddressCard=()=>{
    const [addresses, setAddresses] = React.useState([]);
    const navigate = useNavigate(); 
    useState(() => {
        fetch("http://localhost:8080/user/address", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        }).then((res)=>{
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        }).then((result)=>{
            setAddresses(result);
        })
        .catch(()=>{
            localStorage.removeItem("jwt");
            navigate("/login");
        })
    },[])
    return(
        <div>
            {addresses.length>0? addresses.map((address,index)=>(
                <div key={index} onClick={()=>{
                    navigate("/checkout?step=3&id="+address.id)
                    window.location.reload();
                    }} className="w-[90%] cursor-pointer border-b-2 border-b-black mb-4">
                    <p>{address.firstName+" "+address.lastName}</p>
                    <div className="space-y">
                        <p className="font-semibold">{address.mobile}</p>
                        <p>{address.street+", "+address.city+", "+address.state}</p>
                        <p className="font-semibold">{address.zipCode}</p>
                    </div>
                </div>
            )):
            <div className="text-center">
                <p className="text-gray-500">No Address Found</p>
            </div>
            }
        </div>
    )
}

export default AddressCard;