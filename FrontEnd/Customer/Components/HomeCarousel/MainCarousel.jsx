import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CarouselImages } from './MainCarouselImages/MainCarouselImages';

const items = CarouselImages.map((item, index) => (
  <img
    key={index}
    src={item.src}
    alt={`carousel-${index}`}
    className='max-h-[600px]'
    style={{
      width: "100%",
      objectFit: "contain",
      cursor: "pointer",
    }}
  />
));

const MainCarousel = () => (
  <AliceCarousel
    items={items}
    disableButtonsControls
    autoPlay
    autoPlayInterval={200}
    infinite
    animationDuration={800}
    disableDotsControls={false} // You can toggle dots (pagination) here
  />
);

export default MainCarousel;
