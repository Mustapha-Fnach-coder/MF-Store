import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetchData from '/public/data/DATA.JS';
import { CartContext } from "../context/cartcontexte";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProducts = () => {
    const { data } = useFetchData();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [orderBy, setOrderBy] = useState("");

    const { dispatch, state } = useContext(CartContext);

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const handleAddItem = (item) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: item,
        });

        // Show toast notification
        toast.success("Amazing alert content added with success!");
    };

    const isItemInCart = (id) => {
        return state.items.some((item) => item.id === id);
    };

    const filteredProducts = data
        .filter((product) => {
            return selectedCategory === "All" ? true : product.category === selectedCategory;
        })
        .filter((product) => {
            return product.finalPrice >= priceRange[0] && product.finalPrice <= priceRange[1];
        })
        .filter((product) => {
            return selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true;
        })
        .sort((a, b) => {
            if (orderBy === "asc") return a.finalPrice - b.finalPrice;
            if (orderBy === "desc") return b.finalPrice - a.finalPrice;
            return 0;
        });

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 p-4 mt-4 md:mt-44 rounded-sm shadow-md border-r border-gray-300 h-full md:h-screen">
                <h2 className="text-lg font-bold mb-4">Filtres</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Catégorie</label>
                    {["All", "Headphones", "Earbuds", "Earphones", "Neckbands"].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`block w-full text-left p-2 rounded ${
                                selectedCategory === category ? "bg-gray-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Prix</label>
                    <input
                        type="range"
                        min="0"
                        max="15000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <p className="text-sm">
                        {priceRange[0]}€ - {priceRange[1]}€
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Marques</label>
                    {["JBL", "boAt", "Sony"].map((brand) => (
                        <button
                            key={brand}
                            onClick={() => toggleBrand(brand)}
                            className={`block w-full text-left p-2 rounded ${
                                selectedBrands.includes(brand) ? "bg-gray-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            <span
                                className={`inline-block w-4 h-4 mr-2 rounded-full ${
                                    selectedBrands.includes(brand) ? "bg-white" : "bg-transparent border border-black"
                                }`}
                            ></span>
                            {brand}
                        </button>
                    ))}
                </div>

                <div className="m-4">
                    <label className="block text-sm font-medium mb-2">Trier par prix</label>
                    <select
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Aucun</option>
                        <option value="asc">Croissant</option>
                        <option value="desc">Décroissant</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 p-4">
                <h1 className="text-slate-500 font-semibold text-light p-4 rounded-md mt-20 mb-5 text-3xl">
                    Tous les produits
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow p-4 rounded-lg h-full">
                            <Link to={`/productdetails/${product.id}`} className="block">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-64 object-cover rounded-md mb-4"
                                />
                                <h2 className="font-bold text-lg">{product.title}</h2>
                                <p className="text-gray-600">{product.info}</p>
                                <p className="text-green-600 font-semibold">Prix : {product.finalPrice}€</p>
                            </Link>

                            <button
                                onClick={() => handleAddItem(product)}
                                className={`mt-4 p-3 w-full md:w-64 rounded-md text-white transition ${
                                    isItemInCart(product.id)
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-slate-600 hover:bg-slate-300"
                                }`}
                            >
                                {isItemInCart(product.id) ? "Added" : "Add To Cart"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AllProducts;
