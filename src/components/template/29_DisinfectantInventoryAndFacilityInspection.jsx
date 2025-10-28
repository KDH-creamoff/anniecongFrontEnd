import { useState, useRef } from 'react';

const DisinfectantInventoryAndFacilityInspection = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [approverImage, setApproverImage] = useState(null);
  const approverInputRef = useRef(null);

  const handleApproverClick = () => {
    approverInputRef.current?.click();
  };

  const handleApproverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setApproverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={approverInputRef}
        onChange={handleApproverImageChange}
        accept="image/*"
        className="hidden"
      />

      <div ref={contentRef} className="w-full max-w-[900px] mx-auto p-5 bg-white">
        {/* 제목 */}
        <div className="border-2 border-black">
          <div className="text-center py-4">
            <div className="text-3xl font-bold mb-1">소독약품 수불대장</div>
            <div className="text-3xl font-bold">및 소독시설 점검대장</div>
          </div>
        </div>

        {/* 년도 및 결재란 */}
        <div className="flex justify-between items-center border-2 border-t-0  border-b-0 border-black">
          <div className="flex items-center gap-2 text-base p-2">
            <span>연도 :</span>
            <input type="text" className="w-16 outline-none" />
            <span>년</span>
            <span className="ml-4">약품명 :</span>
            <input type="text" className="w-32 outline-none" />
            <span className="ml-4">희석배수 :</span>
            <input type="text" className="w-20 outline-none" />
            <span>배</span>
            <span className="ml-4">포장단위 :</span>
            <span>통(</span>
            <input type="text" className="w-12 outline-none text-center" />
            <span>L)</span>
          </div>
        </div>

        {/* 상단 테이블 */}
        <table className="w-full border-2 border-black border-collapse mb-6">
          <thead>
            <tr>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '5%' }}>
                월 / 일
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '15%' }}>
                적 요
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '12%' }}>
                입고량
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '12%' }}>
                출고량
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '12%' }}>
                재고량
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '12%' }}>
                확인자
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, index) => (
              <tr key={index}>
                <td className="border border-black px-1 py-2">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-2">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-2">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-2">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-2">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-2">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 하단 정보 */}
        <div className="flex justify-end items-center mb-4 gap-4">
          <div className="flex items-center gap-2 text-base">
            <span>연도 :</span>
            <input type="text" className="w-16 outline-none" />
            <span>년</span>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span>점검자명 :</span>
            <input type="text" className="w-24 outline-none" />
            <span>(확인)</span>
          </div>
        </div>

        {/* 하단 테이블 */}
        <table className="w-full border-2 border-black border-collapse">
          <thead>
            <tr>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '6%' }}>
                순 서
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '12%' }}>
                구 분
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '25%' }}>
                점 검  내 용
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" colSpan="2" style={{ width: '19%' }}>
                점 검  결 과
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium" style={{ width: '18%' }}>
                비 고
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 1번 항목 */}
            <tr>
              <td className="border border-black px-2 py-3 text-center text-sm" rowSpan="3">
                1차
              </td>
              <td className="border border-black px-2 py-1 text-sm text-center" rowSpan="3">
                공장진입로 <br /> 입출차량 <br /> 소독시설
              </td>
              <td className="border border-black px-2 py-1 text-sm">
                1.약품재고상태 
              </td>
              <td className="border border-black px-1 py-1 text-center" style={{ width: '8%' }}>
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center" style={{ width: '7%' }}>
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                2.약품 충전상태 
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                3.소독기 작동상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* 2번 항목 */}
            <tr>
              <td className="border border-black px-2 py-3 text-center text-sm" rowSpan="3">
                2차
              </td>
              <td className="border border-black px-2 py-1 text-sm" rowSpan="3">
                정문 소독시설
              </td>
              <td className="border border-black px-2 py-1 text-sm">
                1.약품재고상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                2.약품 충전상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                3.소독기 작동상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* 3번 항목 */}
            <tr>
              <td className="border border-black px-2 py-3 text-center text-sm" rowSpan="3">
                3차
              </td>
              <td className="border border-black px-2 py-1 text-sm" rowSpan="3">
                정문 대인 소독실
              </td>
              <td className="border border-black px-2 py-1 text-sm">
                1.약품재고상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                2.약품 충전상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                3.소독기 작동상태 
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* 4번 항목 */}
            <tr>
              <td className="border border-black px-2 py-3 text-center text-sm" rowSpan="3">
                4차
              </td>
              <td className="border border-black px-2 py-1 text-sm" rowSpan="3">
                발판소독조<br />(개소)
              </td>
              <td className="border border-black px-2 py-1 text-sm">
                1.약품재고상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                2.약품 충전상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr>
              <td className="border border-black px-2 py-1 text-sm">
                3.소독기 작동상태
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">양호</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1 text-center">
                <div className="flex items-center justify-center gap-1">
                  <input type="checkbox" className="w-3 h-3" />
                  <span className="text-xs">불량</span>
                </div>
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisinfectantInventoryAndFacilityInspection;
