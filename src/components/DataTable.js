'use client';
import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (searchQuery) {
          params.append('search', searchQuery);
        }

        if (sorting.length > 0) {
          params.append('sortBy', sorting[0].id);
          params.append('sortOrder', sorting[0].desc ? 'desc' : 'asc');
        }

        const response = await fetch(
          `https://higo-api.vercel.app/api/customers?${params.toString()}`
        );
        const json = await response.json();
        setData(json.customers);
        setTotalPages(json.totalPages);
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page, limit, searchQuery, sorting]);

  // Definisi kolom tabel
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('Number', {
      header: 'No.',
    }),
    columnHelper.accessor('Name of Location', {
      header: 'Lokasi',
    }),
    columnHelper.accessor('Date', {
      header: 'Tanggal',
    }),
    columnHelper.accessor('Login Hour', {
      header: 'Jam Login',
    }),
    columnHelper.accessor('Name', {
      header: 'Nama',
      sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('Age', {
      header: 'Tahun Lahir',
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
    }),
    columnHelper.accessor('Email', {
      header: 'Email',
    }),
    columnHelper.accessor('No Telp', {
      header: 'Telepon',
    }),
    columnHelper.accessor('Brand Device', {
      header: 'Device',
    }),
    columnHelper.accessor('Digital Interest', {
      header: 'Interest',
    }),
    columnHelper.accessor('Location Type', {
      header: 'Tipe Lokasi',
    }),
  ];

  // Filter function for search
  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Inisialisasi tabel
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari..."
          className="px-4 py-2 border rounded-md w-64"
        />
        
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="px-4 py-2 border rounded-md"
        >
          {[10, 25, 50, 100].map(value => (
            <option key={value} value={value}>
              Tampilkan {value}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      style={{ minWidth: '150px' }}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <span>{header.column.getIsSorted() === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-50">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
