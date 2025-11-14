import { useState } from 'react';
import { Package } from 'lucide-react';
import BasicTabSelector from '../components/basic/BasicTabSelector';
import BasicNewItem from '../components/basic/BasicNewItem';
import BasicItemList from '../components/basic/BasicItemList';
import BOMManagement from '../components/basic/BOMManagement';
import StorageTemperature from '../components/basic/StorageTemperature';
import FactoryInfo from '../components/basic/FactoryInfo';

const Basic = () => {
  const [activeTab, setActiveTab] = useState('items');

  const renderContent = () => {
    switch (activeTab) {
      case 'items':
        return (
          <>
            <BasicNewItem />
            <BasicItemList />
          </>
        );
      case 'processes':
        return (
          <>
            <FactoryInfo />
          </>
        );
      case 'bom':
        return (
          <>
            <BOMManagement />
          </>
        );
      case 'storage':
        return (
          <>
            <StorageTemperature />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className='mb-6'>
        <div className='mb-1 flex items-center space-x-2'>
          <Package className='h-5 w-5 text-[#674529]' />
          <h1 className='text-lg font-semibold text-[#674529]'>
            기초정보 설정
          </h1>
        </div>
      </div>

      {/* 탭 선택 */}
      <BasicTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 컨텐츠 */}
      {renderContent()}
    </div>
  );
};

export default Basic;
