import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Printer, Search, Package, Barcode } from 'lucide-react';
import {
  fetchAllLabels,
  fetchLabelsByBarcode,
  fetchLabelsByInventory,
  printSavedLabel,
  setLabelFilter,
  clearLabelError,
} from '../../store/modules/label/actions';
import {
  selectLabels,
  selectLabelsLoading,
  selectLabelsError,
  selectLabelsByBarcode,
  selectLabelsByBarcodeLoading,
  selectLabelsByInventory,
  selectLabelsByInventoryLoading,
  selectPrinters,
  selectPrintersLoading,
  selectPrintOperationLoading,
  selectLabelFilter,
} from '../../store/modules/label/selectors';
import { fetchPrinters } from '../../store/modules/label/actions';
import { useState } from 'react';

/**
 * Redux Saga 버전의 SavedLabelList 컴포넌트
 * 
 * 사용법:
 * 1. src/store/rootSaga.js에서 labelSaga() 주석 해제
 * 2. SavedLabelList.jsx를 이 파일로 교체하거나
 * 3. Label.jsx에서 import 경로 변경: './SavedLabelList.Redux'
 */
const SavedLabelListRedux = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const labels = useSelector(selectLabels);
  const labelsLoading = useSelector(selectLabelsLoading);
  const labelsError = useSelector(selectLabelsError);
  const labelsByBarcode = useSelector(selectLabelsByBarcode);
  const labelsByBarcodeLoading = useSelector(selectLabelsByBarcodeLoading);
  const labelsByInventory = useSelector(selectLabelsByInventory);
  const labelsByInventoryLoading = useSelector(selectLabelsByInventoryLoading);
  const printers = useSelector(selectPrinters);
  const printersLoading = useSelector(selectPrintersLoading);
  const printLoading = useSelector(selectPrintOperationLoading);
  const filter = useSelector(selectLabelFilter);

  // Local state
  const [searchType, setSearchType] = useState('barcode'); // 'barcode' or 'inventory'
  const [searchValue, setSearchValue] = useState('');
  const [printCount, setPrintCount] = useState(1);
  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [printingLabelId, setPrintingLabelId] = useState(null);

  // 프린터 목록 가져오기
  useEffect(() => {
    dispatch(fetchPrinters.request());
  }, [dispatch]);

  // 프린터 선택 초기화
  useEffect(() => {
    if (Array.isArray(printers) && printers.length > 0 && !selectedPrinter) {
      const firstPrinter = typeof printers[0] === 'string' 
        ? printers[0] 
        : printers[0].name || printers[0].id;
      setSelectedPrinter(firstPrinter);
    }
  }, [printers, selectedPrinter]);

  // 마운트 시 전체 라벨 조회
  useEffect(() => {
    dispatch(fetchAllLabels.request({ page: 1, limit: 200 }));
    
    return () => {
      // Cleanup: 에러 초기화
      dispatch(clearLabelError());
    };
  }, [dispatch]);

  // 에러 표시
  useEffect(() => {
    if (labelsError) {
      alert(`라벨 조회 실패: ${labelsError}`);
      dispatch(clearLabelError());
    }
  }, [labelsError, dispatch]);

  // 라벨 조회
  const handleSearch = useCallback(() => {
    if (!searchValue.trim()) {
      alert('검색값을 입력해주세요.');
      return;
    }

    if (searchType === 'barcode') {
      dispatch(fetchLabelsByBarcode.request(searchValue));
      dispatch(setLabelFilter({ barcode: searchValue }));
    } else {
      dispatch(fetchLabelsByInventory.request(searchValue));
      dispatch(setLabelFilter({ inventoryId: searchValue }));
    }
  }, [dispatch, searchType, searchValue]);

  // 전체 조회
  const handleFetchAll = useCallback(() => {
    dispatch(fetchAllLabels.request({ page: 1, limit: 200 }));
    setSearchValue('');
  }, [dispatch]);

  // 라벨 출력
  const handlePrint = useCallback(async (labelId) => {
    if (!selectedPrinter) {
      alert('프린터를 선택해주세요.');
      return;
    }

    setPrintingLabelId(labelId);
    
    dispatch(printSavedLabel.request({
      labelId,
      printerName: selectedPrinter,
      printCount,
    }));

    // 출력 성공 메시지는 saga에서 처리하거나, 별도 success 리스너 추가 가능
    setTimeout(() => {
      setPrintingLabelId(null);
    }, 2000);
  }, [dispatch, selectedPrinter, printCount]);

  // 현재 표시할 라벨 목록 결정
  const displayLabels = searchType === 'barcode' && labelsByBarcode.length > 0
    ? labelsByBarcode
    : searchType === 'inventory' && labelsByInventory.length > 0
    ? labelsByInventory
    : labels || [];

  const loading = labelsLoading || labelsByBarcodeLoading || labelsByInventoryLoading;
  const isPrinterList = Array.isArray(displayLabels) && displayLabels.length > 0 && 
    (displayLabels[0]?.name || displayLabels[0]?.driver || displayLabels[0]?.status);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6 flex items-center space-x-2">
        <Package className="h-5 w-5 text-[#674529]" />
        <h2 className="text-lg font-semibold text-[#674529]">저장된 라벨 조회 (Redux)</h2>
      </div>

      {/* 검색 영역 */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            검색 유형
          </label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors"
          >
            <option value="barcode">바코드로 조회</option>
            <option value="inventory">재고 ID로 조회</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {searchType === 'barcode' ? '바코드 번호' : '재고 ID'}
          </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors"
            placeholder={searchType === 'barcode' ? '바코드 번호 입력' : '재고 ID 입력'}
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-[#674529] text-white py-2.5 px-6 rounded-xl font-medium hover:bg-[#5a3d22] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={18} />
            {loading ? '조회 중...' : '조회'}
          </button>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleFetchAll}
            disabled={loading}
            className="w-full bg-gray-600 text-white py-2.5 px-6 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            전체 조회
          </button>
        </div>
      </div>

      {/* 프린터 설정 영역 */}
      {displayLabels.length > 0 && !isPrinterList && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              프린터 선택
            </label>
            <select
              value={selectedPrinter}
              onChange={(e) => setSelectedPrinter(e.target.value)}
              disabled={printersLoading || !Array.isArray(printers) || printers.length === 0}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              {printersLoading ? (
                <option>프린터 목록 로딩 중...</option>
              ) : !Array.isArray(printers) || printers.length === 0 ? (
                <option>사용 가능한 프린터가 없습니다</option>
              ) : (
                printers.map((printer, index) => {
                  const printerName = typeof printer === 'string' ? printer : printer.name || printer.id || `프린터 ${index + 1}`;
                  return (
                    <option key={index} value={printerName}>
                      {printerName}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              인쇄 개수
            </label>
            <input
              type="number"
              min="1"
              value={printCount}
              onChange={(e) => setPrintCount(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors bg-white"
              placeholder="인쇄할 개수"
            />
          </div>
        </div>
      )}

      {/* 라벨 목록 */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {isPrinterList ? (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">프린터명</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">드라이버</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">상태</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">제품명</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">보관조건</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">등록번호</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">제조일자</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">유통기한</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">바코드</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">작업</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={8}>
                    조회 중...
                  </td>
                </tr>
              ) : !Array.isArray(displayLabels) || displayLabels.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan={8}>
                    표시할 라벨이 없습니다.
                  </td>
                </tr>
              ) : (
                displayLabels.map((row, idx) => (
                  isPrinterList ? (
                    <tr key={row.name || idx} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{row.driver || '-'}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{typeof row.status === 'number' ? row.status : row.status ?? '-'}</td>
                    </tr>
                  ) : (
                    <tr key={row.id || row.labelId || idx} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.id || row.labelId}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{row.productName || row.item_name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{row.storageCondition || row.storage_condition || '냉동'}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{row.registrationNumber || row.registration_number || '-'}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{row.manufactureDate || row.manufacture_date || '-'}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{row.expiryDate || row.expiry_date || '-'}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-700">
                          <Barcode className="h-4 w-4 text-gray-500" />
                          <span>{row.barcode || row.barcodeNumber || '-'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handlePrint(row.id || row.labelId)}
                          disabled={printingLabelId === (row.id || row.labelId) || !selectedPrinter || printLoading}
                          className="flex items-center space-x-1 rounded-xl bg-[#674529] hover:bg-[#553821] px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Printer className="h-4 w-4" />
                          <span>
                            {printingLabelId === (row.id || row.labelId) ? '인쇄 중...' : '인쇄'}
                          </span>
                        </button>
                      </td>
                    </tr>
                  )
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavedLabelListRedux;
