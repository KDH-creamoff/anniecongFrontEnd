import { put, takeLatest, delay } from 'redux-saga/effects';
// ==================== TODO: 백엔드 준비 시 아래 주석 해제 ====================
// import { manufacturingAPI } from '../../../api';
// ===========================================================================
import {
  FETCH_WORK_ORDERS,
  FETCH_WORK_ORDER_BY_ID,
  CREATE_WORK_ORDER,
  UPDATE_WORK_ORDER,
  DELETE_WORK_ORDER,
  UPDATE_WORK_ORDER_STATUS,
  FETCH_MANUFACTURING_HISTORY,
  FETCH_HISTORY_BY_DATE,
  CREATE_MANUFACTURING_RECORD,
  FETCH_TRANSFERS,
  FETCH_TRANSFER_BY_ID,
  CREATE_TRANSFER,
  UPDATE_TRANSFER_STATUS,
  CANCEL_TRANSFER,
  FETCH_AVAILABLE_PRODUCTS,
  FETCH_FACTORY2_WORKS,
  FETCH_FACTORY2_ORDERS,
  UPDATE_FACTORY2_WORK_STATUS,
  FETCH_WORK_STATISTICS,
  FETCH_CALENDAR_SUMMARY,
  fetchWorkOrders,
  fetchWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
  updateWorkOrderStatus,
  fetchManufacturingHistory,
  fetchHistoryByDate,
  createManufacturingRecord,
  fetchTransfers,
  fetchTransferById,
  createTransfer,
  updateTransferStatus,
  cancelTransfer,
  fetchAvailableProducts,
  fetchFactory2Works,
  fetchFactory2Orders,
  updateFactory2WorkStatus,
  fetchWorkStatistics,
  fetchCalendarSummary,
} from './action';

// 작업 지시서 목데이터
let mockWorkOrders = [
  // {
  //   id: 1,
  //   code: 'WO001',
  //   title: '전처리 믹스 A',
  //   product: '전처리 믹스 A - 10개',
  //   material: '닭고기 (가슴살)',
  //   materialCode: 'RAW001',
  //   quantity: '50 kg',
  //   status: 'in_progress',
  //   deadlineDate: '2025-10-22',
  //   manager: '김전처리',
  //   worker: '김전처리',
  //   factoryId: 1,
  //   createdAt: '2025-10-15',
  // },
  // {
  //   id: 2,
  //   code: 'WO002',
  //   title: '세척 작업',
  //   product: '세척',
  //   material: '당근',
  //   materialCode: 'RAW002',
  //   quantity: '100 kg',
  //   status: 'waiting',
  //   deadlineDate: '2025-10-24',
  //   manager: '나작업',
  //   worker: '나작업',
  //   factoryId: 1,
  //   createdAt: '2025-10-16',
  // },
  // {
  //   id: 3,
  //   code: 'WO003',
  //   title: '포장 작업',
  //   product: '포장 완제품 - 20개',
  //   material: '양배추',
  //   materialCode: 'RAW003',
  //   quantity: '30 kg',
  //   status: 'completed',
  //   deadlineDate: '2025-10-20',
  //   manager: '박포장',
  //   worker: '박포장',
  //   factoryId: 1,
  //   createdAt: '2025-10-14',
  //   completionInfo: {
  //     completedQuantity: 28,
  //     damage: '2',
  //     temperature: '180',
  //     duration: '120',
  //     note: '작업 중 약간의 손상이 있었으나 정상적으로 완료되었습니다.',
  //     completedAt: '2025-10-20T14:30:00.000Z'
  //   }
  // },
  // {
  //   id: 4,
  //   code: 'WO004',
  //   title: '냉동 보관 작업',
  //   product: '냉동 보관 믹스 - 15개',
  //   material: '소고기 (등심)',
  //   materialCode: 'RAW004',
  //   quantity: '80 kg',
  //   status: 'waiting',
  //   deadlineDate: '2025-10-25',
  //   manager: '최냉동',
  //   worker: '최냉동',
  //   factoryId: 1,
  //   createdAt: '2025-10-17',
  // },
  // {
  //   id: 9,
  //   code: 'WO005',
  //   title: '건조 작업',
  //   product: '건조 채소 믹스 - 25개',
  //   material: '브로콜리',
  //   materialCode: 'RAW009',
  //   quantity: '40 kg',
  //   status: 'in_progress',
  //   deadlineDate: '2025-10-26',
  //   manager: '이건조',
  //   worker: '이건조',
  //   factoryId: 1,
  //   createdAt: '2025-10-18',
  // },
  // {
  //   id: 10,
  //   code: 'WO006',
  //   title: '분쇄 작업',
  //   product: '분쇄 곡물 - 30개',
  //   material: '현미',
  //   materialCode: 'RAW010',
  //   quantity: '60 kg',
  //   status: 'waiting',
  //   deadlineDate: '2025-10-27',
  //   manager: '정분쇄',
  //   worker: '정분쇄',
  //   factoryId: 1,
  //   createdAt: '2025-10-19',
  // },
];

// 제조 이력 목데이터 (날짜별 pending/completed 구조)
let mockManufacturingHistory = {
  // '2025-11-03': {
  //   pending: [
  //     {
  //       id: 1,
  //       title: '애니콩 쿠키 제조',
  //       material: '밀가루',
  //       quantity: 200,
  //       worker: '김민수',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 2,
  //       title: '초코 케이크 제조',
  //       material: '초콜릿',
  //       quantity: 150,
  //       damaged: 3,
  //       completedQuantity: 147,
  //       duration: 120,
  //       worker: '이영희',
  //       status: 'completed'
  //     },
  //     {
  //       id: 3,
  //       title: '바닐라 쿠키 제조',
  //       material: '설탕',
  //       quantity: 100,
  //       damaged: 2,
  //       completedQuantity: 98,
  //       duration: 90,
  //       worker: '박철수',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-05': {
  //   pending: [],
  //   completed: [
  //     {
  //       id: 4,
  //       title: '딸기 케이크 제조',
  //       material: '딸기',
  //       quantity: 80,
  //       damaged: 1,
  //       completedQuantity: 79,
  //       duration: 100,
  //       worker: '최지민',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-07': {
  //   pending: [
  //     {
  //       id: 5,
  //       title: '마카롱 제조',
  //       material: '아몬드 가루',
  //       quantity: 300,
  //       worker: '강서연',
  //       status: 'pending'
  //     },
  //     {
  //       id: 6,
  //       title: '치즈 케이크 제조',
  //       material: '크림치즈',
  //       quantity: 120,
  //       worker: '윤하늘',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: []
  // },
  // '2025-11-10': {
  //   pending: [
  //     {
  //       id: 7,
  //       title: '레몬 타르트 제조',
  //       material: '레몬',
  //       quantity: 90,
  //       worker: '정우진',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 8,
  //       title: '브라우니 제조',
  //       material: '다크 초콜릿',
  //       quantity: 180,
  //       damaged: 5,
  //       completedQuantity: 175,
  //       duration: 110,
  //       worker: '한소희',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-12': {
  //   pending: [],
  //   completed: [
  //     {
  //       id: 9,
  //       title: '크루아상 제조',
  //       material: '버터',
  //       quantity: 250,
  //       damaged: 8,
  //       completedQuantity: 242,
  //       duration: 180,
  //       worker: '송민호',
  //       status: 'completed'
  //     },
  //     {
  //       id: 10,
  //       title: '도넛 제조',
  //       material: '밀가루',
  //       quantity: 200,
  //       damaged: 4,
  //       completedQuantity: 196,
  //       duration: 95,
  //       worker: '김태희',
  //       status: 'completed'
  //     },
  //     {
  //       id: 11,
  //       title: '애플파이 제조',
  //       material: '사과',
  //       quantity: 100,
  //       damaged: 2,
  //       completedQuantity: 98,
  //       duration: 130,
  //       worker: '이동욱',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-14': {
  //   pending: [
  //     {
  //       id: 12,
  //       title: '티라미수 제조',
  //       material: '마스카포네 치즈',
  //       quantity: 70,
  //       worker: '박보검',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: []
  // },
  // '2025-11-15': {
  //   pending: [],
  //   completed: [
  //     {
  //       id: 13,
  //       title: '마들렌 제조',
  //       material: '버터',
  //       quantity: 160,
  //       damaged: 3,
  //       completedQuantity: 157,
  //       duration: 85,
  //       worker: '전지현',
  //       status: 'completed'
  //     },
  //     {
  //       id: 14,
  //       title: '휘낭시에 제조',
  //       material: '아몬드 가루',
  //       quantity: 140,
  //       damaged: 2,
  //       completedQuantity: 138,
  //       duration: 75,
  //       worker: '공유',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-18': {
  //   pending: [
  //     {
  //       id: 15,
  //       title: '오페라 케이크 제조',
  //       material: '커피',
  //       quantity: 60,
  //       worker: '배수지',
  //       status: 'pending'
  //     },
  //     {
  //       id: 16,
  //       title: '몽블랑 제조',
  //       material: '밤',
  //       quantity: 50,
  //       worker: '남주혁',
  //       status: 'pending'
  //     },
  //     {
  //       id: 17,
  //       title: '에클레어 제조',
  //       material: '슈크림',
  //       quantity: 110,
  //       worker: '아이유',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 18,
  //       title: '카스테라 제조',
  //       material: '계란',
  //       quantity: 220,
  //       damaged: 6,
  //       completedQuantity: 214,
  //       duration: 140,
  //       worker: '정해인',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-20': {
  //   pending: [],
  //   completed: [
  //     {
  //       id: 19,
  //       title: '롤케이크 제조',
  //       material: '생크림',
  //       quantity: 130,
  //       damaged: 3,
  //       completedQuantity: 127,
  //       duration: 105,
  //       worker: '김고은',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-22': {
  //   pending: [
  //     {
  //       id: 20,
  //       title: '프레즐 제조',
  //       material: '밀가루',
  //       quantity: 190,
  //       worker: '박서준',
  //       status: 'pending'
  //     },
  //     {
  //       id: 21,
  //       title: '스콘 제조',
  //       material: '버터밀크',
  //       quantity: 150,
  //       worker: '손예진',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 22,
  //       title: '머핀 제조',
  //       material: '블루베리',
  //       quantity: 170,
  //       damaged: 4,
  //       completedQuantity: 166,
  //       duration: 90,
  //       worker: '현빈',
  //       status: 'completed'
  //     },
  //     {
  //       id: 23,
  //       title: '베이글 제조',
  //       material: '밀가루',
  //       quantity: 200,
  //       damaged: 5,
  //       completedQuantity: 195,
  //       duration: 125,
  //       worker: '한지민',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-23': {
  //   pending: [],
  //   completed: [
  //     {
  //       id: 24,
  //       title: '시폰 케이크 제조',
  //       material: '계란',
  //       quantity: 100,
  //       damaged: 2,
  //       completedQuantity: 98,
  //       duration: 110,
  //       worker: '김선생',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-25': {
  //   pending: [
  //     {
  //       id: 25,
  //       title: '파운드 케이크 제조',
  //       material: '버터',
  //       quantity: 120,
  //       worker: '이민호',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 26,
  //       title: '당근 케이크 제조',
  //       material: '당근',
  //       quantity: 95,
  //       damaged: 2,
  //       completedQuantity: 93,
  //       duration: 115,
  //       worker: '수지',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-27': {
  //   pending: [],
  //   completed: [
  //     {
  //       id: 27,
  //       title: '녹차 쿠키 제조',
  //       material: '녹차 가루',
  //       quantity: 200,
  //       damaged: 5,
  //       completedQuantity: 195,
  //       duration: 150,
  //       worker: '이선생',
  //       status: 'completed'
  //     },
  //     {
  //       id: 28,
  //       title: '초코칩 쿠키 제조',
  //       material: '초코칩',
  //       quantity: 180,
  //       damaged: 3,
  //       completedQuantity: 177,
  //       duration: 95,
  //       worker: '박신혜',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-28': {
  //   pending: [
  //     {
  //       id: 29,
  //       title: '타르트 제조',
  //       material: '과일',
  //       quantity: 85,
  //       worker: '조인성',
  //       status: 'pending'
  //     },
  //     {
  //       id: 30,
  //       title: '푸딩 제조',
  //       material: '우유',
  //       quantity: 150,
  //       worker: '송혜교',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: [
  //     {
  //       id: 31,
  //       title: '피낭시에 제조',
  //       material: '버터',
  //       quantity: 130,
  //       damaged: 2,
  //       completedQuantity: 128,
  //       duration: 80,
  //       worker: '강동원',
  //       status: 'completed'
  //     }
  //   ]
  // },
  // '2025-11-30': {
  //   pending: [
  //     {
  //       id: 32,
  //       title: '젤라또 제조',
  //       material: '우유',
  //       quantity: 250,
  //       worker: '박선생',
  //       status: 'pending'
  //     }
  //   ],
  //   completed: []
  // }
};

