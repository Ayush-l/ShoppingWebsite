import React from "react";
import { Link } from "react-router-dom";


const HomeSectionCard=({src,title,discription,id})=>{
    return (
        <Link to={`/product?id=${id}`}>
            <div style={{width:"200px"}} className="productCard m-3 transition-all cursor-pointer">
                <div>
                    <img src={src}/>
                </div>
                <div>
                    <h3> {title} </h3>
                    <p> {discription} </p>
                </div>
            </div>
        </Link>
    )
}

export default HomeSectionCard;