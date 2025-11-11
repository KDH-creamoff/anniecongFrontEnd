import { useState, useRef } from 'react';

const BusinessTripExpenseReport = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  const [formData, setFormData] = useState({
    reporter: '',
    department: '',
    startYear: '20',
    startMonth: '',
    startDay: '',
    endYear: '20',
    endMonth: '',
    endDay: '',
    purpose: '',
    transportationDetail: '',
    transportationAmount: '₩',
    accommodationDetail: '',
    accommodationAmount: '₩',
    dailyDetail: '',
    dailyAmount: '₩',
    mealsDetail: '',
    mealsAmount: '₩',
    otherDetail: '',
    otherAmount: '₩',
    totalDetail: '',
    totalAmount: '₩',
    reportYear: '20',
    reportMonth: '',
    reportDay: '',
    reporterName: '',
  });

  const [receiptImages, setReceiptImages] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddReceiptImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file)
    }));
    setReceiptImages(prev => [...prev, ...newImages]);
  };

  const handleRemoveReceiptImage = (id) => {
    setReceiptImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      {/* 제목 */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">출 장 비 내 역 서</h1>
      </div>

      {/* 메인 테이블 */}
      <table className="w-full border border-black border-collapse text-xs mb-6">
        <tbody>
          {/* 출장내역 섹션 */}
          <tr>
            <td className="border border-black text-center py-2 font-medium" style={{ width: '100px' }} rowSpan={4}>
              출 장 내 역
            </td>
            <td className="border border-black text-center py-2 font-medium" style={{ width: '100px' }}>출장자</td>
            <td className="border border-black px-3 py-2" colSpan={3}>
              <input
                type="text"
                value={formData.reporter}
                onChange={(e) => handleInputChange('reporter', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
          </tr>

          <tr>
            <td className="border border-black text-center py-2 font-medium">부 서</td>
            <td className="border border-black px-3 py-2" colSpan={3}>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
          </tr>

          <tr>
            <td className="border border-black text-center py-2 font-medium">기 간</td>
            <td className="border border-black px-3 py-2 text-center" colSpan={3}>
              <div className="flex justify-center items-center gap-1">
                <input
                  type="text"
                  value={formData.startYear}
                  onChange={(e) => handleInputChange('startYear', e.target.value)}
                  className="w-8 outline-none"
                />
                <span>.</span>
                <input
                  type="text"
                  value={formData.startMonth}
                  onChange={(e) => handleInputChange('startMonth', e.target.value)}
                  className="w-6 outline-none"
                />
                <span>.</span>
                <input
                  type="text"
                  value={formData.startDay}
                  onChange={(e) => handleInputChange('startDay', e.target.value)}
                  className="w-6 outline-none"
                />
                <span>~</span>
                <input
                  type="text"
                  value={formData.endYear}
                  onChange={(e) => handleInputChange('endYear', e.target.value)}
                  className="w-8 outline-none"
                />
                <span>.</span>
                <input
                  type="text"
                  value={formData.endMonth}
                  onChange={(e) => handleInputChange('endMonth', e.target.value)}
                  className="w-6 outline-none"
                />
                <span>.</span>
                <input
                  type="text"
                  value={formData.endDay}
                  onChange={(e) => handleInputChange('endDay', e.target.value)}
                  className="w-6 outline-none"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="border border-black text-center py-2 font-medium">목 적</td>
            <td className="border border-black px-3 py-2" colSpan={3}>
              <input
                type="text"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
          </tr>

          {/* 항목 헤더 */}
          <tr>
            <td className="border border-black text-center py-2 font-medium" style={{ width: '100px' }}>항 목</td>
            <td className="border border-black text-center py-2 font-medium" style={{ width: '200px' }}>내 역</td>
            <td className="border border-black text-center py-2 font-medium" style={{ width: '150px' }}>금 액</td>
          </tr>

          {/* 교통비 */}
          <tr>
            <td className="border border-black text-center py-2">교통비</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.transportationDetail}
                onChange={(e) => handleInputChange('transportationDetail', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black text-right px-3 py-2">
              <input
                type="text"
                value={formData.transportationAmount}
                onChange={(e) => handleInputChange('transportationAmount', e.target.value)}
                className="w-full outline-none bg-transparent text-right"
              />
            </td>
          </tr>

          {/* 숙 박 */}
          <tr>
            <td className="border border-black text-center py-2">숙 박</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.accommodationDetail}
                onChange={(e) => handleInputChange('accommodationDetail', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black text-right px-3 py-2">
              <input
                type="text"
                value={formData.accommodationAmount}
                onChange={(e) => handleInputChange('accommodationAmount', e.target.value)}
                className="w-full outline-none bg-transparent text-right"
              />
            </td>
          </tr>

          {/* 일당비 */}
          <tr>
            <td className="border border-black text-center py-2">일당비</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.dailyDetail}
                onChange={(e) => handleInputChange('dailyDetail', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black text-right px-3 py-2">
              <input
                type="text"
                value={formData.dailyAmount}
                onChange={(e) => handleInputChange('dailyAmount', e.target.value)}
                className="w-full outline-none bg-transparent text-right"
              />
            </td>
          </tr>

          {/* 숙박비 */}
          <tr>
            <td className="border border-black text-center py-2">숙박비</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.mealsDetail}
                onChange={(e) => handleInputChange('mealsDetail', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black text-right px-3 py-2">
              <input
                type="text"
                value={formData.mealsAmount}
                onChange={(e) => handleInputChange('mealsAmount', e.target.value)}
                className="w-full outline-none bg-transparent text-right"
              />
            </td>
          </tr>

          {/* 기타잡비 */}
          <tr>
            <td className="border border-black text-center py-2">기타잡비</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.otherDetail}
                onChange={(e) => handleInputChange('otherDetail', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black text-right px-3 py-2">
              <input
                type="text"
                value={formData.otherAmount}
                onChange={(e) => handleInputChange('otherAmount', e.target.value)}
                className="w-full outline-none bg-transparent text-right"
              />
            </td>
          </tr>

          {/* 합 계 */}
          <tr>
            <td className="border border-black text-center py-2">합 계</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.totalDetail}
                onChange={(e) => handleInputChange('totalDetail', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black text-right px-3 py-2">
              <input
                type="text"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                className="w-full outline-none bg-transparent text-right"
              />
            </td>
          </tr>

          {/* 비고 */}
          <tr>
            <td className="border border-black px-3 py-3 relative min-h-[150px]" colSpan={3}>
              <div className="text-xs mb-2">
                <span>(별첨 : 교통비명세서, 영수증, 숙박영수증 등 부착)</span>
              </div>

              {/* 영수증 이미지 표시 영역 */}
              {receiptImages.length > 0 && (
                <div className="flex flex-col gap-3 mt-3 mb-16">
                  {receiptImages.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt="영수증"
                        className="w-full h-auto max-h-[400px] object-contain border border-gray-300"
                      />
                      <button
                        onClick={() => handleRemoveReceiptImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs print:hidden"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 영수증 추가 버튼 - td 내 하단 오른쪽 위치 */}
              <div className="absolute bottom-2 right-3 print:hidden">
                <label className="cursor-pointer bg-[#674529] hover:bg-[#523620] text-white px-4 py-2 rounded text-xs font-medium transition-colors flex items-center gap-1 shadow">
                  <span>이미지 추가</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAddReceiptImage}
                    className="hidden"
                  />
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 하단 날짜 및 서명 */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-1 mb-4">
          <input
            type="text"
            value={formData.reportYear}
            onChange={(e) => handleInputChange('reportYear', e.target.value)}
            className="w-10 text-center outline-none"
          />
          <span>.</span>
          <input
            type="text"
            value={formData.reportMonth}
            onChange={(e) => handleInputChange('reportMonth', e.target.value)}
            className="w-6 text-center outline-none"
          />
          <span>.</span>
          <input
            type="text"
            value={formData.reportDay}
            onChange={(e) => handleInputChange('reportDay', e.target.value)}
            className="w-6 text-center outline-none"
          />
        </div>

        <div className="flex justify-center items-center gap-2">
          <span>담당자 :</span>
          <input
            type="text"
            value={formData.reporterName}
            onChange={(e) => handleInputChange('reporterName', e.target.value)}
            className="w-24 text-center outline-none border-b border-black"
          />
          <span className="text-lg">(인)</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessTripExpenseReport;
