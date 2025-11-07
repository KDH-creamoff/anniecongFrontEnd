import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarCheck } from "lucide-react";
import ManufacturingCalendar from "./ManufacturingCalendar";
import ManufacturingHistoryList from "./ManufacturingHistoryList";
import { fetchCalendarSummary, fetchHistoryByDate } from "../../store/modules/manufacturing/action";
import { selectCalendarSummary, selectCalendarSummaryLoading, selectHistoryByDate } from "../../store/modules/manufacturing/selectors";

const ManufacturingHistoryView = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 리덕스에서 캘린더 요약 데이터 가져오기
    const calendarSummaryFromRedux = useSelector(selectCalendarSummary);
    const calendarLoading = useSelector(selectCalendarSummaryLoading);
    // 선택한 날짜의 상세 이력 데이터 가져오기
    const historyByDate = useSelector(selectHistoryByDate);

    // 컴포넌트 마운트 시 캘린더 데이터 조회
    useEffect(() => {
        dispatch(fetchCalendarSummary.request());
    }, [dispatch]);

    // 선택한 날짜가 변경될 때 해당 날짜의 상세 이력 조회
    useEffect(() => {
        if (selectedDate) {
            const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            dispatch(fetchHistoryByDate.request({ date: dateKey }));
        }
    }, [selectedDate, dispatch]);

    const calendarSummaryData = calendarSummaryFromRedux || {};

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="gap-4 h-full">
            <div className='mb-4 flex items-center space-x-2'>
                <CalendarCheck className='h-5 w-5 text-[#674529]'/>
                <h2 className="text-lg font-semibold text-[#674529]">제조이력 캘린더</h2>
                {calendarLoading && (
                    <span className="text-sm text-gray-500">로딩 중...</span>
                )}
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
                    historyData={historyByDate}
                />
            </div>
        </div>
    )
}

export default ManufacturingHistoryView;