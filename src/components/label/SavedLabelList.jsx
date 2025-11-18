import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {
  Printer,
  Search,
  Package,
  Barcode,
  X,
} from 'lucide-react';
import { labelAPI, itemsAPI } from '../../api';

// ===============================
// PDF Base64 헬퍼
// ===============================
const normalizePdfBase64 = (rawPdf) => {
  console.log('📦 normalizePdfBase64 input type:', typeof rawPdf);

  if (rawPdf == null) {
    throw new Error('pdfBase64 데이터가 비어 있습니다.');
  }

  const toBase64FromByteArray = (bytes) => {
    const uint8 = new Uint8Array(bytes);
    let binary = '';
    for (let i = 0; i < uint8.length; i += 1) {
      binary += String.fromCharCode(uint8[i]);
    }
    return window.btoa(binary);
  };

  // 숫자 배열: [37,80,68,...]
  if (Array.isArray(rawPdf)) {
    console.log('📦 normalizePdfBase64: number[] 로 인식');
    const bytes = rawPdf.map((n) => Number(n));
    return toBase64FromByteArray(bytes);
  }

  // 문자열
  if (typeof rawPdf === 'string') {
    const trimmed = rawPdf.trim();

    // "37,80,68,..." 형태의 CSV 숫자 문자열
    const looksLikeCsv = /^[0-9]+(,[0-9]+)*$/.test(trimmed);
    if (looksLikeCsv) {
      console.log('📦 normalizePdfBase64: CSV number string 로 인식');
      const parts = trimmed.split(',');
      const bytes = parts.map((n) => Number(n));
      return toBase64FromByteArray(bytes);
    }

    // 그 외는 이미 base64 라고 가정
    console.log('📦 normalizePdfBase64: base64 string 으로 사용');
    return trimmed;
  }

  // 그 외 타입은 지원하지 않음
  throw new Error('지원하지 않는 pdfBase64 포맷입니다.');
};

