const InventoryTabSelector = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'status', name: '재고 현황' },
    { id: 'tracking', name: '이력 추적' },
    { id: 'dashboard', name: '분석 대시보드' }
  ];

  return (
    <div className="flex space-x-0 mb-6 bg-[#E8E8E8] rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-6 py-2.5 rounded-md font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-white text-[#674529] shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-[#674529]'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default InventoryTabSelector;
