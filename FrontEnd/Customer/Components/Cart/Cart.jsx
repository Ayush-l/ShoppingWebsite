import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import KurtiFunction from "../data/kurtiF";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [data, changeData] = useState([]);
    const [q, changeQ] = useState(() => Array(data.length).fill(0));
    const navigate = useNavigate();
    const [isEmpty, changeEmpty] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const response = fetch("http://localhost:8080/cart/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        response.then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json()
        })
        .then(result => {
                const l = [];
                for (let i = result.length - 1; i >= 0; i--) l.push([result[i].id,result[i].item,result[i].size]);
                changeData(l);
                const initialQ = result.map((item)=> item.quantity)
                changeQ(initialQ);
                changeEmpty(false)
            })
            .catch(() => {
                localStorage.removeItem("jwt");
                navigate("/login");
            })
    }, [])

    const findPrice = () => {
        let c = 0;
        for (let i in q) {
            if (data[i][1].price) {
                c += parseInt(data[i][1].price) * q[i];
            }
        }
        return c;
    }
    const findDiscount = () => {
        let disc = 0;
        for (let i in q) {
            disc += (data[i][1].price - data[i][1].discountedPrice) * q[i];
        }
        return disc;
    }

    const [price, changePrice] = useState(0);
    const [discount, changeDiscount] = useState(0);
    useEffect(() => {
        changePrice(findPrice());
        changeDiscount(findDiscount());
        let fb = true;
        for (let i in q) {
            if (q[i]) {
                fb = false;
                break;
            }
        }
        if (fb) {
            changeEmpty(true);
        }
        else {
            changeEmpty(false);
        }
    }, [q])

    return (
        (isEmpty) ?
            <div className="flex flex-col justify-center items-center" style={{ height: "590px" }}>
                <h1 className="mt-10 mx-100">Your cart is empty</h1>
            </div>

            :

            <div className="lg:m-15 sm:m-5 lg:gap-20 lg:grid grid-cols-3">
                <div className="col-span-2">
                    {data.map((item, index) => (
                        <CartItem key={index} item={item[1]} q={q} idx={index} change={changeQ} id={item[0]} size={item[2]} />
                    ))}
                </div>
                <div className="border text-center pb-10 max-h-100 rounded">
                    <p className="font-bold opacity-60 pb-4 pt-3"> Price Details</p>
                    <hr />
                    <div className="mb-3">
                        <div className="flex justify-between items-center pt-5 pb-5 pl-10 pr-10">
                            <p>Price</p>
                            <p>{'₹' + price}</p>
                        </div>
                        <div className="flex justify-between items-center pt-5 pb-5 pl-10 pr-10">
                            <p>Discount</p>
                            <p className="text-green-600">{'₹' + discount}</p>
                        </div>
                        <div className="flex justify-between pt-5 pb-5 items-center pl-10 pr-10">
                            <p>Shipment</p>
                            <p className="text-green-600">{(price - discount > 1500) ? "Free" : "₹50"}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between pt-5 pb-5 items-center pl-10 pr-10 font-semibold">
                            <p>Final Price</p>
                            <p> {"₹" + ((price - discount) > 1500 ? price - discount : price - discount + 50)} </p>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/checkout?step=2')} variant="contained" sx={{ width: "90%", px: "2.5rem", py: ".7rem", bgcolor: "#d5" }}>Check Out</Button>
                </div>
            </div>
    )
}