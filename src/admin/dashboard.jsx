import React, { useState } from "react";


import Analyse from "./analyse";
import Prdct from "./products";
import AddPr from "./addpr";
import Commands from "./ccommand";

function App() {
    const [selectedComponent, setSelectedComponent] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);  

   
    const renderComponent = () => {
        switch (selectedComponent) {
            case "dashboard":
                return <Analyse />;
            case "products":
                return <Prdct />;
            case "addProduct":
                return <AddPr />;
            case "commands":
                return <Commands />;
            default:
                return <Analyse />;
        }
    };

    return (
        <div className="flex h-screen flex-col md:flex-row">
            
            <div
                className={`${
                    isSidebarOpen ? "block" : "hidden"
                } md:block w-full md:w-1/5 bg-gray-800 text-white p-4`}
            >
                <h2 className="text-lg font-bold mb-4">Menu</h2>
                <button
                    className="block w-full p-2 mb-2 bg-gray-700 hover:bg-gray-600 rounded"
                    onClick={() => setSelectedComponent("dashboard")}
                >
                    Dashboard
                </button>
                <button
                    className="block w-full p-2 mb-2 bg-gray-700 hover:bg-gray-600 rounded"
                    onClick={() => setSelectedComponent("products")}
                >
                    Produits
                </button>
                <button
                    className="block w-full p-2 mb-2 bg-gray-700 hover:bg-gray-600 rounded"
                    onClick={() => setSelectedComponent("addProduct")}
                >
                    Ajouter un Produit
                </button>
                <button
                    className="block w-full p-2 bg-gray-700 hover:bg-gray-600 rounded"
                    onClick={() => setSelectedComponent("commands")}
                >
                    Commandes
                </button>
            </div>

            
            <div className="flex-grow bg-gray-100 p-4">
                {renderComponent()}
            </div>

            
            <div
                className="md:hidden fixed top-0 right-0 p-4 z-50 bg-gray-800 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <button className="text-xl">&#9776;</button> 
            </div>
        </div>
    );
}

export default App;
