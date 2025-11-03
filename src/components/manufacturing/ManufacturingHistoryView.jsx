import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import ManufacturingCalendar from "./ManufacturingCalendar";
import ManufacturingHistoryList from "./ManufacturingHistoryList";

const ManufacturingHistoryView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 캘린더에 표시될 날짜별 요약 데이터 (날짜 키: YYYY-MM-DD)
    const calendarSummaryData = {
        '2025-11-03': { pending: 1, completed: 2 },
        '2025-11-05': { pending: 0, completed: 1 },
        '2025-11-07': { pending: 2, completed: 0 },
        '2025-11-10': { pending: 1, completed: 1 },
        '2025-11-12': { pending: 0, completed: 3 },
        '2025-11-14': { pending: 1, completed: 0 },
        '2025-11-15': { pending: 0, completed: 2 },
        '2025-11-18': { pending: 3, completed: 1 },
        '2025-11-20': { pending: 0, completed: 1 },
        '2025-11-22': { pending: 2, completed: 2 },
        '2025-11-23': { pending: 0, completed: 1 },
        '2025-11-25': { pending: 1, completed: 1 },
        '2025-11-27': { pending: 0, completed: 2 },
        '2025-11-28': { pending: 2, completed: 1 },
        '2025-11-30': { pending: 1, completed: 0 }
    };

    // 날짜별 상세 제조이력 데이터 (날짜 키: YYYY-MM-DD)
    const detailedHistoryData = {
        '2025-11-03': {
            pending: [
                {
                    title: '애니콩 쿠키 제조',
                    material: '밀가루',
                    quantity: 200,
                    worker: '김민수'
                }
            ],
            completed: [
                {
                    title: '초코 케이크 제조',
                    material: '초콜릿',
                    quantity: 150,
                    damaged: 3,
                    completedQuantity: 147,
                    duration: 120,
                    worker: '이영희'
                },
                {
                    title: '바닐라 쿠키 제조',
                    material: '설탕',
                    quantity: 100,
                    damaged: 2,
                    completedQuantity: 98,
                    duration: 90,
                    worker: '박철수'
                }
            ]
        },
        '2025-11-05': {
            pending: [],
            completed: [
                {
                    title: '딸기 케이크 제조',
                    material: '딸기',
                    quantity: 80,
                    damaged: 1,
                    completedQuantity: 79,
                    duration: 100,
                    worker: '최지민'
                }
            ]
        },
        '2025-11-07': {
            pending: [
                {
                    title: '마카롱 제조',
                    material: '아몬드 가루',
                    quantity: 300,
                    worker: '강서연'
                },
                {
                    title: '치즈 케이크 제조',
                    material: '크림치즈',
                    quantity: 120,
                    worker: '윤하늘'
                }
            ],
            completed: []
        },
        '2025-11-10': {
            pending: [
                {
                    title: '레몬 타르트 제조',
                    material: '레몬',
                    quantity: 90,
                    worker: '정우진'
                }
            ],
            completed: [
                {
                    title: '브라우니 제조',
                    material: '다크 초콜릿',
                    quantity: 180,
                    damaged: 5,
                    completedQuantity: 175,
                    duration: 110,
                    worker: '한소희'
                }
            ]
        },
        '2025-11-12': {
            pending: [],
            completed: [
                {
                    title: '크루아상 제조',
                    material: '버터',
                    quantity: 250,
                    damaged: 8,
                    completedQuantity: 242,
                    duration: 180,
                    worker: '송민호'
                },
                {
                    title: '도넛 제조',
                    material: '밀가루',
                    quantity: 200,
                    damaged: 4,
                    completedQuantity: 196,
                    duration: 95,
                    worker: '김태희'
                },
                {
                    title: '애플파이 제조',
                    material: '사과',
                    quantity: 100,
                    damaged: 2,
                    completedQuantity: 98,
                    duration: 130,
                    worker: '이동욱'
                }
            ]
        },
        '2025-11-14': {
            pending: [
                {
                    title: '티라미수 제조',
                    material: '마스카포네 치즈',
                    quantity: 70,
                    worker: '박보검'
                }
            ],
            completed: []
        },
        '2025-11-15': {
            pending: [],
            completed: [
                {
                    title: '마들렌 제조',
                    material: '버터',
                    quantity: 160,
                    damaged: 3,
                    completedQuantity: 157,
                    duration: 85,
                    worker: '전지현'
                },
                {
                    title: '휘낭시에 제조',
                    material: '아몬드 가루',
                    quantity: 140,
                    damaged: 2,
                    completedQuantity: 138,
                    duration: 75,
                    worker: '공유'
                }
            ]
        },
        '2025-11-18': {
            pending: [
                {
                    title: '오페라 케이크 제조',
                    material: '커피',
                    quantity: 60,
                    worker: '배수지'
                },
                {
                    title: '몽블랑 제조',
                    material: '밤',
                    quantity: 50,
                    worker: '남주혁'
                },
                {
                    title: '에클레어 제조',
                    material: '슈크림',
                    quantity: 110,
                    worker: '아이유'
                }
            ],
            completed: [
                {
                    title: '카스테라 제조',
                    material: '계란',
                    quantity: 220,
                    damaged: 6,
                    completedQuantity: 214,
                    duration: 140,
                    worker: '정해인'
                }
            ]
        },
        '2025-11-20': {
            pending: [],
            completed: [
                {
                    title: '롤케이크 제조',
                    material: '생크림',
                    quantity: 130,
                    damaged: 3,
                    completedQuantity: 127,
                    duration: 105,
                    worker: '김고은'
                }
            ]
        },
        '2025-11-22': {
            pending: [
                {
                    title: '프레즐 제조',
                    material: '밀가루',
                    quantity: 190,
                    worker: '박서준'
                },
                {
                    title: '스콘 제조',
                    material: '버터밀크',
                    quantity: 150,
                    worker: '손예진'
                }
            ],
            completed: [
                {
                    title: '머핀 제조',
                    material: '블루베리',
                    quantity: 170,
                    damaged: 4,
                    completedQuantity: 166,
                    duration: 90,
                    worker: '현빈'
                },
                {
                    title: '베이글 제조',
                    material: '밀가루',
                    quantity: 200,
                    damaged: 5,
                    completedQuantity: 195,
                    duration: 125,
                    worker: '한지민'
                }
            ]
        },
        '2025-11-23': {
            pending: [],
            completed: [
                {
                    title: '시폰 케이크 제조',
                    material: '계란',
                    quantity: 100,
                    damaged: 2,
                    completedQuantity: 98,
                    duration: 110,
                    worker: '김선생'
                }
            ]
        },
        '2025-11-25': {
            pending: [
                {
                    title: '파운드 케이크 제조',
                    material: '버터',
                    quantity: 120,
                    worker: '이민호'
                }
            ],
            completed: [
                {
                    title: '당근 케이크 제조',
                    material: '당근',
                    quantity: 95,
                    damaged: 2,
                    completedQuantity: 93,
                    duration: 115,
                    worker: '수지'
                }
            ]
        },
        '2025-11-27': {
            pending: [],
            completed: [
                {
                    title: '녹차 쿠키 제조',
                    material: '녹차 가루',
                    quantity: 200,
                    damaged: 5,
                    completedQuantity: 195,
                    duration: 150,
                    worker: '이선생'
                },
                {
                    title: '초코칩 쿠키 제조',
                    material: '초코칩',
                    quantity: 180,
                    damaged: 3,
                    completedQuantity: 177,
                    duration: 95,
                    worker: '박신혜'
                }
            ]
        },
        '2025-11-28': {
            pending: [
                {
                    title: '타르트 제조',
                    material: '과일',
                    quantity: 85,
                    worker: '조인성'
                },
                {
                    title: '푸딩 제조',
                    material: '우유',
                    quantity: 150,
                    worker: '송혜교'
                }
            ],
            completed: [
                {
                    title: '피낭시에 제조',
                    material: '버터',
                    quantity: 130,
                    damaged: 2,
                    completedQuantity: 128,
                    duration: 80,
                    worker: '강동원'
                }
            ]
        },
        '2025-11-30': {
            pending: [
                {
                    title: '젤라또 제조',
                    material: '우유',
                    quantity: 250,
                    worker: '박선생'
                }
            ],
            completed: []
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="gap-4 h-full">
            <div className='mb-4 flex items-center space-x-2'>
                <CalendarCheck className='h-5 w-5 text-[#674529]'/>
                <h2 className="text-lg font-semibold text-[#674529]">제조이력 캘린더</h2>
            </div>
            <div className="flex">
                {/* 캘린더 컴포넌트 */}
                <ManufacturingCalendar
                    onDateSelect={handleDateSelect}
                    manufacturingData={calendarSummaryData}
                />

                {/* 제조이력 목록 컴포넌트 */}
                <ManufacturingHistoryList
                    selectedDate={selectedDate}
                    historyData={detailedHistoryData}
                />
            </div>
        </div>
    )
}

export default ManufacturingHistoryView;