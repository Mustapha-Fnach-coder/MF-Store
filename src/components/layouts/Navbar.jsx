import { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import useFetchData from '/public/data/DATA.JS';
import { Link } from 'react-router-dom';
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { data } = useFetchData();
  const [searchQuery, setSearchQuery] = useState('');
  const cartQuantity = 3;

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <nav className="text-gray-800 bg-white shadow-sm mb-50">
      <div className="container mx-auto flex items-center justify-between pb-4 px-6">
        <div className="text-3xl font-bold">MF-Store</div>

        
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/allproducts" className="hover:text-gray-400">Products</Link>
          </li>
          <li>
            <Link to="#contact" className="hover:text-gray-400">Contact</Link>
          </li>
          <li>
            <Link to="#about-us" className="hover:text-gray-400">About Us</Link>
          </li>
          <li>
            <Link to="/dashboard"><button>admin</button></Link>
          </li>
        </ul>

        
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-gray-800 hover:text-gray-400">
            <FaSearch size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />

            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-md rounded-md z-10">
                <ul className="max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <li key={product.id} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      <a href={product.path} className="flex items-center space-x-2">
                        <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover" />
                        <span className="text-gray-800">{product.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/cartpage" className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>

      

      {/* Toast Container */}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
