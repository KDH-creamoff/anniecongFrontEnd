import { useState, useRef } from 'react';

const OverseasBusinessTripRequest = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [stampImage, setStampImage] = useState(null);
  const stampInputRef = useRef(null);

  const [formData, setFormData] = useState({
    recipient: '',
    documentTitle: '해외 출장 협조 공문',
    contentSubject: '해외 출장 관련 업무처리 협조 공문',
    item1: '애니콩 대표 해외 출장으로 인하여 협조 공문 드립니다.',
    item2: '애니콩은 2024년 11월 04일 - 11일 총 7일 동안 하계 스마트시티 엑스포(반려동물 산업 분야) 박람회 초청 바이어로 참관하게 되어 해당 일자 동안 애니콩동물병원에서의 업무 처리가 불가합니다.',
    item3: '출장일시 : 2024년 11월 04일 - 11일 (총 7일)',
    item4: '출장 장소 : 하계 스마트시티 엑스포',
    notice: '해외 출장 기간동안 아래 비밀로 회신 주시면 업무 복귀하는\n11월 12일부터 순차적으로 연락드리겠습니다.',
    companyName: '애니콩주식회사 농업회사법인',
    footerItems: [
      { title: '대 표', content: '안은진' },
      { title: '담 당 자', content: '안희준' },
      { title: '시 행', content: '2024.10.30' },
      { title: '연락처', content: '054-510-7770' },
      { title: '주 소', content: '경북 의성군 안계면 용두리 1리' },
      { title: '핸드폰', content: '010-6697-1066' },
      { title: '회사번호', content: '054-510-7770' },
      { title: '전자우편', content: 'anniecorp@naver.com' },
    ],
  });

  const handleStampClick = () => {
    stampInputRef.current?.click();
  };

  const handleStampImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStampImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFooterChange = (index, field, value) => {
    setFormData(prev => {
      const newFooterItems = [...prev.footerItems];
      newFooterItems[index] = { ...newFooterItems[index], [field]: value };
      return { ...prev, footerItems: newFooterItems };
    });
  };

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={stampInputRef}
        onChange={handleStampImageChange}
        accept="image/*"
        className="hidden"
      />

      <div ref={contentRef} className="w-full max-w-[800px] mx-auto p-8 bg-white">
        <div className="border-2 border-black mb-1">
          <div className="text-center py-2">
            <div className="text-sm font-bold mb-1">「애니콩 공문서」</div>
            <div className="text-xl font-bold">
              <input
                type="text"
                placeholder={formData.documentTitle}
                onChange={(e) => handleInputChange('documentTitle', e.target.value)}
                className="w-full outline-none text-center px-2"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start mb-2">
              <span className="font-bold whitespace-nowrap" style={{width: '60px'}}>수신자</span>
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => handleInputChange('recipient', e.target.value)}
                className="flex-1 outline-none border-b border-gray-300"
                placeholder="수성대학교"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start mb-2">
              <span className="font-bold whitespace-nowrap" style={{width: '60px'}}>제  목</span>
              <input
                type="text"
                placeholder={formData.contentSubject}
                onChange={(e) => handleInputChange('contentSubject', e.target.value)}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* 회색 구분선 */}
          <div className="border-t-2 border-gray-400 my-6"></div>

          <div className="space-y-4 text-sm leading-relaxed mb-6">
            <div className="flex">
              <span className="mr-2">1.</span>
              <textarea
                placeholder={formData.item1}
                onChange={(e) => handleInputChange('item1', e.target.value)}
                onInput={autoResize}
                className="flex-1 outline-none resize-none overflow-hidden"
                rows="1"
              />
            </div>
            <div className="flex">
              <span className="mr-2">2.</span>
              <textarea
                placeholder={formData.item2}
                onChange={(e) => handleInputChange('item2', e.target.value)}
                onInput={autoResize}
                className="flex-1 outline-none resize-none overflow-hidden"
                rows="1"
              />
            </div>
            <div className="flex">
              <span className="mr-2">3.</span>
              <textarea
                placeholder={formData.item3}
                onChange={(e) => handleInputChange('item3', e.target.value)}
                onInput={autoResize}
                className="flex-1 outline-none resize-none overflow-hidden"
                rows="1"
              />
            </div>
            <div className="flex">
              <span className="mr-2">4.</span>
              <textarea
                placeholder={formData.item4}
                onChange={(e) => handleInputChange('item4', e.target.value)}
                onInput={autoResize}
                className="flex-1 outline-none resize-none overflow-hidden"
                rows="1"
              />
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="text-center my-8 text-sm leading-relaxed">
            <textarea
              placeholder={formData.notice}
              onChange={(e) => handleInputChange('notice', e.target.value)}
              onInput={autoResize}
              className="w-full outline-none resize-none text-center overflow-hidden"
              rows="1"
            />
          </div>

          {/* 회사명과 직인 */}
          <div className="flex justify-center items-center my-8">
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="text-xl font-bold outline-none text-center mr-4"
            />
            <div
              className="w-20 h-20 cursor-pointer flex items-center justify-center"
              onClick={handleStampClick}
            >
              {stampImage ? (
                <img
                  src={stampImage}
                  alt="직인"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  직인
                </div>
              )}
            </div>
          </div>

          {/* 회색 구분선 */}
          <div className="border-t-2 border-gray-400 my-6"></div>

          {/* 하단 정보 테이블 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {formData.footerItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="font-bold whitespace-nowrap w-20">{item.title}</span>
                <span className="mr-1">:</span>
                <input
                  type="text"
                  placeholder={item.content}
                  onChange={(e) => handleFooterChange(index, 'content', e.target.value)}
                  className="flex-1 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverseasBusinessTripRequest;
