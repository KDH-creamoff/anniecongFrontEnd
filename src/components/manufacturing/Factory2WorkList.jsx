import { BarChart3, Clock, CheckCircle, Users } from "lucide-react";

const Factory2WorkList = () => {
 const statusCards = [
    {
      label: "진행중 작업",
      count: 1,
      icon: <BarChart3 className="w-5 h-5" />,
      iconBgColor: "bg-[#FDB572]",
      textColor: "text-gray-600"
    },
    {
      label: "대기 작업",
      count: 1,
      icon: <Clock className="w-5 h-5" />,
      iconBgColor: "bg-[#A8D08D]",
      textColor: "text-gray-600"
    },
    {
      label: "완료 작업",
      count: 1,
      icon: <CheckCircle className="w-5 h-5" />,
      iconBgColor: "bg-[#674529]",
      textColor: "text-gray-600"
    },
    {
      label: "작업자",
      count: 3,
      icon: <Users className="w-5 h-5" />,
      iconBgColor: "bg-yellow-700",
      textColor: "text-gray-600"
    }
  ];

  return (
    <div className="p-5 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-200"
          >
            <div className="flex-1">
              <p className={`text-sm font-medium ${card.textColor} mb-2`}>
                {card.label}
              </p>
              <p className="text-3xl font-bold text-gray-900">{card.count}</p>
            </div>
            <div
              className={`${card.iconBgColor} text-white w-12 h-12 rounded-xl flex items-center justify-center`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Factory2WorkList;