import React, { useState } from 'react';
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  X,
} from 'lucide-react';

const BOMManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 원재료 마스터 데이터 (원재료명과 코드 매핑)
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

  const [bomData, setBomData] = useState([
    {
      id: 1,
      code: 'RAW023',
      name: '파프리카(빨강)',
      amount: 45,
      unitAmount: '45g/ea',
      isEditing: false,
    },
    {
      id: 2,
      code: 'RAW015',
      name: '돼지고기(삼겹살)',
      amount: 200,
      unitAmount: '200g/ea',
      isEditing: false,
    },
    {
      id: 3,
      code: 'RAW007',
      name: '생강',
      amount: 15,
      unitAmount: '15g/ea',
      isEditing: false,
    },
    {
      id: 4,
      code: 'RAW029',
      name: '숙주',
      amount: 60,
      unitAmount: '60g/ea',
      isEditing: false,
    },
    {
      id: 5,
      code: 'RAW011',
      name: '소금',
      amount: 8,
      unitAmount: '8g/ea',
      isEditing: false,
    },
    {
      id: 6,
      code: 'RAW004',
      name: '감자',
      amount: 100,
      unitAmount: '100g/ea',
      isEditing: false,
    },
    {
      id: 7,
      code: 'RAW018',
      name: '배추',
      amount: 120,
      unitAmount: '120g/ea',
      isEditing: false,
    },
    {
      id: 8,
      code: 'RAW026',
      name: '양배추',
      amount: 80,
      unitAmount: '80g/ea',
      isEditing: false,
    },
    {
      id: 9,
      code: 'RAW001',
      name: '닭고기(가슴살)',
      amount: 150,
      unitAmount: '150g/ea',
      isEditing: false,
    },
    {
      id: 10,
      code: 'RAW013',
      name: '고춧가루',
      amount: 12,
      unitAmount: '12g/ea',
      isEditing: false,
    },
    {
      id: 11,
      code: 'RAW021',
      name: '버섯(표고)',
      amount: 35,
      unitAmount: '35g/ea',
      isEditing: false,
    },
    {
      id: 12,
      code: 'RAW006',
      name: '마늘',
      amount: 20,
      unitAmount: '20g/ea',
      isEditing: false,
    },
    {
      id: 13,
      code: 'RAW030',
      name: '콩나물',
      amount: 70,
      unitAmount: '70g/ea',
      isEditing: false,
    },
    {
      id: 14,
      code: 'RAW016',
      name: '소고기(불고기용)',
      amount: 180,
      unitAmount: '180g/ea',
      isEditing: false,
    },
    {
      id: 15,
      code: 'RAW024',
      name: '파프리카(노랑)',
      amount: 45,
      unitAmount: '45g/ea',
      isEditing: false,
    },
    {
      id: 16,
      code: 'RAW009',
      name: '설탕',
      amount: 25,
      unitAmount: '25g/ea',
      isEditing: false,
    },
    {
      id: 17,
      code: 'RAW019',
      name: '무',
      amount: 90,
      unitAmount: '90g/ea',
      isEditing: false,
    },
    {
      id: 18,
      code: 'RAW027',
      name: '청경채',
      amount: 55,
      unitAmount: '55g/ea',
      isEditing: false,
    },
    {
      id: 19,
      code: 'RAW003',
      name: '양파',
      amount: 80,
      unitAmount: '80g/ea',
      isEditing: false,
    },
    {
      id: 20,
      code: 'RAW014',
      name: '식용유',
      amount: 30,
      unitAmount: '30ml/ea',
      isEditing: false,
    },
    {
      id: 21,
      code: 'RAW022',
      name: '버섯(양송이)',
      amount: 40,
      unitAmount: '40g/ea',
      isEditing: false,
    },
    {
      id: 22,
      code: 'RAW008',
      name: '간장',
      amount: 40,
      unitAmount: '40ml/ea',
      isEditing: false,
    },
    {
      id: 23,
      code: 'RAW025',
      name: '브로콜리',
      amount: 65,
      unitAmount: '65g/ea',
      isEditing: false,
    },
    {
      id: 24,
      code: 'RAW017',
      name: '두부',
      amount: 100,
      unitAmount: '100g/ea',
      isEditing: false,
    },
    {
      id: 25,
      code: 'RAW005',
      name: '대파',
      amount: 30,
      unitAmount: '30g/ea',
      isEditing: false,
    },
    {
      id: 26,
      code: 'RAW028',
      name: '시금치',
      amount: 50,
      unitAmount: '50g/ea',
      isEditing: false,
    },
    {
      id: 27,
      code: 'RAW012',
      name: '후추',
      amount: 5,
      unitAmount: '5g/ea',
      isEditing: false,
    },
    {
      id: 28,
      code: 'RAW002',
      name: '당근',
      amount: 50,
      unitAmount: '50g/ea',
      isEditing: false,
    },
    {
      id: 29,
      code: 'RAW020',
      name: '애호박',
      amount: 75,
      unitAmount: '75g/ea',
      isEditing: false,
    },
    {
      id: 30,
      code: 'RAW010',
      name: '참기름',
      amount: 10,
      unitAmount: '10ml/ea',
      isEditing: false,
    },
    {
      id: 31,
      code: 'RAW016',
      name: '소고기(불고기용)',
      amount: 180,
      unitAmount: '180g/ea',
      isEditing: false,
    },
    {
      id: 32,
      code: 'RAW028',
      name: '시금치',
      amount: 50,
      unitAmount: '50g/ea',
      isEditing: false,
    },
    {
      id: 33,
      code: 'RAW011',
      name: '소금',
      amount: 8,
      unitAmount: '8g/ea',
      isEditing: false,
    },
    {
      id: 34,
      code: 'RAW024',
      name: '파프리카(노랑)',
      amount: 45,
      unitAmount: '45g/ea',
      isEditing: false,
    },
    {
      id: 35,
      code: 'RAW007',
      name: '생강',
      amount: 15,
      unitAmount: '15g/ea',
      isEditing: false,
    },
    {
      id: 36,
      code: 'RAW019',
      name: '무',
      amount: 90,
      unitAmount: '90g/ea',
      isEditing: false,
    },
    {
      id: 37,
      code: 'RAW003',
      name: '양파',
      amount: 80,
      unitAmount: '80g/ea',
      isEditing: false,
    },
    {
      id: 38,
      code: 'RAW025',
      name: '브로콜리',
      amount: 65,
      unitAmount: '65g/ea',
      isEditing: false,
    },
    {
      id: 39,
      code: 'RAW013',
      name: '고춧가루',
      amount: 12,
      unitAmount: '12g/ea',
      isEditing: false,
    },
    {
      id: 40,
      code: 'RAW001',
      name: '닭고기(가슴살)',
      amount: 150,
      unitAmount: '150g/ea',
      isEditing: false,
    },
    {
      id: 41,
      code: 'RAW030',
      name: '콩나물',
      amount: 70,
      unitAmount: '70g/ea',
      isEditing: false,
    },
    {
      id: 42,
      code: 'RAW021',
      name: '버섯(표고)',
      amount: 35,
      unitAmount: '35g/ea',
      isEditing: false,
    },
    {
      id: 43,
      code: 'RAW014',
      name: '식용유',
      amount: 30,
      unitAmount: '30ml/ea',
      isEditing: false,
    },
    {
      id: 44,
      code: 'RAW006',
      name: '마늘',
      amount: 20,
      unitAmount: '20g/ea',
      isEditing: false,
    },
    {
      id: 45,
      code: 'RAW027',
      name: '청경채',
      amount: 55,
      unitAmount: '55g/ea',
      isEditing: false,
    },
    {
      id: 46,
      code: 'RAW018',
      name: '배추',
      amount: 120,
      unitAmount: '120g/ea',
      isEditing: false,
    },
    {
      id: 47,
      code: 'RAW009',
      name: '설탕',
      amount: 25,
      unitAmount: '25g/ea',
      isEditing: false,
    },
    {
      id: 48,
      code: 'RAW022',
      name: '버섯(양송이)',
      amount: 40,
      unitAmount: '40g/ea',
      isEditing: false,
    },
    {
      id: 49,
      code: 'RAW004',
      name: '감자',
      amount: 100,
      unitAmount: '100g/ea',
      isEditing: false,
    },
    {
      id: 50,
      code: 'RAW015',
      name: '돼지고기(삼겹살)',
      amount: 200,
      unitAmount: '200g/ea',
      isEditing: false,
    },
    {
      id: 51,
      code: 'RAW029',
      name: '숙주',
      amount: 60,
      unitAmount: '60g/ea',
      isEditing: false,
    },
    {
      id: 52,
      code: 'RAW010',
      name: '참기름',
      amount: 10,
      unitAmount: '10ml/ea',
      isEditing: false,
    },
    {
      id: 53,
      code: 'RAW023',
      name: '파프리카(빨강)',
      amount: 45,
      unitAmount: '45g/ea',
      isEditing: false,
    },
    {
      id: 54,
      code: 'RAW017',
      name: '두부',
      amount: 100,
      unitAmount: '100g/ea',
      isEditing: false,
    },
    {
      id: 55,
      code: 'RAW008',
      name: '간장',
      amount: 40,
      unitAmount: '40ml/ea',
      isEditing: false,
    },
    {
      id: 56,
      code: 'RAW026',
      name: '양배추',
      amount: 80,
      unitAmount: '80g/ea',
      isEditing: false,
    },
    {
      id: 57,
      code: 'RAW012',
      name: '후추',
      amount: 5,
      unitAmount: '5g/ea',
      isEditing: false,
    },
    {
      id: 58,
      code: 'RAW020',
      name: '애호박',
      amount: 75,
      unitAmount: '75g/ea',
      isEditing: false,
    },
    {
      id: 59,
      code: 'RAW005',
      name: '대파',
      amount: 30,
      unitAmount: '30g/ea',
      isEditing: false,
    },
    {
      id: 60,
      code: 'RAW002',
      name: '당근',
      amount: 50,
      unitAmount: '50g/ea',
      isEditing: false,
    },
  ]);

  const [newItem, setNewItem] = useState(null);

  const totalPages = Math.ceil(bomData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = bomData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    const currentBlock = Math.floor((currentPage - 1) / maxVisible);

    const startPage = currentBlock * maxVisible + 1;

    const endPage = Math.min(startPage + maxVisible - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleDelete = (id) => {
    setBomData(bomData.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    const newId =
      bomData.length > 0 ? Math.max(...bomData.map((item) => item.id)) + 1 : 1;
    setNewItem({
      id: newId,
      code: '',
      name: '',
      amount: '',
      unitAmount: '',
    });
  };

  const handleMaterialChange = (selectedName) => {
    const material = rawMaterialMaster.find((m) => m.name === selectedName);
    if (material && newItem) {
      setNewItem({
        ...newItem,
        code: material.code,
        name: material.name,
      });
    }
  };

  const handleAmountChange = (amount) => {
    const numAmount = parseFloat(amount) || '';
    const unit = 'g';
    setNewItem({
      ...newItem,
      amount: numAmount,
      unitAmount: numAmount ? `${numAmount}${unit}/ea` : '',
    });
  };

  const handleSaveNewItem = () => {
    if (newItem && newItem.code && newItem.name && newItem.amount) {
      setBomData([...bomData, { ...newItem, isEditing: false }]);
      setNewItem(null);
      // 마지막 페이지로 이동
      const newTotalPages = Math.ceil((bomData.length + 1) / itemsPerPage);
      setCurrentPage(newTotalPages);
    }
  };

  const handleCancelNewItem = () => {
    setNewItem(null);
  };

  return (
    <div className='rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center gap-2'>
        <Package className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>
          BOM (Bill of Materials) 관리
        </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                원재료 코드
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                원재료명
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                필요량
              </th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                단위당 소요량
              </th>
              <th className='px-4 py-3 text-center text-sm font-medium text-gray-900'>
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className='border-b border-gray-100'>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.code}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>{item.name}</td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {item.amount}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {item.unitAmount}
                </td>
                <td className='px-4 py-3 text-center'>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='inline-flex items-center justify-center text-red-500 hover:text-red-700'
                  >
                    <Trash2 className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            ))}

            {newItem && (
              <tr className='border-b border-gray-100 bg-white'>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <input
                    type='text'
                    value={newItem.code}
                    readOnly
                    className='w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 text-gray-500 focus:outline-none'
                    placeholder='원재료 선택 시 자동추가'
                  />
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <select
                    value={newItem.name}
                    onChange={(e) => handleMaterialChange(e.target.value)}
                    className='w-full rounded border border-gray-300 px-2 py-1'
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
                    value={newItem.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className='w-full rounded border border-gray-300 px-2 py-1'
                    placeholder='필요량 입력'
                  />
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <input
                    type='text'
                    value={newItem.unitAmount}
                    readOnly
                    className='w-full rounded border border-gray-300 bg-gray-50 px-2 py-1 text-gray-500 focus:outline-none'
                    placeholder='필요량 입력 시 자동계산'
                  />
                </td>
                <td className='px-4 py-3 text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <button
                      onClick={handleCancelNewItem}
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

      <div className='mt-4 flex justify-end'>
        <button
          onClick={newItem !== null ? handleSaveNewItem : handleAddItem}
          className='flex items-center gap-2 rounded-lg bg-[#674529] px-4 py-2 text-sm text-white transition-colors hover:bg-[#553821]'
        >
          <Plus className='h-4 w-4' />
          {newItem !== null ? '추가 완료' : '항목 추가'}
        </button>
      </div>

      <div className='mt-6 flex items-center justify-center gap-2'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='flex h-8 w-8 items-center justify-center rounded bg-[#e1d6c3] text-[#674529] hover:bg-[#d6c7b3] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#e9dfd3]'
        >
          <ChevronLeft className='h-4 w-4' />
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`h-8 w-8 rounded border ${
              currentPage === pageNum
                ? 'border-[#674529] bg-[#674529] text-white'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className='flex h-8 w-8 items-center justify-center rounded bg-[#e1d6c3] text-[#674529] hover:bg-[#d6c7b3] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#e9dfd3]'
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default BOMManagement;
