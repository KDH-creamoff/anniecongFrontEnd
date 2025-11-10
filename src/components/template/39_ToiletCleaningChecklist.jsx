import { useState, useRef } from 'react';

const ToiletCleaningChecklist = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  const [formData, setFormData] = useState({
    year: '20',
    month: '',
    day: '',
    week: '',
  });

  const [checkData, setCheckData] = useState({
    morning: {
      floor: { manager: '', time: '', complete: '' },
      toilet: { manager: '', time: '', complete: '' },
      urinal: { manager: '', time: '', complete: '' },
      wall: { manager: '', time: '', complete: '' },
      floor2: { manager: '', time: '', complete: '' },
      floor3: { manager: '', time: '', complete: '' },
      hand: { manager: '', time: '', complete: '' },
      etc: { manager: '', time: '', complete: '' },
    },
    afternoon: {
      floor: { manager: '', time: '', complete: '' },
      toilet: { manager: '', time: '', complete: '' },
      urinal: { manager: '', time: '', complete: '' },
      wall: { manager: '', time: '', complete: '' },
      floor2: { manager: '', time: '', complete: '' },
      floor3: { manager: '', time: '', complete: '' },
      hand: { manager: '', time: '', complete: '' },
      etc: { manager: '', time: '', complete: '' },
    },
    evening: {
      floor: { manager: '', time: '', complete: '' },
      toilet: { manager: '', time: '', complete: '' },
      urinal: { manager: '', time: '', complete: '' },
      wall: { manager: '', time: '', complete: '' },
      floor2: { manager: '', time: '', complete: '' },
      floor3: { manager: '', time: '', complete: '' },
      hand: { manager: '', time: '', complete: '' },
      etc: { manager: '', time: '', complete: '' },
    },
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckChange = (period, item, field, value) => {
    setCheckData(prev => ({
      ...prev,
      [period]: {
        ...prev[period],
        [item]: {
          ...prev[period][item],
          [field]: value
        }
      }
    }));
  };

  const items = [
    { key: 'floor', label: '변기' },
    { key: 'toilet', label: '쓰레기통' },
    { key: 'urinal', label: '세면대' },
    { key: 'wall', label: '바닥' },
    { key: 'floor2', label: '환기' },
    { key: 'floor3', label: '비누' },
    { key: 'hand', label: '수건' },
    { key: 'etc', label: '거울' },
  ];

  return (
    <div ref={contentRef} className="w-full max-w-[1000px] mx-auto p-5 bg-white">
      {/* 제목 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">화장실 청소 점검표</h1>
        <p className="text-sm tracking-widest" style={{ letterSpacing: '0.3em' }}>TOILET CLEANING CHECKLIST</p>
      </div>

      {/* 날짜 입력 */}
      <div className="flex items-center mb-6 text-sm">
        <span className="mr-2">일 자 :</span>
        <input
          type="text"
          value={formData.year}
          onChange={(e) => handleFormChange('year', e.target.value)}
          className="w-8 outline-none border-b border-gray-400 text-center"
        />
        <span className="mx-1">년</span>
        <input
          type="text"
          value={formData.month}
          onChange={(e) => handleFormChange('month', e.target.value)}
          className="w-8 outline-none border-b border-gray-400 text-center"
        />
        <span className="mx-1">월</span>
        <input
          type="text"
          value={formData.day}
          onChange={(e) => handleFormChange('day', e.target.value)}
          className="w-8 outline-none border-b border-gray-400 text-center"
        />
        <span className="mx-1">일</span>
        <input
          type="text"
          value={formData.week}
          onChange={(e) => handleFormChange('week', e.target.value)}
          className="w-12 outline-none border-b border-gray-400 text-center"
        />
        <span className="ml-1">째 주</span>
      </div>

      {/* 메인 테이블 */}
      <table className="w-full border-collapse border-2 border-black">
        <thead>
          <tr>
            <th className="border-2 border-black px-4 py-3 text-sm font-bold bg-white" style={{ width: '80px' }}>
              구분
            </th>
            <th className="border-2 border-black px-4 py-3 text-sm font-bold bg-white" style={{ width: '150px' }}>
              점검항목
            </th>
            <th className="border-2 border-black px-4 py-3 text-sm font-bold bg-white" style={{ width: '150px' }}>
              담당자
            </th>
            <th className="border-2 border-black px-4 py-3 text-sm font-bold bg-white" style={{ width: '150px' }}>
              시간
            </th>
            <th className="border-2 border-black px-4 py-3 text-sm font-bold bg-white" style={{ width: '120px' }}>
              완료여부
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 오전 */}
          {items.map((item, index) => (
            <tr key={`morning-${item.key}`} className="h-10">
              {index === 0 && (
                <td rowSpan={8} className="border-2 border-black px-2 py-1 text-center text-sm font-medium">
                  주간
                </td>
              )}
              <td className="border-2 border-black px-2 py-1 text-center text-sm" style={{ color: 'black' }}>
                {item.label}
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.morning[item.key].manager}
                  onChange={(e) => handleCheckChange('morning', item.key, 'manager', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                  style={{ color: 'black' }}
                />
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.morning[item.key].time}
                  onChange={(e) => handleCheckChange('morning', item.key, 'time', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.morning[item.key].complete}
                  onChange={(e) => handleCheckChange('morning', item.key, 'complete', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
            </tr>
          ))}

          {/* 오후 */}
          {items.map((item, index) => (
            <tr key={`afternoon-${item.key}`} className="h-10">
              {index === 0 && (
                <td rowSpan={8} className="border-2 border-black px-2 py-1 text-center text-sm font-medium">
                  오후
                </td>
              )}
              <td className="border-2 border-black px-2 py-1 text-center text-sm" style={{ color: 'black' }}>
                {item.label}
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.afternoon[item.key].manager}
                  onChange={(e) => handleCheckChange('afternoon', item.key, 'manager', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.afternoon[item.key].time}
                  onChange={(e) => handleCheckChange('afternoon', item.key, 'time', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.afternoon[item.key].complete}
                  onChange={(e) => handleCheckChange('afternoon', item.key, 'complete', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
            </tr>
          ))}

          {/* 야간 */}
          {items.map((item, index) => (
            <tr key={`evening-${item.key}`} className="h-10">
              {index === 0 && (
                <td rowSpan={8} className="border-2 border-black px-2 py-1 text-center text-sm font-medium">
                  야간
                </td>
              )}
              <td className="border-2 border-black px-2 py-1 text-center text-sm" style={{ color: 'black' }}>
                {item.label}
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.evening[item.key].manager}
                  onChange={(e) => handleCheckChange('evening', item.key, 'manager', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.evening[item.key].time}
                  onChange={(e) => handleCheckChange('evening', item.key, 'time', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
              <td className="border-2 border-black px-2 py-1 text-center text-sm">
                <input
                  type="text"
                  value={checkData.evening[item.key].complete}
                  onChange={(e) => handleCheckChange('evening', item.key, 'complete', e.target.value)}
                  className="w-full outline-none text-center text-sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToiletCleaningChecklist;
