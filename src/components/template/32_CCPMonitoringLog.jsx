import { useState, useRef } from 'react';

const CCPMonitoringLog = ({ pdfRef }) => {
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

      <div ref={contentRef} className="w-full max-w-[1400px] mx-auto p-5 bg-white">
        {/* 제목 */}
        <div className="border-2 border-black mb-4">
          <div className="text-center py-3">
            <div className="text-2xl font-bold">중요관리점(CCP) 모니터링 및 검증 일지</div>
          </div>
        </div>

        {/* 결재란 및 원료/제품 정보 테이블 */}
        <div className="flex justify-between mb-4 gap-4">
          {/* 왼쪽: 원료/제품 정보 주석 */}
          <div className="text-xs flex items-end">
            ※ 원료 및 제품의 외부위탁분석 성적서는 별도로 철하여 관리한다.
          </div>

          {/* 오른쪽: 결재란 */}
          <div className="flex-shrink-0">
            <table className="border-collapse border border-black">
              <tbody>
                <tr>
                  <th className="border border-black px-2 py-1 text-center font-medium whitespace-nowrap w-10" rowSpan="2">
                    결<br />재
                  </th>
                  <th className="border-l border-black px-6 py-1 text-sm font-medium text-center">
                    담당
                  </th>
                  <th className="border-l border-black px-6 py-1 text-sm font-medium text-center">
                    팀장
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

        {/* 메인 테이블 */}
        <table className="w-full border-2 border-black border-collapse">
          <thead>
            <tr>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                구분<br />(모니터링<br />/ 검증)
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                원료명<br />/<br />제품명
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                반입일<br />/<br />제조일
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                분석<br />의뢰일
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                결과<br />확인일
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" colSpan="3">
                분석결과
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                조치사항
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center" rowSpan="2">
                담당자
              </th>
            </tr>
            <tr>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center">
                살모넬라<br />(CCP-1B)
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center">
                아플라톡신<br />(CCP-1C-1)
              </th>
              <th className="border border-black px-2 py-2 text-sm font-medium text-center">
                잔류농약<br />(CCP-1C-2)
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(7)].map((_, index) => (
              <tr key={index} className="h-10">
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
                  <input type="text" className="w-full outline-none text-center text-sm" />
                </td>
                <td className="border border-black px-1 py-1">
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

export default CCPMonitoringLog;
