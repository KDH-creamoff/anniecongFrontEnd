import { useState } from 'react';
import { Upload } from 'lucide-react';

const Shipping = () => {
  const [activeTab, setActiveTab] = useState('B2C');
  const [selectedPlatform, setSelectedPlatform] = useState({
    B2C: {
      자사몰: { 미완료: false, 완료: false },
      구몬: { 미완료: false, 완료: false },
      스마트스토어: { 미완료: false, 완료: false }
    },
    B2B: {
      자사몰: { 선택: false }
    }
  });

  const handlePlatformSelect = (tab, platform, status) => {
    setSelectedPlatform(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [platform]: {
          ...prev[tab][platform],
          [status]: !prev[tab][platform][status]
        }
      }
    }));
  };

  return (
    <div>
      {/* Tab Navigation - matching first image style */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl inline-flex">
        <button
          onClick={() => setActiveTab('B2B')}
          className={`px-8 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'B2B'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          B2B 출고
        </button>
        <button
          onClick={() => setActiveTab('B2C')}
          className={`px-8 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'B2C'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          B2C 출고
        </button>
        <button
          onClick={() => setActiveTab('배송목록')}
          className={`px-8 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === '배송목록'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          배송 목록
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab !== '배송목록' && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header with upload icon */}
          <div className="flex items-center space-x-2 mb-6">
            <Upload className="h-5 w-5 text-[#674529]" />
            <h3 className="text-lg font-semibold text-[#674529]">
              {activeTab} 주문 엑셀 업로드
            </h3>
          </div>

          {/* Platform Selection Section - matching second image design */}
          <div className="mb-6">
            {activeTab === 'B2C' ? (
              // B2C Platform Options
              <div className="grid grid-cols-3 gap-6">
                {/* 자사몰 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-base font-medium text-gray-800">자사몰 (선택)</div>
                  </div>
                  <div className="flex items-center justify-center space-x-3"> 
                    <button
                      onClick={() => handlePlatformSelect('B2C', '자사몰', '완료')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedPlatform.B2C.자사몰.완료
                          ? 'bg-gray-800 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      파일 선택
                    </button>
                  </div>
                </div>

                {/* 구몬 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-base font-medium text-gray-800">구몬 (선택)</div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handlePlatformSelect('B2C', '구몬', '완료')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedPlatform.B2C.구몬.완료
                          ? 'bg-gray-800 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      파일 선택
                    </button>
                  </div>
                </div>

                {/* 스마트스토어 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-base font-medium text-gray-800">스마트스토어 (선택)</div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handlePlatformSelect('B2C', '스마트스토어', '완료')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedPlatform.B2C.스마트스토어.완료
                          ? 'bg-gray-800 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      파일 선택
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // B2B Platform Options - Only 자사몰 with single button
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-base font-medium text-gray-800">자사몰 (선택)</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handlePlatformSelect('B2B', '자사몰', '선택')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedPlatform.B2B.자사몰.선택
                          ? 'bg-gray-800 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      파일 선택
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Table Section - Placeholder for future implementation */}
          <div className="mb-6 border-t border-gray-200 pt-6">
            <div className="bg-gray-50 rounded-lg p-12 text-center text-gray-400">
              CJ 업로드용 엑셀 파일
            </div>
          </div>

          {/* CJ Upload Button */}
          <div className="flex items-center justify-end">
            <button className="flex items-center space-x-2 px-6 py-2.5 bg-[#674529] text-white rounded-lg">
              <Upload size={18} />
              <span>CJ업로드 파일 만들기</span>
            </button>
          </div>
        </div>
      )}

      {/* 배송 목록 tab content */}
      {activeTab === '배송목록' && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center text-gray-500 py-12">
            배송 목록 페이지 (추후 구현 예정)
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping;