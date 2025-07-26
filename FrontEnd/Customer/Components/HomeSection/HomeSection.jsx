import React, { useEffect, useRef, useState } from "react";
import useHomeSectionCardDetails from "../HomeSectionCard/HomeSectionCardDetails";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";




const HomeSection = () => {

    const [items, changeItems] = useState([])
    const data = useHomeSectionCardDetails();


    useEffect(() => {
        if (data) {

            changeItems(
                data.map((x, index) =>
                    <HomeSectionCard
                    key={index}
                    title={x.title}
                    discription={x.discription}
                    src={x.imageUrl}
                    id={x.id}
                    />
            ));
        }
    }, [data]);
    return (
        <div className="my-10 relative px-4 lg:px-8 flex flex-wrap gap-3 justify-between">
            {data.map((x,index)=><HomeSectionCard src={x.imageUrl} title={x.title} description={x.description} id={x.id} key={index} />)}
        </div>
    )
}

export default HomeSection;