import { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    department: '',
    accessLevel: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('사용자 생성:', formData);
  };

  return (
    <div className='mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      {/* 헤더 */}
      <div className='mb-4 flex items-center space-x-2'>
        <Users className='h-5 w-5 text-[#674529]' />
        <h2 className='text-base text-[#674529]'>신규 사용자 등록</h2>
      </div>

      {/* 폼 */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {/* 사용자명 */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            사용자명
          </label>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
            placeholder='사용자명'
            className='w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            이메일
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='email@aniecong.com'
            className='w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
          />
        </div>

        {/* 역할 */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            역할
          </label>
          <select
            name='role'
            value={formData.role}
            onChange={handleInputChange}
            className='w-full rounded bg-gray-100 py-2 pl-3 pr-8 text-sm text-gray-500 focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
          >
            <option value=''>역할 선택</option>
            <option value='관리자'>관리자</option>
            <option value='팀장'>팀장</option>
            <option value='작업자'>작업자</option>
          </select>
        </div>

        {/* 부서 */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            부서
          </label>
          <select
            name='department'
            value={formData.department}
            onChange={handleInputChange}
            className='w-full rounded bg-gray-100 py-2 pl-3 pr-8 text-sm text-gray-500 focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
          >
            <option value=''>부서 선택</option>
            <option value='관리부'>관리</option>
            <option value='생산부'>생산</option>
            <option value='품질부'>경영지원</option>
            <option value='제조'>제조</option>
          </select>
        </div>

        {/* 담당 공장 */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            담당 공장
          </label>
          <select
            name='accessLevel'
            value={formData.accessLevel}
            onChange={handleInputChange}
            className='w-full rounded bg-gray-100 py-2 pl-3 pr-8 text-sm text-gray-500 focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
          >
            <option value=''>공장 선택</option>
            <option value='ALL'>ALL</option>
            <option value='P1'>P1</option>
            <option value='P2'>P2</option>
          </select>
        </div>

        {/* 비밀번호 */}
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            비밀번호
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='비밀번호'
            className='w-full rounded bg-gray-100 px-3 py-2 text-sm focus:border-[#674529] focus:outline-none focus:ring-1 focus:ring-[#674529]'
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className='mt-4 flex justify-end'>
        <button
          onClick={handleSubmit}
          className='flex items-center space-x-2 rounded bg-[#674529] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#543620]'
        >
          <UserPlus className='h-4 w-4' />
          <span>사용자 생성</span>
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
