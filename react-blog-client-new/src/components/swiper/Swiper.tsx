import SwiperCore, { Navigation, EffectCube, Pagination, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-cube/effect-cube.scss";
// install Swiper components
import "./swiper.scss";
SwiperCore.use([Navigation, EffectCube, Autoplay, Pagination]);
function SwiperController() {
    return (
        <Swiper
            navigation
            loop={true}// 循环轮播
            speed={500}// 动画转化时间
            effect={"cube"}
            cubeEffect={{
                slideShadows: true,
                shadowOffset: 10
            }}
            autoplay={{
                waitForTransition: true,
                disableOnInteraction: true
            }}
            pagination={{ clickable: true }}
        // onSlideChange={() => console.log("slide change")}
        >
            <SwiperSlide >
                <img src={require("./img/1.jpg").default} alt="" />
            </SwiperSlide>
            <SwiperSlide >
                <img src={require("./img/2.jpg").default} alt="" />
            </SwiperSlide>
            <SwiperSlide >
                <img src={require("./img/3.jpg").default} alt="" />
            </SwiperSlide>
            <SwiperSlide >
                <img src={require("./img/4.jpg").default} alt="" />
            </SwiperSlide>
        </Swiper>
    );
}
export default SwiperController;