'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import PieChart from '@/components/PieChart';
import DataTable from '@/components/DataTable';

export default function Home() {
  const [statistics, setStatistics] = useState(null);

  // Define columns configuration
  const columns = [
    { accessorKey: 'Number', header: 'No.' },
    { accessorKey: 'Name of Location', header: 'Lokasi' },
    { accessorKey: 'Date', header: 'Tanggal' },
    { accessorKey: 'Login Hour', header: 'Jam Login' },
    { accessorKey: 'Name', header: 'Nama', sortingFn: 'alphanumeric' },
    { accessorKey: 'Age', header: 'Tahun Lahir' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'Email', header: 'Email' },
    { accessorKey: 'No Telp', header: 'Telepon' },
    { accessorKey: 'Brand Device', header: 'Device' },
    { accessorKey: 'Digital Interest', header: 'Interest' },
    { accessorKey: 'Location Type', header: 'Tipe Lokasi' },
  ];

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
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
      <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg border border-white/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
        <h2 className="text-xl font-bold p-6 border-b border-white/30 relative z-10">Customer Data</h2>
        <div className="relative z-10">
          <DataTable columns={columns} />
        </div>
      </div>
    </div>
  );
}
