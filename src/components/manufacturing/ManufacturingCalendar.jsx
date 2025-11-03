import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

const ManufacturingCalendar = ({ onDateSelect, manufacturingData }) => {
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
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            setSelectedDate(newDate);
            onDateSelect(newDate);
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

    // 날짜별 제조이력 데이터 가져오기
    const getManufacturingDataForDate = (day) => {
        if (!day || !manufacturingData) return null;

        const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return manufacturingData[dateKey];
    };

    const calendarDays = generateCalendar();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    return (
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
                {calendarDays.map((day, index) => {
                    const dayData = getManufacturingDataForDate(day);

                    return (
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
                                    {dayData && (
                                        <div className="space-y-1">
                                            {dayData.pending > 0 && (
                                                <div className="text-xs px-2 py-1 rounded bg-yellow-200 text-gray-700">
                                                    대기 {dayData.pending}개
                                                </div>
                                            )}
                                            {dayData.completed > 0 && (
                                                <div className="text-xs px-2 py-1 rounded bg-green-200 text-gray-700">
                                                    완료 {dayData.completed}개
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

ManufacturingCalendar.propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    manufacturingData: PropTypes.object
};

export default ManufacturingCalendar;
