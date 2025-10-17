import { Thermometer, X, Plus } from 'lucide-react';
import { useState } from 'react';

const StorageTemperature = () => {
  const [storageConditions, setStorageConditions] = useState([
    {
      id: 1,
      title: '상온 보관',
      temperature: '15°C - 25°C',
      humidity: '40% - 60%',
      items: ['건조 식료', '포장재'],
    },
    {
      id: 2,
      title: '냉장 보관',
      temperature: '0°C - 4°C',
      humidity: '85% - 95%',
      items: ['신선 육류', '야채류', '반제품'],
    },
    {
      id: 3,
      title: '냉동 보관',
      temperature: '-18°C 이하',
      humidity: 'N/A',
      items: ['완제품', '냉동 육류'],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStorageId, setCurrentStorageId] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = (storageId) => {
    setCurrentStorageId(storageId);
    setIsModalOpen(true);
    setNewItem('');
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStorageId(null);
    setNewItem('');
    setError('');
  };

  const handleAddItem = () => {
    if (!newItem.trim()) {
      setError('품목명을 입력해주세요');
      return;
    }

    setStorageConditions((prev) =>
      prev.map((storage) =>
        storage.id === currentStorageId
          ? { ...storage, items: [...storage.items, newItem.trim()] }
          : storage
      )
    );

    handleCloseModal();
  };

  const handleRemoveItem = (storageId, itemIndex) => {
    setStorageConditions((prev) =>
      prev.map((storage) =>
        storage.id === storageId
          ? {
              ...storage,
              items: storage.items.filter((_, index) => index !== itemIndex),
            }
          : storage
      )
    );
  };

  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {storageConditions.map((storage) => (
          <div key={storage.id} className='rounded-xl bg-white p-6 shadow-sm'>
            <div className='mb-4 flex items-center gap-2'>
              <Thermometer className='h-5 w-5 text-[#674529]' />
              <h2 className='text-base text-[#674529]'>{storage.title}</h2>
            </div>

            <div className='space-y-4'>
              {/* 온도 범위 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  온도 범위
                </label>
                <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
                  {storage.temperature}
                </div>
              </div>

              {/* 습도 범위 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  습도 범위
                </label>
                <div className='rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900'>
                  {storage.humidity}
                </div>
              </div>

              {/* 적용 품목 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  적용 품목
                </label>
                <div className='flex flex-wrap items-center gap-2'>
                  {storage.items.map((item, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700'
                    >
                      {item}
                      <X
                        className='h-3 w-3 cursor-pointer hover:opacity-80'
                        onClick={() => handleRemoveItem(storage.id, index)}
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => handleOpenModal(storage.id)}
                    className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300'
                    aria-label='품목 추가'
                  >
                    <Plus className='h-4 w-4 text-gray-600' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 품목 추가 모달 */}
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
                <h3 className='text-lg font-semibold text-[#674529]'>품목 추가</h3>
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
                  품목명
                </label>
                <input
                  type='text'
                  value={newItem}
                  onChange={(e) => {
                    setNewItem(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder='품목명을 입력하세요'
                  className={`w-full rounded-xl border ${
                    error ? 'border-red-300' : 'border-gray-100'
                  } bg-gray-100 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-[#674529] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#674529]/20`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddItem();
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
                  onClick={handleAddItem}
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

export default StorageTemperature;
