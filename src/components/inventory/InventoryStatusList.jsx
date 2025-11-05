import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Clock, Search, Package } from "lucide-react";
import { fetchInventoryStatus } from "../../store/modules/inventory/actions";
import {
  selectInventoryStatus,
  selectInventoryStatusLoading,
} from "../../store/modules/inventory/selectors";

/**
 * 재고 현황 리스트 컴포넌트
 *
 * Redux Saga 연결:
 * - Redux에서 재고 데이터를 가져옴
 * - 로딩 상태를 Redux로 관리
 * - API 호출은 Saga에서 자동 처리
 */

// 한글 ↔ 백엔드 ENUM 매핑
const korToEnumCategory = {
  전체: undefined,
  원재료: "RawMaterial",
  반제품: "SemiFinished",
  완제품: "Finished",
  소모품: "Supply",
};

const korToEnumStatus = {
  전체: undefined,
  정상: "Normal",
  재고부족: "LowStock",
  "유통기한 임박": "Expiring",
  "유통기한 만료": "Expired",
};

export default function InventoryStatusList({ filters }) {
  const dispatch = useDispatch();

  // Redux에서 데이터 가져오기
  // - items: 재고 목록 데이터
  // - loading: API 호출 로딩 상태
  const items = useSelector(selectInventoryStatus) || [];
  const loading = useSelector(selectInventoryStatusLoading);

  useEffect(() => {
    // 재고 현황 조회 액션 디스패치
    dispatch(fetchInventoryStatus.request());
  }, [dispatch]);

  /**
   * 클라이언트 측 필터링
   *
   * Redux에서 가져온 데이터를 filters prop으로 필터링
   * useMemo로 성능 최적화 (items나 filters가 바뀔 때만 재계산)
   */
  const filteredItems = useMemo(() => {
    if (!filters || items.length === 0) return items;

    return items.filter((item) => {
      // 1. 카테고리 필터
      if (filters.category && filters.category !== '전체') {
        const categoryEnum = korToEnumCategory[filters.category];
        if (categoryEnum && item?.item?.category !== categoryEnum) {
          return false;
        }
      }

      // 2. 상태 필터
      if (filters.status && filters.status !== '전체') {
        const statusEnum = korToEnumStatus[filters.status];
        if (statusEnum && item?.status !== statusEnum) {
          return false;
        }
      }

      // 3. 창고 필터
      if (filters.warehouse && filters.warehouse !== '전체') {
        const factoryName = item?.factory?.name || '';
        if (!factoryName.includes(filters.warehouse)) {
          return false;
        }
      }

      // 4. 검색어 필터 (품목명, 품목코드, 바코드번호)
      if (filters.searchTerm && filters.searchTerm.trim()) {
        const search = filters.searchTerm.toLowerCase().trim();
        const itemName = (item?.item?.name || '').toLowerCase();
        const itemCode = (item?.item?.code || '').toLowerCase();
        const lotNumber = (item?.lotNumber || '').toLowerCase();

        if (!itemName.includes(search) &&
            !itemCode.includes(search) &&
            !lotNumber.includes(search)) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-[#674529]" />
          <h3 className="text-base text-[#674529]">
            재고 현황 ({filteredItems.length}건
            {items.length !== filteredItems.length && ` / 전체 ${items.length}건`})
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">품목코드</th>
              <th className="px-4 py-3 text-left text-sm font-medium">품목명</th>
              <th className="px-4 py-3 text-left text-sm font-medium">카테고리</th>
              <th className="px-4 py-3 text-left text-sm font-medium">재고량</th>
              <th className="px-4 py-3 text-left text-sm font-medium">창고/위치</th>
              <th className="px-4 py-3 text-left text-sm font-medium">바코드번호</th>
              <th className="px-4 py-3 text-left text-sm font-medium">유통기한</th>
              <th className="px-4 py-3 text-left text-sm font-medium">상태</th>
              <th className="px-4 py-3 text-left text-sm font-medium">이력</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Redux loading 상태로 로딩 표시 */}
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={9}>
                  불러오는 중…
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={9}>
                  {items.length === 0
                    ? '데이터가 없습니다.'
                    : '필터 조건에 맞는 재고가 없습니다.'}
                </td>
              </tr>
            ) : (
              filteredItems.map((d) => {
                const days = Number(d?.daysLeft ?? 0);
                const daysLabel = days >= 0 ? `- ${days}일` : `+ ${Math.abs(days)}일`;
                const badge =
                  d?.status === "Normal"
                    ? "bg-green-100 text-green-700"
                    : d?.status === "LowStock"
                    ? "bg-yellow-100 text-yellow-700"
                    : d?.status === "Expiring"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700";

                return (
                  <tr key={d.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{d?.item?.code}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{d?.item?.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{d?.item?.categoryLabel}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{`${d?.quantity} ${d?.unit}`}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-[#674529]" />
                        <span>{d?.factory ? d.factory.code ?? d.factory.name : "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{d?.lotNumber}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-700">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{d?.expirationDate} {daysLabel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded px-3 py-1 text-xs font-medium ${badge}`}>{d?.statusLabel}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="text-gray-500 transition-colors hover:text-[#674529]">
                        <Search className="h-5 w-5 text-[#674529]" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
