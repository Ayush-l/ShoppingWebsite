import React from "react";
import "./ProductCard.css"
import KurtiFunction from "../data/kurtiF"
import ProductCard from "./ProductCard"

export const ProductWrapper=()=>{
    const l=KurtiFunction();
    let i=0;
    return(
        <div className="productWrapper">
            {
                l.map((row)=>(
                    <ProductCard key={i++} title={row.title} price={row.currentPrice} oldPrice={row.oldPrice} src={row.src}/>
                ))
            }
        </div>
    )
}