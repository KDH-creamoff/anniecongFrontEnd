import { useState, useRef } from 'react';

const MaterialProductQualityControlLog = ({ pdfRef }) => {
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

      <div ref={contentRef} className="w-full max-w-[900px] mx-auto p-5 bg-white">
        {/* 제목 및 결재란 */}
        <div className="border-2 border-black mb-4">
          {/* 제목과 결재란을 가로로 배치 */}
          <div className="flex justify-between items-center">
            {/* 제목 */}
            <div className="flex-1 text-center text-2xl py-4">
              원료 및 제품 품질관리 대장(자가)
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
                <td className="border border-black px-3 py-1 text-center font-medium text-xs w-16">
                  담당
                </td>
                <td className="border border-black px-3 py-1 text-center font-medium text-xs w-16">
                  팀장
                </td>
                <td className="border border-black px-3 py-1 text-center font-medium text-xs w-16">
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
                      alt="담당 서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
                <td
                  className="border border-black h-10 cursor-pointer hover:bg-gray-50"
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
        <div className="border-2 border-black mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-2 py-2 text-center text-xs" rowSpan="2" style={{ width: '12%' }}>
                  원료명<br /> / <br />제품명
                </th>
                <th className="border border-black px-2 py-2 text-center text-xs" rowSpan="2" style={{ width: '10%' }}>
                  반입일<br /> / <br />제조일
                </th>
                <th className="border border-black px-2 py-2 text-center text-xs" colSpan="3" style={{ width: '27%' }}>
                  분 석 성 분
                </th>
                <th className="border border-black px-2 py-2 text-center text-xs" rowSpan="2" style={{ width: '12%' }}>
                  이상유무
                </th>
                <th className="border border-black px-2 py-2 text-center text-xs" rowSpan="2" style={{ width: '15%' }}>
                  조치사항
                </th>
                <th className="border border-black px-2 py-2 text-center text-xs" rowSpan="2" style={{ width: '12%' }}>
                  담당자
                </th>
              </tr>
              <tr>
                <th className="border border-black px-2 py-1.5 text-center font-medium text-xs" style={{ width: '9%' }}>
                  수 분
                </th>
                <th className="border border-black px-2 py-1.5 text-center font-medium text-xs" style={{ width: '9%' }}>
                  pH
                </th>
                <th className="border border-black px-2 py-1.5 text-center font-medium text-xs" style={{ width: '9%' }}>
                  온 도
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(19)].map((_, index) => (
                <tr key={index}>
                  <td className="border border-black px-2 py-3 h-9">
                    <input type="text" className="w-full h-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
                    <input type="text" className="w-full outline-none text-center text-sm" />
                  </td>
                  <td className="border border-black px-2 py-3">
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

        {/* 하단 검사장비 테이블 */}
        <div className="border-2 border-black">
          <table className="w-full border-collapse">
            <tr>
              <th className="border border-black px-3 py-2 text-center text-sm" rowSpan="3" style={{ width: '12%' }}>
                검사장비<br />이상유무
              </th>
              <th className="border border-black px-3 py-2 text-center text-sm" style={{ width: '28%' }}>
                분석장비구분
              </th>
              <th className="border border-black px-3 py-2 text-center text-sm" style={{ width: '28%' }}>
                모델명
              </th>
              <th className="border border-black px-3 py-2 text-center text-sm" style={{ width: '15%' }}>
                이상유무
              </th>
              <th className="border border-black px-3 py-2 text-center text-sm">
                비 고
              </th>
            </tr>
            <tr>
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
            <tr>
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
          </table>
        </div>
      </div>
    </>
  );
};

export default MaterialProductQualityControlLog;
