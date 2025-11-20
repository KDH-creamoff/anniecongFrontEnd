import { useState, useRef } from 'react';

const NonconformingProductReport = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [managerImage, setManagerImage] = useState(null);
  const [supervisorImage, setSupervisorImage] = useState(null);
  const managerInputRef = useRef(null);
  const supervisorInputRef = useRef(null);

  const handleManagerClick = () => {
    managerInputRef.current?.click();
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
        ref={supervisorInputRef}
        onChange={handleSupervisorImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex justify-end mb-6">
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

      <div ref={contentRef} className="w-full max-w-[900px] mx-auto p-5 bg-white">
        {/* 제목 및 날짜/결재 헤더 */}
        <div className="border-2 border-black">
          {/* 제목 */}
          <div className="text-center text-xl font-bold py-4">
            부적합품 보고서
          </div>

          {/* 날짜 및 결재란 */}
          <div className="flex border-b border-black">
            {/* 날짜 입력란 */}
            <div className="flex-1 flex justify-center items-center gap-2 py-2 text-sm">
              <input type="text" className="w-10 outline-none text-center border-b border-black" />
              <span>년</span>
              <input type="text" className="w-10 outline-none text-center border-b border-black" />
              <span>월</span>
              <input type="text" className="w-10 outline-none text-center border-b border-black" />
              <span>일</span>
              <input type="text" className="w-12 outline-none text-center border-b border-black" />
              <span>요일</span>
            </div>
          </div>
        </div>

        {/* 발생일자 행 */}
          <div className="flex py-2 px-3 text-sm">
            <span className="font-bold text-base">발생 일시 :</span>
            <input type="text" className="outline-none ml-2" />
            <span className="ml-2 font-bold">/</span>
            <input type="text" className="outline-none ml-2" />
          </div>

        {/* 1. 사고내용 */}
        <div className="border-2 border-black">
          <div className="py-2 px-3 text-sm">
            1. 사 고 내 용 
          </div>
          <div className="min-h-[60px] px-3 pb-2">
            <textarea
              className="w-full h-10 outline-none resize-none text-sm"
              placeholder=""
            />
          </div>
        </div>

        {/* 2. 발생자, 발견자 */}
        <div className="border-2 border-t-0 border-black">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border-r border-b-0 border-black py-2 px-3 text-sm w-28 text-center align-middle" rowSpan="2">
                  <div className="flex flex-col items-center justify-center h-full">
                    <span>2. 발 생 자</span>
                    <span>/</span>
                    <span>발생공정</span>
                  </div>
                </td>
                <td className='border border-t-0 border-black py-2'>
                  <input type="text" className="w-full outline-none px-2" />
                </td>
                <td className="border-r border-l-0 border-b-0 border-black py-2 px-3 text-sm w-28 text-center align-middle" rowSpan="2">
                  <div className="flex flex-col items-center justify-center h-full">
                    <span>발 견 자</span>
                    <span>/</span>
                    <span>발견공정</span>
                  </div>
                </td>
                <td className='border border-t-0 border-black py-2'>
                  <input type="text" className="w-full outline-none px-2" />
                </td>
              </tr>
              <tr>
                <td className='border border-b-0 border-black py-2'>
                  <input type="text" className="w-full outline-none px-2" />
                </td>
                <td className='border border-b-0 border-black py-2'>
                  <input type="text" className="w-full outline-none px-2" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. 조사 결과, 4. 발생량 현황, 5. 처리방안 - 가로 배치 */}
        <div className="border-2 border-t-0 border-black">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border-r border-black align-top" style={{ width: '35%' }}>
                  <div className="py-4 px-3 text-sm">
                    3. 조 사  결 과
                  </div>
                  <div className="min-h-[280px] px-3 pb-2">
                    <textarea
                      className="w-full h-64 outline-none resize-none text-sm"
                      placeholder=""
                    />
                  </div>
                </td>
                <td className="align-top">
                  {/* 4. 발생량 현황 */}
                  <div className="py-2 px-3 text-sm">
                    4. 발 생 량  현 황
                  </div>
                  <div className="min-h-[100px] px-3 pb-2">
                    <textarea
                      className="w-full h-20 outline-none resize-none text-sm"
                      placeholder=""
                    />
                  </div>
                  <div className="flex py-2 px-3 text-sm" style={{ borderTop: '1px dotted #000' }}>
                    <div className="mb-1">총 발생량</div>
                    <input type="text" className="outline-none px-2" />
                  </div>
                  {/* 5. 처리방안 */}
                  <div className="py-2 px-3 text-sm border-t border-black">
                    5. 처 리 방 안
                  </div>
                  <div className="min-h-[80px] px-3 pb-2">
                    <textarea
                      className="w-full h-20 outline-none resize-none text-sm"
                      placeholder=""
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 6. 발생원인 및 향후대책 */}
        <div className="border-2 border-t-0 border-black">
          <div className="py-4 px-3 text-sm">
            6. 발생원인 및 향후대책
          </div>
          <div className="min-h-[120px] px-3 pb-3">
            <textarea
              className="w-full h-28 outline-none resize-none text-sm"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NonconformingProductReport;
