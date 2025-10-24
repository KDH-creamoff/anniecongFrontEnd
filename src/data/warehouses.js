// 창고 마스터 데이터
export const warehouses = [
  {
    code: 'P1-RM',
    name: '원재료 창고',
    location: 'P1',
    type: '원재료',
  },
  {
    code: 'P2-WIP',
    name: '반제품 창고',
    location: 'P2',
    type: 'WIP',
  },
  {
    code: 'P2-FG',
    name: '완제품 창고',
    location: 'P2',
    type: '완제품',
  },
];

// 창고 코드로 창고 정보 찾기
export const getWarehouseByCode = (code) => {
  return warehouses.find((warehouse) => warehouse.code === code);
};
