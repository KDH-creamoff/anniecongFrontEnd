import { useState, useRef } from 'react';

const MaterialReceivingInspectionLog = ({ pdfRef }) => {
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
        {/* 제목 및 결재란 */}
        <div className="border-2 border-black mb-4">
          {/* 제목과 결재란을 가로로 배치 */}
          <div className="flex justify-between items-center">
            {/* 제목 */}
            <div className="flex-1 text-center text-3xl font-bold py-4">
              원료 입고 및 검사 대장
            </div>
          </div>
        </div>

        {/* 결재란 */}
        <div className="flex mb-4 justify-end">
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
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-24">
                  입고일자
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-32">
                  원료명
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-20">
                  수량
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-28">
                  공급처
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-24">
                  입고검사<br />(관능검사)
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-32">
                  부적합품<br />처리결과
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(14)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black px-3 py-3 h-10">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-3 py-3">
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

export default MaterialReceivingInspectionLog;
