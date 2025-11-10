import { useState, useRef } from 'react';

const PackagingInspectionReport = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  const [formData, setFormData] = useState({
    year: '20',
    month: '',
    day: '',
    inspector: '김OO',
    productName: '쿠키',
    quantity: '6종',
    inspectionItem1_1: '진공 외포장이 파손이 없다.',
    inspectionItem1_2: '제품이 포장지 보다 튀어나와 있지 않다.',
    inspectionItem1_3: '내포장 및 스티커 라벨이 잘 붙어있다.',
    status1_1: '○',
    status1_2: '○',
    status1_3: '○',
    note: '모든 검사항목에서 통과되었으며 제품의 용기 및 포장 상태가 정상입니다.',
    reportNote: '위와 같이 제품에 대한 검사결과를 보고합니다.',
    reportYear: '20',
    reportMonth: '',
    reportDay: '',
    reporter: '',
    companyName: '애니콩 주식회사 농업회사법인',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[14px] leading-tight"
    >
      {/* 상단 제목 */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold mb-1">용기 및 포장</h1>
          <h1 className="text-2xl font-bold">외관검사 보고서</h1>
        </div>
        <div className="absolute right-8 top-8">
          <table className="border border-black border-collapse text-center text-xs">
            <tbody>
              <tr className="bg-gray-100">
                <td className="border border-black px-3 py-1">담 당</td>
                <td className="border border-black px-3 py-1">팀 장</td>
                <td className="border border-black px-3 py-1">대 표</td>
              </tr>
              <tr>
                <td className="border border-black h-6"></td>
                <td className="border border-black h-6"></td>
                <td className="border border-black h-6"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 상단 기본정보 */}
      <table className="w-full border border-black border-collapse mb-4 text-sm">
        <tbody>
          <tr>
            <td className="border border-black text-center bg-gray-100 w-[90px] py-2">검사일자</td>
            <td className="border border-black px-2 py-2" colSpan={3}>
              <div className="flex gap-1 items-center">
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-10 text-center outline-none"
                />
                <span>년</span>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className="w-8 text-center outline-none"
                />
                <span>월</span>
                <input
                  type="text"
                  value={formData.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  className="w-8 text-center outline-none"
                />
                <span>일</span>
              </div>
            </td>
            <td className="border border-black text-center bg-gray-100 w-[90px]">검사자</td>
            <td className="border border-black px-2 py-2 w-[120px]">
              <input
                type="text"
                value={formData.inspector}
                onChange={(e) => handleInputChange('inspector', e.target.value)}
                className="w-full text-center outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center bg-gray-100 py-2">제 품 명</td>
            <td className="border border-black px-2 py-2" colSpan={3}>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full outline-none text-center"
              />
            </td>
            <td className="border border-black text-center bg-gray-100">종 류</td>
            <td className="border border-black px-2 py-2">
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full text-center outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 검사항목 */}
      <table className="w-full border border-black border-collapse text-sm mb-4">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-black w-[40px]">구분</th>
            <th className="border border-black w-[150px]">검사기준</th>
            <th className="border border-black">검사항목</th>
            <th className="border border-black w-[70px]">검사결과</th>
            <th className="border border-black w-[80px]">생산자</th>
            <th className="border border-black w-[80px]">사진</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={3} className="border border-black text-center align-top py-2">1</td>
            <td rowSpan={3} className="border border-black text-center font-bold py-2">
              콩분말 쿠키
            </td>
            <td className="border border-black px-2 py-1">
              <input
                type="text"
                value={formData.inspectionItem1_1}
                onChange={(e) => handleInputChange('inspectionItem1_1', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center">정상</td>
            <td className="border border-black text-center">
              <input
                type="text"
                value={formData.status1_1}
                onChange={(e) => handleInputChange('status1_1', e.target.value)}
                className="w-full text-center outline-none"
              />
            </td>
            <td className="border border-black text-center">0</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              <input
                type="text"
                value={formData.inspectionItem1_2}
                onChange={(e) => handleInputChange('inspectionItem1_2', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center">정상</td>
            <td className="border border-black text-center">
              <input
                type="text"
                value={formData.status1_2}
                onChange={(e) => handleInputChange('status1_2', e.target.value)}
                className="w-full text-center outline-none"
              />
            </td>
            <td className="border border-black text-center">0</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              <input
                type="text"
                value={formData.inspectionItem1_3}
                onChange={(e) => handleInputChange('inspectionItem1_3', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center">정상</td>
            <td className="border border-black text-center">
              <input
                type="text"
                value={formData.status1_3}
                onChange={(e) => handleInputChange('status1_3', e.target.value)}
                className="w-full text-center outline-none"
              />
            </td>
            <td className="border border-black text-center">0</td>
          </tr>
          <tr>
            <td className="border border-black text-center py-2">2</td>
            <td colSpan={5} className="border border-black px-2 py-3">
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="w-full outline-none resize-none"
                rows="2"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 종합 문구 */}
      <div className="text-center text-sm my-6">
        <textarea
          value={formData.reportNote}
          onChange={(e) => handleInputChange('reportNote', e.target.value)}
          className="w-full outline-none resize-none text-center"
          rows="1"
        />
      </div>

      {/* 날짜 및 서명 */}
      <div className="flex justify-center items-center mb-6 text-base gap-2">
        <input
          type="text"
          value={formData.reportYear}
          onChange={(e) => handleInputChange('reportYear', e.target.value)}
          className="w-10 text-center outline-none"
        />
        <span>년</span>
        <input
          type="text"
          value={formData.reportMonth}
          onChange={(e) => handleInputChange('reportMonth', e.target.value)}
          className="w-10 text-center outline-none"
        />
        <span>월</span>
        <input
          type="text"
          value={formData.reportDay}
          onChange={(e) => handleInputChange('reportDay', e.target.value)}
          className="w-10 text-center outline-none"
        />
        <span>일</span>
      </div>

      <div className="text-right mb-8">
        <span className="mr-4">보고자</span>
        <input
          type="text"
          value={formData.reporter}
          onChange={(e) => handleInputChange('reporter', e.target.value)}
          className="outline-none border-b border-gray-400 text-center w-32"
        />
        <span className="ml-2">(인)</span>
      </div>

      {/* 회사명 */}
      <div className="text-center text-lg font-bold">
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          className="w-full text-center outline-none"
        />
      </div>
    </div>
  );
};

export default PackagingInspectionReport;
