import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import useFetchData from '/public/data/DATA.JS';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { data } = useFetchData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); 
  };

  return (
    <nav className="text-gray-800 bg-white shadow-sm mb-50">
      <div className="container mx-auto flex items-center justify-between pb-4 px-6">
        <Link to="/"><div className="text-xs mr-5 md:text-2xl font-bold">{t('store_name')}</div></Link>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/allproducts" className="hover:text-gray-400">
              {t('products')}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">
              {t('contact')}
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-gray-400">
              {t('about_us')}
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <button>{t('admin')}</button>
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="w-28 md:w-80 bg-gray-700 text-white rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-md rounded-md z-10">
                <ul className="max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <Link
                        to={`/productdetails/${product.id}`}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-12 h-12 object-cover"
                        />
                        <span className="text-gray-800">{product.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/cartpage" className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
          </Link>

          {/* Language Selector */}
          <select
            className="border rounded-md py-1 px-2"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
