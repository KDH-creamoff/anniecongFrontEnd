import { useState } from 'react';
import ShippingB2B from '../components/shipping/ShippingB2B';
import ShippingB2C from '../components/shipping/ShippingB2C';
import ShippingList from '../components/shipping/ShippingList';
import { Box } from 'lucide-react';

const Shipping = () => {
  const [activeTab, setActiveTab] = useState('B2C');
  const [selectedPlatform, setSelectedPlatform] = useState({
    B2C: {
      자사몰: { 미완료: false, 완료: false },
      구몬: { 미완료: false, 완료: false },
      스마트스토어: { 미완료: false, 완료: false }
    },
    B2B: {
      자사몰: { 선택: false }
    }
  });

  const handlePlatformSelect = (tab, platform, status) => {
    setSelectedPlatform(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [platform]: {
          ...prev[tab][platform],
          [status]: !prev[tab][platform][status]
        }
      }
    }));
  };

  return (
    <div>
      <div className='flex items-center space-x-2 mb-6'>
        <Box className='text-[#674529]' />
        <div className='text-xl text-[#674529] font-semibold'>배송 관리</div>
      </div>
      {/* Tab Navigation - matching first image style */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl grid grid-cols-2">
        <button
          onClick={() => setActiveTab('B2B')}
          className={`px-8 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'B2B'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          B2B 출고
        </button>
        <button
          onClick={() => setActiveTab('B2C')}
          className={`px-8 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'B2C'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          B2C 출고
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'B2B' && (
        <ShippingB2B
          selectedPlatform={selectedPlatform}
          onPlatformSelect={handlePlatformSelect}
        />
      )}

      {activeTab === 'B2C' && (
        <ShippingB2C
          selectedPlatform={selectedPlatform}
          onPlatformSelect={handlePlatformSelect}
        />
      )}
    </div>
  );
};

export default Shipping;