// 공장간 이동 목데이터
let mockTransfers = [
  // {
  //   id: 1,
  //   code: 'TF001',
  //   route: '1공장 → 2공장',
  //   departureLocation: '1공장',
  //   arrivalLocation: '2공장',
  //   transportMethod: '트럭',
  //   recipient: '이수령',
  //   item: '당근',
  //   quantity: '100 kg',
  //   status: 'completed', // pending, in_transit, completed, cancelled
  //   departureDate: '2025-10-25',
  //   createdAt: '2025-10-25',
  //   estimatedArrival: '2025-10-26',
  // },
  // {
  //   id: 2,
  //   code: 'TF002',
  //   route: '1창고 → 2창고',
  //   departureLocation: '1창고',
  //   arrivalLocation: '2창고',
  //   transportMethod: '팔레트',
  //   recipient: '박담당',
  //   item: '고구마',
  //   quantity: '50 kg',
  //   status: 'in_transit',
  //   departureDate: '2025-10-30',
  //   createdAt: '2025-10-30',
  //   estimatedArrival: '2025-10-31',
  // },
  // {
  //   id: 3,
  //   code: 'TF003',
  //   route: '2공장 → 1창고',
  //   departureLocation: '2공장',
  //   arrivalLocation: '1창고',
  //   transportMethod: '박스',
  //   recipient: '김창고',
  //   item: '닭고기 (가슴살)',
  //   quantity: '75 kg',
  //   status: 'pending',
  //   departureDate: '2025-10-31',
  //   createdAt: '2025-10-31',
  //   estimatedArrival: '2025-11-01',
  // },
  // {
  //   id: 4,
  //   code: 'TF004',
  //   route: '1공장 → 3공장',
  //   departureLocation: '1공장',
  //   arrivalLocation: '3공장',
  //   transportMethod: '트럭',
  //   recipient: '최운송',
  //   item: '양배추',
  //   quantity: '120 kg',
  //   status: 'completed',
  //   departureDate: '2025-10-28',
  //   createdAt: '2025-10-28',
  //   estimatedArrival: '2025-10-29',
  // },
  // {
  //   id: 5,
  //   code: 'TF005',
  //   route: '2창고 → 1공장',
  //   departureLocation: '2창고',
  //   arrivalLocation: '1공장',
  //   transportMethod: '컨테이너',
  //   recipient: '정물류',
  //   item: '소고기 (등심)',
  //   quantity: '200 kg',
  //   status: 'in_transit',
  //   departureDate: '2025-11-01',
  //   createdAt: '2025-11-01',
  //   estimatedArrival: '2025-11-02',
  // },
  // {
  //   id: 6,
  //   code: 'TF006',
  //   route: '1공장 → 2창고',
  //   departureLocation: '1공장',
  //   arrivalLocation: '2창고',
  //   transportMethod: '팔레트',
  //   recipient: '강수령',
  //   item: '감자',
  //   quantity: '90 kg',
  //   status: 'completed',
  //   departureDate: '2025-10-26',
  //   createdAt: '2025-10-26',
  //   estimatedArrival: '2025-10-27',
  // },
  // {
  //   id: 7,
  //   code: 'TF007',
  //   route: '3공장 → 1창고',
  //   departureLocation: '3공장',
  //   arrivalLocation: '1창고',
  //   transportMethod: '트럭',
  //   recipient: '윤이동',
  //   item: '양파',
  //   quantity: '60 kg',
  //   status: 'pending',
  //   departureDate: '2025-11-02',
  //   createdAt: '2025-11-02',
  //   estimatedArrival: '2025-11-03',
  // },
  // {
  //   id: 8,
  //   code: 'TF008',
  //   route: '2공장 → 3창고',
  //   departureLocation: '2공장',
  //   arrivalLocation: '3창고',
  //   transportMethod: '박스',
  //   recipient: '서관리',
  //   item: '돼지고기 (삼겹살)',
  //   quantity: '150 kg',
  //   status: 'in_transit',
  //   departureDate: '2025-11-03',
  //   createdAt: '2025-11-03',
  //   estimatedArrival: '2025-11-04',
  // },
];

