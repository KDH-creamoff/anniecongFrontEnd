import { X } from 'lucide-react';
import { useState } from 'react';
import { items, getItemByName } from '../../data/items';

const AddReceivingModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemCode: '',
    unit: '',
    expectedQuantity: '',
    expectedDate: new Date().toISOString().split('T')[0],
  });

  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    const selectedItem = getItemByName(selectedItemName);

    if (selectedItem) {
      setFormData((prev) => ({
        ...prev,
        itemName: selectedItem.name,
        itemCode: selectedItem.code,
        unit: selectedItem.unit,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        itemName: '',
        itemCode: '',
        unit: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // 폼 초기화
    setFormData({
      itemName: '',
      itemCode: '',
      unit: '',
      expectedQuantity: '',
      expectedDate: new Date().toISOString().split('T')[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-full max-w-2xl rounded-xl bg-white shadow-xl'>
        {/* 모달 헤더 */}
        <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
          <h2 className='text-lg font-semibold text-[#674529]'>
            입고 목록 추가
          </h2>
          <button
            onClick={onClose}
            className='rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* 모달 본문 */}
        <form onSubmit={handleSubmit}>
          <div className='max-h-[70vh] overflow-y-auto px-6 py-4'>
            <div className='grid gap-4'>
              {/* 품목명 선택 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  품목명 <span className='text-red-500'>*</span>
                </label>
                <select
                  name='itemName'
                  value={formData.itemName}
                  onChange={handleItemChange}
                  required
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                >
                  <option value='' disabled hidden>품목을 선택하세요</option>
                  {items.map((item) => (
                    <option key={item.code} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 품목코드 (자동 표시) */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  품목코드
                </label>
                <input
                  type='text'
                  value={formData.itemCode}
                  readOnly
                  className='w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600'
                  placeholder=''
                />
              </div>

              {/* 주문량 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  주문량 <span className='text-red-500'>*</span>
                </label>
                <div className='flex space-x-2'>
                  <input
                    type='number'
                    name='expectedQuantity'
                    value={formData.expectedQuantity}
                    onChange={handleChange}
                    required
                    className='flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                    placeholder='50'
                  />
                  <input
                    type='text'
                    value={formData.unit}
                    readOnly
                    className='w-16 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-center text-sm text-gray-600'
                    placeholder='단위'
                  />
                </div>
              </div>

              {/* 입고예정일 */}
              <div>
                <label className='mb-1 block text-sm font-medium text-gray-700'>
                  입고예정일 <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='expectedDate'
                  value={formData.expectedDate}
                  onChange={handleChange}
                  required
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
                />
              </div>
            </div>
          </div>

          {/* 모달 푸터 */}
          <div className='flex items-center justify-end space-x-3 border-t border-gray-200 px-6 py-4'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'
            >
              취소
            </button>
            <button
              type='submit'
              className='rounded-lg bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#553821]'
            >
              대기 목록 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReceivingModal;
