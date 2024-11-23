import { useContext } from "react";
import { CartContext } from "../context/cartcontexte";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart, FaCreditCard } from "react-icons/fa"; 
const CartPage = () => {
    const { state, dispatch } = useContext(CartContext);

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
        <div className="cart-page w-full max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <FaShoppingCart />
                Your Cart
            </h1>

            {state.items.length > 0 && (
                <div className="mt-6 flex justify-between items-center bg-gray-100 p-4 rounded-md">
                    <h2 className="text-2xl font-semibold bg-slate-400 p-2">
                        Total Price: {totalPrice.toFixed(2)} $
                    </h2>
                    <Link
                        to="/"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaCreditCard />
                        Check Out
                    </Link>
                    <Link
                        to="/"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaShoppingCart />
                        Continue Shopping
                    </Link>
                </div>
            )}

            {state.items.length === 0 ? (
                <p className="bg-gray-500 rounded-md p-10 text-3xl text-white">Your cart is empty</p>
            ) : (
                <ul>
                    {state.items.map((item) => (
                        <li key={item.id} className="mb-6 border-b pb-4">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mb-4">
                                <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover mb-4 sm:mb-0 sm:w-32 sm:h-32"
                                />
                                <div className="flex-1">
                                    <h2 className="font-medium text-lg">{item.title}</h2>
                                    <p className="text-gray-500">{item.description}</p>
                                </div>

                                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => handleDecrement(item.id)}
                                        className="bg-gray-500 text-white p-2 rounded-md"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => handleIncrement(item.id)}
                                        className="bg-gray-500 text-white p-2 rounded-md"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <span className="ml-6 font-medium text-lg">{item.finalPrice} $</span>
                            </div>

                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="bg-red-500 text-white p-2 rounded-md w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                <FaTrashAlt />
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;
