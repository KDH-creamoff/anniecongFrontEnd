const ApprovalTabSelector = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', name: '전체 문서' },
    { id: 'pending', name: '내 결제 대기' },
    { id: 'draft', name: '내가 제출한 문서' },
  ];

  return (
    <div className='mb-6 flex space-x-0 rounded-xl bg-[#E8E8E8] p-1'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 rounded-xl px-6 py-1 font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-white text-[#000] shadow-sm'
              : 'bg-transparent text-gray-600 hover:text-[#000]'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default ApprovalTabSelector;
