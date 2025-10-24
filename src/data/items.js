// 품목 마스터 데이터
export const items = [
  {
    code: 'RAW001',
    name: '닭고기 (가슴살)',
    category: '원재료',
    unit: 'Kg',
    supplier: '신선식품',
  },
  {
    code: 'RAW002',
    name: '소고기(등심)',
    category: '원재료',
    unit: 'Kg',
    supplier: '프리미엄육가공',
  },
  {
    code: 'RAW003',
    name: '당근',
    category: '원재료',
    unit: 'Kg',
    supplier: '유기농산물',
  },
  {
    code: 'RAW004',
    name: '고구마',
    category: '원재료',
    unit: 'Kg',
    supplier: '유기농산물',
  },
  {
    code: 'RAW005',
    name: '쌀가루',
    category: '원재료',
    unit: 'Kg',
    supplier: '제분공장',
  },
  {
    code: 'WIP001',
    name: '전처리 믹스 A',
    category: 'WIP',
    unit: 'Kg',
    supplier: '내부생산',
  },
  {
    code: 'WIP002',
    name: '전처리 믹스 B',
    category: 'WIP',
    unit: 'Kg',
    supplier: '내부생산',
  },
  {
    code: 'FG001',
    name: '애니콩 펫베이커리 A',
    category: '완제품',
    unit: 'ea',
    supplier: '내부생산',
  },
  {
    code: 'FG002',
    name: '애니콩 펫베이커리 B',
    category: '완제품',
    unit: 'ea',
    supplier: '내부생산',
  },
];

// 품목 코드로 품목 정보 찾기
export const getItemByCode = (code) => {
  return items.find((item) => item.code === code);
};

// 품목명으로 품목 정보 찾기
export const getItemByName = (name) => {
  return items.find((item) => item.name === name);
};

// 카테고리별 품목 필터링
export const getItemsByCategory = (category) => {
  if (category === '전체') return items;
  return items.filter((item) => item.category === category);
};
