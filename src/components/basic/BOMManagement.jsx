import { useState } from 'react';
import BOMRegistration from './BOMRegistration';
import BOMList from './BOMList';

const BOMManagement = () => {

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
      <BOMList onDelete={handleDeleteBOM} />
    </div>
  );
};

export default BOMManagement;
