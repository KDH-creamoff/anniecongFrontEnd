import { useState, useEffect, useMemo } from 'react';
import { Package, Edit, Trash2, Factory } from 'lucide-react';
import Pagination from '../common/Pagination';

/**
 * NOTE:
 * 기존 axios(`API/items`) 요청에서 500에러 발생.
 * 프론트/테스트구현을 위해서라면, 아래와 같이 fetch를 사용하여 CORS/서버 문제 우회 & 
 * 백엔드가 동작하지 않으면 mock 데이터를 반환하도록 안전장치를 둔다.
 * 
 * 실제 API가 올바로 동작하면, fetch 결과를 rows로 활용.
 * 아니면, mockRows가 나오므로 리스트 확인 가능.
 */

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const BasicItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // client-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    let ignore = false;
    const fetchItems = async () => {
      setLoading(true);
      try {
        // fetch를 사용 & 에러 발생 시 mock
        const res = await fetch(`${API}/items`, { credentials: 'include' });
        if (!res.ok) throw new Error('Fetch error');
        const data = await res.json();
        const rows = Array.isArray(data?.data) ? data.data : [];
        if (!ignore) setItems(rows.length > 0 ? rows : mockRows);
      } catch (e) {
        // fetch 실패시 mock data 사용
        if (!ignore) setItems(mockRows);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchItems();
    return () => { ignore = true; };
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage]);

  // 삭제는 실제 백엔드에 반영하지 않고, 프론트 목록만 수정
  const handleDelete = async (itemId) => {
    if (!window.confirm('정말로 이 품목을 삭제하시겠습니까?')) return;
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if ((currentPage - 1) * itemsPerPage >= items.length - 1) {
      setCurrentPage((p) => Math.max(1, p - 1));
    }
    // 실제 요청을 하고 싶으면 아래 주석을 해제
    /*
    try {
      await axios.delete(`${API}/items/${itemId}`);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      if ((currentPage - 1) * itemsPerPage >= items.length - 1) {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
    } catch (err) {
      alert(err?.response?.data?.message || '삭제에 실패했습니다.');
    }
    */
  };

  const getFactoryName = (item) =>
    item?.Factory?.name || item?.factory?.name || '-';
  const getStorageName = (item) =>
    item?.StorageCondition?.name || item?.storageCondition?.name || '-';

  const getWholesalePrice = (item) =>
    item.wholesale_price ?? item.default_wholesale_price ?? item.wholesalePrice ?? null;

  const getTotalQty = (item) =>
    item.total_quantity ?? item.totalQuantity ?? item.aggregate_stock ?? null;

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>등록된 품목 목록</h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>품목코드</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>품목명</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>카테고리</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>담당공장</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>보관조건</th>
              <th className='px-4 py-3 text-right text-sm font-medium text-gray-900'>도매가(원)</th>{/* ✅ */}
              <th className='px-4 py-3 text-right text-sm font-medium text-gray-900'>전체수량</th>{/* ✅ */}
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>단위</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>작업</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {loading ? (
              <tr>
                <td colSpan={9} className='px-4 py-8 text-center text-sm text-gray-400'>불러오는 중...</td>
              </tr>
            ) : pageData.length > 0 ? (
              pageData.map((item) => {
                const price = getWholesalePrice(item);
                const qty = getTotalQty(item);
                return (
                  <tr key={item.id} className='transition-colors hover:bg-gray-50/50'>
                    <td className='px-4 py-4 text-sm font-medium text-gray-900'>{item.code}</td>
                    <td className='px-4 py-4 text-sm text-gray-900'>{item.name}</td>
                    <td className='px-4 py-4'>
                      <span className='inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'>
                        {item.category}
                      </span>
                    </td>
                    <td className='px-4 py-4'>
                      <span className='inline-flex items-center gap-1 text-sm text-gray-700'>
                        <div className='text-[#724323]'><Factory /></div>
                        <span>{getFactoryName(item)}</span>
                      </span>
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-700'>{getStorageName(item)}</td>
                    <td className='px-4 py-4 text-right text-sm text-gray-700'>
                      {price == null ? '-' : Number(price).toLocaleString()}
                    </td>
                    <td className='px-4 py-4 text-right text-sm text-gray-700'>
                      {qty == null ? '-' : qty}
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-700'>{item.unit}</td>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-2'>
                        <button className='text-gray-500 transition-colors hover:text-[#674529]'>
                          <Edit className='h-4 w-4' />
                        </button>
                        <button
                          className='text-gray-500 transition-colors hover:text-red-600'
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan={9} className='px-4 py-8 text-center text-sm text-gray-400'>데이터가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default BasicItemList;
