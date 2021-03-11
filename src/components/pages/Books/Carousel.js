import img from "../../../assets/testimg.jpeg";
import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import styles from "./ModalView.module.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Carousel = ({ images }) => {
  return (
    <CarouselProvider
      infinite={true}
      isPlaying={true}
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={images.length}
    >
      <Slider style={{ height: "300px" }}>
        {images.map((image, index) => (
          <Slide index={index} key={image.id}>
            <img
              src={`data:image/jpg;base64,${image.img}`}
              alt=""
              className={styles.img}
            />
          </Slide>
        ))}
      </Slider>

      <div className={styles.btnArea}>
        <ButtonBack className={styles.btnBack}>
          <AiFillCaretLeft />
        </ButtonBack>
        <ButtonNext className={styles.btnNext}>
          <AiFillCaretRight />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default Carousel;
