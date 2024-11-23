import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ImInsertTemplate } from 'react-icons/im';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analyse() {
    
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        
        const data = {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
            datasets: [
                {
                    label: 'Visiteurs',
                    data: [120, 150, 800, 210, 20, 300, 350],
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1,
                },
                {
                    label: 'Commande',
                    data: [100, 60, 567, 200, 3, 280, 320],
                    fill: false,
                    borderColor: 'rgba(255,99,132,1)',
                    tension: 0.1,
                },
            ],
        };


        if (data && data.labels && Array.isArray(data.datasets) && data.datasets.length > 0) {
            setChartData(data);
        }
    }, []);
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Analyse des Données du Site</h1>

            
            <div className="w-full h-auto sm:h-96 bg-white p-6 shadow-md rounded-lg">
                
                {chartData && chartData.labels && chartData.datasets ? (
                    <Line data={chartData} />
                ) : (
                    <p>Chargement des données...</p>
                )}
            </div>
        </div>
    );
}

export default Analyse;
