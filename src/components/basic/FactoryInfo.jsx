import { Factory, X, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFactories, updateFactory } from '../../store/modules/basic/actions';
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

  // 컴포넌트 마운트 시 공장 목록 조회
  useEffect(() => {
    dispatch(fetchFactories.request());
  }, [dispatch]);

  // 공장 정보 업데이트 성공 시 목록 다시 조회
  useEffect(() => {
    if (factoryOperation) {
      dispatch(fetchFactories.request());
    }
  }, [factoryOperation, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFactoryId, setCurrentFactoryId] = useState(null);
  const [newProcess, setNewProcess] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = (factoryId) => {
    setCurrentFactoryId(factoryId);
    setIsModalOpen(true);
    setNewProcess('');
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFactoryId(null);
    setNewProcess('');
    setError('');
  };

  const handleAddProcess = () => {
    if (!newProcess.trim()) {
      setError('공정명을 입력해주세요');
      return;
    }

    // 현재 공장 찾기
    const currentFactory = factories.find((f) => f.id === currentFactoryId);
    if (currentFactory) {
      const updatedFactory = {
        ...currentFactory,
        processes: [...currentFactory.processes, newProcess.trim()],
      };

      // 리덕스 액션 dispatch
      dispatch(updateFactory.request({
        id: currentFactoryId,
        data: updatedFactory,
      }));
    }

    handleCloseModal();
  };

  const handleRemoveProcess = (factoryId, processIndex) => {
    // 해당 공장 찾기
    const currentFactory = factories.find((f) => f.id === factoryId);
    if (currentFactory) {
      const updatedFactory = {
        ...currentFactory,
        processes: currentFactory.processes.filter((_, index) => index !== processIndex),
      };

      // 리덕스 액션 dispatch
      dispatch(updateFactory.request({
        id: factoryId,
        data: updatedFactory,
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
        {factories.map((factory) => (
          <div key={factory.id} className='rounded-xl bg-white p-6 shadow-sm'>
            <div className='mb-6 flex items-center gap-2'>
              <Factory className='h-5 w-5 text-[#674529]' />
              <h2 className='text-base text-[#674529]'>
                {factory.id === 1 ? '1공장 (전처리)' : '2공장 (제조)'}
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
                  value={factory.address}
                  readOnly
                  className='w-full rounded-xl bg-gray-100 px-4 py-2.5 text-gray-900'
                />
              </div>

              {/* 담당 공정 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  담당 공정
                </label>
                <div className='flex flex-wrap items-center gap-2'>
                  {factory.processes.map((process, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                        factory.id === 1
                          ? 'bg-[#a3c478] text-[#fff]'
                          : 'bg-[#f9b679] text-[#fff]'
                      }`}
                    >
                      {process}
                      <X
                        className='h-3 w-3 cursor-pointer hover:opacity-80'
                        onClick={() => handleRemoveProcess(factory.id, index)}
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => handleOpenModal(factory.id)}
                    className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                    aria-label='공정 추가'
                  >
                    <Plus className='h-4 w-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
                  공정명
                </label>
                <input
                  type='text'
                  value={newProcess}
                  onChange={(e) => {
                    setNewProcess(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder='공정명을 입력하세요'
                  className={`w-full rounded-xl border ${
                    error ? 'border-red-300' : 'border-gray-100'
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddProcess();
                  }}
                />
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
        </div>
      )}
    </>
  );
};

export default FactoryInfo;