import { useState, useRef } from 'react';

const DisinfectionImplementationRecord = ({ pdfRef }) => {
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
        {/* 제목 */}
        <div className="border-2 border-black mb-4">
          <div className="text-center py-4">
            <div className="text-3xl font-bold">소독실시기록부</div>
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
                <td className="border border-black px-4 py-1 text-center font-medium text-base w-20">
                  담당
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium text-base w-20">
                  팀장
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
          {/* 테이블 제목 */}
          <div className="border-b-2 border-black bg-white">
            <div className="text-center py-2">
              <div className="text-xl font-bold">소 독 실 시 상 황</div>
            </div>
          </div>

          {/* 테이블 헤더 및 본문 */}
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  년월일
                </th>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  소독장소
                </th>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  소독종류
                </th>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  소독약품
                </th>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  소독장비
                </th>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  소독실시자
                </th>
                <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                  비 고
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(20)].map((_, index) => (
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
                  <td className="border border-black px-1 py-2">
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

export default DisinfectionImplementationRecord;
