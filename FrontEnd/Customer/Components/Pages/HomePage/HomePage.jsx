import React from "react";
import MainCarousel from "../../HomeCarousel/MainCarousel";
import HomeSection from "../../HomeSection/HomeSection.jsx";

const HomePage=()=>{
    return (
        <div className="-z-10">
            <MainCarousel/>
            <div>
                <HomeSection/>
            </div>
        </div>
    )
}

export default HomePage;