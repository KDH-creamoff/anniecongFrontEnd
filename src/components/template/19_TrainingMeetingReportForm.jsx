import { useState, useRef } from 'react';

const TrainingMeetingReportForm = ({ pdfRef }) => {
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
        {/* 상단 테이블 */}
        <table className="w-full border-collapse border-2 border-black mb-0">
          <tbody>
            {/* 첫 번째 행 - 제목 + 결재/담당자/책임자 */}
            <tr>
              <td className="border border-black text-center font-bold text-lg py-3 leading-tight" colSpan="4" rowSpan="2">
                <div>교육/회의 결과보고서</div>
                <div className="text-base font-normal mt-1">(☐ 교육, ☐ 회의)</div>
              </td>
              <td className="border border-black text-center w-12 py-1.5 text-sm tracking-[0.3em]" rowSpan="2">결<br />재</td>
              <td className="border border-black text-center w-36 py-1.5 text-sm tracking-[0.3em]">담당자</td>
              <td className="border border-black text-center w-24 py-1.5 text-sm tracking-[0.3em]">책임자</td>
            </tr>

            {/* 두 번째 행 - 서명란 */}
            <tr>
              <td
                className="border border-black h-16 cursor-pointer hover:bg-gray-50"
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
                className="border border-black h-16 cursor-pointer hover:bg-gray-50"
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

            {/* 세 번째 행 - 주제 + 강사 */}
            <tr>
              <td className="border border-black text-center w-20 py-2 text-sm tracking-[0.3em]">주 제</td>
              <td className="border border-black py-2" colSpan="3"><input type="text" className="w-full outline-none pl-1" /></td>
              <td className="border border-black text-center w-20 py-2 text-sm tracking-[0.5em]">강 사</td>
              <td className="border border-black py-2" colSpan="2"><input type="text" className="w-xl outline-none pl-1" /></td>
            </tr>

            {/* 네 번째 행 - 일자 + 장소 */}
            <tr>
              <td className="border border-black text-center py-2 text-sm tracking-[0.3em]">일 자</td>
              <td className="border border-black py-2" colSpan="3">
                <div className="flex items-center gap-1 px-2">
                  <input type="text" className="w-10 outline-none text-center text-sm" defaultValue="20" />
                  <span className="text-sm">년</span>
                  <input type="text" className="w-10 outline-none text-center text-sm" />
                  <span className="text-sm">월</span>
                  <input type="text" className="w-10 outline-none text-center text-sm" />
                  <span className="text-sm">일 [시간 :</span>
                  <input type="text" className="w-16 outline-none text-center text-sm" />
                  <span className="text-sm">]</span>
                </div>
              </td>
              <td className="border border-black text-center py-2 text-sm tracking-[0.5em]">장 소</td>
              <td className="border border-black py-2" colSpan="2"><input type="text" className="w-full outline-none pl-1" /></td>
            </tr>

            {/* 다섯 번째 행 - 대상 */}
            <tr>
              <td className="border border-black text-center py-2 text-sm tracking-[0.3em]">대 상</td>
              <td className="border border-black py-2"><input type="text" className="outline-none pl-2" /></td>
              <td className="border border-black text-center py-2 text-sm w-32 tracking-[0.3em]">참석인원</td>
              <td className="border border-black py-2">
                <div className="flex items-center justify-center">
                  <input type="text" className="outline-none texts text-sm" />
                  <span className="text-sm mr-1">명</span>
                </div>
              </td>
              <td className="border border-black text-center py-2 text-sm tracking-[0.3em] w-32">작성일자</td>
              <td className="border border-black py-2 px-2" colSpan="2">
                <div className="flex items-center gap-1 justify-start">
                  <input type="text" className="w-10 outline-none text-center text-sm" defaultValue="20" />
                  <span className="text-sm">.</span>
                  <input type="text" className="w-8 outline-none text-center text-sm" />
                  <span className="text-sm">.</span>
                  <input type="text" className="w-8 outline-none text-center text-sm" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 주요내용 섹션 */}
        <div className="border-2 border-black border-t-0 min-h-[180px] py-3 px-4">
          <div className="mb-3 text-center font-normal text-sm tracking-[0.5em]">주 요 내 용</div>
          <div className="space-y-3 px-2">
            <div className="flex items-start gap-1">
              <span className="text-sm">○.</span>
              <input type="text" className="outline-none w-full text-sm" />
            </div>
            <div className="flex items-start gap-1">
              <span className="text-sm">○.</span>
              <input type="text" className="outline-none w-full text-sm" />
            </div>
            <div className="flex items-start gap-1">
              <span className="text-sm">○.</span>
              <input type="text" className="outline-none w-full text-sm" />
            </div>
          </div>
        </div>

        {/* 결과교육목표 섹션 */}
        <div className="border-2 border-black border-t-0 py-2.5 px-3">
          <div className="text-sm tracking-[0.05em]">
            □전달교육필요 □전달교육 불필요 □교육보고서 첨부 ※ 자필 서명 할 것.
          </div>
        </div>

        {/* 참석자 명단 테이블 */}
        <table className="w-full border-collapse border-2 border-black border-t-0">
          <thead>
            <tr>
              <th className="border border-black py-2 text-center font-normal text-sm tracking-[0.3em] w-[25%]">성명</th>
              <th className="border border-black py-2 text-center font-normal text-sm tracking-[0.3em] w-[25%]">서명</th>
              <th className="border border-black py-2 text-center font-normal text-sm tracking-[0.3em] w-[25%]">성명</th>
              <th className="border border-black py-2 text-center font-normal text-sm tracking-[0.3em] w-[25%]">서명</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border border-black py-2.5 px-2 h-9"></td>
                <td className="border border-black py-2.5 px-2 h-9"></td>
                <td className="border border-black py-2.5 px-2 h-9"></td>
                <td className="border border-black py-2.5 px-2 h-9"></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 평가 섹션 */}
        <div className="border-2 border-black mt-3 flex">
          <div className="flex py-2.5 px-3 border-r-2 border-black w-32 justify-center">
            <div className="flex text-sm tracking-[0.3em] text-center whitespace-nowrap justify-center items-center">
              평 가    
            </div>
          </div>
          <div className="py-2.5 px-3 flex-1">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1">
                  <span className="text-sm whitespace-nowrap">□ 매우좋음</span>
                </label>
                <label className="flex items-center gap-1">
                  <span className="text-sm whitespace-nowrap">□ 좋음</span>
                </label>
                <label className="flex items-center gap-1">
                  <span className="text-sm whitespace-nowrap">□ 보통</span>
                </label>
                <label className="flex items-center gap-1">
                  <span className="text-sm whitespace-nowrap">□ 부족</span>
                </label>
                <label className="flex items-center gap-1">
                  <span className="text-sm whitespace-nowrap">□ 재교육필요</span>
                </label>
              </div>
              <div className="items-center gap-1">
                <p>(추가의견)</p>
                <div className='flex'>
                  <span className="text-sm whitespace-nowrap">주관 :</span>
                  <input type="text" className="outline-none flex-1 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 안내 문구 */}
        <div className="border-t-0 py-2.5 px-3">
          <div className="text-sm tracking-[0.02em]">
            ※ 교육불참자는 보수교육을 실시할 것.
          </div>
          <div className="mt-2 text-xs leading-relaxed tracking-[0.01em]">
            <div>&lt;보수교육 내용&gt;</div>
            <div className='flex'>
              <span>1. 대상 : </span> <input type="text" className="outline-none text-sm" />
            </div>
            <div className='flex'>
              <span>2. 방법 : </span> <input type="text" className="outline-none w-5xl text-sm" />
            </div>
            <div className='flex'>
              <span>3. 일시 : </span> <input type="text" className="outline-none w-5xl text-sm" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingMeetingReportForm;