// 2공장 작업 목데이터
let mockFactory2Works = [
  // {
  //   id: 1,
  //   code: 'F2W001',
  //   title: '쿠키 제조',
  //   product: '콩부장쿠키',
  //   quantity: '200 box',
  //   status: 'in_progress',
  //   worker: '최제조',
  //   startDate: '2025-10-15',
  //   expectedEndDate: '2025-10-20',
  // },
  // {
  //   id: 2,
  //   code: 'F2W002',
  //   title: '펫디너 제조',
  //   product: '애니콩 펫디너 비프',
  //   quantity: '500 ea',
  //   status: 'waiting',
  //   worker: '정작업',
  //   startDate: '2025-10-18',
  //   expectedEndDate: '2025-10-22',
  // },
];

// 2공장 주문 목데이터
let mockFactory2Orders = [
  // {
  //   id: 5,
  //   orderCode: 'F2O001',
  //   code: 'F2O001',
  //   title: '콩부장쿠키 제조',
  //   product: '콩부장쿠키',
  //   material: '밀가루',
  //   materialCode: 'RAW005',
  //   quantity: '200 box',
  //   orderDate: '2025-10-10',
  //   deadline: '2025-10-20',
  //   deadlineDate: '2025-10-20',
  //   status: 'in_progress',
  //   worker: '이제조',
  //   manager: '이제조',
  //   factoryId: 2,
  //   createdAt: '2025-10-10',
  // },
  // {
  //   id: 6,
  //   orderCode: 'F2O002',
  //   code: 'F2O002',
  //   title: '펫디너 비프 제조',
  //   product: '애니콩 펫디너 비프',
  //   material: '소고기',
  //   materialCode: 'RAW006',
  //   quantity: '500 ea',
  //   orderDate: '2025-10-12',
  //   deadline: '2025-10-22',
  //   deadlineDate: '2025-10-22',
  //   status: 'waiting',
  //   worker: '박공장',
  //   manager: '박공장',
  //   factoryId: 2,
  //   createdAt: '2025-10-12',
  // },
  // {
  //   id: 7,
  //   orderCode: 'F2O003',
  //   code: 'F2O003',
  //   title: '펫베이커리 제조',
  //   product: '애니콩 펫베이커리',
  //   material: '호밀',
  //   materialCode: 'RAW007',
  //   quantity: '300 box',
  //   orderDate: '2025-10-14',
  //   deadline: '2025-10-24',
  //   deadlineDate: '2025-10-24',
  //   status: 'completed',
  //   worker: '최생산',
  //   manager: '최생산',
  //   factoryId: 2,
  //   createdAt: '2025-10-14',
  //   completionInfo: {
  //     completedQuantity: '295 box',
  //     damage: '5',
  //     temperature: '160',
  //     duration: '180',
  //     note: '제품 품질 우수, 정상 완료',
  //     completedAt: '2025-10-24T16:20:00.000Z'
  //   }
  // },
  // {
  //   id: 8,
  //   orderCode: 'F2O004',
  //   code: 'F2O004',
  //   title: '치킨 믹스 제조',
  //   product: '펫간식 치킨 믹스',
  //   material: '닭고기',
  //   materialCode: 'RAW008',
  //   quantity: '150 box',
  //   orderDate: '2025-10-15',
  //   deadline: '2025-10-25',
  //   deadlineDate: '2025-10-25',
  //   status: 'waiting',
  //   worker: '정작업',
  //   manager: '정작업',
  //   factoryId: 2,
  //   createdAt: '2025-10-15',
  // },
  // {
  //   id: 11,
  //   orderCode: 'F2O005',
  //   code: 'F2O005',
  //   title: '펫쿠키 연어맛 제조',
  //   product: '펫쿠키 연어맛 - 100개',
  //   material: '연어',
  //   materialCode: 'RAW011',
  //   quantity: '80 box',
  //   orderDate: '2025-10-16',
  //   deadline: '2025-10-26',
  //   deadlineDate: '2025-10-26',
  //   status: 'in_progress',
  //   worker: '강펫푸드',
  //   manager: '강펫푸드',
  //   factoryId: 2,
  //   createdAt: '2025-10-16',
  // },
  // {
  //   id: 12,
  //   orderCode: 'F2O006',
  //   code: 'F2O006',
  //   title: '펫저키 오리맛 제조',
  //   product: '펫저키 오리맛 - 200개',
  //   material: '오리고기',
  //   materialCode: 'RAW012',
  //   quantity: '120 box',
  //   orderDate: '2025-10-17',
  //   deadline: '2025-10-27',
  //   deadlineDate: '2025-10-27',
  //   status: 'waiting',
  //   worker: '윤펫간식',
  //   manager: '윤펫간식',
  //   factoryId: 2,
  //   createdAt: '2025-10-17',
  // },
];

