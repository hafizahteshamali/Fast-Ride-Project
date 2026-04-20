import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { 
  FaMoneyBillWave, 
  FaCar, 
  FaUsers, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaCalendarAlt
} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [loading, setLoading] = useState(false);

  // Sample data - In real scenario, fetch from API
  const yearlyIncomeData = {
    2025: [12250, 14700, 16800, 17850, 20300, 21700, 24850, 27300, 28700, 31150, 33250, 35700],
    2026: [15750, 18200, 16800, 21350, 26250, 28700, 31925, 30800, 33250, 35700, 40250, 43750]
  };

  const monthlyIncome = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Income (₨)',
        data: yearlyIncomeData[selectedYear],
        borderColor: '#FF991C',
        backgroundColor: 'rgba(255, 153, 28, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#FF5C00',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const platformRevenue = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Platform Commission (₨)',
        data: [3938, 4550, 4200, 5338, 6563, 7175, 7963, 7700, 8313, 8925, 10063, 10938],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: '#36A2EB',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Driver Earnings (₨)',
        data: [8663, 10010, 9240, 11743, 14438, 15785, 17518, 16940, 18288, 19635, 22138, 24063],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: '#4BC0C0',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const incomeDistribution = {
    labels: ['Driver Earnings', 'Platform Commission', 'Taxes & Fees', 'Promotions & Discounts', 'Insurance'],
    datasets: [
      {
        data: [55, 25, 12, 5, 3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384CC', '#36A2EBCC', '#FFCE56CC', '#4BC0C0CC', '#9966FFCC'],
        borderWidth: 0,
      },
    ],
  };

  const monthlyRides = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Rides',
        data: [580, 620, 590, 710, 850, 920, 1010, 980, 1050, 1120, 1250, 1320],
        backgroundColor: 'rgba(255, 153, 28, 0.5)',
        borderColor: '#FF991C',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 12,
        titleColor: '#FF991C',
        bodyColor: '#fff',
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          callback: function(value) {
            return '₨' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value}% (₨${((total * value) / 100).toLocaleString()})`;
          }
        }
      }
    },
  };

  // Calculate totals
  const totalYearlyIncome = yearlyIncomeData[selectedYear].reduce((a, b) => a + b, 0);
  const totalPlatformCommission = platformRevenue.datasets[0].data.reduce((a, b) => a + b, 0);
  const totalRides = monthlyRides.datasets[0].data.reduce((a, b) => a + b, 0);
  const avgIncomePerRide = totalYearlyIncome / totalRides;

  const statsCards = [
    {
      title: 'Total Yearly Income',
      value: `₨${totalYearlyIncome.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'up',
      icon: <FaMoneyBillWave className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Platform Commission',
      value: `₨${totalPlatformCommission.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'up',
      icon: <FaChartLine className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Rides',
      value: totalRides.toLocaleString(),
      change: '+5.8%',
      changeType: 'up',
      icon: <FaCar className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Avg Income/Ride',
      value: `₨${Math.round(avgIncomePerRide).toLocaleString()}`,
      change: '+2.3%',
      changeType: 'up',
      icon: <FaUsers className="text-3xl" />,
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Financial Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your platform's performance and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF991C] focus:border-transparent cursor-pointer"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
            <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FaDownload size={14} />
            <span className="text-sm">Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.iconColor}`}>{stat.icon}</div>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'up' ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Income Trend */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Income Trend</h2>
            <span className="text-xs text-gray-400">Last 12 months</span>
          </div>
          <div className="h-80">
            <Line data={monthlyIncome} options={chartOptions} />
          </div>
        </div>

        {/* Bar Chart - Revenue Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Revenue Breakdown</h2>
            <span className="text-xs text-gray-400">Commission vs Earnings</span>
          </div>
          <div className="h-80">
            <Bar data={platformRevenue} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart - Income Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Income Distribution</h2>
            <span className="text-xs text-gray-400">Percentage breakdown</span>
          </div>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={incomeDistribution} options={pieChartOptions} />
          </div>
        </div>

        {/* Bar Chart - Monthly Rides */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Rides</h2>
            <span className="text-xs text-gray-400">Total rides completed</span>
          </div>
          <div className="h-80">
            <Bar data={monthlyRides} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  ...chartOptions.plugins.tooltip,
                  callbacks: {
                    label: function(context) {
                      return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} rides`;
                    }
                  }
                }
              },
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  ticks: {
                    callback: function(value) {
                      return value.toLocaleString();
                    }
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button className="text-sm text-[#FF991C] hover:text-[#FF5C00] transition-colors">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction ID</th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Driver</th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Commission</th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: '#TRX001', driver: 'Rajesh Sharma', amount: 133, commission: 33, status: 'Completed', date: '2026-04-20' },
                { id: '#TRX002', driver: 'Priya Patel', amount: 133, commission: 33, status: 'Completed', date: '2026-04-20' },
                { id: '#TRX003', driver: 'Amit Kumar', amount: 182, commission: 46, status: 'Pending', date: '2026-04-19' },
                { id: '#TRX004', driver: 'Neha Singh', amount: 109, commission: 27, status: 'Completed', date: '2026-04-19' },
                { id: '#TRX005', driver: 'Vikram Verma', amount: 235, commission: 59, status: 'Processing', date: '2026-04-18' },
              ].map((transaction, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-sm font-medium text-gray-800">{transaction.id}</td>
                  <td className="py-3 text-sm text-gray-600">{transaction.driver}</td>
                  <td className="py-3 text-sm font-semibold text-green-600">₨{transaction.amount}</td>
                  <td className="py-3 text-sm text-gray-600">₨{transaction.commission}</td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;