import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MedicineSalesCharts = () => {
  
  const { medicines } = useSelector((state) => state.medicine);

  
  if (!medicines || medicines.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-300 mt-10">No medicines available</p>;
  }

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {medicines.map((medicine) => {
        
        if (medicine.sales && medicine.sales.length > 0) {
          const salesData = medicine.sales.map(sale => ({
            date: new Date(sale.date).toLocaleDateString(),
            quantity: sale.quantity
          }));

          const chartData = {
            labels: salesData.map(sale => sale.date),
            datasets: [
              {
                label: `${medicine.name} - Quantity Sold`,
                data: salesData.map(sale => sale.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          };

          const chartOptions = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  font: {
                    size: 14,
                  },
                  color: '#1f2937', 
                },
              },
              title: {
                display: true,
                text: `Sales Data for ${medicine.name}`,
                font: {
                  size: 18,
                  weight: 'bold',
                },
                color: '#111827',
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date of Sale',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                  color: '#4b5563', 
                },
                ticks: {
                  color: '#4b5563', 
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Quantity Sold',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                  color: '#4b5563', 
                },
                ticks: {
                  beginAtZero: true,
                  color: '#4b5563', 
                }
              }
            }
          };

          return (
            <div
              key={medicine._id}
              className="bg-gray-100 dark:text-white dark:bg-gray-900 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {medicine.name}
              </h3>
              <div className="w-full h-64 ">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          );
        }

        return (
          <div
            key={medicine._id}
            className="bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {medicine.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">No sales data available</p>
          </div>
        );
      })}
    </div>
  );
};

export default MedicineSalesCharts;
