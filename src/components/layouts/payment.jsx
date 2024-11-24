import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import payImage from "../../assets/img/pay.png.jpg";
import { useTranslation } from "react-i18next";

const PaymentForm = () => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(t("paymentForm.toastSuccess"), {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1200,
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">{t("paymentForm.title")}</h2>

            <div className="flex justify-center mb-6">
                <img className="max-w-full h-auto" src={payImage} alt={t("paymentForm.title")} />
            </div>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-6">
                    
                    <div className="flex items-center gap-4">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 w-1/3">{t("paymentForm.name")}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 w-1/3">{t("paymentForm.email")}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="address" className="text-sm font-medium text-gray-700 w-1/3">{t("paymentForm.address")}</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        ></textarea>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 w-1/3">{t("paymentForm.cardNumber")}</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="expirationDate" className="text-sm font-medium text-gray-700 w-1/3">{t("paymentForm.expirationDate")}</label>
                        <input
                            type="text"
                            id="expirationDate"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="cvv" className="text-sm font-medium text-gray-700 w-1/3">{t("paymentForm.cvv")}</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {t("paymentForm.submitButton")}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default PaymentForm;
