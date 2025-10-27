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
            {/* 첫 번째 행 - 제목 + 제/담당자/책임자 */}
            <tr>
              <td className="border border-black text-center font-bold text-lg py-2 leading-tight" colSpan="2" rowSpan="2">
                <div>교육/회의 결과보고서</div>
                <div className="text-base font-normal mt-1">(☐ 교육, ☐ 회의)</div>
              </td>
              <td className="border border-black text-center w-12 py-1.5 text-sm tracking-[0.3em]" rowSpan={2}>결<br />재</td>
              <td className="border border-black text-center w-20 py-1.5 text-sm tracking-[0.3em]">담당자</td>
              <td className="border border-black text-center w-20 py-1.5 text-sm tracking-[0.3em]">책임자</td>
            </tr>

            {/* 두 번째 행 - 개/서명란 */}
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

            {/* 세 번째 행 - 주제 */}
            <tr>
              <td className="border border-black text-center w-16 py-1.5 text-sm tracking-[0.3em]">주 제</td>
              <td className="border border-black py-1.5" colSpan="5"></td>
            </tr>

            {/* 네 번째 행 - 일자 */}
            <tr>
              <td className="border border-black text-center py-1.5 text-sm tracking-[0.3em]">일 자</td>
              <td className="border border-black py-1.5" colSpan="3">
                <div className="flex items-center gap-1 px-2">
                  <input type="text" className="w-12 outline-none text-center text-sm" placeholder="201" />
                  <span className="text-sm">년</span>
                  <input type="text" className="w-12 outline-none text-center text-sm" />
                  <span className="text-sm">월</span>
                  <input type="text" className="w-12 outline-none text-center text-sm" />
                  <span className="text-sm">일 (시간 :</span>
                  <input type="text" className="w-16 outline-none text-center text-sm" />
                  <span className="text-sm">)</span>
                </div>
              </td>
              <td className="border border-black text-center py-1.5 text-sm tracking-[0.5em]">강 사</td>
              <td className="border border-black py-1.5"></td>
            </tr>

            {/* 다섯 번째 행 - 대상 */}
            <tr>
              <td className="border border-black text-center py-1.5 text-sm tracking-[0.3em]">대 상</td>
              <td className="border border-black py-1.5" colSpan="1">
                <div className="flex items-center gap-1 px-2">
                  <span className="text-sm">관석인원</span>
                  <input type="text" className="w-16 outline-none text-center text-sm border-b border-black" />
                  <span className="text-sm">명</span>
                </div>
              </td>
              <td className="border border-black py-1.5" colSpan="2">
                <div className="flex items-center gap-1 px-2">
                  <span className="text-sm">작성일자</span>
                  <input type="text" className="w-12 outline-none text-center text-sm" placeholder="201" />
                  <span className="text-sm">.</span>
                  <input type="text" className="w-10 outline-none text-center text-sm" />
                  <span className="text-sm">.</span>
                </div>
              </td>
              <td className="border border-black text-center py-1.5 text-sm tracking-[0.3em]">작성일자</td>
              <td className="border border-black py-1.5">
                <div className="flex items-center gap-1 px-2">
                  <input type="text" className="w-12 outline-none text-center text-sm" placeholder="201" />
                  <span className="text-sm">.</span>
                  <input type="text" className="w-10 outline-none text-center text-sm" />
                  <span className="text-sm">.</span>
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
            </div>
            <div className="flex items-start gap-1">
              <span className="text-sm">○.</span>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-sm">○.</span>
            </div>
          </div>
        </div>

        {/* 결과교육목표 섹션 */}
        <div className="border-2 border-black border-t-0 py-2.5 px-3">
          <div className="text-sm tracking-[0.05em]">
            ◎ 결과교육목표 □ 달성교육목표 □ 교육보고서 □ 교육보고서 □과정 및 치료 실적 발표
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
        <div className="border-2 border-black border-t-0 py-2.5 px-3">
          <div className="flex items-center gap-2">
            <span className="text-sm tracking-[0.3em]">평 가</span>
            <div className="flex items-center gap-3 ml-6">
              <label className="flex items-center gap-1">
                <span className="text-sm">□ 매우좋음</span>
              </label>
              <label className="flex items-center gap-1">
                <span className="text-sm">□ 좋음</span>
              </label>
              <label className="flex items-center gap-1">
                <span className="text-sm">□ 보통</span>
              </label>
              <label className="flex items-center gap-1">
                <span className="text-sm">□ 부족</span>
              </label>
              <label className="flex items-center gap-1">
                <span className="text-sm">□ 매우부족함</span>
              </label>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <span className="text-sm">(추가점검)</span>
              <input type="text" className="outline-none border-b border-black w-24 text-center text-sm" />
            </div>
          </div>
        </div>

        {/* 하단 안내 문구 */}
        <div className="border-2 border-black border-t-0 py-2.5 px-3">
          <div className="text-sm tracking-[0.02em]">
            ※ 표준교육절차는 교구제작을 설치할 것.
          </div>
          <div className="mt-2 text-xs leading-relaxed tracking-[0.01em]">
            <div>&lt;교구교육 내용&gt;</div>
            <div>1. 대상 :</div>
            <div>2. 방법 :</div>
            <div>3. 일시 :</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingMeetingReportForm;
