import { useState, useRef } from 'react';

const DecontaminationWorkRecord = ({ pdfRef }) => {
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
            <div className="text-3xl font-bold">구서작업기록부</div>
          </div>
        </div>

        {/* 결재란 */}
        <div className="mb-4">
          <div className="flex justify-end">
            <table className="border-collapse border border-black">
                <tr>
                  <th className="border border-black px-2 py-1 text-center font-medium whitespace-nowrap w-10" rowSpan="2">
                    결<br />재
                  </th>
                  <th className="border-l border-black px-8 py-1 text-sm font-medium text-center">
                    담당
                  </th>
                  <th className="border-l border-black px-8 py-1 text-sm font-medium text-center">
                    팀장
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
                        alt="팀장 서명"
                        className="w-full h-full object-contain"
                      />
                    ) : null}
                  </td>
                </tr>
            </table>
          </div>
        </div>

        {/* 메인 테이블 */}
        <table className="w-full border-2 border-t-0 border-black border-collapse">
          <thead>
            {/* 첫 번째 헤더 행: 계 크 항 목과 날짜 */}
            <tr>
              <th className='border border-black' colSpan="2"></th>
              <th className="border border-black px-2 py-3 text-center text-base font-bold" colSpan="6">
                체 크 항 목
              </th>
              <th className="border border-black px-2 py-1 text-xs text-center" colSpan="2">
                20<input type="text" className="w-6 outline-none text-center mx-1" />년<input type="text" className="w-4 outline-none text-center mx-1" />월<input type="text" className="w-4 outline-none text-center mx-1" />일
              </th>
            </tr>

            {/* 두 번째 헤더 행: 세부 항목들 */}
            <tr>
              <th className="border border-black px-2 py-1 text-sm font-medium text-center">
                점검<br />일자
              </th>
              <th className="border border-black px-2 py-1 text-sm font-medium text-center" style={{ width: '13%' }}>
                점검 장소
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                개체
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                분변
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                이동<br />흔적
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                사체
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                먹이<br />활동
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                기타
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                처리<br />상황
              </th>
              <th className="border border-black px-2 py-2 text-center text-sm font-medium">
                비고
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(12)].map((_, index) => (
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
    </>
  );
};

export default DecontaminationWorkRecord;
