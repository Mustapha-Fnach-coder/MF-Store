import React, { useState, useEffect } from "react";
import useFetchData from "../../public/data/DATA.JS";
import api from "../../public/data/productsData.json";

function Prdct() {
    const { data: initialData } = useFetchData();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setProducts(initialData);
            setLoading(false);
        }
    }, [initialData]);

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`..//../public/data/productsData.json/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter((product) => product.id !== productId));
                console.log("Produit supprimé avec succès !");
            } else {
                console.error("Erreur lors de la suppression du produit !");
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
        }
    };

    if (loading) {
        return <p>ج</p>;
    }

    if (!products || products.length === 0) {
        return <p>loading ...</p>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Liste des Produits</h1>

            
            <div className=" h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow p-4 rounded-lg flex flex-col justify-between"
                    >
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-24 h-24 object-cover rounded-md mx-auto mb-4"
                        />
                        <div className="flex-1">
                            <h2 className="font-bold text-lg truncate">{product.title}</h2>
                            <p className="text-gray-600 text-sm truncate">{product.info}</p>
                            <p className="text-green-600 font-semibold text-sm">
                                Prix : {product.finalPrice}€
                            </p>
                        </div>
                        <button
                            onClick={() => deleteProduct(product.id)}
                            className="mt-4 text-red-600 hover:text-red-800 transition"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Prdct;
