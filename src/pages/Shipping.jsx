const Shipping = ({ subPage }) => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-800'>배송관리</h1>
      <div className='mt-4'>
        <p className='text-gray-600'>현재 페이지: {subPage}</p>
      </div>
    </div>
  );
};

export default Shipping;