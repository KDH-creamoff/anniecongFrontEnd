import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock } from "lucide-react";
import { fetchInventoryMovements } from "../../store/modules/inventory/actions";
import { selectInventoryMovements } from "../../store/modules/inventory/selectors";
import Pagination from "../common/Pagination";

const typeBadge = (type) => {
  if (type === "입고") return "bg-blue-50 text-blue-600";
  if (type === "출고") return "bg-red-50 text-red-600";
  if (type === "생산") return "bg-green-50 text-green-600";
  if (type === "이동") return "bg-yellow-50 text-yellow-600";
  return "bg-gray-50 text-gray-600";
};

const qtyColor = (q) => {
  const s = String(q).trim();
  if (s.startsWith("+")) return "text-green-600";
  if (s.startsWith("-")) return "text-red-600";
  return "text-gray-900";
};

export default function InventoryMovementList() {
  const dispatch = useDispatch();
  const rows = useSelector(selectInventoryMovements) || [];
  const loading = useSelector((state) => state.inventory.inventoryMovements.loading);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchInventoryMovements.request({ page: 1, limit: 50 }));
  }, [dispatch]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-[#674529]" />
        <h2 className="text-lg text-[#674529]">재고 이동 이력</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">시간</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">유형</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">품목</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">바코드번호</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">수량</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">출발지</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">도착지</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">담당자</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-6 text-sm text-gray-500" colSpan={9}>불러오는 중…</td></tr>
            ) : paginatedRows.map((m, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">{m.time}</td>
                <td className="px-4 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge(m.type)}`}>{m.type}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">{m.category}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{m.lotNumber}</td>
                <td className="px-4 py-4"><span className={`text-sm font-semibold ${qtyColor(m.quantity)}`}>{m.quantity}</span></td>
                <td className="px-4 py-4 text-sm text-gray-900">{m.fromLocation}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{m.toLocation}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{m.manager}</td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr><td className="px-4 py-6 text-sm text-gray-500" colSpan={9}>이력이 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
