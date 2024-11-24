import Slider from "react-slick";
import useFetchData from "/public/data/DATA.JS";
import { useTranslation } from "react-i18next";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const { t } = useTranslation(); // Access translation function
  const { data } = useFetchData();

  // Filter products for the slider
  const heroProducts = data.filter((item) => item.tag === "hero-product");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {heroProducts.map((item, i) => {
        const { id, heroImage, finalPrice, originalPrice } = item;

        return (
          <div
            key={id}
            className={`relative wrapper hero_wrapper hero_slide-${i} mt-14 h-[400px]`}
          >
            {/* Text Section */}
            <div className="absolute left-10 top-1/2 transform -translate-y-1/2 w-full sm:w-1/2">
              <h2 className="hidden sm:block text-2xl sm:text-5xl font-semibold text-gray-800">
                {t(`hero_slider.title_${i + 1}`)}
              </h2>
              <h1 className="hidden sm:block text-xl sm:text-4xl font-bold text-gray-900 mt-2">
                {t(`hero_slider.tagline_${i + 1}`)}
              </h1>

              {/* Price Section */}
              <h2 className="hidden sm:block hero_price text-2xl sm:text-4xl font-bold text-green-600 mt-4">
                {finalPrice} $ /
                <small className="line-through text-gray-500 ml-2">
                  {originalPrice} $
                </small>
              </h2>
            </div>

            {/* Image Section */}
            <figure className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <img
                className="w-80 sm:w-96 h-auto object-cover"
                src={heroImage}
                alt={t(`hero_slider.title_${i + 1}`)}
              />
            </figure>
          </div>
        );
      })}
    </Slider>
  );
};

export default HeroSlider;
