import { useState, useRef } from 'react';

const ContentEditor = ({
  minHeight = '150px',
  placeholder = '텍스트 또는 이미지를 추가하세요',
  showButtons = true,
  mode = 'both'
}) => {
  const fileInputRef = useRef();
  const [content, setContent] = useState([]);

  // 텍스트 추가
  const addText = () => {
    setContent(prev => [...prev, { type: 'text', content: '' }]);
  };

  // 이미지 추가
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      type: 'image',
      content: URL.createObjectURL(file)
    }));
    setContent(prev => [...prev, ...newImages]);
    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 텍스트 내용 변경
  const handleTextChange = (index, value) => {
    setContent(prev => prev.map((item, i) =>
      i === index ? { ...item, content: value } : item
    ));
  };

  // 아이템 삭제
  const removeItem = (index) => {
    setContent(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex-1" style={{ minHeight }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* 컨텐츠 목록 - 세로 정렬 */}
      <div className="flex flex-col gap-3 h-full pb-12">
        {content.map((item, index) => (
          <div key={index} className="relative group">
            {item.type === 'text' ? (
              <div className="relative">
                <textarea
                  value={item.content}
                  onChange={(e) => handleTextChange(index, e.target.value)}
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
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                >
                  삭제
                </button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={item.content}
                  alt={`이미지 ${index + 1}`}
                  className="w-full h-auto max-w-full border border-gray-300 object-contain"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
        {content.length === 0 && (
          <div className="text-gray-400 flex items-center justify-center flex-1">
            {placeholder}
          </div>
        )}
      </div>

      {/* 버튼 그룹 - 오른쪽 하단 */}
      {showButtons && (
        <div className="absolute bottom-2 right-2 flex gap-2 print:hidden z-10">
          {mode === 'both' && (
            <button
              type="button"
              onClick={addText}
              className="bg-[#674529] hover:bg-[#523620] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
            >
              텍스트 추가
            </button>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#674529] hover:bg-[#523620] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shadow"
          >
            이미지 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
