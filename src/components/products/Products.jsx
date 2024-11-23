import Slider from 'react-slick'; 
import useFetchData from '/public/data/DATA.JS';
import { CartContext } from "../context/cartcontexte"; 
import { useContext } from 'react';

import 'react-toastify/dist/ReactToastify.css';  

export default function Products() {
    const { data } = useFetchData();
    const { state, dispatch } = useContext(CartContext); 
    
    const handleAddItem = (item) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: item,
        });

    };

    const isItemInCart = (id) => {
        return state.items.some((item) => item.id === id);
    };

    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 3, 
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1, 
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
        <h1 className='text-slate-500 font-semibold text-light p-4 rounded-md mt-20 mb-5 text-3xl'>
            The Best Products This Month
        </h1>
        <hr />
        <Slider {...settings}>
            {
                data.map((item) => {
                    const { id, title, images, finalPrice, originalPrice } = item;

                    return (
                        <div key={id} className="flex justify-center items-center p-4">
                            <div className="bg-white shadow-lg rounded-lg flex flex-col items-center justify-between p-6 transition-transform transform hover:scale-105">
                                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                                <h2 className="hero_price text-xl font-bold text-green-600 mt-4">
                                    {finalPrice} $ / 
                                    <small><del>{originalPrice} $</del></small>
                                </h2>
                                <figure className="hero_item_img mt-4">
                                    <img className="w-40 h-40 object-cover rounded-md" src={images[0]} alt="product-img" />
                                </figure>
                                <button
                                    onClick={() => handleAddItem(item)} 
                                    className={`mt-4 p-3 w-64 rounded-md text-white transition ${
                                        isItemInCart(item.id)
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-slate-600 hover:bg-slate-300"
                                    }`}
                                >
                                    {isItemInCart(item.id) ? "Added" : "Add To Cart"}
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </Slider>
        
        </>
    );
}
