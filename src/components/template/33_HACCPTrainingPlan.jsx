import { useState, useRef } from 'react';

const HACCPTrainingPlan = ({ pdfRef }) => {
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

      <div ref={contentRef} className="w-full max-w-[1400px] mx-auto p-5 bg-white">
        {/* 제목 및 결재란 */}
        <div className="border-2 border-black mb-0">
          <div className="flex justify-between items-center px-4 py-3">
            {/* 제목 */}
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold">20<input type='text' className='w-7 outline-none'></input> 년도 연간 HACCP 교육 계획</div>
            </div>

            {/* 결재란 */}
            <div className="flex-shrink-0">
              <table className="border-collapse border border-black">
                <tbody>
                  <tr>
                    <th className="border border-black px-3 py-1 text-center font-medium whitespace-nowrap w-10" rowSpan="2">
                      결<br />재
                    </th>
                    <th className="border-l border-black px-6 py-1 text-sm font-medium text-center">
                      담당자
                    </th>
                    <th className="border-l border-black px-6 py-1 text-sm font-medium text-center">
                      책임자
                    </th>
                  </tr>
                  <tr>
                    <td
                      className="border-t border-l border-black cursor-pointer hover:bg-gray-50 h-16"
                      onClick={handleManagerClick}
                    >
                      {managerImage ? (
                        <img
                          src={managerImage}
                          alt="담당자 서명"
                          className="w-full h-full object-contain"
                        />
                      ) : null}
                    </td>
                    <td
                      className="border-t border-l border-black cursor-pointer hover:bg-gray-50"
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
          </div>
        </div>

        {/* 체크박스 섹션 */}
        <div className="border-2 border-t-0 border-black px-4 py-2 text-center text-sm">
          <span className="mr-4">○ 계획</span>
          <span className="mr-4">◉ 연기</span>
          <span className="mr-4">◐ 교육실시</span>
        </div>

        {/* 메인 테이블 */}
        <table className="w-full border-2 border-t-0 border-black border-collapse">
          <thead>
            <tr>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2" style={{ width: '50px' }}>
                순번
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2" style={{ width: '150px' }}>
                교육명
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2" style={{ width: '180px' }}>
                교육대상
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" colSpan="2">
                교육구분
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" colSpan="12">
                교육일자
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2" style={{ width: '60px' }}>
                교육<br />시간
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2" style={{ width: '80px' }}>
                비고
              </th>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                사<br />내
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                사<br />외
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                1
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                2
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                3
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                4
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                5
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                6
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                7
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                8
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                9
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                10
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                11
              </th>
              <th className="border border-black px-2 py-1 text-xs font-medium text-center" style={{ width: '35px' }}>
                12
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">1</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1 text-center text-sm"></td>
              ))}
              <td className="border border-black px-1 py-1 text-center text-sm">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1 text-center text-sm">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">2</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1 text-center text-sm"></td>
              ))}
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">3</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1 text-center text-sm"></td>
              ))}
              <td className="border border-black px-1 py-1 text-center text-sm">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1 text-center text-sm">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* Row 5 */}
            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">5</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1 text-center text-sm"></td>
              ))}
              <td className="border border-black px-1 py-1 text-center text-sm">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1 text-center text-sm">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* Row 6 */}
            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">6</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1"></td>
              ))}
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            {/* Row 7 */}
            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">7</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1"></td>
              ))}
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
            </tr>

            <tr className="h-12">
              <td className="border border-black px-1 py-1 text-center text-sm">8</td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
              </td>
              {/* 교육구분 (사내/사외) + 교육일자 (1~12월) */}
              {[...Array(14)].map((_, index) => (
                <td key={index} className="border border-black px-1 py-1"></td>
              ))}
              <td className="border border-black px-1 py-1">
                <input type="text" className="w-full outline-none text-center text-sm" />
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

export default HACCPTrainingPlan;
