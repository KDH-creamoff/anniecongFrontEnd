import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, AlertTriangle, Clock, MapPin } from "lucide-react";
import { fetchInventoryAlerts } from "../../store/modules/inventory/actions";
import { selectInventoryAlerts } from "../../store/modules/inventory/selectors";

export default function InventoryStatusSummary() {
  const dispatch = useDispatch();
  const alerts = useSelector(selectInventoryAlerts);

  const data = alerts || {
    totalItems: 0,
    lowStock: 0,
    expiringSoon: 0,
    expired: 0,
    warehouseCount: 0,
  };

  useEffect(() => {
    dispatch(fetchInventoryAlerts.request());
  }, [dispatch]);

  const summaryCards = [
    { id: 1, title: "총 품목수", value: data.totalItems, icon: <Package className="h-6 w-6" />, bgColor: "bg-[#724323]", iconTextColor: "text-[#fff]" },
    { id: 2, title: "부족 재고", value: data.lowStock, icon: <AlertTriangle className="h-6 w-6" />, bgColor: "bg-[#fef9c2]", iconTextColor: "text-[#d08700]" },
    { id: 3, title: "유통기한 임박", value: data.expiringSoon, icon: <Clock className="h-6 w-6" />, bgColor: "bg-[#ffedd4]", iconTextColor: "text-[#f65814]" },
    { id: 4, title: "창고 수", value: data.warehouseCount, icon: <MapPin className="h-6 w-6" />, bgColor: "bg-[#A3C478]", iconTextColor: "text-[#fff]" },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      {summaryCards.map((c) => (
        <div key={c.id} className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">{c.title}</p>
              <p className="text-3xl font-bold text-[#674529]">{c.value}</p>
            </div>
            <div className={`h-14 w-14 ${c.bgColor} flex items-center justify-center rounded-xl`}>
              <div className={c.iconTextColor}>{c.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
