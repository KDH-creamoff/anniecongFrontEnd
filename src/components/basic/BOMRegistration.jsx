import { useState, useEffect } from 'react';
import { Package, Trash2, X, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../store/modules/basic/actions';

const BOMRegistration = ({ onSave }) => {
  const dispatch = useDispatch();
  
  // Redux에서 아이템 목록 가져오기
  const { data: items, loading: itemsLoading } = useSelector((state) => state.basic.items);
  
  // 카테고리 영어 값을 한글로 변환
  const getCategoryName = (category) => {
    const categoryMap = {
      RawMaterial: '원재료',
      SemiFinished: '반제품',
      Finished: '완제품',
      Supply: '소모품',
      원재료: '원재료',
      반제품: '반제품',
      완제품: '완제품',
      소모품: '소모품',
    };
    return categoryMap[category] || category || '-';
  };

  // 원재료/반재료만 필터링 (한글 및 영어 카테고리 모두 포함)
  const rawAndSemiMaterials = (items || []).filter(
    (item) => 
      item.category === '원재료' || 
      item.category === '반제품' ||
      item.category === 'RawMaterial' || 
      item.category === 'SemiFinished'
  );

  // 컴포넌트 마운트 시 아이템 목록 조회
  useEffect(() => {
    dispatch(fetchItems.request({ category: '' })); // 전체 카테고리 조회
  }, [dispatch]);

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
      unit: '',
    });
  };

  // 원재료 선택 시
  const handleMaterialChange = (selectedCode) => {
    const material = rawAndSemiMaterials.find((m) => m.code === selectedCode);
    if (material && newMaterial) {
      setNewMaterial({
        ...newMaterial,
        code: material.code,
        name: material.name,
        unit: material.unit || 'g', 
      });
    }
  };

  // 필요량 입력 시 (소수점 2자리까지 허용)
  const handleAmountChange = (amount) => {
    // 빈 값 허용
    if (amount === '' || amount === null || amount === undefined) {
      setNewMaterial({
        ...newMaterial,
        amount: '',
      });
      return;
    }

    // 숫자만 허용하고 소수점 2자리까지 제한
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(amount)) {
      const numAmount = parseFloat(amount);
      setNewMaterial({
        ...newMaterial,
        amount: Number.isNaN(numAmount) ? '' : numAmount,
      });
    }
  };

  // 단위 선택 시 (현재는 readOnly라서 호출 안 되지만, 로직은 유지)
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
    if (newMaterial?.code && newMaterial?.name && newMaterial?.amount && newMaterial?.unit) {
      setCurrentMaterials([...currentMaterials, newMaterial]);
      setNewMaterial(null);
    }
  };

  // 🔧 BOM 저장 (여기서 백엔드가 원하는 구조로 변환)
  const handleSaveBOM = () => {
    if (!currentBOMName.trim()) {
      alert('BOM 명을 입력해주세요.');
      return;
    }
    if (currentMaterials.length === 0) {
      alert('원재료를 최소 1개 이상 추가해주세요.');
      return;
    }

    // 코드/수량 정상인 재료만 사용
    const validMaterials = currentMaterials.filter(
      (m) =>
        m.code &&
        m.code.trim().length > 0 &&
        !Number.isNaN(Number(m.amount)) &&
        Number(m.amount) > 0,
    );

    if (validMaterials.length === 0) {
      alert('유효한 원재료를 최소 1개 이상 추가해주세요.');
      return;
    }

    // ✅ 백엔드가 요구하는 BOM code 자동 생성 (예: BOM-20251120153000)
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const generatedBomCode = `BOM-${y}${m}${d}${hh}${mm}${ss}`;

    // ✅ 백엔드로 바로 넘겨도 되는 형태로 변환
    const newBOM = {
      code: currentMaterials.code,           // 🔥 백엔드에서 요구하는 code
      name: currentBOMName,
      bomName: currentBOMName,
      updatedDate: now.toISOString().split('T')[0],

      // 프론트에서 쓰던 원재료 목록(그대로 유지)
      materials: validMaterials,

      // 백엔드에서 components[*].code, quantity, unit 등을 바로 쓸 수 있게 구성
      components: validMaterials.map((mItem, index) => ({
        code: mItem.code,                // 🔥 여기가 없으면 "code가 필요합니다." 뜰 수 있음
        itemCode: mItem.code,
        quantity: Number(mItem.amount),
        unit: mItem.unit || 'g',
        sortOrder: index + 1,
      })),
    };

    // 부모 컴포넌트로 데이터 전달 (여기서 createBom.request(newBOM) 호출하면 됨)
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
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>BOM 등록</h2>
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
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {typeof item.amount === 'number' ? item.amount.toFixed(2) : item.amount}
                </td>
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
                    value={newMaterial.code}
                    onChange={(e) => handleMaterialChange(e.target.value)}
                    className='w-full rounded border border-gray-300 px-2 py-1 text-sm'
                    disabled={itemsLoading}
                  >
                    <option value=''>원재료/반재료 선택</option>
                    {rawAndSemiMaterials.map((material) => (
                      <option key={material.code} value={material.code}>
                        [{getCategoryName(material.category)}] {material.name}
                      </option>
                    ))}
                  </select>
                  {itemsLoading && (
                    <span className='text-xs text-gray-500'>로딩 중...</span>
                  )}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <input
                    type='number'
                    step='0.01'
                    min='0'
                    value={newMaterial.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleConfirmMaterial();
                      }
                    }}
                    className='w-full rounded border border-gray-300 px-2 py-1 text-sm'
                    placeholder='0.00'
                  />
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <input
                    type='text'
                    value={newMaterial.unit}
                    readOnly
                    className='w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 text-sm text-gray-500 focus:outline-none'
                  />
                </td>
                <td className='px-4 py-3 text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      onClick={handleConfirmMaterial}
                      className='inline-flex items-center justify-center text-green-500 hover:text-green-700'
                      title='확인'
                    >
                      <Check className='h-5 w-5' />
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

      {/* 재료 추가 버튼 */}
      <div className='mt-4 flex justify-end'>
        <button
          onClick={handleAddMaterial}
          disabled={newMaterial !== null}
          className='flex w-28 items-center gap-2 rounded-xl bg-[#56331F] px-7 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#432618] hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          재료 추가
        </button>
      </div>

      {currentMaterials.length > 0 && (
        <div className='mt-3 flex justify-end'>
          <button
            onClick={handleSaveBOM}
            className='flex w-28 items-center gap-2 rounded-xl bg-[#10B981] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#059669] hover:shadow-md active:scale-95'
          >
            BOM 저장
          </button>
        </div>
      )}
    </div>
  );
};

export default BOMRegistration;
