import { useContext } from "react";
import { CartContext } from "../context/cartcontexte";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart, FaCreditCard } from "react-icons/fa"; 
import { useTranslation } from "react-i18next"; 

const CartPage = () => {
    const { state, dispatch } = useContext(CartContext);
    const { t } = useTranslation(); 

    const handleRemoveItem = (itemId) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: itemId,
        });
    };

    const handleIncrement = (itemId) => {
        dispatch({
            type: "INCREMENT_QUANTITY",
            payload: itemId,
        });
    };

    const handleDecrement = (itemId) => {
        dispatch({
            type: "DECREMENT_QUANTITY",
            payload: itemId,
        });
    };

    const totalPrice = state.items.reduce((total, item) => {
        return total + item.finalPrice * item.quantity;
    }, 0);

    return (
        <div className="cart-page flex flex-col sm:flex-row gap-6 w-full max-w-7xl mx-auto p-8">
            <div className="right-side w-full sm:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg mt-6 sm:mt-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('cartPage.totalPrice')}{totalPrice.toFixed(2)} $</h2>

                <div className="flex flex-col gap-4">
                    <Link
                        to="/payment"
                        className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-green-600 transition"
                    >
                        <FaCreditCard />
                        {t('cartPage.checkOut')}
                    </Link>

                    <Link
                        to="/"
                        className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                    >
                        <FaShoppingCart />
                        {t('cartPage.continueShopping')} 
                    </Link>
                </div>
            </div>
            <div className="left-side w-full sm:w-2/3">
                <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                    <FaShoppingCart />
                    {t('cartPage.title')} 
                </h1>

                {state.items.length === 0 ? (
                    <p className="bg-gray-500 rounded-md p-10 text-3xl text-white">{t('cartPage.emptyCart')}</p> 
                ) : (
                    <ul>
                        {state.items.map((item) => (
                            <li key={item.id} className="mb-6 border-b pb-4 flex flex-col sm:flex-row items-center gap-4  shadow-xl">
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="w-32 h-32 object-cover rounded-md shadow-md"
                                />
                                <div className="flex-1">
                                    <h2 className="font-medium text-lg text-gray-800">{item.title}</h2>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>

                                {/* Quantity and Remove buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDecrement(item.id)}
                                            className="bg-gray-500 text-white p-2 rounded-md"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="font-medium text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrement(item.id)}
                                            className="bg-gray-500 text-white p-2 rounded-md"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="bg-red-500 text-white p-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2 mt-4 sm:mt-0"
                                    >
                                        <FaTrashAlt />
                                        {t('cartPage.remove')} 
                                    </button>
                                </div>
                                {/* Price */}
                                <span className="ml-6 font-medium text-lg">{item.finalPrice} $</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
        </div>
    );
};

export default CartPage;
