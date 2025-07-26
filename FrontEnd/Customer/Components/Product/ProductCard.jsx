import React from "react";
import "./ProductCard.css"
import { useNavigate } from "react-router-dom";

const ProductCard=({title,src,price,oldPrice,id})=>{
    const navigate=useNavigate()
    return(
        <>
            <div onClick={()=>navigate(`/product?id=${id}`)} className="productCard w-[15rem] m-3 transition-all cursor-pointer">
                <div>
                    <img src={src} loading="lazy"/>
                </div>
                <div className="textPart">
                    <p className="font-bold opacity-60">{title}</p>
                    <div className="font-semibold">
                        <p className="font-semibold">₹{price}</p>
                        <p className="line-through opacity-50">₹{oldPrice}</p>
                        <p className="text-green-600 font-semibold">{parseInt(100*(oldPrice-price)/oldPrice)}%off</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard;