import { useEffect, useState } from "react";
import { TbBox, TbRotateClockwise2, TbShoppingCart, TbArrowLeftRight } from 'react-icons/tb';
import { getColor } from '@/helpers/color';
import product1 from '@/assets/images/products/1.png';
import product2 from '@/assets/images/products/2.png';
import product3 from '@/assets/images/products/3.png';
import product4 from '@/assets/images/products/4.png';
import product5 from '@/assets/images/products/5.png';
import product6 from '@/assets/images/products/6.png';
import product7 from '@/assets/images/products/7.png';
import product8 from '@/assets/images/products/8.png';
import product9 from '@/assets/images/products/9.png';
import user1 from '@/assets/images/users/user-1.jpg';
import user2 from '@/assets/images/users/user-2.jpg';
import user3 from '@/assets/images/users/user-3.jpg';
import user4 from '@/assets/images/users/user-4.jpg';
import user5 from '@/assets/images/users/user-5.jpg';
import user6 from '@/assets/images/users/user-6.jpg';
import user7 from '@/assets/images/users/user-7.jpg';
import user8 from '@/assets/images/users/user-8.jpg';
import user9 from '@/assets/images/users/user-9.jpg';
import user10 from '@/assets/images/users/user-10.jpg';
import { getStats, getChartStats, getCircleStats, getLastMovements, getItemsWithMostMovements, getMovementFlow } from '../../../features/dashboard';

export const getStatCards = async () => {
  const stats = await getStats();

  return [
    {
      id: 1,
      title: "Artículos registrados",
      value: stats.total_items,
      icon: TbBox,
      iconBg: "primary",
    },
    {
      id: 2,
      title: "Comprobantes registrados",
      value: stats.total_receipts,
      icon: TbShoppingCart,
      iconBg: "success",
    },
    {
      id: 3,
      title: "Movimientos registrados",
      value: stats.total_movements,
      icon: TbArrowLeftRight,
      iconBg: "info",
    },
    {
      id: 4,
      title: "Artículos con exceso de stock",
      value: stats.total_items_excess_stock,
      icon: TbRotateClockwise2,
      iconBg: "warning",
    },
  ];

};
export const totalSalesChart = async () => {
  const circle_stats = await getCircleStats();
  return {
    type: 'doughnut',
    data: {
      labels: ['Buen stock', 'Bajo stock', 'Sin stock'],
      datasets: [{
        label: '2025',
        data: [circle_stats.items_with_good_stock, circle_stats.items_with_low_stock, circle_stats.items_without_stock],
        backgroundColor: [getColor('chart-dark'), getColor('chart-secondary'), getColor('chart-primary')],
        borderColor: 'transparent',
        borderWidth: 1,
        weight: 1,
        // Outer ring
        cutout: '30%',
        radius: '90%'
      }/* , {
      label: '2023',
      data: [270, 135, 90, 72],
      backgroundColor: [getColor('chart-primary-rgb', 0.3), getColor('chart-secondary-rgb', 0.3), getColor('chart-dark-rgb', 0.3), getColor('chart-gray-rgb', 0.3)],
      borderColor: 'transparent',
      borderWidth: 3,
      weight: 0.8,
      // Inner ring
      cutout: '30%',
      radius: '60%' // smaller to create spacing
    } */]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: getComputedStyle(document.body).fontFamily
            },
            color: getColor('secondary-color'),
            usePointStyle: true,
            // Show circles instead of default box
            pointStyle: 'circle',
            // Circle shape
            boxWidth: 8,
            // Circle size
            boxHeight: 8,
            // (optional) same as width by default
            padding: 15 // Space between legend items
          }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return `${ctx.dataset.label} - ${ctx.label}: ${ctx.parsed}`;
            }
          }
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }
  }

};
export const salesAnalyticsChart = async () => {
  const movementFlow = await getMovementFlow();
  return {
    data: {
      labels: movementFlow.labels || [],
      datasets: [{
        type: 'bar',
        label: 'Ingresos (Compras)',
        data: movementFlow.ingresos || [],
        borderColor: '#28a745',
        backgroundColor: '#28a745',
        barThickness: 20,
        borderRadius: 6
      }, {
        type: 'bar',
        label: 'Salidas (Ventas)',
        data: movementFlow.salidas || [],
        borderColor: '#dc3545',
        backgroundColor: '#dc3545',
        barThickness: 20,
        borderRadius: 6
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: getComputedStyle(document.body).fontFamily
            },
            color: getColor('secondary-color'),
            usePointStyle: true,
            pointStyle: 'rect',
            boxWidth: 12,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return `${ctx.dataset.label}: ${ctx.parsed.y} registros`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: getColor('secondary-color')
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: getColor('grid-color')
          },
          ticks: {
            color: getColor('secondary-color'),
            callback: function(value) {
              return value.toFixed(0);
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };
};
//Articulos
export const products = async () => {
  const items_with_most_movements = await getItemsWithMostMovements();
  console.log(items_with_most_movements);
  return items_with_most_movements.map((item) => ({
    id: 1,
    image: product1,
    name: item.name,
    subtitleItem: item.brand + " - " + item.model,
    category: 'Audio',
    stock: '180 units',
    price: item.category.name,
    ratings: item.movements_count,
    reviews: 52,
    status: item.movements[0].stock,
    statusVariant: 'success'

  }))
};

//  MOVIMIENTOS RECIENTES
export const orders = async () => {
  const last_movements = await getLastMovements();
  return last_movements.map((movement) => ({
    id: movement.price,
    userImage: `https://backend-fullo.onrender.com/${movement.item.image}`,
    userName: movement.user.person.name + " " + movement.user.person.last_name,
    product: movement.item.name,
    subtitleItem: movement.item.brand + " - " + movement.item.model,
    date: new Date(movement.created_at).toLocaleDateString('es'),
    amount: movement.quantity + " " + movement.receipt_detail.unit,
    status: (movement.type === 'Compra') ? 'Ingreso' : 'Salida',
    statusVariant: (movement.type === 'Compra') ? 'success' : 'danger'
  }));
};