import { useParams } from "react-router-dom";
import useFetchData from '/public/data/DATA.JS'
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams(); 
  const { data } = useFetchData(); 

  
  const product = data ? data.find((item) => item.id === parseInt(id)) : null;

  
  const [selectedImage, setSelectedImage] = useState(
    product ? product.images[0] : null
  );

  
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  
  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10 mb-5 p-6">
      {/* Colonne de gauche : Informations sur le produit */}
      <div className="md:w-1/3 border-b md:border-r pb-6 md:pb-0 md:pr-6">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-gray-600 mb-2">{product.info}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-gray-500">Type: {product.type}</p>
        <p className="text-sm text-gray-500">Connectivity: {product.connectivity}</p>
        <div className="mt-4">
          <p className="text-lg font-semibold text-red-500">
            ${product.finalPrice}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product.originalPrice}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Ratings: {product.rateCount} stars ({product.ratings} reviews)
        </p>
      </div>

     
      <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
        <img
          src={selectedImage}
          alt={product.title}
          className="max-w-full h-auto rounded shadow-lg"
        />
      </div>

      
      <div className="md:w-1/4 flex flex-row md:flex-col justify-center gap-4 md:gap-6">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer border ${
              selectedImage === image
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