// 출고가능품목 목데이터 (품목별로 관리)
const mockAvailableProducts = {
  // 'RAW001': [ // 닭고기 (가슴살)
  //   { id: 1, itemCode: 'RAW001', itemName: '닭고기 (가슴살)', expiry: 'D-5', receiveDate: '2025-10-10', quantity: '100 kg' },
  //   { id: 2, itemCode: 'RAW001', itemName: '닭고기 (가슴살)', expiry: 'D-8', receiveDate: '2025-10-21', quantity: '150 kg' },
  // ],
  // 'RAW002': [ // 당근
  //   { id: 3, itemCode: 'RAW002', itemName: '당근', expiry: 'D-3', receiveDate: '2025-10-15', quantity: '80 kg' },
  //   { id: 4, itemCode: 'RAW002', itemName: '당근', expiry: 'D-10', receiveDate: '2025-10-18', quantity: '120 kg' },
  // ],
  // 'RAW003': [ // 양배추
  //   { id: 5, itemCode: 'RAW003', itemName: '양배추', expiry: 'D-7', receiveDate: '2025-10-12', quantity: '60 kg' },
  // ],
  // 'RAW004': [ // 소고기 (등심)
  //   { id: 6, itemCode: 'RAW004', itemName: '소고기 (등심)', expiry: 'D-4', receiveDate: '2025-10-20', quantity: '200 kg' },
  //   { id: 7, itemCode: 'RAW004', itemName: '소고기 (등심)', expiry: 'D-12', receiveDate: '2025-10-25', quantity: '180 kg' },
  // ],
  // 'RAW005': [ // 밀가루
  //   { id: 8, itemCode: 'RAW005', itemName: '밀가루', expiry: 'D-15', receiveDate: '2025-10-05', quantity: '300 kg' },
  // ],
  // 'RAW006': [ // 소고기
  //   { id: 9, itemCode: 'RAW006', itemName: '소고기', expiry: 'D-6', receiveDate: '2025-10-14', quantity: '150 kg' },
  // ],
  // 'RAW007': [ // 호밀
  //   { id: 10, itemCode: 'RAW007', itemName: '호밀', expiry: 'D-20', receiveDate: '2025-10-08', quantity: '100 kg' },
  // ],
  // 'RAW008': [ // 닭고기
  //   { id: 11, itemCode: 'RAW008', itemName: '닭고기', expiry: 'D-5', receiveDate: '2025-10-16', quantity: '120 kg' },
  //   { id: 12, itemCode: 'RAW008', itemName: '닭고기', expiry: 'D-9', receiveDate: '2025-10-22', quantity: '90 kg' },
  // ],
};

// 작업 통계 목데이터
const mockWorkStatistics = {
  // inProgress: 1,
  // waiting: 1,
  // completed: 1,
  // workers: 3,
};

// 캘린더 요약 데이터 생성 함수 (제조 이력 데이터 기반)
const generateCalendarSummary = (historyData) => {
  const summary = {};

  // historyData는 날짜별로 pending과 completed 배열을 가지고 있음
  Object.keys(historyData).forEach((date) => {
    const dayData = historyData[date];
    summary[date] = {
      pending: dayData.pending ? dayData.pending.length : 0,
      completed: dayData.completed ? dayData.completed.length : 0
    };
  });

  return summary;
};

