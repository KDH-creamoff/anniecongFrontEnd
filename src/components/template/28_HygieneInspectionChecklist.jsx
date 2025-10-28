import { useState, useRef } from 'react';

const HygieneInspectionChecklist = ({ pdfRef }) => {
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
          <div className="flex">
            {/* 제목 */}
            <div className="flex-1 text-center text-3xl py-4 border-r border-black">
              위생점검 체크리스트
            </div>
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
                  담당
                </td>
                <td className="border border-black px-4 py-1 text-center font-medium text-xs w-20">
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

        {/* 년월일 입력란 */}
        <div className="py-3 px-4 flex items-center gap-2 text-base">
          <span>20</span>
          <input type="text" className="w-10 outline-none" />
          <span>년</span>
          <input type="text" className="w-10 outline-none" />
          <span>월</span>
          <input type="text" className="w-10 outline-none" />
          <span>일</span>
          <span className="ml-8">(담당공정 주변 청소상태 : 적합 : ○, 부적합: ×)</span>
        </div>

        {/* 메인 테이블 */}
        <table className="w-full border-2 border-black border-collapse">
          <tbody>
            {/* 헤더 행 */}
            <tr>
              {/* 좌측 헤더 */}
              <td className="border-r border-b border-black px-2 py-2 text-center text-xs" style={{ width: '30px' }} rowSpan="2">
                구<br/>분
              </td>
              <td className="border-r border-b border-black px-2 py-2 text-center text-xs" style={{ width: '35%' }} rowSpan="2">
                점 검 사 항
              </td>
              <td className="border-r border-b border-black px-2 py-2 text-center text-xs" style={{ width: '40px' }} colSpan="2">
                결과
              </td>
              {/* 우측 헤더 */}
              <td className="border-r border-b border-black px-2 py-2 text-center text-xs" style={{ width: '30px' }} rowSpan="2">
                구<br/>분
              </td>
              <td className="border-r border-b border-black px-2 py-2 text-center text-xs" style={{ width: '35%' }} rowSpan="2">
                점 검 사 항
              </td>
              <td className="border-r border-b border-black px-2 py-2 text-center text-xs" style={{ width: '40px' }} colSpan="2">
                결과
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            {/* 1번 항목 */}
            <tr>
              <td className="border-r border-b border-black px-1 py-1 text-center text-xs align-middle" rowSpan="4">
                1.<br/>개<br/>인<br/>위<br/>생
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                1. 작업복, 작업모, 작업화, 청결상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center text-xs align-middle" rowSpan="11">
                3.<br/>시<br/>설<br/>및<br/>제<br/>조<br/>시<br/>설<br/>위<br/>생
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                12. 공정 중 누출 및 처리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                2. 종업원 위생상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                13. 분진 발생 및 처리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                3. 장갑, 작업화 등 착용상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                14. 공정설비 내부 잔류 물 처리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                4. 종업원 질병 및 외상유무
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                15. 공정 중 발생 오염물질 처리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            {/* 2번 항목 */}
            <tr>
              <td className="border-r border-b border-black px-1 py-1 text-center text-xs align-middle" rowSpan="10">
                2.<br/>작<br/>업<br/>장<br/>위<br/>생
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                5. 작업장 입실 기준 준수여부
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                16. 정선물의 처리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                6. 조명시설 관리상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                17. 집진설비 가동 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                7. 천장,벽,바닥 청소상태 및 물기제거 
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                18. 쓰레기통의 설치 및 청소 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                8. 쓰레기통 청소 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                19. 파렛트 청결상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                9. 제품창고 청소상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                20. 부자재창고 정리정돈
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                10. 상차시설 주변 청소상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                21. 탈의실(샤워,옷장) 및 화장실 청결 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                11. 지대 정리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                22. 현장소독방법준수 및 소독유무
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            <tr>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                12. 원료 보관소 청소상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center text-xs align-middle" rowSpan="2">
                4.<br/>기<br/>타
              </td>
              <td className="border-r border-b border-black px-2 py-1 text-xs">
                23. 야적조사료 관리 상태
              </td>
              <td className="border-r border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-b border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>

            {/* 마지막 행 */}
            <tr>
              <td className="border-r border-black px-2 py-1 text-xs">
                13. 화장실 보관소 청소상태
              </td>
              <td className="border-r border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="border-r border-black px-2 py-1 text-xs">
                24. 방충,방서 상태
              </td>
              <td className="border-r border-black px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
              <td className="px-1 py-1 text-center">
                <input type="text" className="w-full outline-none text-center text-xs" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HygieneInspectionChecklist;
