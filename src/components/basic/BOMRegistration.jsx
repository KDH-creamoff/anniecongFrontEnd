import { useState } from 'react';
import { Package, Trash2, Plus, X } from 'lucide-react';

const BOMRegistration = ({ onSave }) => {
  // 원재료 마스터 데이터 (품목 등록에서 가져온 것)
  const rawMaterialMaster = [
    { code: 'RAW001', name: '닭고기(가슴살)' },
    { code: 'RAW002', name: '당근' },
    { code: 'RAW003', name: '양파' },
    { code: 'RAW004', name: '감자' },
    { code: 'RAW005', name: '대파' },
    { code: 'RAW006', name: '마늘' },
    { code: 'RAW007', name: '생강' },
    { code: 'RAW008', name: '간장' },
    { code: 'RAW009', name: '설탕' },
    { code: 'RAW010', name: '참기름' },
    { code: 'RAW011', name: '소금' },
    { code: 'RAW012', name: '후추' },
    { code: 'RAW013', name: '고춧가루' },
    { code: 'RAW014', name: '식용유' },
    { code: 'RAW015', name: '돼지고기(삼겹살)' },
    { code: 'RAW016', name: '소고기(불고기용)' },
    { code: 'RAW017', name: '두부' },
    { code: 'RAW018', name: '배추' },
    { code: 'RAW019', name: '무' },
    { code: 'RAW020', name: '애호박' },
    { code: 'RAW021', name: '버섯(표고)' },
    { code: 'RAW022', name: '버섯(양송이)' },
    { code: 'RAW023', name: '파프리카(빨강)' },
    { code: 'RAW024', name: '파프리카(노랑)' },
    { code: 'RAW025', name: '브로콜리' },
    { code: 'RAW026', name: '양배추' },
    { code: 'RAW027', name: '청경채' },
    { code: 'RAW028', name: '시금치' },
    { code: 'RAW029', name: '숙주' },
    { code: 'RAW030', name: '콩나물' },
  ];

  // BOM 등록용 상태
  const [currentBOMName, setCurrentBOMName] = useState('');
  const [currentMaterials, setCurrentMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState(null);

  // BOM 추가 버튼
  const handleAddMaterial = () => {
    const newId =
      currentMaterials.length > 0
        ? Math.max(...currentMaterials.map((item) => item.id)) + 1
        : 1;
    setNewMaterial({
      id: newId,
      code: '',
      name: '',
      amount: '',
      unit: 'g',
    });
  };

  // 원재료 선택 시
  const handleMaterialChange = (selectedName) => {
    const material = rawMaterialMaster.find((m) => m.name === selectedName);
    if (material && newMaterial) {
      setNewMaterial({
        ...newMaterial,
        code: material.code,
        name: material.name,
      });
    }
  };

  // 필요량 입력 시
  const handleAmountChange = (amount) => {
    const numAmount = parseFloat(amount) || '';
    setNewMaterial({
      ...newMaterial,
      amount: numAmount,
    });
  };

  // 단위 선택 시
  const handleUnitChange = (unit) => {
    setNewMaterial({
      ...newMaterial,
      unit: unit,
    });
  };

  // 원재료 추가 취소
  const handleCancelMaterial = () => {
    setNewMaterial(null);
  };

  // 원재료 삭제
  const handleDeleteMaterial = (id) => {
    setCurrentMaterials(currentMaterials.filter((item) => item.id !== id));
  };

  // 원재료 확인 (목록에 추가)
  const handleConfirmMaterial = () => {
    if (newMaterial.code && newMaterial.name && newMaterial.amount && newMaterial.unit) {
      setCurrentMaterials([...currentMaterials, newMaterial]);
      setNewMaterial(null);
    }
  };

  // BOM 저장
  const handleSaveBOM = () => {
    if (!currentBOMName.trim()) {
      alert('BOM 명을 입력해주세요.');
      return;
    }
    if (currentMaterials.length === 0) {
      alert('원재료를 최소 1개 이상 추가해주세요.');
      return;
    }

    const newBOM = {
      bomName: currentBOMName,
      updatedDate: new Date().toISOString().split('T')[0],
      materials: currentMaterials,
    };

    // 부모 컴포넌트로 데이터 전달
    if (onSave) {
      onSave(newBOM);
    }

    // 폼 초기화
    setCurrentBOMName('');
    setCurrentMaterials([]);
    setNewMaterial(null);
    alert('BOM이 성공적으로 저장되었습니다!');
  };

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Package className='h-5 w-5 text-[#674529]' />
          <h2 className='text-base text-[#674529]'>BOM 등록</h2>
        </div>
        <button
          onClick={handleSaveBOM}
          className='flex items-center gap-2 rounded-xl bg-[#674529] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#553821] hover:shadow-md active:scale-95'
        >
          BOM 저장
        </button>
      </div>

      {/* BOM 명 입력 */}
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          BOM 명
        </label>
        <input
          type='text'
          value={currentBOMName}
          onChange={(e) => setCurrentBOMName(e.target.value)}
          placeholder='BOM 명을 입력하세요'
          className='w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20'
        />
      </div>

      {/* 원재료 테이블 */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='w-[12%] px-4 py-3 text-left text-sm font-medium text-gray-900'>
                원재료 코드
              </th>
              <th className='w-[40%] px-4 py-3 text-left text-sm font-medium text-gray-900'>
                원재료명
              </th>
              <th className='w-[15%] px-4 py-3 text-left text-sm font-medium text-gray-900'>
                필요량
              </th>
              <th className='w-[15%] px-4 py-3 text-left text-sm font-medium text-gray-900'>
                단위
              </th>
              <th className='w-[18%] px-4 py-3 text-center text-sm font-medium text-gray-900'>
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMaterials.map((item) => (
              <tr key={item.id} className='border-b border-gray-100'>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.code}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.name}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.amount}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.unit}</td>
                <td className='px-4 py-3 text-center'>
                  <button
                    onClick={() => handleDeleteMaterial(item.id)}
                    className='inline-flex items-center justify-center text-red-500 hover:text-red-700'
                  >
                    <Trash2 className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            ))}

            {/* 신규 원재료 추가 행 */}
            {newMaterial && (
              <tr className='border-b border-gray-100 bg-white'>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <input
                    type='text'
                    value={newMaterial.code}
                    readOnly
                    className='w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 text-sm text-gray-500 focus:outline-none'
                  />
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <select
                    value={newMaterial.name}
                    onChange={(e) => handleMaterialChange(e.target.value)}
                    className='w-full rounded border border-gray-300 px-2 py-1 text-sm'
                  >
                    <option value=''>원재료 선택</option>
                    {rawMaterialMaster.map((material) => (
                      <option key={material.code} value={material.name}>
                        {material.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <input
                    type='number'
                    value={newMaterial.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleConfirmMaterial();
                      }
                    }}
                    className='w-full rounded border border-gray-300 px-2 py-1 text-sm'
                    placeholder='필요량'
                  />
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <select
                    value={newMaterial.unit}
                    onChange={(e) => handleUnitChange(e.target.value)}
                    className='w-full rounded border border-gray-300 px-2 py-1 text-sm'
                  >
                    <option value='g'>g</option>
                    <option value='kg'>kg</option>
                    <option value='ea'>ea</option>
                    <option value='box'>box</option>
                    <option value='pallet'>pallet</option>
                  </select>
                </td>
                <td className='px-4 py-3 text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      onClick={handleConfirmMaterial}
                      className='inline-flex items-center justify-center text-green-500 hover:text-green-700'
                      title='확인'
                    >
                      <Plus className='h-5 w-5' />
                    </button>
                    <button
                      onClick={handleCancelMaterial}
                      className='inline-flex items-center justify-center text-red-500 hover:text-red-700'
                      title='취소'
                    >
                      <X className='h-5 w-5' />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* BOM 추가 버튼 */}
      <div className='mt-4 flex justify-end'>
        <button
          onClick={handleAddMaterial}
          disabled={newMaterial !== null}
          className='flex items-center gap-2 rounded-xl bg-[#674529] px-4 py-2 text-sm text-white transition-colors hover:bg-[#553821] disabled:cursor-not-allowed disabled:opacity-50'
        >
          <Plus className='h-4 w-4' />
          BOM 추가
        </button>
      </div>
    </div>
  );
};

export default BOMRegistration;
