import React, { useState, useEffect } from "react";
import useFetchData from "../../public/data/DATA.JS";

function Prdct() {
    const { data: initialData } = useFetchData();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const [formValues, setFormValues] = useState({
        title: "",
        info: "",
        finalPrice: "",
        images: "",
    });

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setProducts(initialData);
            setLoading(false);
        }
    }, [initialData]);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    
    const addProduct = async (newProduct) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const createdProduct = await response.json();
                setProducts([...products, createdProduct]);
                console.log("Produit ajouté avec succès !");
            } else {
                console.error("Erreur lors de l'ajout du produit !");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    
    const handleSubmit = (e) => {
        e.preventDefault(); 

        const newProduct = {
            id: Date.now(),
            title: formValues.title,
            info: formValues.info,
            finalPrice: parseFloat(formValues.finalPrice),
            images: [formValues.images],
        };

        addProduct(newProduct);
        setFormValues({ title: "", info: "", finalPrice: "", images: "" }); 
    };

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (!products || products.length === 0) {
        return <p>Aucun produit disponible.</p>;
    }

    return (
            <>
            <h1 className="text-2xl font-bold mb-6">Liste des Produits</h1>

            <form
                onSubmit={handleSubmit}
                className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md"
            >
                <div className="mb-4 flex items-center">
                <label
                    htmlFor="title"
                    className="w-1/4 text-gray-700 font-medium mr-4"
                >
                    Titre du produit:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    className="w-3/4 p-2 border rounded"
                    required
                />
                </div>

                <div className="mb-4 flex items-center">
                <label
                    htmlFor="info"
                    className="w-1/4 text-gray-700 font-medium mr-4"
                >
                    Description:
                </label>
                <input
                    type="text"
                    id="info"
                    name="info"
                    value={formValues.info}
                    onChange={handleInputChange}
                    className="w-3/4 p-2 border rounded"
                    required
                />
                </div>

                <div className="mb-4 flex items-center">
                <label
                    htmlFor="finalPrice"
                    className="w-1/4 text-gray-700 font-medium mr-4"
                >
                    Prix:
                </label>
                <input
                    type="number"
                    id="finalPrice"
                    name="finalPrice"
                    value={formValues.finalPrice}
                    onChange={handleInputChange}
                    className="w-3/4 p-2 border rounded"
                    required
                />
                </div>

                <div className="mb-4 flex items-center">
                <label
                    htmlFor="images"
                    className="w-1/4 text-gray-700 font-medium mr-4"
                >
                    Images:
                </label>
                <input
                    type="text"
                    id="images"
                    name="images"
                    value={formValues.images}
                    onChange={handleInputChange}
                    className="w-3/4 p-2 border rounded"
                    required
                />
                </div>

                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                Ajouter un produit
                </button>
            </form>
            </>

    );
}

export default Prdct;
