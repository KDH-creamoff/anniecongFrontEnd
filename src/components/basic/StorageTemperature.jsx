import React, { useEffect, useState } from 'react';
import { Thermometer, X, Plus } from 'lucide-react';

// API 환경변수가 없는 경우 fallback 적용
const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL)) ||
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) ||
  'http://localhost:4000/api';

const StorageTemperature = () => {
  const [storageConditions, setStorageConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  // 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConditionName, setNewConditionName] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  // 보관 조건 목록 불러오기
  const fetchConditions = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch(`${API_BASE}/storage-conditions`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      // 상황별로 다 대응
      if (Array.isArray(data)) {
        setStorageConditions(data);
      } else if (data?.items && Array.isArray(data.items)) {
        setStorageConditions(data.items);
      } else if (data?.data && Array.isArray(data.data)) {
        setStorageConditions(data.data);
      } else if (Array.isArray(data.storageConditions)) {
        setStorageConditions(data.storageConditions);
      } else {
        setStorageConditions([]);
      }
    } catch (err) {
      setErrorMsg('보관 조건 정보를 불러오지 못했습니다.');
      setStorageConditions([]);
      // 콘솔에 에러 표시
      if (typeof console !== "undefined") console.error('보관 조건 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==== 모달 제어 ====
  const openModal = () => {
    setNewConditionName('');
    setIsModalOpen(true);
    setErrorMsg('');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setNewConditionName('');
    setErrorMsg('');
  };

  // ==== 보관 조건 추가 ====
  const handleAddCondition = async () => {
    if (!newConditionName.trim()) {
      setErrorMsg('보관조건명을 입력해주세요.');
      return;
    }
    setModalLoading(true);
    try {
      const res = await fetch(`${API_BASE}/storage-conditions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newConditionName.trim() }),
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (
        (data.ok === false || data.success === false) &&
        data.message
      ) {
        setErrorMsg(data.message || '추가 실패');
      } else {
        // 정상 추가: 다시 목록 가져옴
        fetchConditions();
        closeModal();
      }
    } catch (err) {
      setErrorMsg('서버 오류 (추가 실패)');
      if (typeof console !== "undefined") console.error('보관조건 추가 실패', err);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="mb-4 flex items-center gap-3">
        <Thermometer className="h-6 w-6 text-[#674529]" />
        <h1 className="text-lg font-semibold text-[#674529]">보관 조건 목록</h1>
        <button
          type="button"
          onClick={openModal}
          className="ml-auto flex items-center gap-1 rounded-xl bg-[#674529] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#553821] active:scale-95"
        >
          <Plus className="h-4 w-4" />
          추가
        </button>
      </div>
      {/* Loading/오류/데이터 */}
      {loading ? (
        <div className="py-12 text-center text-gray-400">불러오는 중...</div>
      ) : errorMsg ? (
        <div className="py-12 text-center text-red-500">{errorMsg}</div>
      ) : storageConditions.length === 0 ? (
        <div className="py-12 text-center text-gray-400">등록된 보관 조건이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {storageConditions.map((storage) => (
            <div
              key={storage?.id ?? storage?.name}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-[#674529]" />
                <h2 className="text-base text-[#674529]">{storage?.name ?? '-'}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    온도 범위
                  </label>
                  <div className="rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900">
                    {(storage?.temperature_range ||
                      storage?.temperatureRange ||
                      (typeof storage?.min_temp !== "undefined" && typeof storage?.max_temp !== "undefined"))
                      ? (
                        storage?.temperature_range ||
                        storage?.temperatureRange ||
                        `${storage.min_temp ?? '-'} ~ ${storage.max_temp ?? '-'}`
                      )
                      : '-'}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    습도 범위
                  </label>
                  <div className="rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900">
                    {(storage?.humidity_range ||
                      storage?.humidityRange ||
                      (typeof storage?.min_humidity !== "undefined" && typeof storage?.max_humidity !== "undefined"))
                      ? (
                        storage?.humidity_range ||
                        storage?.humidityRange ||
                        `${storage.min_humidity ?? '-'} ~ ${storage.max_humidity ?? '-'}`
                      )
                      : '-'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======= 추가 모달 ======= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#674529]" />
                <h3 className="text-lg font-semibold text-[#674529]">보관 조건 추가</h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1 transition-colors hover:bg-gray-100"
                aria-label="닫기"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  보관 조건명
                </label>
                <input
                  type="text"
                  value={newConditionName}
                  onChange={(e) => {
                    setNewConditionName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="예: 냉장, 상온 등"
                  className={`w-full rounded-xl border ${
                    errorMsg ? 'border-red-300' : 'border-gray-100'
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCondition();
                  }}
                  autoFocus
                />
                {errorMsg && (
                  <p className="mt-1 text-xs text-red-500">{errorMsg}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleAddCondition}
                  disabled={modalLoading}
                  className="flex-1 rounded-xl bg-[#674529] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#553821] hover:shadow-md active:scale-95 disabled:opacity-60"
                >
                  {modalLoading ? '추가 중...' : '추가'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default StorageTemperature;
