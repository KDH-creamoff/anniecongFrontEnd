import { useState, useRef } from 'react';
import ContentEditor from '../common/ContentEditor';

const TravelExpenseSettlement = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  const [formData, setFormData] = useState({
    documentNumber: '',
    user: '',
    updateDate: '',
    department: '',
    position: '',
    name: '',
    rank: '',
    purpose: '',
    projectName: '',
    destination: '',
    travelDays: '',
    projectForm: '',
    projectAmount: '',
    projectPeriod: '',
    status: '',
    budget: '',
    detailExpense: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      {/* 상단 헤더 */}
      <table className="w-full border border-black border-collapse mb-4 text-xs">
        <tbody>
          <tr>
            <td rowSpan={3} className="border border-black text-center w-[100px] py-1.5">
              <div className="text-sm font-normal">annie.cong</div>
            </td>
            <td rowSpan={3} className="border border-black text-center w-[180px]">
              <div className="text-lg font-bold">제 작  기 획 안</div>
            </td>
            <td className="border border-black text-center px-2 py-1" style={{ backgroundColor: '#e8e8e8' }}>문서번호</td>
            <td className="border border-black px-2 py-1">
              <input
                type="text"
                value={formData.documentNumber}
                onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                className="w-full outline-none text-center"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center px-2 py-1" style={{ backgroundColor: '#e8e8e8' }}>작성자</td>
            <td className="border border-black px-2 py-1">
              <input
                type="text"
                value={formData.user}
                onChange={(e) => handleInputChange('user', e.target.value)}
                className="w-full outline-none text-center"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center px-2 py-1" style={{ backgroundColor: '#e8e8e8' }}>수정일자</td>
            <td className="border border-black px-2 py-1">
              <input
                type="text"
                value={formData.updateDate}
                onChange={(e) => handleInputChange('updateDate', e.target.value)}
                className="w-full outline-none text-center"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 기본정보 */}
      <table className="w-full border border-black border-collapse mb-4 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[100px]" style={{ backgroundColor: '#e8e8e8' }}>소속 부서</td>
            <td className="border border-black px-2 py-1.5 w-[180px]">
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center py-1.5 px-2 w-[70px]" style={{ backgroundColor: '#e8e8e8' }}>직 책</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>성 명</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>직 급</td>
            <td className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.rank}
                onChange={(e) => handleInputChange('rank', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>제안 배경</td>
            <td colSpan={3} className="border border-black px-2 py-1.5">
              <input
                type="text"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 문구 및 결재 테이블 */}
      <div className="flex items-center mb-6 gap-4">
        <div className="flex-1 text-base text-left">
          아래와 같이 제작 기획안을 제출합니다
        </div>
        <table className="border border-black border-collapse text-xs w-[400px]">
          <tbody>
            <tr>
              <td rowSpan={3} className="border border-black text-center py-1.5 px-2 w-[60px]" style={{ backgroundColor: '#e8e8e8' }}>결<br/>재</td>
              <td className="border border-black px-2 py-1.5 text-center w-1/2" style={{ backgroundColor: '#e8e8e8' }}>대표</td>
              <td className="border border-black px-2 py-1.5 text-center w-1/2" style={{ backgroundColor: '#e8e8e8' }}>팀장</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-8"></td>
              <td className="border border-black px-2 py-8"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-center">/</td>
              <td className="border border-black px-2 py-1 text-center">/</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 프로젝트 상세 */}
      <table className="w-full border border-black border-collapse mb-6 text-xs">
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[120px]" style={{ backgroundColor: '#e8e8e8' }}>프로젝트 명</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>주제 및 목적</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>기 획 의 도</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.travelDays}
                onChange={(e) => handleInputChange('travelDays', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>프로젝트 형식</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.projectForm}
                onChange={(e) => handleInputChange('projectForm', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>프로젝트 인원</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.projectAmount}
                onChange={(e) => handleInputChange('projectAmount', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>프로젝트 기간</td>
            <td className="border border-black px-2 py-1.5" colSpan={3}>
              <input
                type="text"
                value={formData.projectPeriod}
                onChange={(e) => handleInputChange('projectPeriod', e.target.value)}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center" style={{ backgroundColor: '#e8e8e8' }}>제 작 일 정</td>
            <td className="border border-black" colSpan={3}>
              <div className="flex">
                {/* 좌측: 텍스트 영역 (60%) */}
                <div className="w-[60%] border-r border-black px-2">
                  <textarea
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full outline-none resize-none"
                    rows="12"
                  />
                </div>
                {/* 우측: 이미지 영역 (40%) */}
                <div className="w-[40%] px-2 py-2 relative">
                  <ContentEditor minHeight="220px" mode="imageOnly" placeholder="" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-2" style={{ backgroundColor: '#e8e8e8' }}>제작 예산</td>
            <td className='border border-black px-2'>
              <textarea 
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full outline-none resize-none"
                rows="4"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[120px]" style={{ backgroundColor: '#e8e8e8' }}>기타 계산 및<br/>요구사항</td>
            <td className="border border-black px-2">
              <textarea
                value={formData.detailExpense}
                onChange={(e) => handleInputChange('detailExpense', e.target.value)}
                className="w-full outline-none resize-none"
                rows="4"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TravelExpenseSettlement;
