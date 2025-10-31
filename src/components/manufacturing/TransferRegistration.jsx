import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { items } from '../../data/items';

const TransferRegistration = () => {
  const [formData, setFormData] = useState({
    departureLocation: '1공장',
    arrivalLocation: '2공장',
    transportMethod: '트럭',
    recipient: '',
    rawMaterials: [{ code: '', name: '', quantity: '' }]
  });

  const [availableProducts, setAvailableProducts] = useState([
    { expiry: 'D-5', deadline: '2025-10-10', quantity: '100 kg' },
    { expiry: 'D-8', deadline: '2025-10-21', quantity: '150 kg' },
  ]);

  const handleAddRawMaterial = () => {
    setFormData({
      ...formData,
      rawMaterials: [...formData.rawMaterials, { code: '', name: '', quantity: '' }]
    });
  };

  const handleRemoveRawMaterial = (index) => {
    const newRawMaterials = formData.rawMaterials.filter((_, i) => i !== index);
    setFormData({ ...formData, rawMaterials: newRawMaterials });
  };

  const handleRawMaterialChange = (index, field, value) => {
    const newRawMaterials = [...formData.rawMaterials];
    newRawMaterials[index][field] = value;

    // 품목명이 변경되면 자동으로 품목코드 설정
    if (field === 'name') {
      const item = items.find((item) => item.name === value);
      if (item) {
        newRawMaterials[index]['code'] = item.code;
      }
    }

    setFormData({ ...formData, rawMaterials: newRawMaterials });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-[#674529]">신규이송등록</h3>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">출발장소</label>
              <select
                value={formData.departureLocation}
                onChange={(e) => setFormData({ ...formData, departureLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#674529]"
              >
                <option value="1공장">1공장</option>
                <option value="2공장">2공장</option>
                <option value="1창고">1창고</option>
                <option value="2창고">2창고</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">도착장소</label>
              <select
                value={formData.arrivalLocation}
                onChange={(e) => setFormData({ ...formData, arrivalLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#674529]"
              >
                <option value="1공장">1공장</option>
                <option value="2공장">2공장</option>
                <option value="1창고">1창고</option>
                <option value="2창고">2창고</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">운송방식</label>
              <select
                value={formData.transportMethod}
                onChange={(e) => setFormData({ ...formData, transportMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#674529]"
              >
                <option value="트럭">트럭</option>
                <option value="팔레트">팔레트</option>
                <option value="박스">박스</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">수령자명</label>
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                placeholder="수령자명 입력"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#674529]"
              />
            </div>
          </div>
        </div>

        {/* 이송품목과 출고가능품목 수평정렬 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 이송품목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이송품목</label>
            {formData.rawMaterials.map((material, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={material.code}
                  readOnly
                  placeholder="품목코드"
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                />
                <select
                  value={material.name}
                  onChange={(e) => handleRawMaterialChange(index, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#674529] text-sm"
                >
                  <option value="">품목명 선택</option>
                  {items.map((item) => (
                    <option key={item.code} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={material.quantity}
                  onChange={(e) => handleRawMaterialChange(index, 'quantity', e.target.value)}
                  placeholder="수량"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#674529] text-sm"
                />
                <button
                  onClick={handleAddRawMaterial}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                {formData.rawMaterials.length > 1 && (
                  <button
                    onClick={() => handleRemoveRawMaterial(index)}
                    className="w-8 h-8 flex items-center justify-center bg-white border border-red-300 rounded-full hover:bg-red-50"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            ))}
            <button className="w-full px-3 py-2 bg-[#674529] text-white rounded-md mt-2 hover:bg-[#533820]">
              이송등록
            </button>
          </div>

          {/* 출고가능품목 */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">출고가능품목</h4>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-700">유통기간</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-700">입고날짜</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-700">수량</th>
                </tr>
              </thead>
              <tbody>
                {availableProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-2 px-3 text-xs">{product.expiry}</td>
                    <td className="py-2 px-3 text-xs">{product.deadline}</td>
                    <td className="py-2 px-3 text-xs">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferRegistration;