const SavedLabelList = () => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('barcode');
  const [searchValue, setSearchValue] = useState('');
  const [printCount, setPrintCount] = useState(1);

  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [printers, setPrinters] = useState([]);
  const [isLoadingPrinters, setIsLoadingPrinters] = useState(false);

  const [printingLabelId, setPrintingLabelId] = useState(null);
  const abortControllerRef = useRef(null);

  // ▶ 인쇄 모달 관련 상태
  const [printTarget, setPrintTarget] = useState(null);
  const [modalManufactureDate, setModalManufactureDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [modalExpiryDate, setModalExpiryDate] = useState('');
  const [modalPrintCount, setModalPrintCount] = useState(1);

  // ▶ 인쇄용 아이템 상세
  const [printItemDetail, setPrintItemDetail] = useState(null);

  // ============================
  // 프린터 목록 가져오기
  // ============================
  useEffect(() => {
    let isMounted = true;

    const fetchPrinters = async () => {
      try {
        setIsLoadingPrinters(true);
        const response = await labelAPI.getPrinters();

        if (!isMounted) return;

        const printerList = Array.isArray(response.data)
          ? response.data
          : response.data?.data ?? response.data?.printers ?? [];

        setPrinters(printerList);

        if (printerList.length > 0) {
          const firstPrinter =
            typeof printerList[0] === 'string'
              ? printerList[0]
              : printerList[0].name ??
                printerList[0].id ??
                '';
          if (firstPrinter) {
            setSelectedPrinter(firstPrinter);
          }
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          console.error('프린터 목록 가져오기 실패:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoadingPrinters(false);
        }
      }
    };

    fetchPrinters();

    return () => {
      isMounted = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // ============================
  // 저장된 라벨 전체 조회
  // ============================
  const handleFetchAll = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    let isMounted = true;

    try {
      setLoading(true);
      const response = await labelAPI.getAllLabels({
        page: 1,
        limit: 200,
      });

      if (signal.aborted || !isMounted) return;

      const rows = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];

      setLabels(rows);
    } catch (error) {
      if (!signal.aborted && isMounted && error.name !== 'AbortError') {
        console.error('라벨 전체 조회 실패:', error);
        alert(
          `라벨 전체 조회에 실패했습니다: ${
            error.response?.data?.message ??
            error.message ??
            '알 수 없는 오류'
          }`,
        );
        setLabels([]);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    handleFetchAll();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [handleFetchAll]);

  // ============================
  // 검색
  // ============================
  const handleSearch = useCallback(async () => {
    if (!searchValue.trim()) {
      alert('검색값을 입력해주세요.');
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    let isMounted = true;

    try {
      setLoading(true);
      let response;

      if (searchType === 'barcode') {
        response = await labelAPI.getLabelsByBarcode(
          searchValue.trim(),
        );
      } else {
        response = await labelAPI.getLabelsByInventory(
          searchValue.trim(),
        );
      }

      if (signal.aborted || !isMounted) return;

      const labelList = Array.isArray(response.data)
        ? response.data
        : response.data?.data ??
          response.data?.labels ??
          [];

      setLabels(labelList);
    } catch (error) {
      if (!signal.aborted && isMounted && error.name !== 'AbortError') {
        console.error('라벨 조회 실패:', error);
        alert(
          `라벨 조회에 실패했습니다: ${
            error.response?.data?.message ??
            error.message ??
            '알 수 없는 오류'
          }`,
        );
        setLabels([]);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, [searchType, searchValue]);

  // ============================
  // 인쇄 모달 열기 (제조일자 선택)
  // ============================
  const handleOpenPrintModal = useCallback(
    (row) => {
      if (!selectedPrinter) {
        alert('프린터를 먼저 선택해주세요.');
        return;
      }

      setPrintTarget(row);

      const today = new Date().toISOString().split('T')[0];
      setModalManufactureDate(today);
      setModalPrintCount(
        Number.isFinite(Number(printCount)) &&
        Number(printCount) > 0
          ? Number(printCount)
          : 1,
      );
    },
    [selectedPrinter, printCount],
  );

  const handleClosePrintModal = useCallback(() => {
    setPrintTarget(null);
    setPrintItemDetail(null);
    setModalExpiryDate('');
    setModalPrintCount(1);
    setPrintingLabelId(null);
  }, []);

  // ============================
  // printTarget 변경 시 item 상세 조회
  //  👉 registration_number 를 최우선으로 사용
  // ============================
  useEffect(() => {
    if (!printTarget) {
      setPrintItemDetail(null);
      return;
    }

    let isMounted = true;

    const fetchItemDetail = async () => {
      try {
        // ✅ registration_number 를 1순위로 사용
        const itemCode =
          printTarget.registration_number ??
          printTarget.registrationNumber ??
          printTarget.itemCode ??
          printTarget.item_code ??
          printTarget.code ??
          null;

        if (!itemCode) {
          console.warn('인쇄 대상 라벨에 itemCode/registration_number가 없습니다.', printTarget);
          return;
        }

        console.log('▶ itemsAPI.getItemByCode 호출, code =', itemCode);

        const res = await itemsAPI.getItemByCode(itemCode);
        if (!isMounted) return;

        const item = res?.data?.data ?? res?.data ?? null;
        console.log('✅ 인쇄용 아이템 상세:', item);

        setPrintItemDetail(item);
      } catch (err) {
        if (!isMounted) return;
        console.error('인쇄용 아이템 상세 조회 실패:', err);
        setPrintItemDetail(null);
      }
    };

    fetchItemDetail();

    return () => {
      isMounted = false;
    };
  }, [printTarget]);

  // ============================
  // 유통기한 일수 계산 (아이템 상세 + 라벨 row 둘 다 고려)
  // ============================
  const expiryDays = useMemo(() => {
    if (!printTarget) return null;

    const candidates = [
      // 아이템 상세에 있는 경우
      printItemDetail?.expiration_date,
      printItemDetail?.expiry_date,
      printItemDetail?.expiryDays,
      printItemDetail?.expiry_days,
      // 라벨 row 자체에 있는 경우
      printTarget.expiration_date,
      printTarget.expiry_date,
      printTarget.expiryDays,
      printTarget.expiry_days,
    ];

    const picked = candidates.find((v) => {
      if (v === undefined || v === null) return false;
      const s = String(v).trim();
      return s !== '';
    });

    if (picked === undefined) {
      return null;
    }

    const n = Number(picked);
    const valid = Number.isFinite(n) && n > 0 ? n : null;

    console.log('🧮 expiryDays 계산:', {
      candidates,
      picked,
      expiryDays: valid,
    });

    return valid;
  }, [printItemDetail, printTarget]);

  // 제조일자 + expiryDays → modalExpiryDate 자동계산
  useEffect(() => {
    if (!modalManufactureDate || !expiryDays) {
      setModalExpiryDate('');
      return;
    }

    try {
      const base = new Date(modalManufactureDate);
      if (Number.isNaN(base.getTime())) {
        setModalExpiryDate('');
        return;
      }
      const d = new Date(base);
      d.setDate(d.getDate() + expiryDays);
      setModalExpiryDate(d.toISOString().split('T')[0]);
    } catch {
      setModalExpiryDate('');
    }
  }, [modalManufactureDate, expiryDays]);

  // ============================
  // 실제 인쇄 실행
  // ============================
  const handleConfirmPrint = useCallback(async () => {
    if (!printTarget) return;
  
    // ✅ UI용 라벨 ID (인쇄 중 상태 표시용)
    const labelId =
      printTarget.id ??
      printTarget.labelId ??
      null;
  
    // ✅ 백엔드에 보낼 itemId (필수)
    const itemId =
      printItemDetail?.id ??
      printTarget.itemId ??
      printTarget.item_id ??
      null;
  
    if (!itemId) {
      alert('이 라벨에 연결된 itemId를 찾을 수 없습니다. 품목-라벨 매핑을 확인해주세요.');
      return;
    }
  
    if (!modalManufactureDate) {
      alert('제조일자를 선택해주세요.');
      return;
    }
  
    if (!modalExpiryDate) {
      alert(
        '유통기한을 계산할 수 없습니다. 품목의 유통기한(일) 정보가 있는지 확인해주세요.',
      );
      return;
    }
  
    if (!selectedPrinter) {
      alert('프린터를 선택해주세요.');
      return;
    }
  
    const templateType =
      printTarget.templateType ??
      printTarget.template_type ??
      'large';
  
    const finalPrintCount =
      Number.isFinite(Number(modalPrintCount)) &&
      Number(modalPrintCount) > 0
        ? Number(modalPrintCount)
        : 1;
  
    try {
      // 🔹 여기서는 여전히 labelId로 버튼 비활성화 관리
      if (labelId) {
        setPrintingLabelId(labelId);
      }
  
      // 1단계: /label/pdf (printSavedLabelPdf) 호출
      //  ✅ 백엔드가 요구하는 정확한 형식으로 보냄
      const pdfRequestPayload = {
        itemId,                      // ✅ 숫자
        templateType,                // ✅ 'large' | 'medium' | 'small' | 'verysmall'
        manufactureDate: modalManufactureDate, // ✅ 'YYYY-MM-DD'
        expiryDate: modalExpiryDate,           // ✅ 'YYYY-MM-DD'
        printCount: finalPrintCount,          // ✅ number
      };
  
      console.log('▶ /label/pdf payload:', pdfRequestPayload);
  
      const pdfResponse =
        await labelAPI.printSavedLabelPdf(
          pdfRequestPayload,
        );
      console.log(
        '✅ /label/pdf response:',
        pdfResponse,
      );
  
      const pdfData = pdfResponse?.data;
      const rawPdf =
        pdfData?.data?.pdfBase64 ??
        pdfData?.pdfBase64 ??
        pdfData?.pdf ??
        pdfData?.data ??
        pdfData;
  
      const pdfBase64 = normalizePdfBase64(rawPdf);
      console.log(
        '✅ pdfBase64 length:',
        pdfBase64.length,
      );
  
      // 2단계: 4310/print 호출
      const printerPayload = {
        printerName: selectedPrinter,
        printCount: finalPrintCount,
        pdfBase64,
      };
  
      console.log('▶ 4310/print payload:', {
        ...printerPayload,
        pdfBase64: `${pdfBase64.slice(
          0,
          30,
        )}...`,
      });
  
      const printResponse =
        await labelAPI.printLabel(printerPayload);
      console.log(
        '✅ 4310/print response:',
        printResponse,
      );
  
      const printResult = printResponse?.data;
      const ok =
        typeof printResult?.ok === 'boolean'
          ? printResult.ok
          : true;
      const message =
        printResult?.message ??
        `${finalPrintCount}건 라벨 인쇄 요청이 완료되었습니다.`;
  
      if (!ok) {
        throw new Error(message);
      }
  
      alert(message);
      handleClosePrintModal();
    } catch (error) {
      console.error('라벨 인쇄 실패:', error);
      alert(
        `인쇄에 실패했습니다: ${
          error.response?.data?.message ??
          error.message ??
          '알 수 없는 오류'
        }`,
      );
    } finally {
      setPrintingLabelId(null);
    }
  }, [
    printTarget,
    printItemDetail,
    modalManufactureDate,
    modalExpiryDate,
    modalPrintCount,
    selectedPrinter,
    handleClosePrintModal,
  ]);

  // ============================
  // 렌더링
  // ============================
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6 flex items-center space-x-2">
        <Package className="h-5 w-5 text-[#674529]" />
        <h2 className="text-lg font-semibold text-[#674529]">
          저장된 라벨 조회
        </h2>
      </div>

      {/* 검색 영역 */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            검색 유형
          </label>
          <select
            value={searchType}
            onChange={(e) =>
              setSearchType(e.target.value)
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors"
          >
            <option value="barcode">
              바코드로 조회
            </option>
            <option value="inventory">
              재고 ID로 조회
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {searchType === 'barcode'
              ? '바코드 번호'
              : '재고 ID'}
          </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors"
            placeholder={
              searchType === 'barcode'
                ? '바코드 번호 입력'
                : '재고 ID 입력'
            }
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
      </div>

      {/* 프린터 설정 영역 */}
      {labels.length > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              프린터 선택
            </label>
            <select
              value={selectedPrinter}
              onChange={(e) =>
                setSelectedPrinter(e.target.value)
              }
              disabled={
                isLoadingPrinters || printers.length === 0
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-[#674529] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              {isLoadingPrinters ? (
                <option>프린터 목록 로딩 중...</option>
              ) : printers.length === 0 ? (
                <option>
                  사용 가능한 프린터가 없습니다
                </option>
              ) : (
                printers.map((printer, index) => {
                  const printerName =
                    typeof printer === 'string'
                      ? printer
                      : printer.name ??
                        printer.id ??
                        `프린터 ${index + 1}`;
                  return (
                    <option
                      key={index}
                      value={printerName}
                    >
                      {printerName}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              기본 인쇄 개수
            </label>
            <input
              type="number"
              min="1"
              value={printCount}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (
                  Number.isNaN(value) ||
                  value < 1
                ) {
                  setPrintCount(1);
                  return;
                }
                setPrintCount(value);
              }}
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  제품명
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  보관조건
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  등록번호
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  제조일자(저장값)
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  유통기한(저장값)
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  바코드
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-500"
                    colSpan={8}
                  >
                    조회 중...
                  </td>
                </tr>
              ) : labels.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-gray-500"
                    colSpan={8}
                  >
                    표시할 라벨이 없습니다.
                  </td>
                </tr>
              ) : (
                labels.map((row, idx) => {
                  const id =
                    row.id ??
                    row.labelId ??
                    idx;
                  const productName =
                    row.productName ??
                    row.item_name ??
                    row.name ??
                    '-';
                  const storageCondition =
                    row.storageCondition ??
                    row.storage_condition ??
                    '냉동';
                  const registrationNumber =
                    row.registrationNumber ??
                    row.registration_number ??
                    '-';
                  const savedManufactureDate =
                    row.manufactureDate ??
                    row.manufacture_date ??
                    '-';
                  const savedExpiryDate =
                    row.expiryDate ??
                    row.expiry_date ??
                    '-';
                  const barcodeValue =
                    row.barcode ??
                    row.barcodeNumber ??
                    row.barcode_number ??
                    '-';

                  return (
                    <tr
                      key={id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {row.id ?? row.labelId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {productName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {storageCondition}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {registrationNumber}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {savedManufactureDate}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {savedExpiryDate}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-700">
                          <Barcode className="h-4 w-4 text-gray-500" />
                          <span>{barcodeValue}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() =>
                            handleOpenPrintModal(row)
                          }
                          disabled={
                            !selectedPrinter
                          }
                          className="flex items-center space-x-1 rounded-xl bg-[#674529] hover:bg-[#553821] px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Printer className="h-4 w-4" />
                          <span>인쇄</span>
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

      {/* ▶ 인쇄 설정 모달 (제조일자 선택 + 유통기한 자동 계산) */}
      {printTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
              <h3 className="text-base font-semibold text-[#674529]">
                라벨 인쇄 설정
              </h3>
              <button
                type="button"
                onClick={handleClosePrintModal}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  선택된 라벨
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
                  <div className="font-semibold">
                    {printTarget.productName ??
                      printTarget.item_name ??
                      printTarget.name ??
                      '-'}
                  </div>
                  <div className="mt-0.5">
                    ID:{' '}
                    {printTarget.id ??
                      printTarget.labelId}
                  </div>
                  {expiryDays && (
                    <div className="mt-0.5 text-[11px] text-gray-500">
                      품목 유통기한: {expiryDays}일
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제조일자 선택
                </label>
                <input
                  type="date"
                  value={modalManufactureDate}
                  onChange={(e) =>
                    setModalManufactureDate(
                      e.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#674529] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  유통기한 (자동 계산)
                </label>
                <input
                  type="text"
                  value={modalExpiryDate}
                  readOnly
                  placeholder={
                    expiryDays
                      ? '제조일자를 선택하면 자동 계산됩니다.'
                      : '유통기한(일) 정보가 없어 계산할 수 없습니다.'
                  }
                  className="w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-2.5 text-sm text-blue-700 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  인쇄 개수
                </label>
                <input
                  type="number"
                  min="1"
                  value={modalPrintCount}
                  onChange={(e) => {
                    const value = Number(
                      e.target.value,
                    );
                    if (
                      Number.isNaN(value) ||
                      value < 1
                    ) {
                      setModalPrintCount(1);
                      return;
                    }
                    setModalPrintCount(value);
                  }}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#674529] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-5 py-3">
              <button
                type="button"
                onClick={handleClosePrintModal}
                className="rounded-xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmPrint}
                disabled={
                  !modalManufactureDate ||
                  !modalExpiryDate ||
                  !selectedPrinter ||
                  printingLabelId ===
                    (printTarget.id ??
                      printTarget.labelId)
                }
                className="rounded-xl bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5a3d22] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {printingLabelId ===
                (printTarget.id ??
                  printTarget.labelId)
                  ? '인쇄 중...'
                  : '프린트'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedLabelList;
