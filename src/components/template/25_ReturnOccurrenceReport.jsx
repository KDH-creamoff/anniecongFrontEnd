import { useState, useRef } from 'react';

const ReturnOccurrenceReport = ({ pdfRef }) => {
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
          <div className="text-center text-2xl font-bold py-4">
            반 품 발 생 보 고
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

        {/* 계정일 및 거래처 */}
        <div className="border-1 border-black mb-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-black px-3 py-2 text-center font-bold" style={{ width: '15%' }}>
                  작성일
                </td>
                <td className="border border-black px-3 py-2" style={{ width: '35%' }}>
                  <input type="text" className="w-full outline-none text-sm" />
                </td>
                <td className="border border-black px-3 py-2 text-center font-bold" style={{ width: '15%' }}>
                  거래처
                </td>
                <td className="border border-black px-3 py-2" style={{ width: '35%' }}>
                  <input type="text" className="w-full outline-none text-sm" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 제품명 테이블 */}
        <div className="border-1 border-black mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm" style={{ width: '20%' }}>
                  제 품 명
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm" style={{ width: '15%' }}>
                  제조일자
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm" style={{ width: '10%' }}>
                  수 량
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm" style={{ width: '15%' }}>
                  제품<br />회수일자
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm" style={{ width: '20%' }}>
                  공장입고일
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm" style={{ width: '20%' }}>
                  기타
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
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

        {/* 제품회수 사유 및 발견부서의 의견 */}
        <div className="border-1 border-black mb-4">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-black px-3 py-2 text-center font-bold align-top" style={{ width: '55%' }}>
                  제품회수 사유 (자세히, 정확하게)
                </td>
                <td className="border border-black px-3 py-2 text-center font-bold" style={{ width: '45%' }}>
                  합의부서 의견
                </td>
              </tr>
              <tr>
                <td className="border border-black px-3 py-2" rowSpan="2" style={{ height: '180px' }}>
                  <textarea
                    className="w-full h-full outline-none resize-none text-sm"
                    placeholder=""
                  />
                </td>
                <td className="border border-black px-3 py-2" style={{ height: '180px' }}>
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <span className="font-bold">품질관리팀</span>
                    </div>
                    <textarea
                      className="w-full flex-1 outline-none resize-none text-sm"
                      placeholder=""
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black px-3 py-2" style={{ height: '180px' }}>
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <span className="font-bold">생산팀</span>
                    </div>
                    <textarea
                      className="w-full flex-1 outline-none resize-none text-sm"
                      placeholder=""
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-t-0 border-black px-3 py-2 text-center font-bold align-center" style={{ width: '20%', height: '200px' }}>
                  조치결과<br />및<br />재발방지대책
                </td>
                <td className="border border-t-0 border-black px-3 py-2">
                  <textarea
                    className="w-full h-full outline-none resize-none text-sm"
                    style={{ minHeight: '180px' }}
                    placeholder=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReturnOccurrenceReport;