// ==================== 작업 지시서 Saga ====================
function* fetchWorkOrdersSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getWorkOrders, action.payload);
    // yield put(fetchWorkOrders.success(response.data));

    yield delay(500);
    yield put(fetchWorkOrders.success(mockWorkOrders));
  } catch (error) {
    yield put(fetchWorkOrders.failure(error.response?.data?.message || '작업지시서 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchWorkOrderByIdSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getWorkOrderById, action.payload);
    // yield put(fetchWorkOrderById.success(response.data));

    yield delay(500);
    const workOrder = mockWorkOrders.find((wo) => wo.id === action.payload);
    if (workOrder) {
      yield put(fetchWorkOrderById.success(workOrder));
    } else {
      yield put(fetchWorkOrderById.failure('작업지시서를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchWorkOrderById.failure(error.response?.data?.message || '작업지시서 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* createWorkOrderSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.createWorkOrder, action.payload);
    // yield put(createWorkOrder.success(response.data));

    yield delay(500);
    const { factoryId, ...orderData } = action.payload;
    
    // factoryId에 따라 다른 목록에 추가
    if (factoryId === 1) {
      // 1공장 작업 지시서
      const newWorkOrder = {
        id: mockWorkOrders.length + mockFactory2Orders.length + 1,
        code: `WO${String(mockWorkOrders.length + 1).padStart(3, '0')}`,
        ...orderData,
        factoryId: 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      mockWorkOrders = [...mockWorkOrders, newWorkOrder];
      yield put(createWorkOrder.success(newWorkOrder));
    } else if (factoryId === 2) {
      // 2공장 작업 지시서
      const newFactory2Order = {
        id: mockWorkOrders.length + mockFactory2Orders.length + 1,
        orderCode: `F2O${String(mockFactory2Orders.length + 1).padStart(3, '0')}`,
        product: orderData.product,
        quantity: orderData.quantity,
        orderDate: new Date().toISOString().split('T')[0],
        deadline: orderData.deadlineDate,
        status: orderData.status,
        worker: orderData.worker,
        ...orderData,
        factoryId: 2,
      };
      mockFactory2Orders = [...mockFactory2Orders, newFactory2Order];
      yield put(createWorkOrder.success(newFactory2Order));
    } else {
      yield put(createWorkOrder.failure('공장을 선택해주세요.'));
    }
  } catch (error) {
    yield put(createWorkOrder.failure(error.response?.data?.message || '작업지시서 등록에 실패했습니다.'));
  }
}

function* updateWorkOrderSaga(action) {
  try {
    // const { id, data } = action.payload;
    // const response = yield call(manufacturingAPI.updateWorkOrder, id, data);
    // yield put(updateWorkOrder.success(response.data));

    yield delay(500);
    const { id, data } = action.payload;
    const index = mockWorkOrders.findIndex((wo) => wo.id === id);
    if (index !== -1) {
      mockWorkOrders[index] = { ...mockWorkOrders[index], ...data };
      yield put(updateWorkOrder.success(mockWorkOrders[index]));
    } else {
      yield put(updateWorkOrder.failure('작업지시서를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateWorkOrder.failure(error.response?.data?.message || '작업지시서 수정에 실패했습니다.'));
  }
}

function* deleteWorkOrderSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.deleteWorkOrder, action.payload);
    // yield put(deleteWorkOrder.success(response.data));

    yield delay(500);
    mockWorkOrders = mockWorkOrders.filter((wo) => wo.id !== action.payload);
    yield put(deleteWorkOrder.success({ id: action.payload }));
  } catch (error) {
    yield put(deleteWorkOrder.failure(error.response?.data?.message || '작업지시서 삭제에 실패했습니다.'));
  }
}

function* updateWorkOrderStatusSaga(action) {
  try {
    // const { id, status, worker } = action.payload;
    // const response = yield call(manufacturingAPI.updateWorkOrderStatus, id, { status, worker });
    // yield put(updateWorkOrderStatus.success(response.data));

    yield delay(500);
    const { id, status, worker } = action.payload;
    const index = mockWorkOrders.findIndex((wo) => wo.id === id);
    if (index !== -1) {
      const updatedOrder = { 
        ...mockWorkOrders[index], 
        status,
        ...(worker && { worker })
      };
      mockWorkOrders[index] = updatedOrder;
      yield put(updateWorkOrderStatus.success(updatedOrder));
    } else {
      yield put(updateWorkOrderStatus.failure('작업지시서를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateWorkOrderStatus.failure(error.response?.data?.message || '작업지시서 상태 변경에 실패했습니다.'));
  }
}

// ==================== 제조 이력 Saga ====================
function* fetchManufacturingHistorySaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getManufacturingHistory, action.payload);
    // yield put(fetchManufacturingHistory.success(response.data));

    yield delay(500);
    // 전체 제조 이력 데이터를 날짜별 구조 그대로 반환
    yield put(fetchManufacturingHistory.success(mockManufacturingHistory));
  } catch (error) {
    yield put(fetchManufacturingHistory.failure(error.response?.data?.message || '제조 이력을 불러오는데 실패했습니다.'));
  }
}

function* fetchHistoryByDateSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getHistoryByDate, action.payload);
    // yield put(fetchHistoryByDate.success(response.data));

    yield delay(500);
    const { date } = action.payload;
    // date에 해당하는 데이터를 반환 (pending과 completed 배열을 포함한 객체)
    const dateHistory = mockManufacturingHistory[date] || { pending: [], completed: [] };
    yield put(fetchHistoryByDate.success(dateHistory));
  } catch (error) {
    yield put(fetchHistoryByDate.failure(error.response?.data?.message || '날짜별 제조 이력을 불러오는데 실패했습니다.'));
  }
}

function* createManufacturingRecordSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.createManufacturingRecord, action.payload);
    // yield put(createManufacturingRecord.success(response.data));

    yield delay(500);
    const newRecord = {
      id: mockManufacturingHistory.length + 1,
      ...action.payload,
      date: new Date().toISOString().split('T')[0],
    };
    mockManufacturingHistory = [...mockManufacturingHistory, newRecord];
    yield put(createManufacturingRecord.success(newRecord));
  } catch (error) {
    yield put(createManufacturingRecord.failure(error.response?.data?.message || '제조 기록 생성에 실패했습니다.'));
  }
}

