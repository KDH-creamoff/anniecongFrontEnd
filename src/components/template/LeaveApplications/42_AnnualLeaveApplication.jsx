import { useState, useRef } from 'react';

const AnnualLeaveApplication = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [signImage1, setSignImage1] = useState(null);
  const [signImage2, setSignImage2] = useState(null);
  const [signImage3, setSignImage3] = useState(null);
  const [signImage4, setSignImage4] = useState(null);
  const signInputRef1 = useRef(null);
  const signInputRef2 = useRef(null);
  const signInputRef3 = useRef(null);
  const signInputRef4 = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    departmentDetail: '',
    rank: '',
    taskDetail: '',
    leaveYear: '20',
    leaveDate: '',
    leaveDays: '',
    leaveUsedDays: '',
    detailReason: '',
    delegateApprover: '',
    urgentApprover: '',
    noticeText: '상기 본인은 위와 같이 2023년도 연차휴가 출가를 신청하오니 처리하여 주시기 바랍니다.',
    year: '2022',
    month: '05',
    day: '02',
    applicantName: '',
    applicantSignature: '',
    companyName: '애니콩 주식회사 농업회사법인',
  });

  const handleSignClick = (refNum) => {
    if (refNum === 1) signInputRef1.current?.click();
    if (refNum === 2) signInputRef2.current?.click();
    if (refNum === 3) signInputRef3.current?.click();
    if (refNum === 4) signInputRef4.current?.click();
  };

  const handleSignImageChange = (setImage) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={signInputRef1}
        onChange={handleSignImageChange(setSignImage1)}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={signInputRef2}
        onChange={handleSignImageChange(setSignImage2)}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={signInputRef3}
        onChange={handleSignImageChange(setSignImage3)}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={signInputRef4}
        onChange={handleSignImageChange(setSignImage4)}
        accept="image/*"
        className="hidden"
      />

      <div ref={contentRef} className="w-full max-w-[800px] mx-auto p-8 bg-white">
        {/* 제목과 결재란 */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">연차휴가신청서</h1>
            <p className="text-xs text-gray-400 mt-1">A N N U A L  L E A V E  A P P L I C A T I O N  F O R M</p>
          </div>

          {/* 결재 테이블 */}
          <table className="border-2 border-black border-collapse">
            <tbody>
              <tr>
                <td className="border-2 border-black px-4 py-2 text-center text-sm">담당</td>
                <td className="border-2 border-black px-4 py-2 text-center text-sm">대표</td>
                <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
                <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
              </tr>
              <tr>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSignClick(1)}
                >
                  {signImage1 ? (
                    <img
                      src={signImage1}
                      alt="담당 서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSignClick(2)}
                >
                  {signImage2 ? (
                    <img
                      src={signImage2}
                      alt="대표 서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSignClick(3)}
                >
                  {signImage3 ? (
                    <img
                      src={signImage3}
                      alt="서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
                <td
                  className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSignClick(4)}
                >
                  {signImage4 ? (
                    <img
                      src={signImage4}
                      alt="서명"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 인적사항 테이블 */}
        <table className="w-full border-2 border-black border-collapse mb-4">
          <tbody>
            <tr>
              <td rowSpan={2} className="border-2 border-black px-4 py-3 text-center font-bold text-sm" style={{ width: '100px' }}>
                인적사항
              </td>
              <td className="border-2 border-black px-4 py-3 text-center font-medium text-sm" style={{ width: '80px' }}>
                성 명
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm" style={{ width: '200px' }}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full outline-none"
                />
              </td>
              <td className="border-2 border-black px-4 py-3 text-center font-medium text-sm" style={{ width: '80px' }}>
                부 서
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm" style={{ width: '200px' }}>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-3 text-center font-medium text-sm">
                직 급
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm">
                <input
                  type="text"
                  value={formData.rank}
                  onChange={(e) => handleInputChange('rank', e.target.value)}
                  className="w-full outline-none"
                />
              </td>
              <td className='border-2 border-black px-4 py-3 text-center font-medium text-sm'>
                담당업무
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm">
                <input
                  type="text"
                  value={formData.taskDetail}
                  onChange={(e) => handleInputChange('taskDetail', e.target.value)}
                  className="w-full outline-none"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* 연차 휴가 테이블 */}
        <table className="w-full border-2 border-black border-collapse mb-6">
          <tbody>
            <tr>
              <td rowSpan={3} className="border-2 border-black px-4 py-3 text-center font-bold text-sm" style={{ width: '120px' }}>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 mb-1">
                    <input
                      type="text"
                      value={formData.leaveYear}
                      onChange={(e) => handleInputChange('leaveYear', e.target.value)}
                      className="w-12 outline-none text-center font-bold"
                      placeholder="20"
                    />
                    <span>년도</span>
                  </div>
                  <div>연차 휴가</div>
                </div>
              </td>
              <td className="border-2 border-black px-4 py-3 text-center font-medium text-sm" style={{ width: '112px' }}>
                휴가기간
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm">
                <input
                  type="text"
                  value={formData.leaveDate}
                  onChange={(e) => handleInputChange('leaveDate', e.target.value)}
                  className="w-full outline-none"
                  placeholder="2023년 5월 9일 ~ 2023년 5월 9일"
                />
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-3 text-center font-medium text-sm">
                휴가신청일수
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm">
                <input
                  type="text"
                  value={formData.leaveDays}
                  onChange={(e) => handleInputChange('leaveDays', e.target.value)}
                  className="w-full outline-none"
                  placeholder="2 일"
                />
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-4 py-3 text-center font-medium text-sm">
                잔여연차일수
              </td>
              <td className="border-2 border-black px-4 py-3 text-sm">
                <input
                  type="text"
                  value={formData.leaveUsedDays}
                  onChange={(e) => handleInputChange('leaveUsedDays', e.target.value)}
                  className="w-full outline-none"
                  placeholder="3 일"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* 사유 박스 */}
        <h2 className="text-center font-bold mb-2">사    유</h2>
        <div className="border-2 border-black p-6 mb-6" style={{ minHeight: '200px' }}>
          <textarea
            value={formData.detailReason}
            onChange={(e) => handleInputChange('detailReason', e.target.value)}
            className="w-full h-32 outline-none resize-none"
            placeholder="가족여행으로 인한 휴가 신청"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <span className="font-bold mr-4">대체업무자</span>
            <input
              type="text"
              value={formData.delegateApprover}
              onChange={(e) => handleInputChange('delegateApprover', e.target.value)}
              className="outline-none border-b border-gray-300"
              placeholder="없음"
            />
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-4">긴급연락처</span>
            <input
              type="text"
              value={formData.urgentApprover}
              onChange={(e) => handleInputChange('urgentApprover', e.target.value)}
              className="outline-none border-b border-gray-300"
              placeholder="없음"
            />
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="text-center my-8">
          <textarea
            value={formData.noticeText}
            onChange={(e) => handleInputChange('noticeText', e.target.value)}
            className="w-full outline-none resize-none text-center"
            rows="2"
          />
        </div>

        {/* 날짜 */}
        <div className="flex justify-center items-center mb-6 text-lg gap-2">
          <input
            type="text"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className="w-16 outline-none text-center"
          />
          <span>년</span>
          <input
            type="text"
            value={formData.month}
            onChange={(e) => handleInputChange('month', e.target.value)}
            className="w-12 outline-none text-center"
          />
          <span>월</span>
          <input
            type="text"
            value={formData.day}
            onChange={(e) => handleInputChange('day', e.target.value)}
            className="w-12 outline-none text-center"
          />
          <span>일</span>
        </div>

        {/* 신청인 */}
        <div className="text-right mb-8">
          <span className="mr-4">신청인</span>
          <input
            type="text"
            value={formData.applicantName}
            onChange={(e) => handleInputChange('applicantName', e.target.value)}
            className="outline-none border-b border-gray-300 text-center w-32"
          />
          <span className="ml-2">(인)</span>
        </div>

        {/* 회사명 */}
        <div className="text-center text-xl font-bold">
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full outline-none text-center"
          />
        </div>
      </div>
    </>
  );
};

export default AnnualLeaveApplication;
