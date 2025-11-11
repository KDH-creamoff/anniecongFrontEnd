import { useState, useRef } from 'react';

const DomesticBusinessTripReport = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  const [formData, setFormData] = useState({
    // 출장자 정보
    travelers: [
      { department: '', position: '', writer: '', approvalDate: '' },
      { department: '', position: '', writer: '', approvalDate: '' },
      { department: '', position: '', writer: '', approvalDate: '' },
      { department: '', position: '', writer: '', approvalDate: '' },
    ],
    // 출장지 및 총괄책임자
    tripDestination: '',
    supervisor: '',
    // 출장일정
    trips: [
      { date: '20 년 월 일', location: '', content: '', note: '' },
      { date: '20 년 월 일', location: '', content: '', note: '' },
      { date: '20 년 월 일', location: '', content: '', note: '' },
      { date: '20 년 월 일', location: '', content: '', note: '' },
      { date: '20 년 월 일', location: '', content: '', note: '' },
      { date: '20 년 월 일', location: '', content: '', note: '' },
      { date: '20 년 월 일', location: '', content: '', note: '' },
    ],
    // 출장결과보고
    tripReport: '',
    // 기타사항
    otherNote: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTravelerChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      travelers: prev.travelers.map((traveler, i) =>
        i === index ? { ...traveler, [field]: value } : traveler
      )
    }));
  };

  const handleTripChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      trips: prev.trips.map((trip, i) =>
        i === index ? { ...trip, [field]: value } : trip
      )
    }));
  };


  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      {/* 제목 및 결재란 - 테두리 없음 */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-left">국내출장 보고서</h1>
        <table className="border border-black border-collapse text-center text-xs">
          <tbody>
            <tr style={{ backgroundColor: '#d3d3d3' }}>
              <td className="border border-black px-4 py-1 font-medium" style={{ width: '60px' }}>담 당</td>
              <td className="border border-black px-4 py-1 font-medium" style={{ width: '60px' }}>팀장</td>
              <td className="border border-black px-4 py-1 font-medium" style={{ width: '60px' }}>대표</td>
            </tr>
            <tr>
              <td className="border border-black" style={{ height: '40px' }}></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 전체 메인 테이블 */}
      <table className="w-full border border-black border-collapse text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-2 font-medium" style={{ backgroundColor: '#d3d3d3'}} rowSpan={5}>출<br/>장<br />자</td>
            <td className="border border-black text-center py-2 font-medium" style={{ backgroundColor: '#d3d3d3', width: '80px' }}>소속</td>
            <td className="border border-black text-center py-2 font-medium" style={{ backgroundColor: '#d3d3d3', width: '60px' }}>직위</td>
            <td className="border border-black text-center py-2 font-medium" style={{ backgroundColor: '#d3d3d3', width: '60px' }}>성명</td>
            <td className="border border-black text-center py-2 font-medium" style={{ backgroundColor: '#d3d3d3', width: '100px' }} colSpan={2}>담당업무</td>
          </tr>

          {formData.travelers.map((traveler, index) => (
            <tr key={index}>
              <td className="border border-black px-3 py-2" style={{ width: '120px' }}>
                <input
                  type="text"
                  value={traveler.department}
                  onChange={(e) => handleTravelerChange(index, 'department', e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </td>
              <td className="border border-black px-3 py-2" style={{ width: '100px' }}>
                <input
                  type="text"
                  value={traveler.position}
                  onChange={(e) => handleTravelerChange(index, 'position', e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </td>
              <td className="border border-black px-3 py-2" style={{ width: '100px' }}>
                <input
                  type="text"
                  value={traveler.writer}
                  onChange={(e) => handleTravelerChange(index, 'writer', e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </td>
              <td className="border border-black px-3 py-2" colSpan={2}>
                <input
                  type="text"
                  value={traveler.approvalDate}
                  onChange={(e) => handleTravelerChange(index, 'approvalDate', e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </td>
            </tr>
          ))}

          <tr>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">출장지</td>
            <td colSpan={3} className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.tripDestination}
                onChange={(e) => handleInputChange('tripDestination', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">총괄책임자</td>
            <td className="border border-black px-3 py-2">
              <input
                type="text"
                value={formData.supervisor}
                onChange={(e) => handleInputChange('supervisor', e.target.value)}
                className="w-full outline-none bg-transparent"
              />
            </td>
          </tr>

          <tr>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">출장목적</td>
            <td colSpan={5} className="border border-black px-3 py-2"><input type="text" className='w-full outline-none bg-transparent' /></td>
          </tr>

          <tr>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">출장기간</td>
            <td colSpan={5} className="border border-black px-3 py-2"><input type="text" className='w-full outline-none bg-transparent'/></td>
          </tr>

          {/* 출장기간 */}
          <tr>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">구분</td>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">일자</td>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">방문처</td>
            <td colSpan={2} style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">출장업무 세부내용</td>
            <td style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium">비고</td>
          </tr>

          {/* 출장일정 데이터 행 */}
          {formData.trips.map((trip, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={7} style={{ backgroundColor: '#d3d3d3' }} className="border border-black text-center py-2 font-medium align-center">
                  출<br/>장<br/>일<br/>정
                </td>
              )}
              <td className="border border-black text-center px-2 py-2">
                <input
                  type="text"
                  value={trip.date}
                  onChange={(e) => handleTripChange(index, 'date', e.target.value)}
                  className="w-full outline-none bg-transparent text-center text-xs"
                />
              </td>
              <td className="border border-black text-center px-2 py-2">
                <input
                  type="text"
                  value={trip.location}
                  onChange={(e) => handleTripChange(index, 'location', e.target.value)}
                  className="w-full outline-none bg-transparent text-center text-xs"
                />
              </td>
              <td colSpan={2} className="border border-black px-2 py-2">
                <input
                  type="text"
                  value={trip.content}
                  onChange={(e) => handleTripChange(index, 'content', e.target.value)}
                  className="w-full outline-none bg-transparent text-xs"
                />
              </td>
              <td className="border border-black px-2 py-2">
                <input
                  type="text"
                  value={trip.note}
                  onChange={(e) => handleTripChange(index, 'note', e.target.value)}
                  className="w-full outline-none bg-transparent text-xs"
                />
              </td>
            </tr>
          ))}

          {/* 출장결과보고 */}
          <tr>
            <td className="border border-black text-center py-3 font-medium align-center" style={{ backgroundColor: '#d3d3d3', width: '80px' }}>
              출장<br/>결과보고
            </td>
            <td colSpan={5} className="border border-black px-3 py-3">
              <textarea
                value={formData.tripReport}
                onChange={(e) => handleInputChange('tripReport', e.target.value)}
                className="w-full outline-none bg-transparent resize-none"
                rows="8"
              />
            </td>
          </tr>

          {/* 기타사항 */}
          <tr>
            <td className="border border-black text-center py-3 font-medium align-center" style={{ backgroundColor: '#d3d3d3', width: '80px' }}>기타사항</td>
            <td colSpan={5} className="border border-black px-3 py-3">
              <textarea
                value={formData.otherNote}
                onChange={(e) => handleInputChange('otherNote', e.target.value)}
                className="w-full outline-none bg-transparent resize-none"
                rows="3"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DomesticBusinessTripReport;