// ==================== 공장간 이동 Saga ====================
function* fetchTransfersSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getTransfers, action.payload);
    // yield put(fetchTransfers.success(response.data));

    yield delay(500);
    yield put(fetchTransfers.success(mockTransfers));
  } catch (error) {
    yield put(fetchTransfers.failure(error.response?.data?.message || '이송 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchTransferByIdSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getTransferById, action.payload);
    // yield put(fetchTransferById.success(response.data));

    yield delay(500);
    const transfer = mockTransfers.find((t) => t.id === action.payload);
    if (transfer) {
      yield put(fetchTransferById.success(transfer));
    } else {
      yield put(fetchTransferById.failure('이송 정보를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(fetchTransferById.failure(error.response?.data?.message || '이송 상세 정보를 불러오는데 실패했습니다.'));
  }
}

function* createTransferSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.createTransfer, action.payload);
    // yield put(createTransfer.success(response.data));

    yield delay(500);
    const newTransfer = {
      id: mockTransfers.length + 1,
      code: `TF${String(mockTransfers.length + 1).padStart(3, '0')}`,
      ...action.payload,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockTransfers = [...mockTransfers, newTransfer];
    yield put(createTransfer.success(newTransfer));
  } catch (error) {
    yield put(createTransfer.failure(error.response?.data?.message || '이송 등록에 실패했습니다.'));
  }
}

function* updateTransferStatusSaga(action) {
  try {
    // const { id, status } = action.payload;
    // const response = yield call(manufacturingAPI.updateTransferStatus, id, status);
    // yield put(updateTransferStatus.success(response.data));

    yield delay(500);
    const { id, status } = action.payload;
    const index = mockTransfers.findIndex((t) => t.id === id);
    if (index !== -1) {
      mockTransfers[index] = { ...mockTransfers[index], status };
      yield put(updateTransferStatus.success({ id, status }));
    } else {
      yield put(updateTransferStatus.failure('이송 정보를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateTransferStatus.failure(error.response?.data?.message || '이송 상태 변경에 실패했습니다.'));
  }
}

function* cancelTransferSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.cancelTransfer, action.payload);
    // yield put(cancelTransfer.success(response.data));

    yield delay(500);
    const index = mockTransfers.findIndex((t) => t.id === action.payload);
    if (index !== -1) {
      mockTransfers[index] = { ...mockTransfers[index], status: 'cancelled' };
      yield put(cancelTransfer.success({ id: action.payload, status: 'cancelled' }));
    } else {
      yield put(cancelTransfer.failure('이송 정보를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(cancelTransfer.failure(error.response?.data?.message || '이송 취소에 실패했습니다.'));
  }
}

// ==================== 2공장 제조 Saga ====================
function* fetchFactory2WorksSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getFactory2Works, action.payload);
    // yield put(fetchFactory2Works.success(response.data));

    yield delay(500);
    yield put(fetchFactory2Works.success(mockFactory2Works));
  } catch (error) {
    yield put(fetchFactory2Works.failure(error.response?.data?.message || '2공장 작업 목록을 불러오는데 실패했습니다.'));
  }
}

function* fetchFactory2OrdersSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getFactory2Orders, action.payload);
    // yield put(fetchFactory2Orders.success(response.data));

    yield delay(500);
    yield put(fetchFactory2Orders.success(mockFactory2Orders));
  } catch (error) {
    yield put(fetchFactory2Orders.failure(error.response?.data?.message || '2공장 주문 목록을 불러오는데 실패했습니다.'));
  }
}

function* updateFactory2WorkStatusSaga(action) {
  try {
    // const { id, status, worker, ...rest } = action.payload;
    // const response = yield call(manufacturingAPI.updateFactory2WorkStatus, id, { status, worker, ...rest });
    // yield put(updateFactory2WorkStatus.success(response.data));

    yield delay(500);
    const { id, status, worker, ...rest } = action.payload;
    
    // mockFactory2Works 업데이트
    const workIndex = mockFactory2Works.findIndex((w) => w.id === id);
    if (workIndex !== -1) {
      const updatedWork = { 
        ...mockFactory2Works[workIndex], 
        status,
        ...(worker && { worker }),
        ...rest
      };
      mockFactory2Works[workIndex] = updatedWork;
    }
    
    // mockFactory2Orders 업데이트
    const orderIndex = mockFactory2Orders.findIndex((o) => o.id === id);
    if (orderIndex !== -1) {
      const updatedOrder = { 
        ...mockFactory2Orders[orderIndex], 
        status,
        ...(worker && { worker }),
        ...rest
      };
      mockFactory2Orders[orderIndex] = updatedOrder;
      yield put(updateFactory2WorkStatus.success(updatedOrder));
    } else if (workIndex !== -1) {
      yield put(updateFactory2WorkStatus.success(mockFactory2Works[workIndex]));
    } else {
      yield put(updateFactory2WorkStatus.failure('작업 정보를 찾을 수 없습니다.'));
    }
  } catch (error) {
    yield put(updateFactory2WorkStatus.failure(error.response?.data?.message || '2공장 작업 상태 변경에 실패했습니다.'));
  }
}

