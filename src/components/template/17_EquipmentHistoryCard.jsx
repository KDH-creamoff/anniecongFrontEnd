import { useState, useRef } from 'react';

const EquipmentHistoryCard = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [imagePreview, setImagePreview] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImagePreview = (e) => {
    let previewList = [...imagePreview]
    const uploadFilesObject = e.target.files
    for (let i = 0; i < uploadFilesObject.length; i++) {
      const currentImgUrl = URL.createObjectURL(uploadFilesObject[i])
      previewList.push(currentImgUrl)
    }
    setImagePreview(previewList)
  }

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleImagePreview}
        accept="image/*"
        className="hidden"
      />

      <div ref={contentRef} className="w-full max-w-[1400px] mx-auto p-5 bg-white">
        <h1 className="text-xl font-bold text-center mb-3 py-1.5">설비이력카드</h1>

      <table className="w-full border-collapse border-2 border-black mb-0">
        <tbody>
          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap w-[96px] tracking-[0.3em]">기기번호</td>
            <td className="border border-black p-1.5 text-center min-w-[350px]" colSpan="3">BM-0205-2</td>
            <td className="border border-black p-1.5 text-center whitespace-nowrap w-[120px] tracking-[0.5em]" colSpan="3">사 진</td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.5em]">품 명</td>
            {/* <td className="border border-black p-1.5 text-center" colSpan="3"><input type="text" className="w-full outline-none text-sm min-h-8 size-auto" /></td> */}
            <td className="border border-black p-1.5 text-center" colSpan="3"><textarea className="flex w-full outline-none text-sm resize-none overflow-hidden" rows="1" onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }} /></td>
            <td
              className="border border-black text-center min-w-[320px] max-w-[320px] cursor-pointer hover:bg-gray-50"
              rowSpan="7"
              onClick={handleImageClick}
            >
              {imagePreview.map((image, id) => (
                <div key={id}>
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              <button className="print:hidden">이미지추가</button>
            </td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.5em]">규 격</td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.3em]">구 입 처</td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.3em]">연 락 처</td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.15em]">구입년월일</td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.3em]">구입가격</td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap tracking-[0.5em]">기 능</td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>

          <tr>
            <td className="border border-black p-1.5 text-center whitespace-nowrap w-[96px] tracking-[0.3em]">설치장소</td>
            <td className="border border-black p-1.5 text-center" colSpan="1"></td>
            <td className="border border-black p-1.5 text-center whitespace-nowrap w-[96px] tracking-[0.3em]" colSpan="1">사용부서</td>
            <td className="border border-black p-1.5 text-center" colSpan="1"></td>
            <td className="border border-black p-1.5 text-center" colSpan="4"></td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border-2 border-black border-t-0">
        <thead>
          <tr>
            <th colSpan="6" className="border border-black p-1.5 text-center font-normal tracking-[8px]">수 리 내 역</th>
          </tr>
          <tr>
            <th className="border border-black p-1.5 text-center font-normal w-[12%]">일 자</th>
            <th className="border border-black p-1.5 text-center font-normal w-[26%]">수 리 내 용</th>
            <th className="border border-black p-1.5 text-center font-normal w-[12%]">소 요 금 액</th>
            <th className="border border-black p-1.5 text-center font-normal w-[12%]">일 자</th>
            <th className="border border-black p-1.5 text-center font-normal w-[26%]">수 리 내 용</th>
            <th className="border border-black p-1.5 text-center font-normal w-[12%]">소 요 금 액</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(8)].map((_, index) => (
            <tr key={index} className="h-7">
              <td className="border border-black p-1.5 text-center"></td>
              <td className="border border-black p-1.5 text-center"></td>
              <td className="border border-black p-1.5 text-center"></td>
              <td className="border border-black p-1.5 text-center"></td>
              <td className="border border-black p-1.5 text-center"></td>
              <td className="border border-black p-1.5 text-center"></td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className="flex justify-end mt-6">
          <table className="border-2 border-black border-collapse">
            <tbody>
              <tr>
                <td className="h-8 border-2 border-black px-4 py-2 text-center text-sm"></td>
                <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
                <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
                <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
              </tr>
              <tr>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                >
                </td>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                >
                </td>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                >
                </td>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EquipmentHistoryCard;
