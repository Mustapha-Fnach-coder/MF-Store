import React, { useState, useEffect } from "react";
import useFetchData from "../../public/data/DATA.JS";

function Commands() {
    const { commands } = useFetchData();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        if (commands) {
            setOrders(commands);
            setLoading(false);
        }
    }, [commands]);
    console.log(orders)

    
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            
            const response = await fetch(`/api/commandes/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour du statut");

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Erreur réseau :", error.message);
        }
    };


    const deleteOrder = async (orderId) => {
        try {
            
            const response = await fetch(`/api/commandes/${orderId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erreur lors de la suppression");

            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.id !== orderId)
            );
        } catch (error) {
            console.error("Erreur réseau :", error.message);
        }
    };

    if (loading) {
        return <p>Chargement des commandes...</p>;
    }

    if (orders.length === 0) {
        return <p>Aucune commande disponible.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Liste des Commandes</h1>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Nom Client</th>
                        <th className="border p-2">Articles</th>
                        <th className="border p-2">Statut</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{order.customerName}</td>
                            <td className="border p-2">
                                {order.items.map((item) => (
                                    <div key={item.id}>
                                        {item.name} - {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td className="border p-2">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateOrderStatus(order.id, e.target.value)
                                    }
                                    className="border p-1"
                                >
                                    <option value="Pending">En attente</option>
                                    <option value="Shipped">Expédiée</option>
                                    <option value="Delivered">Livrée</option>
                                    <option value="Cancelled">Annulée</option>
                                </select>
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    className="ml-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Commands;