// ==================== 출고가능품목 Saga ====================
function* fetchAvailableProductsSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getAvailableProducts, action.payload);
    // yield put(fetchAvailableProducts.success(response.data));

    yield delay(500);
    const { itemCode } = action.payload || {};
    
    // itemCode가 제공되면 해당 품목의 출고가능품목 반환, 아니면 빈 배열
    const products = itemCode && mockAvailableProducts[itemCode] ? mockAvailableProducts[itemCode] : [];
    yield put(fetchAvailableProducts.success(products));
  } catch (error) {
    yield put(fetchAvailableProducts.failure(error.response?.data?.message || '출고가능품목을 불러오는데 실패했습니다.'));
  }
}

// ==================== 작업 통계 Saga ====================
function* fetchWorkStatisticsSaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getWorkStatistics, action.payload);
    // yield put(fetchWorkStatistics.success(response.data));

    yield delay(500);
    yield put(fetchWorkStatistics.success(mockWorkStatistics));
  } catch (error) {
    yield put(fetchWorkStatistics.failure(error.response?.data?.message || '작업 통계를 불러오는데 실패했습니다.'));
  }
}

// ==================== 캘린더 요약 데이터 Saga ====================
function* fetchCalendarSummarySaga(action) {
  try {
    // const response = yield call(manufacturingAPI.getCalendarSummary, action.payload);
    // yield put(fetchCalendarSummary.success(response.data));

    yield delay(500);
    // 제조 이력 데이터를 기반으로 캘린더 요약 데이터 생성
    const calendarData = generateCalendarSummary(mockManufacturingHistory);
    yield put(fetchCalendarSummary.success(calendarData));
  } catch (error) {
    yield put(fetchCalendarSummary.failure(error.response?.data?.message || '캘린더 데이터를 불러오는데 실패했습니다.'));
  }
}

// ==================== Root Saga ====================
export default function* manufacturingSaga() {
  // 작업 지시서
  yield takeLatest(FETCH_WORK_ORDERS.REQUEST, fetchWorkOrdersSaga);
  yield takeLatest(FETCH_WORK_ORDER_BY_ID.REQUEST, fetchWorkOrderByIdSaga);
  yield takeLatest(CREATE_WORK_ORDER.REQUEST, createWorkOrderSaga);
  yield takeLatest(UPDATE_WORK_ORDER.REQUEST, updateWorkOrderSaga);
  yield takeLatest(DELETE_WORK_ORDER.REQUEST, deleteWorkOrderSaga);
  yield takeLatest(UPDATE_WORK_ORDER_STATUS.REQUEST, updateWorkOrderStatusSaga);

  // 제조 이력
  yield takeLatest(FETCH_MANUFACTURING_HISTORY.REQUEST, fetchManufacturingHistorySaga);
  yield takeLatest(FETCH_HISTORY_BY_DATE.REQUEST, fetchHistoryByDateSaga);
  yield takeLatest(CREATE_MANUFACTURING_RECORD.REQUEST, createManufacturingRecordSaga);

  // 공장간 이동
  yield takeLatest(FETCH_TRANSFERS.REQUEST, fetchTransfersSaga);
  yield takeLatest(FETCH_TRANSFER_BY_ID.REQUEST, fetchTransferByIdSaga);
  yield takeLatest(CREATE_TRANSFER.REQUEST, createTransferSaga);
  yield takeLatest(UPDATE_TRANSFER_STATUS.REQUEST, updateTransferStatusSaga);
  yield takeLatest(CANCEL_TRANSFER.REQUEST, cancelTransferSaga);
  yield takeLatest(FETCH_AVAILABLE_PRODUCTS.REQUEST, fetchAvailableProductsSaga);

  // 2공장 제조
  yield takeLatest(FETCH_FACTORY2_WORKS.REQUEST, fetchFactory2WorksSaga);
  yield takeLatest(FETCH_FACTORY2_ORDERS.REQUEST, fetchFactory2OrdersSaga);
  yield takeLatest(UPDATE_FACTORY2_WORK_STATUS.REQUEST, updateFactory2WorkStatusSaga);

  // 작업 통계
  yield takeLatest(FETCH_WORK_STATISTICS.REQUEST, fetchWorkStatisticsSaga);

  // 캘린더 데이터
  yield takeLatest(FETCH_CALENDAR_SUMMARY.REQUEST, fetchCalendarSummarySaga);
}
