import { useState, useRef } from 'react';

const FeedCarrierDisinfectionLog = ({ pdfRef }) => {
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

      <div ref={contentRef} className="w-full max-w-[900px] mx-auto p-5 bg-white">
        <div className="border-2 border-black mb-4">
            {/* 제목 */}
            <div className="flex-1 text-center text-xl font-bold py-4">
              사료운반자 소독실시 대장(운전자 지참용)
            </div>
        </div>

        {/* 결재란 */}
        <div className="flex justify-end mb-4">
          <table className="border-collapse border border-black">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 text-center font-medium whitespace-nowrap w-10" rowSpan="2">
                  결<br />재
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium text-xs w-20">
                  담당자
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium text-xs w-20">
                  책임자
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black h-10 cursor-pointer hover:bg-gray-50"
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
                  className="border border-black h-10 cursor-pointer hover:bg-gray-50"
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

        {/* 메인 테이블 */}
        <div className="border-2 border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '11%' }}>
                  일자
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '11%' }}>
                  공장<br />출발시간
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '7%' }}>
                  위생<br />상태
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '7%' }}>
                  소독<br />여부
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '20%' }}>
                  농장명
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '11%' }}>
                  농장<br />도착시간
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '7%' }}>
                  소독<br />여부
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '12%' }}>
                  농장주<br />확인
                </th>
                <th className="border border-black px-2 py-2 text-center font-bold text-xs bg-gray-100" style={{ width: '12%' }}>
                  담당자<br />확인
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(22)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black px-2 py-2.5 h-8">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-2.5">
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

export default FeedCarrierDisinfectionLog;
