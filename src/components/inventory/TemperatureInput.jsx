import { useState, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTemperature } from '../../store/modules/inventory/actions';
import { selectCurrentUser } from '../../store/modules/auth/selectors';


const TemperatureInput = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    hour: '00',
    minute: '00',
    storageType: '',
    temperature: '',
    inspector: currentUser?.name || '',
  });

  const storageTypes = ['냉장고', '냉동고', '상온'];

  // 로그인한 사용자 정보로 검수자 설정
  useEffect(() => {
    if (currentUser?.name) {
      setFilters(prev => ({
        ...prev,
        inspector: currentUser.name
      }));
    }
  }, [currentUser]);

  // 시간 옵션
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  // 분 옵션
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, '0')
  );

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleRegister = () => {
    // 필수 값 검증
    if (!filters.temperature || !filters.storageType) {
      alert('온도와 보관 유형을 입력해주세요.');
      return;
    }

    // recordedAt: 선택한 날짜 + 시간 조합 (ISO DateTime)
    const recordedAt = `${filters.date}T${filters.hour}:${filters.minute}:00`;

    // 백엔드 API 형식에 맞게 데이터 구성
    // POST /api/temperatures
    // { factoryId, location?, celsius, recordedAt?, deviceId?, note? }
    const data = {
      factoryId: 1, // TODO: 실제 공장 ID로 변경 필요 (로그인 사용자의 공장 또는 선택된 공장)
      location: filters.storageType, // 냉장고, 냉동고, 상온
      celsius: parseFloat(filters.temperature),
      recordedAt: recordedAt,
      note: filters.inspector ? `검수자: ${filters.inspector}` : undefined,
    };

    dispatch(updateTemperature.request(data));

    setFilters({
      date: new Date().toISOString().split('T')[0],
      hour: '00',
      minute: '00',
      storageType: filters.storageType,
      temperature: '',
      inspector: currentUser?.name || '',
    });
  };

  return (
    <div className='mb-6 rounded-xl bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center space-x-2'>
        <Filter className='h-5 w-5 text-[#674529]' />
        <h3 className='text-lg text-[#674529]'>온도 등록</h3>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-6'>
        {/* 날짜 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            날짜
          </label>
          <input
            type='date'
            value={filters.date}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className='w-full cursor-pointer rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
          />
        </div>

        {/* 시간 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            시간
          </label>
          <div className='flex items-center space-x-1'>
            <div className='relative flex-1'>
              <select
                value={filters.hour}
                onChange={(e) => handleFilterChange('hour', e.target.value)}
                className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
            </div>
            <span className='text-[#000]'>:</span>
            <div className='relative flex-1'>
              <select
                value={filters.minute}
                onChange={(e) => handleFilterChange('minute', e.target.value)}
                className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
            </div>
          </div>
        </div>

        {/* 보관 유형 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            보관 유형
          </label>
          <div className='relative'>
            <select
              value={filters.storageType}
              onChange={(e) => handleFilterChange('storageType', e.target.value)}
              className='w-full cursor-pointer appearance-none rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] outline-none transition-all'
            >
              <option value="" disabled hidden>보관 유형 선택</option>
              {storageTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
          </div>
        </div>

        {/* 온도 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            온도
          </label>
          <input
            type='number'
            value={filters.temperature}
            onChange={(e) => handleFilterChange('temperature', e.target.value)}
            placeholder='온도 입력'
            className='w-full rounded-xl border-0 bg-[#f3f3f5] px-4 py-2.5 text-[#000] placeholder-gray-400 outline-none transition-all'
          />
        </div>

        {/* 검수자 */}
        <div>
          <label className='mb-2 block text-sm font-medium text-[#000]'>
            검수자
          </label>
          <input
            type='text'
            value={filters.inspector}
            readOnly
            placeholder='검수자'
            className='w-full rounded-xl border-0 bg-gray-100 px-4 py-2.5 text-[#000] placeholder-gray-400 outline-none cursor-not-allowed'
          />
        </div>

        {/* 초기화 버튼 */}
        <div className='flex items-end'>
          <button
            onClick={handleRegister}
            className='w-full rounded-xl border border-gray-300 bg-white px-6 py-2.5 font-medium text-[#000] transition-colors hover:bg-gray-50'
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemperatureInput;