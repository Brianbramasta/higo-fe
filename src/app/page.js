'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import PieChart from '@/components/PieChart';
import DataTable from '@/components/DataTable';

export default function Home() {
  const [statistics, setStatistics] = useState(null);

  // Mengambil data statistik
  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('https://higo-api.vercel.app/api/statistics');
      const data = await response.json();
      setStatistics(data);
    };
    fetchStats();
  }, []);

  if (!statistics) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <PieChart 
          data={statistics.gender} 
          title="Distribusi Gender Pelanggan" 
        />
        <PieChart 
          data={statistics.locationType} 
          title="Persebaran Lokasi Pelanggan" 
        />
        <PieChart
          data={statistics.digitalInterest}
          title="Minat Digital Pelanggan"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold p-6 border-b">Customer Data</h2>
        <DataTable />
      </div>
    </div>
  );
}
