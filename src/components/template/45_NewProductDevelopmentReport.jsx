import { useState, useRef } from 'react';

const NewProductDevelopmentReport = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  const [formData, setFormData] = useState({
    productName: '',
    standard: '',
    developmentDept: '',
    manager: '',
    developmentPeriodStart: '',
    developmentPeriodEnd: '',
    targetCustomer: '',
    releaseDate: '',
    productPrice: '',
    developmentPurpose: '',
    productComposition: '',
    productImage: null,
    productFeatures: '',
    expectedEffect: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // textarea 자동 높이 조절
  const handleTextareaChange = (field, e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    handleInputChange(field, e.target.value);
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      {/* 상단 제목 */}
      <div className="relative flex justify-between items-start mb-3">
        <div className="text-left w-[300px]">
          <h1 className="text-2xl font-bold mb-1">신제품 개발기획서</h1>
        </div>
        <div className="ml-auto">
          <table className="border border-black border-collapse text-center text-xs">
            <tbody>
              <tr style={{ backgroundColor: '#e8e8e8' }}>
                <td className="border border-black px-3 py-1 w-16">담 당</td>
                <td className="border border-black px-3 py-1 w-16">대표</td>
                <td className="border border-black px-3 py-1 w-16"></td>
                <td className="border border-black px-3 py-1 w-16"></td>
              </tr>
              <tr>
                <td className="border border-black h-12"></td>
                <td className="border border-black h-12"></td>
                <td className="border border-black h-12"></td>
                <td className="border border-black h-12"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 하나의 통합 테이블 */}
      <table className="w-full border border-black border-collapse mb-3 text-xs">
        <tbody>
          {/* 제품개요 섹션 */}
          <tr>
            <td rowSpan={7} className="border border-black text-center py-1.5 w-20" style={{ backgroundColor: '#e8e8e8' }}>제품개요</td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[80px]" style={{ backgroundColor: '#e8e8e8' }}>제 품 명</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5 w-[100px]" style={{ backgroundColor: '#e8e8e8' }}>규격/사양</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.standard}
                onChange={(e) => handleInputChange('standard', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>개발부서</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.developmentDept}
                onChange={(e) => handleInputChange('developmentDept', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td className="border border-black px-2 py-1.5 w-[120px] text-center" style={{ backgroundColor: '#e8e8e8' }}>
              책임자
            </td>
            <td className="border border-black px-2 py-1.5 w-[120px]">
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                className="w-full outline-none text-center bg-transparent"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>개발기간</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <div className="flex gap-1 items-center">
                <input
                  type="text"
                  value={formData.developmentPeriodStart}
                  onChange={(e) => handleInputChange('developmentPeriodStart', e.target.value)}
                  className="w-32 outline-none"
                />
                <span>~</span>
                <input
                  type="text"
                  value={formData.developmentPeriodEnd}
                  onChange={(e) => handleInputChange('developmentPeriodEnd', e.target.value)}
                  className="w-32 outline-none"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>주요타겟층</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.targetCustomer}
                onChange={(e) => handleInputChange('targetCustomer', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>출시일자</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.releaseDate}
                onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center py-1.5 w-[80px]" style={{ backgroundColor: '#e8e8e8' }}>제품단가</td>
            <td className="border border-black px-2 py-1.5 w-[120px]">
              <input
                type="text"
                value={formData.productPrice}
                onChange={(e) => handleInputChange('productPrice', e.target.value)}
                className="w-full outline-none text-right"
              />
            </td>
          </tr>

          {/* 개발목적 */}
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[80px] align-top" style={{ backgroundColor: '#e8e8e8' }}>개발목적</td>
            <td className="border border-black px-2 py-2" colSpan={4}>
              <textarea
                value={formData.developmentPurpose}
                onChange={(e) => handleTextareaChange('developmentPurpose', e)}
                className="w-full outline-none resize-none overflow-hidden"
                rows="1"
                placeholder="개발목적을 입력하세요"
                style={{ minHeight: '24px' }}
              />
            </td>
          </tr>

          {/* 제품구성 - 좌우분할 (좌측 글, 우측 사진) */}
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[80px] align-top" style={{ backgroundColor: '#e8e8e8' }}>제품구성</td>
            <td className="border border-black px-2 py-2 align-top" colSpan={2}>
              <textarea
                value={formData.productComposition}
                onChange={(e) => handleTextareaChange('productComposition', e)}
                className="w-full outline-none resize-none overflow-hidden"
                rows="3"
                placeholder="제품구성을 입력하세요"
                style={{ minHeight: '120px' }}
              />
            </td>
            <td className="border border-black text-center p-2 align-top" style={{ width: '200px' }} colSpan={2}>
              <label className="cursor-pointer block w-full h-full min-h-[120px] flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange('productImage', e.target.files[0])}
                  className="hidden"
                />
                {formData.productImage ? (
                  <img
                    src={URL.createObjectURL(formData.productImage)}
                    alt="제품사진"
                    className="w-full h-auto max-h-40 object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-xs">이미지 클릭</div>
                )}
              </label>
            </td>
          </tr>

          {/* 제품기능 및 특징 */}
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[80px] align-top" style={{ backgroundColor: '#e8e8e8' }}>
              제품기능
              <br />및<br />특 징
            </td>
            <td className="border border-black px-2 py-2" colSpan={4}>
              <textarea
                value={formData.productFeatures}
                onChange={(e) => handleTextareaChange('productFeatures', e)}
                className="w-full outline-none resize-none overflow-hidden"
                rows="3"
                placeholder="제품기능 및 특징을 입력하세요"
                style={{ minHeight: '80px' }}
              />
            </td>
          </tr>

          {/* 기대효과 */}
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[80px] align-top" style={{ backgroundColor: '#e8e8e8' }}>기대효과</td>
            <td className="border border-black px-2 py-2" colSpan={4}>
              <textarea
                value={formData.expectedEffect}
                onChange={(e) => handleTextareaChange('expectedEffect', e)}
                className="w-full outline-none resize-none overflow-hidden"
                rows="2"
                placeholder="기대효과를 입력하세요"
                style={{ minHeight: '50px' }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewProductDevelopmentReport;
