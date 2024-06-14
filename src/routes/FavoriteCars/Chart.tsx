// ChartComponent.tsx
import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(...registerables);

export const ChartComponent: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['', '', '', ''],
        datasets: [
          {
            label: 'Цена',
            data: [580000, 570000, 565000, 560000],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            // fill: true,
            tension: 0.1,
            pointRadius: 8, // Радиус точек
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Цвет точек
          },
        ],
      },
      options: {
        scales: {
          y: {
            // beginAtZero: true,
          },
        },
      },
    });

    // Уничтожение графика при размонтировании компонента
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas id="priceChart" width="300" height="300"></canvas>;
};
