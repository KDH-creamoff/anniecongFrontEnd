import { useState, useRef } from 'react';

const ProductionManagementSheet = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [managerImage, setManagerImage] = useState(null);
  const [teamLeaderImage, setTeamLeaderImage] = useState(null);
  const [supervisorImage, setSupervisorImage] = useState(null);
  const managerInputRef = useRef(null);
  const teamLeaderInputRef = useRef(null);
  const supervisorInputRef = useRef(null);

  const handleManagerClick = () => {
    managerInputRef.current?.click();
  };

  const handleTeamLeaderClick = () => {
    teamLeaderInputRef.current?.click();
  };

  const handleSupervisorClick = () => {
    supervisorInputRef.current?.click();
  };

  const handleManagerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setManagerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeamLeaderImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLeaderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSupervisorImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSupervisorImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={managerInputRef}
        onChange={handleManagerImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={teamLeaderInputRef}
        onChange={handleTeamLeaderImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={supervisorInputRef}
        onChange={handleSupervisorImageChange}
        accept="image/*"
        className="hidden"
      />

      <div ref={contentRef} className="w-full max-w-[1400px] mx-auto p-5 bg-white">
        {/* 제목 및 날짜 박스 */}
        <div className="border-2 border-black">
          <div className="text-center text-xl font-bold py-3 border-b-2 border-black tracking-wider">
            제품 생산관리 대장
          </div>
          <div className="flex justify-center items-center gap-6 py-2.5 text-base">
            <div className="flex items-center">
              <input type="text" className="w-16 outline-none text-center" />
              <span className="ml-1">년</span>
            </div>
            <div className="flex items-center">
              <input type="text" className="w-12 outline-none text-center" />
              <span className="ml-1">월</span>
            </div>
            <div className="flex items-center">
              <input type="text" className="w-12 outline-none text-center" />
              <span className="ml-1">일</span>
            </div>
            <div className="flex items-center">
              <input type="text" className="w-12 outline-none text-center" />
              <span className="ml-1">요일</span>
            </div>
          </div>
        </div>

        {/* 작업인원/시간 및 결재란 */}
        <div className="flex justify-between items-start mt-3 mb-3">
          {/* 좌측 작업인원 및 시간 */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-sm">● 작업인원 :</span>
              <span className="text-xs">(오전)</span>
              <input type="text" className="w-20 outline-none text-sm" />
              <span className="text-xs">(오후)</span>
              <input type="text" className="w-20 outline-none text-sm" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">● 작업시간 :</span>
              <span className="text-xs">(오전)</span>
              <input type="text" className="w-20 outline-none text-sm" />
              <span className="text-xs">(오후)</span>
              <input type="text" className="w-20 outline-none text-sm" />
            </div>
          </div>

          {/* 우측 결재란 */}
          <table className="border-collapse border border-black">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 text-center font-medium text-xs whitespace-nowrap w-10" rowSpan="2">
                  결<br />재
                </td>
                <td className="border border-black px-6 py-1 text-center font-medium text-sm w-20">
                  담당
                </td>
                <td className="border border-black px-6 py-1 text-center font-medium text-sm w-20">
                  팀장
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium text-sm w-20">
                  책임자
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black h-12 cursor-pointer hover:bg-gray-50"
                  onClick={handleManagerClick}
                >
                  {managerImage ? (
                    <img
                      src={managerImage}
                      alt="담당 서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
                <td
                  className="border border-black h-12 cursor-pointer hover:bg-gray-50"
                  onClick={handleTeamLeaderClick}
                >
                  {teamLeaderImage ? (
                    <img
                      src={teamLeaderImage}
                      alt="팀장 서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
                <td
                  className="border border-black h-12 cursor-pointer hover:bg-gray-50"
                  onClick={handleSupervisorClick}
                >
                  {supervisorImage ? (
                    <img
                      src={supervisorImage}
                      alt="책임자 서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 1. 제품 생산 및 관리 */}
        <div className="mb-3">
          <div className="text-sm font-medium mb-1">1. 제품 생산 및 판매</div>
          <div className="text-right text-xs mb-1">(단위 : kg)</div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[12%]" rowSpan="2">
                  제 품 명
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[8%]" rowSpan="2">
                  전일<br />제고
                </th>
                <th className="border border-black py-2 px-2 text-center font-normal text-xs" colSpan="3">
                  금일 생산
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[8%]" rowSpan="2">
                  금일<br />출고
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[8%]" rowSpan="2">
                  금일<br />재고
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[11%]" rowSpan="2">
                  비 고<br />
                  <span className="text-[12px] text-red-600 font-normal">
                    *플러싱 실시여부
                  </span>
                </th>
              </tr>
              <tr>
                <th className="border border-black py-1.5 px-2 text-center font-normal text-xs w-[12%]">
                  생산계획<br />(제품생산량)
                </th>
                <th className="border border-black py-1.5 px-2 text-center font-normal text-xs w-[9%]">
                  생산<br />실적
                </th>
                <th className="border border-black py-1.5 px-2 text-center font-normal text-xs w-[8%]">
                  수율<br />(%)
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1 h-9">
                    <input type="text" className="w-full h-full outline-none text-sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. 부적합품 및 리콜제품 */}
        <div className="mb-3">
          <div className="text-sm font-medium mb-1">2. 부적합품 및 회수제품</div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  제조일자
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[20%]">
                  제 품 명
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[8%]">
                  수량(kg)
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[14%]">
                  농장명
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[16%]">
                  사 유
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  조 치 사 항
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[12%]">
                  비 고
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. 제거된 식품 */}
        <div className="mb-3">
          <div className="text-sm font-medium mb-1">
            3. 재처리 작업<span className="text-xs font-normal text-red-600">(*재처리 절차에 따라 진행, 오염된 사료는 재처리 하여서는 안 됨)</span>
          </div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  품명
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  일자
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  수량(kg)
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[25%]">
                  사 유<br />
                  <span className="text-[10px] text-red-600 font-normal">(파포, 포장기 낙하물 등)</span>
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  조 치 사 항
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm">
                  비 고
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-3 px-1 h-10">
                    <input type="text" className="w-full h-full outline-none text-sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductionManagementSheet;
