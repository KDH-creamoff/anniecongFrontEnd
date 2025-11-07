import PropTypes from "prop-types";

const ManufacturingHistoryList = ({ selectedDate, historyData }) => {
    // historyData는 이미 선택된 날짜의 데이터 (pending, completed 배열을 가진 객체)
    const { pending = [], completed = [] } = historyData || { pending: [], completed: [] };

    return (
        <div className="flex-col">
            <div>
                <div className="bg-[#F5E6D3] px-4 py-3 rounded">
                    <h3 className="text-[#674529] font-semibold">
                        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 제조이력
                    </h3>
                </div>
            </div>
            <div className="w-80 bg-white rounded-lg shadow-sm p-6">
                {/* 작업대기목록 */}
                <div className="space-y-3 mb-6">
                    <div className="mb-2">
                        <h4 className="text-sm font-semibold text-[#674529] mb-2">작업대기목록</h4>
                    </div>

                    {pending.length > 0 ? (
                        pending.map((item, index) => (
                            <div key={index} className="border border-[#674529] rounded p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-sm text-[#674529]">{item.title}</span>
                                </div>
                                <div className="text-xs text-[#674529]">
                                    <div>{item.material} - {item.quantity}개</div>
                                </div>
                                <div className="text-xs text-[#674529] mt-2 text-right">
                                    작업자: {item.worker}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-400 text-sm">
                            작업대기 항목이 없습니다.
                        </div>
                    )}
                </div>

                {/* 작업완료목록 */}
                <div className="space-y-3">
                    <div className="mb-2">
                        <h4 className="text-sm font-semibold text-[#674529] mb-2">작업완료목록</h4>
                    </div>

                    {completed.length > 0 ? (
                        completed.map((item, index) => (
                            <div key={index} className="border border-[#674529] rounded p-3">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-sm text-[#674529]">{item.title}</span>
                                </div>
                                <div className="text-xs text-[#674529]">
                                    <div>{item.material} - {item.quantity}개</div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-xs text-[#674529]">
                                        <div>파손량: {item.damaged}</div>
                                    </div>
                                    <div className="text-xs text-[#674529]">
                                        <div>작업 완료량: {item.completedQuantity}</div>
                                    </div>
                                </div>
                                <div className="text-xs text-[#674529]">
                                    <div>소요시간: {item.duration}분</div>
                                </div>
                                <div className="text-xs text-[#674529] mt-2 text-right">
                                    작업자: {item.worker}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-400 text-sm">
                            작업완료 항목이 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ManufacturingHistoryList.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    historyData: PropTypes.object
};

export default ManufacturingHistoryList;
