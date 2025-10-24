import { useState, useRef } from 'react';

const EquipmentHistoryCard = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-5 bg-white">
      <h1 className="text-2xl font-bold text-center mb-5 py-2.5">설비이력카드</h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <table className="w-full border-collapse border-2 border-black mb-0">
        <tbody>
          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap w-[100px]">기기번호</td>
            <td className="border border-black p-2 text-center min-w-[200px]" colSpan="3">BM-0205-2</td>
            <td className="border border-black p-2 text-center whitespace-nowrap w-[100px]" colSpan="3">사 진</td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">품 명</td>
            <td className="border border-black p-2 text-center" colSpan="3"></td>
            <td
              className="border border-black p-2 text-center min-w-[200px] cursor-pointer hover:bg-gray-50"
              rowSpan="7"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="설비 사진"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">클릭하여 이미지 추가</span>
              )}
            </td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">규 격</td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">구 입 처</td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">연 락 처</td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">구입년월일</td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">구입가격</td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap">기 능</td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-2 text-center whitespace-nowrap w-[100px]">설치장소</td>
            <td className="border border-black p-2 text-center" colSpan="1"></td>
            <td className="border border-black p-2 text-center whitespace-nowrap w-[100px]" colSpan="1">사용부서</td>
            <td className="border border-black p-2 text-center" colSpan="1"></td>
            <td className="border border-black p-2 text-center" colSpan="4"></td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border-2 border-black border-t-0">
        <thead>
          <tr>
            <th colSpan="6" className="border border-black p-2.5 text-center font-normal tracking-[8px]">수 리 내 역</th>
          </tr>
          <tr>
            <th className="border border-black p-2 text-center font-normal w-[12%]">일 자</th>
            <th className="border border-black p-2 text-center font-normal w-[26%]">수 리 내 용</th>
            <th className="border border-black p-2 text-center font-normal w-[12%]">소 요 금 액</th>
            <th className="border border-black p-2 text-center font-normal w-[12%]">일 자</th>
            <th className="border border-black p-2 text-center font-normal w-[26%]">수 리 내 용</th>
            <th className="border border-black p-2 text-center font-normal w-[12%]">소 요 금 액</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(8)].map((_, index) => (
            <tr key={index} className="h-10">
              <td className="border border-black p-2 text-center"></td>
              <td className="border border-black p-2 text-center"></td>
              <td className="border border-black p-2 text-center"></td>
              <td className="border border-black p-2 text-center"></td>
              <td className="border border-black p-2 text-center"></td>
              <td className="border border-black p-2 text-center"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentHistoryCard;
