import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const BASE = import.meta.env.VITE_API_BASE_URL;

export default function WarehouseUtilization() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let alive = true;
    fetch(`${BASE}/inventories/utilization`, { credentials: "include" })
      .then((r) => r.json())
      .then((json) => { if (alive && json?.ok) setRows(json.data ?? []); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-[#674529]" />
        <h2 className="text-lg text-[#674529]">창고별 이용률</h2>
      </div>

      <div className='grid grid-cols-1 gap-6'>
        {warehouses.map((warehouse, index) => (
          <div key={index} className='rounded-lg border border-gray-200 p-4'>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-[#674529]'>
                {warehouse.name}
              </h3>
              <span
                className={`rounded px-3 py-1 text-sm font-semibold ${warehouse.bgColor} ${warehouse.percentage >= 85 ? 'text-red-600' : 'text-green-600'}`}
              >
                {warehouse.percentage}%
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {rows.map((w, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#674529]">{w.factory?.code ?? w.factory?.name}</h3>
              <span className={`rounded px-3 py-1 text-sm font-semibold ${w.percentage >= 85 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                {w.percentage}%
              </span>
            </div>
            <div className="mb-3">
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>보관 품목</span>
                <span className="font-semibold text-gray-900">{w.itemCount}개</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className={`h-2 rounded-full ${w.percentage >= 85 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${w.percentage}%` }} />
              </div>
            </div>
            <p className="text-sm text-gray-500">{w.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
