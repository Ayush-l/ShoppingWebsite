'use client'
import Rating from '@mui/material/Rating';
import ProductCard from "../Product/ProductCard"
import Box from '@mui/material/Box';
import { useState } from 'react'
import React from 'react'
import { Button, Grid, LinearProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { RadioGroup, Radio } from '@mui/material';
import { ProductReviews } from './ProductReviews';

export default function ProductDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(-1)
  const [index, changeIndex] = useState(0);
  const color = ["success", "primary", "info", "warning", "error"]
  const text = ["Excellent", "Very Good", "Good", "Average", "Poor"]
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          }
        })
        const data = await response.json()
        data.sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        data.totalRatings = data.ratings.reduce((acc, curr) => acc + curr, 0);
        setProduct(data)
        setSelectedSize(-1)
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setLoading(false)
      }
      try {
        const fetchData = async () => {
          const response = await fetch("http://localhost:8080/product/getAll", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
          });
          const result = await response.json();
          setData(result);
        };
        fetchData();
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (id) fetchProduct()
  }, [id])

  if (loading) return <div>Loading...</div>


  return (
    <div className="bg-white pb-20">
      <div className="pt-6">
        <section className='grid grid-cols-1 lg:grid-cols-2 px-4 gap-y-10 pt-10'>
          <img src={product.imageUrl} alt={product.name} loading="lazy" className="w-full h-auto max-h-[500px] object-contain rounded" />
          {/* Product info */}
          <div className="lg:col-span-1 max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product.name}</h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60">{product.description}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className='flex space-x-6 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900 inline">{" ₹" + product.discountedPrice + " "}</p>
                <p className="text-3xl tracking-tight text-gray-900 opacity-60 line-through inline">{" ₹" + product.price + " "}</p>
                <p className="tracking-tight text-2xl font-semibold text-green-600">{product.discountPer} %off</p>
              </div>
              {/* Reviews */}
              <div className="mt-6">
                <div>
                  <div className='flex items-start space-x-5'>
                    <Rating name="read-only" value={(product.ratings[0] + 2 * product.ratings[1] + 3 * product.ratings[2] + 4 * product.ratings[3] + 5 * product.ratings[4]) / (product.totalRatings)} readOnly />
                    <p className='opacity-50 text-indigo-600  font-medium hover:text-indigo-500'>{product.totalRatings}{(product.totalRatings > 1) ? " Reviews" : " Review"}</p>
                  </div>
                </div>
              </div>

              <form className="mt-10">
                <div className="mt-10">

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup value={selectedSize} onChange={(e) => {
                      if (product.quantity[e.target.value]) {
                        setSelectedSize(e.target.value)
                      }
                    }}
                      className="grid grid-cols-6 gap-3"
                    >
                      {product.sizes.map((size, index) => (
                        <label
                          key={index}
                          className={`uppercase${product.quantity[index]
                            ? 'cursor-pointer text-gray-900 shadow-xs'
                            : 'cursor-not-allowed text-gray-200'}}
                              select-none
                            `}
                        >
                          <Radio
                            value={index}
                            disabled={!product.quantity[index]}
                            className="hidden"
                          />
                          <span className={`inline-block w-10 h-10 text-center leading-20 rounded-full border-0${selectedSize === index ? 'bg-indigo-100' : 'bg-white'}`}>
                            {size}
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button onClick={() => {
                  if (selectedSize === -1) alert("Please select a size")
                  else {
                    fetch(`http://localhost:8080/cart/${id}/${selectedSize}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                      }
                    }).then((res)=>{
                      console.log(res)
                      if(res.ok){
                        navigate('/cart')
                      }
                      else{
                        alert("Something went wrong, please try again later")
                      }
                    })
                  }
                }} color="secondary" variant="contained" sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", mt: "2rem" }}
                >
                  Add to bag
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <h2 className='text-3xl pl-10'>Recent reviews</h2>
          <div className="border border-gray-300 ml-10 mr-10 mt-2 mb-2 pt-5 rounded pb-10">
            <div>
              <div className='grid justify-end'>
                <h1 className='font-semibold pl-1'>Product Ratings</h1>
                <div className='flex space-x-5 mr-41'>
                  <Rating name="read-only" value={(product.ratings[0] + 2 * product.ratings[1] + 3 * product.ratings[2] + 4 * product.ratings[3] + 5 * product.ratings[4]) / (product.totalRatings)} readOnly />
                  <p className='opacity-50 text-indigo-600  font-medium hover:text-indigo-500'>{product.totalRatings}{(product.totalRatings > 1) ? " Reviews" : " Review"}</p>
                </div>
              </div>
              {product.ratings.map((value, index) => (
                <Box key={index} className="mt-5">
                  <Grid container spacing={0} justifyContent="end" alignItems="center" className="gap-0">
                    <Grid>
                      <p>{text[index]}</p>
                    </Grid>
                    <Grid>
                      <LinearProgress color={color[index]}
                        value={(product.ratings[4 - index] * 100) / product.totalRatings} sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} className='ml-5 mr-20 w-50' variant="determinate" />
                    </Grid>

                  </Grid>
                </Box>
              ))}
            </div>
            {
              product.reviews.map((item, index) => (
                <div key={index}>
                  <ProductReviews name={item.name} date={item.date} message={item.message} value={item.rating} />
                </div>
              ))
            }
          </div>
        </div>
        {/* Similar Products */}
        <section className='pt-10'>
          <h1 className='text-3xl pl-8'>Similar Products</h1>
          <div className='gap-1 overflow-auto flex flex-wrap justify-around'>
            {data && data.slice(data.length - 10).map((value, index) => (
              <ProductCard title={value.title} src={value.imageUrl} price={value.discountedPrice} oldPrice={value.price} key={index} id={value.id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
