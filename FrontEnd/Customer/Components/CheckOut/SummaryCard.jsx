import React, { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from "react-router-dom";

const checkSize = (size) => {
    switch (size) {
        case 0:
            return "S";
        case 1:
            return "M";
        case 2:
            return "L";
        case 3:
            return "XL";
        case 4:
            return "XXL";
        case 5:
            return "XXXL";
    }
}

const SummaryCard=({item,q,idx,change,id,size})=>{
    if(q[idx]){
        return(
        <div className="p-5 shadow-lg border-gray-300 rounded-md mb-5 mt-5 hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                    <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                        <img className="w-full h-full object-coverobjext-top" src={item.imageUrl} alt="" />

                    </div>
                    <div className="ml-5 space-y-1">
                        <p className="font-semibold">{item.brand}</p>
                        <p className="opacity-70">Size: {checkSize(size)}</p>
                        <p className="opacity-70 mt-2">{item.title}</p>
                        <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                            <p className="font-semibold">${item.discountedPrice}</p>
                            <p className="opacity-50 line-through">${item.price}</p>
                            <p className="text-green-600 font-semibold">{Math.round(((item.price-item.discountedPrice)*100)/item.price)}% Off</p>
                        </div>
                    </div>
                </div>
                <div className="ml-4 flex flex-wrap space-x-2 mt-2">
                    Quantity:
                    <div className="border-gray-900 bg-gray-100 w-10 text-center rounded p-1">{q[idx]}</div>
                </div>
            </div>
            )
        }
    }


export default SummaryCard;