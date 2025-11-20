import { Factory, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFactories, fetchProcesses, addFactoryProcesses, removeFactoryProcess } from '../../store/modules/basic/actions';
import {
  selectFactories,
  selectFactoriesLoading,
  selectFactoryOperation,
} from '../../store/modules/basic/selectors';

const FactoryInfo = () => {
  const dispatch = useDispatch();

  // 리덕스 스토어에서 공장 데이터 가져오기 (셀렉터 사용)
  const factories = useSelector(selectFactories);
  const loading = useSelector(selectFactoriesLoading);
  const factoryOperation = useSelector(selectFactoryOperation);
  const processes = useSelector((state) => state.basic.processes.data || []);
  const processesLoading = useSelector((state) => state.basic.processes.loading);
  const factoryProcessOperation = useSelector((state) => state.basic.factoryProcessOperation);

  // 컴포넌트 마운트 시 공장 목록 및 프로세스 목록 조회
  useEffect(() => {
    dispatch(fetchFactories.request());
    dispatch(fetchProcesses.request());
  }, [dispatch]);

  // 공정 추가/제거 성공 시 목록 다시 조회
  useEffect(() => {
    if (factoryProcessOperation?.data) {
      dispatch(fetchFactories.request());
    }
  }, [factoryProcessOperation, dispatch]);

  // 공정 제거 성공 시 목록 다시 조회
  const removeProcessOperation = useSelector((state) => state.basic.removeFactoryProcess);
  useEffect(() => {
    if (removeProcessOperation?.data) {
      dispatch(fetchFactories.request());
    }
  }, [removeProcessOperation, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFactoryId, setCurrentFactoryId] = useState(null);
  const [selectedProcessIds, setSelectedProcessIds] = useState([]);
  const [processNamesInput, setProcessNamesInput] = useState('');
  const [useProcessNames, setUseProcessNames] = useState(true); // 공정 이름 입력 방식 기본값
  const [error, setError] = useState('');

  const handleOpenModal = (factoryId) => {
    setCurrentFactoryId(factoryId);
    setIsModalOpen(true);
    setSelectedProcessIds([]);
    setProcessNamesInput('');
    setUseProcessNames(true);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFactoryId(null);
    setSelectedProcessIds([]);
    setProcessNamesInput('');
    setUseProcessNames(true);
    setError('');
  };

  const handleProcessToggle = (processId) => {
    setSelectedProcessIds((prev) => {
      if (prev.includes(processId)) {
        return prev.filter((id) => id !== processId);
      } else {
        return [...prev, processId];
      }
    });
  };

  const handleAddProcess = () => {
    if (useProcessNames) {
      // 공정 이름 입력 방식
      if (!processNamesInput.trim()) {
        setError('공정 이름을 입력해주세요');
        return;
      }

      // 쉼표로 구분된 공정 이름들을 배열로 변환
      const processNames = processNamesInput
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0);

      if (processNames.length === 0) {
        setError('공정 이름을 입력해주세요');
        return;
      }

      // Redux Saga 액션 dispatch (processNames 사용)
      dispatch(addFactoryProcesses.request({
        factoryId: currentFactoryId,
        processNames: processNames,
      }));
    } else {
      // 기존 방식: 공정 ID 선택
      if (selectedProcessIds.length === 0) {
        setError('공정을 선택해주세요');
        return;
      }

      // 현재 공장의 기존 공정 ID 가져오기
      const currentFactory = factories.find((f) => f.id === currentFactoryId);
      if (currentFactory) {
        const currentProcesses = Array.isArray(currentFactory.processes)
          ? currentFactory.processes
          : Array.isArray(currentFactory.Processes)
            ? currentFactory.Processes
            : [];

        // 기존 공정 ID 추출
        const existingProcessIds = currentProcesses
          .map((p) => (typeof p === 'object' ? p.id : null))
          .filter((id) => id != null);

        // 이미 추가된 공정 제외
        const newProcessIds = selectedProcessIds.filter((id) => !existingProcessIds.includes(id));

        if (newProcessIds.length === 0) {
          setError('이미 추가된 공정입니다');
          return;
        }

        // Redux Saga 액션 dispatch (processIds 사용)
        dispatch(addFactoryProcesses.request({
          factoryId: currentFactoryId,
          processIds: newProcessIds,
        }));
      }
    }

    handleCloseModal();
  };

  const handleRemoveProcess = (factoryId, processId) => {
    if (!processId) {
      console.warn('공정 ID가 없습니다.');
      return;
    }

    if (window.confirm('공정을 제거하시겠습니까?')) {
      // Redux Saga 액션 dispatch
      dispatch(removeFactoryProcess.request({
        factoryId: factoryId,
        processId: processId,
      }));
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='p-4 text-center text-sm text-gray-600'>불러오는 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {factories.map((factory, index) => {
          console.log("index : ", index);
          console.log("factory.name : ", typeof factory.name);
          return ( 
            <>
                   <div key={factory.id} className='rounded-xl bg-white p-6 shadow-sm'>
            <div className='mb-6 flex items-center gap-2'>
              <Factory className='h-5 w-5 text-[#674529]' />
              <h2 className='text-base text-[#674529]'>
                {factory.name}
              </h2>
            </div>

            <div className='space-y-4'>

              {/* 주소 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  주소
                </label>
                <input
                  type='text'
                  value={factory.address || factory.Address?.address || ''}
                  readOnly
                  className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900'
                />
              </div>

              {/* 담당 공정 */}
              {
                factory.name.includes("공장") && (   <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  담당 공정
                </label>
                <div className='flex flex-wrap items-center gap-2'>
                  {(Array.isArray(factory.processes) ? factory.processes : factory.Processes || []).map((process, index) => {
                    // process가 객체인 경우 name 또는 processName 추출
                    const processId = typeof process === 'object' ? process.id : null;
                    const processName = typeof process === 'string'
                      ? process
                      : process?.name || process?.processName || process?.Name || '';

                    return (
                      <span
                        key={processId || index}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${factory.id === 1
                            ? 'bg-[#a3c478] text-[#fff]'
                            : 'bg-[#f9b679] text-[#fff]'
                          }`}
                      >
                        {processName}
                        <X
                          className='h-3 w-3 cursor-pointer hover:opacity-80'
                          onClick={() => handleRemoveProcess(factory.id, processId || index)}
                        />
                      </span>
                    );
                  })}
                  <button
                    onClick={() => handleOpenModal(factory.id)}
                    className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                    aria-label='공정 추가'
                  >
                    <Plus className='h-4 w-4 text-gray-600' />
                  </button>
                </div>
              </div>)
              }
           
            </div>
          </div>
            </>
          )
   
})}
      </div>

      {/* 공정 추가 모달 */}
      {isModalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
          onClick={handleCloseModal}
        >
          <div
            className='w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Plus className='h-5 w-5 text-[#674529]' />
                <h3 className='text-lg font-semibold text-[#674529]'>공정 추가</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className='rounded-lg p-1 transition-colors hover:bg-gray-100'
                aria-label='닫기'
              >
                <X className='h-5 w-5 text-gray-500' />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  공정 이름 (쉼표로 구분)
                </label>
                <input
                  type='text'
                  value={processNamesInput}
                  onChange={(e) => {
                    setProcessNamesInput(e.target.value);
                    setError('');
                  }}
                  placeholder='예: 전처리, 혼합, 포장'
                  className='w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#674529] focus:outline-none focus:ring-2 focus:ring-[#674529] mb-5'
                />
                {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
              </div>
              {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
            </div>

            <div className='flex gap-3'>
              <button
                onClick={handleCloseModal}
                className='flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95'
              >
                취소
              </button>
              <button
                onClick={handleAddProcess}
                className='flex-1 rounded-xl bg-[#674529] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#553821] hover:shadow-md active:scale-95'
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FactoryInfo;