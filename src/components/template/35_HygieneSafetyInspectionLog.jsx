import { useState, useRef } from "react";

const HygieneSafetyInspectionLog = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [formData, setFormData] = useState({
    year: "",
    month: "",
    items: [
      { category: "조리원 개인위생", detail: "건강상태", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "복장", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "조리실", detail: "바닥", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "조리가구, 기계", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "식기보관소", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "도마", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "쓰레기의 처리", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "세척/소독", detail: "식기/기구", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "행주", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "소독기 상태", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "냉동/냉장고", detail: "물품의 정리", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "바닥의 청결", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "온도", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "창고", detail: "물품의 정리정돈", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "쥐, 곤충류의 유무", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "동풍, 습기의 상태", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "자재함", detail: "자재 정리", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "유통기한 확인", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
      { category: "", detail: "비품 정리", rows: [{ name: "", check: ["", "", "", "", ""], total: "" }] },
    ],
    writer: "",
    writerStamp: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (itemIndex, rowIndex, field, checkIndex, value) => {
    const newItems = [...formData.items];
    if (field === "check") {
      newItems[itemIndex].rows[rowIndex].check[checkIndex] = value;
    } else {
      newItems[itemIndex].rows[rowIndex][field] = value;
    }
    setFormData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  return (
    <div ref={contentRef} className="w-[230mm] mx-auto py-[10mm] px-[10mm] bg-white box-border">
      <div className="w-full h-full">
        {/* 상단 테이블 */}
        <h1 className="text-center text-3xl font-bold mb-6 tracking-wider">
          위생점검일지
        </h1>

        <table className="w-full border-collapse border-2 border-black mb-6">
          <thead>
            <tr>
              <th className="border border-black p-2 text-center text-xs font-bold" colSpan={2}>
                일시
              </th>
              <th colSpan={8}>
                <input type="text" className="w-full p-2 text-center text-xs focus:outline-none"/>
              </th>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                구분
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                세부사항
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                월
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                화
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                수
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                목
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                금
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                토
              </td>
              <td className="border border-black p-2 text-center align-middle text-xs font-bold">
                비고
              </td>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, itemIndex) => (
              <tr key={itemIndex}>
                {item.category && (
                  <td
                    rowSpan={item.category === "조리원 개인위생" ? 2 : item.category === "조리실" ? 5 : item.category === "세척/소독" ? 3 : item.category === "냉동/냉장고" ? 3 : item.category === "창고" ? 3 : item.category === "자재함" ? 3 : 1}
                    className="border border-black p-2 text-center align-middle text-xs font-bold"
                  >
                    {item.category}
                  </td>
                )}
                <td className="border border-black p-2 text-center align-middle text-xs">
                  {item.detail}
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].check[0]}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "check", 0, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].check[1]}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "check", 1, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].check[2]}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "check", 2, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].check[3]}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "check", 3, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].check[4]}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "check", 4, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].total}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "total", null, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs">
                  <input
                    type="text"
                    value={item.rows[0].name}
                    onChange={(e) =>
                      handleItemChange(itemIndex, 0, "name", null, e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="border border-black p-2 text-center align-middle text-xs">비고</td>
              <td colSpan={8} className="border border-black p-2">양호○ / 보통 : △ / 불량 : X</td>
            </tr>
          </tbody>
        </table>

        {/* 하단 작성자 정보 */}
        <div className="flex justify-end items-center mt-8 text-sm">
          <span className="mr-4">작성자:</span>
          <input
            type="text"
            value={formData.writer}
            onChange={(e) => handleInputChange("writer", e.target.value)}
            className="w-32 border-b border-black text-center p-1 mr-2 outline-none bg-transparent"
            placeholder=""
          />
          <span className="mr-4">(인)</span>
        </div>

        {/* 하단 기관 정보 */}
        <div className="text-center mt-8">
          <p className="text-xl font-bold">애니콩 주식회사 농협회사법인</p>
        </div>
      </div>
    </div>
  );
};

export default HygieneSafetyInspectionLog;
