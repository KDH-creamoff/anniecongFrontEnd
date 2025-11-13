import { useState, useRef } from "react";

const WasteManagementLedger = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [formData, setFormData] = useState({
    year: "20",
    month: "",
    rows: Array(8).fill({
      date: "",
      disposalMethod: "",
      quantity: "",
      previousDate: "",
      previousMethod: "",
      previousDisposal: "",
      previousQuantity: "",
      retentionDate: "",
      retentionMethod: "",
      retentionManager: "",
      retentionDisposal: "",
      retentionQuantity: "",
      remarks: "",
      personInCharge: "",
      confirmer: "",
    }),
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...formData.rows];
    newRows[index] = {
      ...newRows[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      rows: newRows,
    }));
  };

  return (
    <div ref={contentRef} className="w-[230mm] mx-auto py-[10mm] px-[10mm] bg-white box-border">
      <div className="w-full h-full">
        <h1 className="text-center text-xl font-bold mb-3 tracking-wider">
          폐기물(폐사료) 관리대장
        </h1>

        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr>
              <th
                colSpan="3"
                className="border border-black p-2.5 text-center align-middle text-[13px] font-bold bg-white"
              >
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  className="w-[30px] border-none text-center text-[13px] font-bold bg-transparent outline-none mx-1"
                />
                년
                <input
                  type="text"
                  value={formData.month || ""}
                  onChange={(e) => handleInputChange("month", e.target.value)}
                  className="w-[30px] border-none text-center text-[13px] font-bold bg-transparent outline-none mx-1"
                />
                월 발생내역
              </th>
              <th
                colSpan="4"
                className="border border-black p-2.5 text-center align-middle text-[13px] font-bold"
              >
                자가처리 내역
              </th>
              <th
                colSpan="5"
                className="border border-black p-2.5 text-center align-middle text-[13px] font-bold"
              >
                위탁처리 내역
              </th>
              <th 
                rowSpan={2}
                className="border border-black p-2.5 text-center align-middle text-[13px] font-bold"
              >
                보관량
              </th>
              <th
                colSpan="2"
                className="border border-black p-2.5 text-center align-middle text-[13px] font-bold"
              >
                결 재
              </th>
            </tr>
            <tr>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                월일
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                발생량
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                누계
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                월일
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                방법
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                처리량
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                누계
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                월일
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                방법
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                운반자
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                처리량
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                누계
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                담당자
              </th>
              <th className="border border-black p-2 text-center align-middle text-xs h-[45px] font-bold">
                책임자
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.date}
                    onChange={(e) =>
                      handleRowChange(index, "date", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.disposalMethod}
                    onChange={(e) =>
                      handleRowChange(index, "disposalMethod", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(index, "quantity", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.previousDate}
                    onChange={(e) =>
                      handleRowChange(index, "previousDate", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.previousMethod}
                    onChange={(e) =>
                      handleRowChange(index, "previousMethod", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.previousDisposal}
                    onChange={(e) =>
                      handleRowChange(index, "previousDisposal", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.previousQuantity}
                    onChange={(e) =>
                      handleRowChange(index, "previousQuantity", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.retentionDate}
                    onChange={(e) =>
                      handleRowChange(index, "retentionDate", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.retentionMethod}
                    onChange={(e) =>
                      handleRowChange(index, "retentionMethod", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.retentionManager}
                    onChange={(e) =>
                      handleRowChange(index, "retentionManager", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.retentionDisposal}
                    onChange={(e) =>
                      handleRowChange(
                        index,
                        "retentionDisposal",
                        e.target.value
                      )
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.retentionQuantity}
                    onChange={(e) =>
                      handleRowChange(
                        index,
                        "retentionQuantity",
                        e.target.value
                      )
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.remarks}
                    onChange={(e) =>
                      handleRowChange(index, "remarks", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.personInCharge}
                    onChange={(e) =>
                      handleRowChange(index, "personInCharge", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
                <td className="border border-black p-2 text-center align-middle text-xs h-[45px]">
                  <input
                    type="text"
                    value={row.confirmer}
                    onChange={(e) =>
                      handleRowChange(index, "confirmer", e.target.value)
                    }
                    className="w-full border-none bg-transparent text-center text-xs p-1 outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WasteManagementLedger;
