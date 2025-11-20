import { useState, useRef } from 'react';

const VehicleInspectionLog = ({ pdfRef }) => {
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
        {/* 제목 */}
        <div className="border-2 border-black mb-4">
          <div className="text-center text-xl font-bold py-4">
            차량 점검대장
          </div>
        </div>

        {/* 년월주 입력란 & 결재란 */}
        <div className="flex justify-between items-center mb-4">
          {/* 년월주 입력란 */}
          <div className="flex items-center text-base font-bold">
            <span>20</span>
            <input type="text" className="w-10 outline-none text-center" />
            <span>년</span>
            <input type="text" className="w-10 outline-none text-center" />
            <span>월</span>
            <input type="text" className="w-10 outline-none text-center" />
            <span>주</span>
          </div>
        </div>

        {/* 메인 테이블 */}
        <div className="border-1 border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-2 py-3 text-center font-bold text-xs" style={{ width: '12%' }} rowSpan="2">
                  차량번호
                </th>
                <th className="border border-black px-2 py-3 text-center font-bold text-xs" style={{ width: '10%' }} rowSpan="2">
                  기사명
                </th>
                <th className="border border-black px-1 py-1 text-center font-bold text-xs" style={{ width: '10%' }} colSpan="2">
                  소독일지<br />기록
                </th>
                <th className="border border-black px-1 py-1 text-center font-bold text-xs" style={{ width: '10%' }} colSpan="2">
                  소독기<br />가동 상태
                </th>
                <th className="border border-black px-1 py-1 text-center font-bold text-xs" style={{ width: '10%' }} colSpan="2">
                  내부<br />청결 상태
                </th>
                <th className="border border-black px-1 py-1 text-center font-bold text-xs" style={{ width: '10%' }} colSpan="2">
                  외부<br />청결 상태 
                </th>
                <th className="border border-black px-2 py-3 text-center font-bold text-xs" style={{ width: '16%' }} rowSpan="2">
                  조치사항
                </th>
              </tr>
              <tr>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  양호
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  불량
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  양호
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  불량
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  양호
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  불량
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  양호
                </th>
                <th className="border border-black px-1 py-1 text-center font-medium text-xs" style={{ width: '5%' }}>
                  불량
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(14)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black px-2 py-3 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-1 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
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

export default VehicleInspectionLog;
