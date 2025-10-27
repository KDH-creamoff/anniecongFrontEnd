import { useState, useRef } from 'react';

const ManufacturingFacilityManagementForm = ({ pdfRef }) => {
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
        {/* 제목 및 날짜 */}
        <div className="relative border-2 border-black mb-4">
          <div className="text-center text-xl font-bold py-3 border-b-2 border-black">
            제조시설 및 공정관리 대장
          </div>
          <div className="flex justify-center items-center gap-8 py-2 text-base">
            <div className="flex items-center gap-1">
              <input type="text" className="w-16 outline-none text-center" />
              <span>년</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="text" className="w-12 outline-none text-center" />
              <span>월</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="text" className="w-12 outline-none text-center" />
              <span>일</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="text" className="w-12 outline-none text-center" />
              <span>요일</span>
            </div>
          </div>
        </div>

        {/* 결재란 */}
        <div className="flex mb-4 justify-end">
          <table className="border-collapse border border-black">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 text-center font-medium whitespace-nowrap w-12" rowSpan="2">
                  결<br />재
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium w-24">
                  담당자
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium w-24">
                  책임자
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black h-14 cursor-pointer hover:bg-gray-50"
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
                  className="border border-black h-14 cursor-pointer hover:bg-gray-50"
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

        {/* 1. 제조시설관리 및 청소점검 */}
        <div className="mb-4">
          <div className="text-base font-bold mb-1">
            1. 제조시설관리 및 청소점검
          </div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  시설명칭
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[12%]">
                  청소주기
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[12%]">
                  청소시간
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  관리상태
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  조치사항
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  비 고
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                '원료반입시설',
                '원료저장시설',
                '원료이송시설',
                '배합시설',
                '제품 및 포장시설',
                '제품저장시설',
                '조명시설',
                '집진시설',
                '자동제어시설',
                '운반시설',
                '이물질제거시설'
              ].map((facility, index) => (
                <tr key={index}>
                  <td className={`border border-black py-2 px-2 text-sm text-center`}>
                    {facility}
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. 제조공정관리(안전성 점검 및 제조조건사항) */}
        <div className="mb-4">
          <div className="text-base font-bold mb-1">
            2. 제조공정관리(안전성 점검 및 제조조건사항)
          </div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[40%]">
                  안전성 점검
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[15%]">
                  이상유무
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[20%]">
                  조치사항
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[25%]">
                  비 고
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                '조사료 안전 유무',
                '다즙성원료 부패 여부',
                '습식·건식사료 교차오염',
                '미생물사료 확인',
                '제품제조일자 및 유통기한 확보'
              ].map((item, index) => (
                <tr key={index}>
                  <td className="border border-black py-2 px-2 text-sm">
                    {item}
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-2 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. 소독 및 방역*/}
        <div className="mb-4">
          <div className="text-base font-bold mb-1">
            3. 소독 및 방역
          </div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[18%]">
                  약품 / 도구
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[18%]">
                  사용량
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[16%]">
                  설치방법
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[16%]">
                  장소/대상
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[16%]">
                  실시자
                </th>
                <th className="border border-black py-2 px-2 text-center font-medium text-sm w-[16%]">
                  비 고
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black py-4 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-4 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-4 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-4 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-4 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black py-4 px-1">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
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

export default ManufacturingFacilityManagementForm;
