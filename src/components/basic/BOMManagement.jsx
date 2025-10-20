import { useState } from 'react';
import BOMRegistration from './BOMRegistration';
import BOMList from './BOMList';

const BOMManagement = () => {
  // BOM 목록 데이터
  const [bomList, setBomList] = useState([
    {
      id: 1,
      bomName: '애니콩 펫베이커리 A',
      updatedDate: '2025-10-15',
      materials: [
        { id: 1, code: 'RAW001', name: '닭고기(가슴살)', amount: 150, unit: 'g' },
        { id: 2, code: 'RAW002', name: '당근', amount: 50, unit: 'g' },
        { id: 3, code: 'RAW004', name: '감자', amount: 100, unit: 'g' },
      ],
    },
    {
      id: 2,
      bomName: '애니콩 펫디너 치킨',
      updatedDate: '2025-10-14',
      materials: [
        { id: 1, code: 'RAW001', name: '닭고기(가슴살)', amount: 200, unit: 'g' },
        { id: 2, code: 'RAW003', name: '양파', amount: 80, unit: 'g' },
        { id: 3, code: 'RAW005', name: '대파', amount: 30, unit: 'g' },
        { id: 4, code: 'RAW008', name: '간장', amount: 40, unit: 'g' },
      ],
    },
    {
      id: 3,
      bomName: '애니콩 펫디너 비프',
      updatedDate: '2025-10-13',
      materials: [
        { id: 1, code: 'RAW016', name: '소고기(불고기용)', amount: 180, unit: 'g' },
        { id: 2, code: 'RAW003', name: '양파', amount: 80, unit: 'g' },
        { id: 3, code: 'RAW006', name: '마늘', amount: 20, unit: 'g' },
      ],
    },
  ]);

  // BOM 저장 핸들러
  const handleSaveBOM = (newBOM) => {
    const bomWithId = {
      ...newBOM,
      id: bomList.length > 0 ? Math.max(...bomList.map((b) => b.id)) + 1 : 1,
    };
    setBomList([bomWithId, ...bomList]);
  };

  // BOM 삭제 핸들러
  const handleDeleteBOM = (id) => {
    setBomList(bomList.filter((bom) => bom.id !== id));
  };

  return (
    <div className='space-y-6'>
      {/* BOM 등록 컴포넌트 */}
      <BOMRegistration onSave={handleSaveBOM} />

      {/* BOM 목록 관리 컴포넌트 */}
      <BOMList bomList={bomList} onDelete={handleDeleteBOM} />
    </div>
  );
};

export default BOMManagement;
