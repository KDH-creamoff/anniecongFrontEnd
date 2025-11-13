import { useState, useRef } from 'react';
import ContentEditor from '../common/ContentEditor';

const PetFoodProductDevelopment = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const competitor2FileInputRef = useRef();

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

  const [competitor2Content, setCompetitor2Content] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompetitor2ImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompetitor2Content(prev => [...prev, { type: 'image', content: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const addCompetitor2Text = () => {
    setCompetitor2Content(prev => [...prev, { type: 'text', content: '' }]);
  };

  const handleCompetitor2TextChange = (index, value) => {
    setCompetitor2Content(prev => {
      const newContent = [...prev];
      newContent[index].content = value;
      return newContent;
    });
  };

  const removeCompetitor2Item = (index) => {
    setCompetitor2Content(prev => prev.filter((_, i) => i !== index));
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
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[90px]" style={{ backgroundColor: '#e8e8e8' }}>
              제품명
            </td>
            <td className="border border-black px-2 py-1.5" colSpan={4}>
              <input
                type="text"
                value={formData.productType}
                onChange={(e) => handleInputChange('productType', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[90px]" style={{ backgroundColor: '#e8e8e8' }}>
              개발 목적
            </td>
            <td className="border border-black px-2 py-1.5" colSpan={4}>
              <input
                type="text"
                value={formData.salePlan}
                onChange={(e) => handleInputChange('salePlan', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="border border-black text-center py-3 px-2 w-[90px] align-center" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="leading-tight">
                개 발<br/>요구사항<br/>(요 약)
              </div>
            </td>
            <td className="border border-black px-3 py-3" colSpan={4}>
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

      {/* 경쟁사 / 참고 사진 테이블 (분리하여 하나로 보이게) */}
      <table className="w-full border-t-0 border border-black border-collapse text-xs">
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '50%' }} />
        </colgroup>
        <tbody>
          <tr>
            <td className="border border-black px-0 py-0 align-top">
              <div className="w-full h-full flex flex-col">
                <div className="border-b border-black text-center py-2 px-2" style={{ backgroundColor: '#e8e8e8' }}>
                  <div className="font-medium">경쟁사</div>
                </div>
                <div className="px-3 py-3">
                  <ContentEditor minHeight="224px" />
                </div>
              </div>
            </td>
            <td className="border border-black px-0 py-0 align-top" rowSpan={2}>
              <div className="w-full h-full flex flex-col">
                <div className="border-b border-black text-center py-2 px-2" style={{ backgroundColor: '#e8e8e8' }}>
                  <div className="font-medium">참고 사진</div>
                </div>
                <div className="px-3 py-3">
                  <ContentEditor minHeight="480px" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black px-0 py-0 align-top">
              <div className="w-full h-full flex flex-col">
                <div className="border-b border-black text-center py-2 px-2" style={{ backgroundColor: '#e8e8e8' }}>
                  <div className="font-medium">경쟁사</div>
                </div>
                <div className="px-3 py-3 relative flex-1 min-h-[224px]">
                  <input
                    ref={competitor2FileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleCompetitor2ImageUpload}
                    className="hidden"
                  />
                  {/* 컨텐츠 목록 - 세로 정렬 */}
                  <div className="flex flex-col gap-3 h-full pb-12">
                    {competitor2Content.map((item, index) => (
                      <div key={index} className="relative group">
                        {item.type === 'text' ? (
                          <div className="relative">
                            <textarea
                              value={item.content}
                              onChange={(e) => handleCompetitor2TextChange(index, e.target.value)}
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
                              onClick={() => removeCompetitor2Item(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
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
                              onClick={() => removeCompetitor2Item(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    {competitor2Content.length === 0 && (
                      <div className="text-gray-400 flex items-center justify-center flex-1">
                        텍스트 또는 이미지를 추가하세요
                      </div>
                    )}
                  </div>
                  {/* 버튼 그룹 - 오른쪽 하단 */}
                  <div className="absolute bottom-2 right-2 flex gap-2 print:hidden z-10">
                    <button
                      type="button"
                      onClick={addCompetitor2Text}
                      className="bg-[#674529] hover:bg-[#523620] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
                    >
                      텍스트 추가
                    </button>
                    <button
                      type="button"
                      onClick={() => competitor2FileInputRef.current?.click()}
                      className="bg-[#674529] hover:bg-[#523620] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
                    >
                      이미지 추가
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PetFoodProductDevelopment;
