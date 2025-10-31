import { useState } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

const ManufacturingHistoryView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 달력 데이터 생성
    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // 빈 칸 추가
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        if (day) {
            setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
        }
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
               currentDate.getMonth() === today.getMonth() &&
               currentDate.getFullYear() === today.getFullYear();
    };

    const isSelectedDate = (day) => {
        return day === selectedDate.getDate() &&
               currentDate.getMonth() === selectedDate.getMonth() &&
               currentDate.getFullYear() === selectedDate.getFullYear();
    };

    const calendarDays = generateCalendar();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // 제조 이력 데이터 (예시)
    const manufacturingData = {
        23: [{ type: '작업완료 1개', color: 'bg-green-200' }],
        27: [{ type: '작업완료 1개', color: 'bg-green-200' }],
        31: [{ type: '작업대기 1개', color: 'bg-yellow-200' }]
    };

    return (
        <div className="gap-4 h-full">
            <div className='mb-4 flex items-center space-x-2'>
                <CalendarCheck className='h-5 w-5 text-[#674529]'/>
                <h2 className="text-lg font-semibold text-[#674529]">제조이력 캘린더</h2>
            </div>
            <div className="flex">
                {/* 캘린더 영역 */}
                <div className="flex-1 bg-white shadow-sm mr-4">
                    {/* 월 네비게이션 */}
                    <div className="flex items-center justify-between mb-4 bg-[#F5E6D3] py-3">
                        <span className="mx-4 text-[#674529] font-medium">
                            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                        </span>
                        <div className="flex px-2 gap-2">
                            <button
                                onClick={handlePrevMonth}
                                className="p-1 bg-[#fff] rounded border border-[#674529]"
                            >
                                <ChevronLeft className="h-5 w-5 text-[#674529]" />
                            </button>
                            <button
                                onClick={handleNextMonth}
                                className="p-1 bg-[#fff] rounded border border-[#674529]"
                            >
                                <ChevronRight className="h-5 w-5 text-[#674529]" />
                            </button>
                        </div>
                    </div>

                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 mx-6">
                        {weekDays.map((day, index) => (
                            <div
                                key={day}
                                className={`text-center py-2 font-semibold text-sm ${
                                    index === 0 ? 'text-red-600' :
                                    index === 6 ? 'text-blue-600' :
                                    'text-[#674529]'
                                } bg-[#674529] text-white`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* 달력 그리드 */}
                    <div className="grid grid-cols-7 border border-[#F5E6D3] mx-6 mb-4">
                        {calendarDays.map((day, index) => (
                            <div
                                key={index}
                                onClick={() => handleDateClick(day)}
                                className={`
                                    min-h-[80px] p-2 border border-[#F5E6D3]
                                    ${day ? 'cursor-pointer hover:bg-gray-50' : ''}
                                    ${isSelectedDate(day) ? 'bg-[#FFF8DC]' : ''}
                                    ${isToday(day) ? 'bg-[#FFF8DC]' : ''}
                                `}
                            >
                                {day && (
                                    <>
                                        <div className={`text-sm mb-1 ${
                                            index % 7 === 0 ? 'text-red-600' :
                                            index % 7 === 6 ? 'text-blue-600' :
                                            'text-gray-700'
                                        }`}>
                                            {day}
                                        </div>
                                        {manufacturingData[day] && (
                                            <div className="space-y-1">
                                                {manufacturingData[day].map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`text-xs px-2 py-1 rounded ${item.color} text-gray-100`}
                                                    >
                                                        {item.type}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 작업대기목록 영역 */}
                <div className="flex-col">
                    <div>
                        <div className="bg-[#F5E6D3] px-4 py-3 rounded">
                            <h3 className="text-[#674529] font-semibold">
                                {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 제조이력
                            </h3>
                        </div>
                    </div>
                    <div className="w-80 bg-white rounded-lg shadow-sm p-6">
                        <div className="space-y-3 mb-6">
                            <div className="mb-2">
                                <h4 className="text-sm font-semibold text-[#674529] mb-2">작업대기목록</h4>
                            </div>

                            {/* 작업 항목 예시 */}
                            <div className="border border-[#674529] rounded p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-sm text-[#674529]">Title</span>
                                </div>
                                <div className="text-xs text-[#674529]">
                                    <div>원자재 이름 - 100개</div>
                                </div>
                                <div className="text-xs text-[#674529] mt-2 text-right">
                                    작업자: 김선생
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="mb-2">
                                <h4 className="text-sm font-semibold text-[#674529] mb-2">작업완료목록</h4>
                            </div>

                            {/* 작업 항목 예시 */}
                            <div className="border border-[#674529] rounded p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-sm text-[#674529]">Title</span>
                                </div>
                                <div className="text-xs text-[#674529]">
                                    <div>원자재 이름 - 100개</div>
                                </div>
                                <div className="flex">
                                    <div className="text-xs text-[#674529]">
                                        <div>파손량: 2</div>
                                    </div>
                                    <div className="text-xs text-[#674529]">
                                        <div>작업 완료량: 98</div>
                                    </div>
                                </div>
                                <div className="text-xs text-[#674529]">
                                    <div>소요시간: 110분</div>
                                </div>
                                <div className="text-xs text-[#674529] mt-2 text-right">
                                    작업자: 김선생
                                </div>
                            </div>

                            {/* 항목이 없을 때 */}
                            <div className="text-center py-8 text-gray-400 text-sm">
                                선택한 날짜에 제조 이력이 없습니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturingHistoryView;