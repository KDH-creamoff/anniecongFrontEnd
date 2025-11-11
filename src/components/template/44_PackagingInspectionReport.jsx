import { useState, useRef } from 'react';

const PackagingInspectionReport = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  // 동적으로 추가 가능한 검사항목 행
  const [inspectionRows, setInspectionRows] = useState([
    { id: 1, title: '', titleResult: '', titleProducer: '', items: ['', '', ''], results: ['', '', ''], producers: ['', '', ''], image: null }
  ]);

  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    inspector: '',
    productName: '',
    quantity: '',
    note: '',
    reportNote: '',
    reportYear: '',
    reportMonth: '',
    reportDay: '',
    reporter: '',
    companyName: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 검사항목 행 추가
  const addInspectionRow = () => {
    const newId = inspectionRows.length > 0 ? Math.max(...inspectionRows.map(r => r.id)) + 1 : 1;
    setInspectionRows([...inspectionRows, {
      id: newId,
      title: '',
      titleResult: '',
      titleProducer: '',
      items: ['', '', ''],
      results: ['', '', ''],
      producers: ['', '', ''],
      image: null
    }]);
  };

  // 검사항목 행의 필드 변경
  const handleRowChange = (rowId, field, index, value) => {
    setInspectionRows(inspectionRows.map(row => {
      if (row.id === rowId) {
        if (field === 'title' || field === 'titleResult' || field === 'titleProducer' || field === 'image') {
          return { ...row, [field]: value };
        } else {
          const newArray = [...row[field]];
          newArray[index] = value;
          return { ...row, [field]: newArray };
        }
      }
      return row;
    }));
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      {/* 상단 제목 */}
      <div className="flex justify-btween items-start mb-3">
        <div className="text-center w-[300px]">
          <h1 className="text-2xl font-bold mb-1">용기 및 포장</h1>
          <h1 className="text-2xl font-bold">외관검사 보고서</h1>
        </div>
        <div className="absolute right-8 top-8">
          <table className="border border-black border-collapse text-center text-xs">
            <tbody>
              <tr style={{ backgroundColor: '#e8e8e8' }}>
                <td className="border border-black px-3 py-1">담 당</td>
                <td className="border border-black px-3 py-1">팀장</td>
                <td className="border border-black px-3 py-1">대표</td>
              </tr>
              <tr>
                <td className="border border-black h-10"></td>
                <td className="border border-black h-10"></td>
                <td className="border border-black h-10"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 상단 기본정보 */}
      <table className="w-full border border-black border-collapse mb-3 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2" style={{ backgroundColor: '#e8e8e8' }}>검사일자</td>
            <td className="border border-black px-2 py-1.5">
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
            <td className="border border-black text-center w-[100px]" style={{ backgroundColor: '#e8e8e8' }}>검사자</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.inspector}
                onChange={(e) => handleInputChange('inspector', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>제 품 명</td>
            <td className="border border-black px-2 py-1.5" >
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center" style={{ backgroundColor: '#e8e8e8' }}>종 류</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 검사항목 */}
      <table className="w-full border border-black border-collapse text-xs mb-3">
        <thead>
          <tr className="text-center" style={{ backgroundColor: '#e8e8e8' }}>
            <th className="border border-black py-1.5 font-medium w-[35px]" rowSpan={2}>구<br/>분</th>
            <th className="border border-black py-1.5 font-medium" colSpan={4}>검사항목</th>
          </tr>
          <tr>
            <th className="border border-black py-1.5 font-medium w-[100px]">검사기준</th>
            <th className="border border-black py-1.5 font-medium w-[70px]">검사결과</th>
            <th className="border border-black py-1.5 font-medium w-[70px]">생산자</th>
            <th className="border border-black py-1.5 font-medium w-[60px]">사진</th>
          </tr>
        </thead>
        <tbody>
          {inspectionRows.map((row, rowIndex) => (
            <>
              <tr key={`${row.id}-0`}>
                <td rowSpan={4} className="border border-black text-center align-top py-1.5">{rowIndex + 1}</td>
                <td className="border border-black text-center font-medium py-1.5">
                  <input
                    type="text"
                    value={row.title}
                    onChange={(e) => handleRowChange(row.id, 'title', null, e.target.value)}
                    className="w-full text-center outline-none bg-transparent"
                    placeholder="콩부장 쿠키"
                  />
                </td>
                <td className="border border-black text-center py-1.5">
                  <input
                    type="text"
                    value={row.titleResult || ''}
                    onChange={(e) => handleRowChange(row.id, 'titleResult', null, e.target.value)}
                    className="w-full text-center outline-none bg-transparent"
                  />
                </td>
                <td className="border border-black text-center py-1.5">
                  <input
                    type="text"
                    value={row.titleProducer || ''}
                    onChange={(e) => handleRowChange(row.id, 'titleProducer', null, e.target.value)}
                    className="w-full text-center outline-none bg-transparent"
                  />
                </td>
                <td rowSpan={4} className="border border-black text-center p-2">
                  <label className="cursor-pointer block w-full h-full min-h-[60px] flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleRowChange(row.id, 'image', null, e.target.files[0])}
                      className="hidden"
                    />
                    {row.image && (
                      <img
                        src={URL.createObjectURL(row.image)}
                        alt="검사사진"
                        className="w-full h-auto max-h-24 object-contain"
                      />
                    )}
                  </label>
                </td>
              </tr>
              {[0, 1, 2].map((itemIndex) => (
                <tr key={`${row.id}-${itemIndex + 1}`}>
                  <td className="border border-black px-2 py-1 text-xs leading-tight">
                    <input
                      type="text"
                      value={row.items[itemIndex]}
                      onChange={(e) => handleRowChange(row.id, 'items', itemIndex, e.target.value)}
                      className="w-full outline-none bg-transparent text-center"
                      placeholder="검사기준 입력"
                    />
                  </td>
                  <td className="border border-black text-center">
                    <input
                      type="text"
                      value={row.results[itemIndex]}
                      onChange={(e) => handleRowChange(row.id, 'results', itemIndex, e.target.value)}
                      className="w-full text-center outline-none bg-transparent"
                    />
                  </td>
                  <td className="border border-black text-center">
                    <input
                      type="text"
                      value={row.producers[itemIndex]}
                      onChange={(e) => handleRowChange(row.id, 'producers', itemIndex, e.target.value)}
                      className="w-full text-center outline-none bg-transparent"
                    />
                  </td>
                </tr>
              ))}
            </>
          ))}
          <tr>
            <td colSpan={5} className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>종합평가</td>
          </tr>
          <tr>
            <td colSpan={5} className="border border-black px-2 py-2">
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="w-full outline-none resize-none text-xs text-center"
                rows="2"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 행 추가 버튼 - PDF 출력시 숨김 */}
      <div className="mb-3 print:hidden">
        <button
          onClick={addInspectionRow}
          className="bg-[#674529] hover:bg-blue-600 text-white px-4 py-2 rounded text-xs font-medium transition-colors"
        >
          + 검사항목 추가
        </button>
      </div>

      {/* 종합 문구 */}
      <div className="text-center text-xs my-4">
        <textarea
          value={formData.reportNote}
          onChange={(e) => handleInputChange('reportNote', e.target.value)}
          className="w-full outline-none resize-none text-center"
          rows="1"
        />
      </div>

      <div className="text-center text-sm mb-4">
        위와 같이 제품에 대한 검사결과를 보고합니다.
      </div>

      {/* 날짜 및 서명 */}
      <div className="flex justify-center items-center text-center mb-4 text-sm gap-1">
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
          className="w-8 text-center outline-none"
        />
        <span>월</span>
        <input
          type="text"
          value={formData.reportDay}
          onChange={(e) => handleInputChange('reportDay', e.target.value)}
          className="w-8 text-center outline-none"
        />
        <span>일</span>
      </div>

      <div className="text-right mb-6 text-xs">
        <span className="mr-3">보고자</span>
        <input
          type="text"
          value={formData.reporter}
          onChange={(e) => handleInputChange('reporter', e.target.value)}
          className="outline-none border-b border-black text-center w-28"
        />
        <span className="ml-1">(인)</span>
      </div>

      {/* 회사명 */}
      <div className="text-center text-xl font-bold">
        애니콩 주식회사 농업회사법인
      </div>
    </div>
  );
};

export default PackagingInspectionReport;
