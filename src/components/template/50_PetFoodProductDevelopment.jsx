import { useState, useRef } from 'react';

const PetFoodProductDevelopment = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const competitorFileInputRef = useRef();
  const referenceFileInputRef = useRef();

  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    documentNo: '',
    company: '',
    representative: '',
    contactPerson: '',
    email: '',
    salePlan: '',
    productType: '',
    developmentGoal: '',
    capacityStandard: '',
    possiblePrice: '',
  });

  const [competitorContent, setCompetitorContent] = useState([]);
  const [referenceContent, setReferenceContent] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 경쟁사 - 텍스트 추가
  const addCompetitorText = () => {
    setCompetitorContent(prev => [...prev, { type: 'text', content: '' }]);
  };

  // 경쟁사 - 이미지 추가
  const handleCompetitorImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      type: 'image',
      content: URL.createObjectURL(file)
    }));
    setCompetitorContent(prev => [...prev, ...newImages]);
  };

  // 경쟁사 - 텍스트 내용 변경
  const handleCompetitorTextChange = (index, value) => {
    setCompetitorContent(prev => prev.map((item, i) =>
      i === index ? { ...item, content: value } : item
    ));
  };

  // 경쟁사 - 아이템 삭제
  const removeCompetitorItem = (index) => {
    setCompetitorContent(prev => prev.filter((_, i) => i !== index));
  };

  // 참고 사진 - 텍스트 추가
  const addReferenceText = () => {
    setReferenceContent(prev => [...prev, { type: 'text', content: '' }]);
  };

  // 참고 사진 - 이미지 추가
  const handleReferenceImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      type: 'image',
      content: URL.createObjectURL(file)
    }));
    setReferenceContent(prev => [...prev, ...newImages]);
  };

  // 참고 사진 - 텍스트 내용 변경
  const handleReferenceTextChange = (index, value) => {
    setReferenceContent(prev => prev.map((item, i) =>
      i === index ? { ...item, content: value } : item
    ));
  };

  // 참고 사진 - 아이템 삭제
  const removeReferenceItem = (index) => {
    setReferenceContent(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      {/* 제목 */}
      <h1 className="text-center text-xl font-bold mb-4">펫푸드 제품 개발의뢰서</h1>

      {/* 상단 테이블 */}
      <table className="w-full border border-black border-collapse text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[90px]" style={{ backgroundColor: '#e8e8e8' }}>
              의뢰일자
            </td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-14 outline-none text-center"
                />
                <span>년</span>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className="w-8 outline-none text-center"
                />
                <span>월</span>
                <input
                  type="text"
                  value={formData.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  className="w-8 outline-none text-center"
                />
                <span>일</span>
              </div>
            </td>
            <td className="border border-black text-center py-1.5 px-2 w-[90px]" style={{ backgroundColor: '#e8e8e8' }}>
              문서번호
            </td>
            <td className="border border-black px-2 py-1.5 w-[150px]">
              <input
                type="text"
                value={formData.documentNo}
                onChange={(e) => handleInputChange('documentNo', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td rowSpan={3} className="border border-black text-center py-1.5 px-2" style={{ backgroundColor: '#e8e8e8' }}>
              신청인
            </td>
            <td className="border border-black text-center py-1.5 px-2 w-[70px]" style={{ backgroundColor: '#e8e8e8' }}>
              상 호
            </td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center py-1.5 px-2" style={{ backgroundColor: '#e8e8e8' }}>
              대표자
            </td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.representative}
                onChange={(e) => handleInputChange('representative', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5 px-2" rowSpan={2} style={{ backgroundColor: '#e8e8e8' }}>
              담당자
            </td>
            <td className="border border-black px-2 py-1.5" rowSpan={2}>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className='border border-black text-center py-1.5 px-2' style={{ backgroundColor: '#e8e8e8' }}>
              전화번호
            </td>
            <td className="border border-black px-2 py-1.5">
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5 px-2" style={{ backgroundColor: '#e8e8e8' }}>
              이메일
            </td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 제품명 테이블 */}
      <table className="w-full border border-black border-collapse mt-0 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[90px]" style={{ backgroundColor: '#e8e8e8' }}>
              제품명
            </td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.productType}
                onChange={(e) => handleInputChange('productType', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 개발 목적 테이블 */}
      <table className="w-full border border-black border-collapse mt-0 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[90px]" style={{ backgroundColor: '#e8e8e8' }}>
              개발 목적
            </td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.salePlan}
                onChange={(e) => handleInputChange('salePlan', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 개발 목표 테이블 */}
      <table className="w-full border border-black border-collapse mt-0 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-3 px-2 w-[90px] align-center" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="leading-tight">
                개 발<br/>요구사항<br/>(요 약)
              </div>
            </td>
            <td className="border border-black px-3 py-3">
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="whitespace-nowrap">컨셉 :</span>
                  <textarea
                    className="flex-1 outline-none resize-none"
                    rows="1"
                    placeholder=""
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <span className="whitespace-nowrap">포장 형태 :</span>
                  <textarea
                    className="flex-1 outline-none resize-none"
                    rows="1"
                    placeholder=""
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <span className="whitespace-nowrap">표기 사항 인쇄 :</span>
                  <textarea
                    className="flex-1 outline-none resize-none"
                    rows="1"
                    placeholder=""
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <span className="whitespace-nowrap">납품 기한 :</span>
                  <textarea
                    className="flex-1 outline-none resize-none"
                    rows="1"
                    placeholder=""
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <span className="whitespace-nowrap">개발 기한 :</span>
                  <textarea
                    className="flex-1 outline-none resize-none"
                    rows="1"
                    placeholder=""
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 경쟁사 섹션 */}
      <table className="w-full border border-black border-collapse mt-0 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-2 px-2 w-[100px] align-top" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="font-medium">경쟁사</div>
            </td>
            <td className="border border-black px-3 py-3 relative">
              <input
                ref={competitorFileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleCompetitorImageUpload}
                className="hidden"
              />
              {/* 컨텐츠 목록 - 세로 정렬 */}
              <div className="flex flex-col gap-3 min-h-[200px] pb-12">
                {competitorContent.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.type === 'text' ? (
                      <div className="relative">
                        <textarea
                          value={item.content}
                          onChange={(e) => handleCompetitorTextChange(index, e.target.value)}
                          className="w-full outline-none border border-gray-300 rounded px-2 py-2 resize-none leading-relaxed overflow-hidden"
                          rows="1"
                          placeholder="텍스트를 입력하세요"
                          style={{
                            minHeight: '32px',
                            height: 'auto'
                          }}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeCompetitorItem(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        >
                          삭제
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={item.content}
                          alt={`경쟁사 이미지 ${index + 1}`}
                          className="w-full h-auto max-w-full border border-gray-300 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeCompetitorItem(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {competitorContent.length === 0 && (
                  <div className="text-gray-400 text-center py-16">
                    텍스트 또는 이미지를 추가하세요
                  </div>
                )}
              </div>
              {/* 버튼 그룹 - 오른쪽 하단 */}
              <div className="absolute bottom-2 right-2 flex gap-2 print:hidden z-10">
                <button
                  type="button"
                  onClick={addCompetitorText}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
                >
                  텍스트 추가
                </button>
                <button
                  type="button"
                  onClick={() => competitorFileInputRef.current?.click()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
                >
                  이미지 추가
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 참고 사진 섹션 */}
      <table className="w-full border border-black border-collapse mt-0 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-2 px-2 w-[100px] align-top" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="font-medium">참고 사진</div>
            </td>
            <td className="border border-black px-3 py-3 relative">
              <input
                ref={referenceFileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleReferenceImageUpload}
                className="hidden"
              />
              {/* 컨텐츠 목록 - 세로 정렬 */}
              <div className="flex flex-col gap-3 min-h-[200px] pb-12">
                {referenceContent.map((item, index) => (
                  <div key={index} className="relative group">
                    {item.type === 'text' ? (
                      <div className="relative">
                        <textarea
                          value={item.content}
                          onChange={(e) => handleReferenceTextChange(index, e.target.value)}
                          className="w-full outline-none border border-gray-300 rounded px-2 py-2 resize-none leading-relaxed overflow-hidden"
                          rows="1"
                          placeholder="텍스트를 입력하세요"
                          style={{
                            minHeight: '32px',
                            height: 'auto'
                          }}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeReferenceItem(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        >
                          삭제
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={item.content}
                          alt={`참고 사진 ${index + 1}`}
                          className="w-full h-auto max-w-full border border-gray-300 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeReferenceItem(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {referenceContent.length === 0 && (
                  <div className="text-gray-400 text-center py-16">
                    텍스트 또는 이미지를 추가하세요
                  </div>
                )}
              </div>
              {/* 버튼 그룹 - 오른쪽 하단 */}
              <div className="absolute bottom-2 right-2 flex gap-2 print:hidden z-10">
                <button
                  type="button"
                  onClick={addReferenceText}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
                >
                  텍스트 추가
                </button>
                <button
                  type="button"
                  onClick={() => referenceFileInputRef.current?.click()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
                >
                  이미지 추가
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PetFoodProductDevelopment;
