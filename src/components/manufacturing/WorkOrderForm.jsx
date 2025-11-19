import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWorkOrder } from '../../store/modules/manufacturing/action';

const WorkOrderForm = () => {
  const dispatch = useDispatch();
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedManagerBom, setSelectedManagerBom] = useState('');
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedFactoryBom, setSelectedFactoryBom] = useState('');
  
  // 작업 내용 폼 상태
  const [workForm, setWorkForm] = useState({
    title: '',
    workType: '세척',
    material: '',
    materialCode: '',
    quantity: '',
    deadlineDate: '',
    managerName: ''
  });
  
  // BOM 폼 상태
  const [bomForm, setBomForm] = useState({
    title: '',
    bom: '',
    bomQuantity: '1',
    deadlineDate: '',
    managerName: ''
  });

  // BOM 선택 옵션
  const bomOptions = ['콩부장 쿠키', '맛있는 닭기슴살', '강아지 간식', '단호박과자'];

  // 담당자 선택 옵션
  const managerOptions = ['대표', '이사', '팀장', '직원', '알바'];

  // 담당자별 이름 매핑
  const namesByManager = {
    '대표': ['김대표'],
    '이사': ['최이사', '정이사', '강이사'],
    '팀장': ['나팀장', '윤팀장', '송팀장'],
    '직원': ['홍직원', '조직원', '한직원'],
    '알바': ['김알바', '이알바', '박알바']
  };

  // 작업 내용 등록
  const handleWorkSubmit = () => {
    if (!selectedFactory || !workForm.title || !workForm.material || !workForm.quantity || !workForm.deadlineDate || !workForm.managerName) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    const workOrderData = {
      title: workForm.title,
      product: `${workForm.workType} - ${workForm.material}`,
      material: workForm.material,
      materialCode: workForm.materialCode || 'RAW' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
      quantity: workForm.quantity + ' kg',
      deadlineDate: workForm.deadlineDate,
      manager: workForm.managerName,
      worker: workForm.managerName,
      status: 'waiting',
      factoryId: selectedFactory === '1공장' ? 1 : 2
    };
    
    dispatch(createWorkOrder.request(workOrderData));
    
    // 폼 초기화
    setWorkForm({
      title: '',
      workType: '세척',
      material: '',
      materialCode: '',
      quantity: '',
      deadlineDate: '',
      managerName: ''
    });
    setSelectedFactory('');
    setSelectedManager('');
    alert('작업 지시서가 등록되었습니다.');
  };
  
  // BOM 등록
  const handleBomSubmit = () => {
    if (!selectedFactoryBom || !bomForm.title || !bomForm.bom || !bomForm.deadlineDate || !bomForm.managerName) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    
    const bomOrderData = {
      title: bomForm.title,
      product: bomForm.bom,
      material: bomForm.bom,
      materialCode: 'BOM' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
      quantity: bomForm.bomQuantity + ' 개',
      deadlineDate: bomForm.deadlineDate,
      manager: bomForm.managerName,
      worker: bomForm.managerName,
      status: 'waiting',
      factoryId: selectedFactoryBom === '1공장' ? 1 : 2
    };
    
    dispatch(createWorkOrder.request(bomOrderData));
    
    // 폼 초기화
    setBomForm({
      title: '',
      bom: '',
      bomQuantity: '1',
      deadlineDate: '',
      managerName: ''
    });
    setSelectedFactoryBom('');
    setSelectedManagerBom('');
    alert('작업 지시서가 등록되었습니다.');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl text-[#674529] mb-6">작업 지시서 등록</h3>

      <div className="grid grid-cols-2 gap-6">
        {/* 좌측 - 작업 내용 */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-base font-semibold text-[#674529] mb-4 text-center">작업 내용</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">공장</label>
              <select
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>공장 선택</option>
                <option>1공장</option>
                <option>2공장</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">제목</label>
              <input
                type="text"
                placeholder="Title"
                value={workForm.title}
                onChange={(e) => setWorkForm({...workForm, title: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업 내용</label>
              <select 
                value={workForm.workType}
                onChange={(e) => setWorkForm({...workForm, workType: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option>세척</option>
                <option>전처리</option>
                <option>포장</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">원재료명</label>
              <input
                type="text"
                placeholder="딸기"
                value={workForm.material}
                onChange={(e) => setWorkForm({...workForm, material: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업량</label>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="100"
                  value={workForm.quantity}
                  onChange={(e) => setWorkForm({...workForm, quantity: e.target.value})}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <span className="text-sm text-gray-600">kg</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업 예정일</label>
              <input
                type="date"
                value={workForm.deadlineDate}
                onChange={(e) => setWorkForm({...workForm, deadlineDate: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">담당자</label>
              <select
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>담당자 선택</option>
                {managerOptions.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>

            {selectedManager && (
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이름</label>
                <select 
                  value={workForm.managerName}
                  onChange={(e) => setWorkForm({...workForm, managerName: e.target.value})}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="" disabled hidden>이름 선택</option>
                  {namesByManager[selectedManager]?.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button 
                onClick={handleWorkSubmit}
                className="px-8 py-2 bg-[#674529] text-white text-sm rounded hover:bg-[#553821] transition-colors"
              >
                작업 지시서 등록
              </button>
            </div>
          </div>
        </div>

        {/* 우측 - BOM */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h4 className="text-base font-semibold text-[#674529] mb-4 text-center">BOM</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">공장</label>
              <select
                value={selectedFactoryBom}
                onChange={(e) => setSelectedFactoryBom(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>공장 선택</option>
                <option>1공장</option>
                <option>2공장</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">제목</label>
              <input
                type="text"
                placeholder="Title"
                value={bomForm.title}
                onChange={(e) => setBomForm({...bomForm, title: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">BOM</label>
              <select 
                value={bomForm.bom}
                onChange={(e) => setBomForm({...bomForm, bom: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>BOM 선택</option>
                {bomOptions.map((bom) => (
                  <option key={bom} value={bom}>
                    {bom}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">수량</label>
              <input
                type="text"
                value={bomForm.bomQuantity}
                onChange={(e) => setBomForm({...bomForm, bomQuantity: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">작업 예정일</label>
              <input
                type="date"
                value={bomForm.deadlineDate}
                onChange={(e) => setBomForm({...bomForm, deadlineDate: e.target.value})}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">담당자</label>
              <select
                value={selectedManagerBom}
                onChange={(e) => setSelectedManagerBom(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="" disabled hidden>담당자 선택</option>
                {managerOptions.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>

            {selectedManagerBom && (
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이름</label>
                <select 
                  value={bomForm.managerName}
                  onChange={(e) => setBomForm({...bomForm, managerName: e.target.value})}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="" disabled hidden>이름 선택</option>
                  {namesByManager[selectedManagerBom]?.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button 
                onClick={handleBomSubmit}
                className="px-8 py-2 bg-[#674529] text-white text-sm rounded hover:bg-[#553821] transition-colors"
              >
                작업 지시서 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderForm;
