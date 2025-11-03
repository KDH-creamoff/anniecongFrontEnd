import { Upload } from 'lucide-react';

const ShippingB2B = ({ selectedPlatform, onPlatformSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Header with upload icon */}
      <div className="flex items-center space-x-2 mb-6">
        <Upload className="h-5 w-5 text-[#674529]" />
        <h3 className="text-lg font-semibold text-[#674529]">
          B2B 주문 엑셀 업로드
        </h3>
      </div>

      {/* Platform Selection Section */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-base font-medium text-gray-800">자사몰</div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => onPlatformSelect('B2B', '자사몰', '선택')}
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
      </div>

      {/* Table Section - Placeholder for future implementation */}
      <div className="mb-6 border-t border-gray-200 pt-6">
        <div className="bg-gray-50 rounded-lg p-12 text-center text-gray-400">
          CJ 업로드용 엑셀 파일
        </div>
      </div>

      {/* CJ Upload Button */}
      <div className="flex items-center justify-end">
        <button className="flex items-center space-x-2 px-6 py-2.5 bg-[#674529] text-white rounded-lg hover:bg-[#553821] transition-colors">
          <Upload size={18} />
          <span>CJ업로드 파일 만들기</span>
        </button>
      </div>
    </div>
  );
};

export default ShippingB2B;
