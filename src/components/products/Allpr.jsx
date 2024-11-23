import { useState, useContext } from "react";
import useFetchData from "/public/data/DATA.JS";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartcontexte";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import des styles

const AllPr = () => {
  const { data } = useFetchData();
  const { state, dispatch } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [orderBy, setOrderBy] = useState("");

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
    
    toast.success("Product added ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
    <div>
      <ToastContainer /> 

      <div>
        <h1 className="text-slate-500 font-semibold text-light p-4 rounded-md mt- mb-5 text-3xl">
          Tous les produits
        </h1>
        <div className="flex flex-wrap gap-2 justify-center">
          {["All", "Headphones", "Earbuds", "Earphones", "Neckbands"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-gray-600 text-white" : "bg-gray-200"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        
        <div className="w-64 p-4 mb-52 rounded-sm shadow-md border-r border-gray-300 h-screen">
          <h2 className="text-lg font-bold mb-4">Filtres</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Trier par prix</label>
            <div className="flex gap-2">
              <button
                onClick={() => setOrderBy("asc")}
                className={`px-4 py-2 rounded ${orderBy === "asc" ? "bg-gray-600 text-white" : "bg-gray-200"}`}
              >
                Croissant
              </button>
              <button
                onClick={() => setOrderBy("desc")}
                className={`px-4 py-2 rounded ${orderBy === "desc" ? "bg-gray-600 text-white" : "bg-gray-200"}`}
              >
                Décroissant
              </button>
            </div>
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
            <p className="text-sm">{priceRange[0]}€ - {priceRange[1]}€</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Marques</label>
            {["JBL", "boAt", "Sony"].map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`block w-full my-5 text-left p-2 rounded ${selectedBrands.includes(brand) ? "bg-gray-600 text-white" : "bg-gray-200"}`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow p-4 rounded-lg h-full">
              <h2 className="font-bold text-lg">{product.title}</h2>
              <Link to={`/productdetails/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-64 h-54 object-cover rounded-md mb-4"
                />
              </Link>
              <p className="text-gray-600">{product.info}</p>
              <p className="text-green-600 font-semibold">Prix : {product.finalPrice}€</p>
              <button
                onClick={() => handleAddItem(product)}
                className={`mt-9 p-3 w-64 rounded-md text-white transition ${
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
    </div>
  );
};

export default AllPr;
