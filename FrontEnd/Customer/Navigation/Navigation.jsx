'use client'
import React from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBIcon } from 'mdb-react-ui-kit'


export default function Navigation() {
  const navigate=useNavigate();

  return (
    <div className="bg-white">

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹1500
        </p>

        <nav aria-label="Top" className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <MDBIcon icon="gem" className="me-3 fa-2x cursor-pointer" style={{color:"blue"}} onClick={() => navigate("/")}/>

              <div className="ml-auto flex items-center">
                <div className="flex flex-1 items-center justify-end space-x-6">
                  <a onClick={()=>{
                    navigate("/login")
                    localStorage.removeItem("jwt")
                  }} className="text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer">
                    Log Out
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                </div>
                



                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
export { Navigation };