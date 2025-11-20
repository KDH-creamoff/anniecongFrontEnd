import { useState, useRef } from 'react';

const EquipmentInspectionForm = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();
  const [managerImage, setManagerImage] = useState(null);
  const [supervisorImage, setSupervisorImage] = useState(null);
  const managerInputRef = useRef(null);
  const supervisorInputRef = useRef(null);

  const handleManagerClick = () => {
    managerInputRef.current?.click();
  };

  const handleSupervisorClick = () => {
    supervisorInputRef.current?.click();
  };

  const handleManagerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setManagerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSupervisorImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSupervisorImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Hidden file inputs - PDF에 포함되지 않도록 contentRef 밖에 배치 */}
      <input
        type="file"
        ref={managerInputRef}
        onChange={handleManagerImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={supervisorInputRef}
        onChange={handleSupervisorImageChange}
        accept="image/*"
        className="hidden"
      />

      <div ref={contentRef} className="w-full max-w-[1400px] mx-auto p-5 bg-white">
        {/* 제목 */}
        <div className="border-2 border-black mb-4">
          <h1 className="text-2xl font-bold text-center py-4">설비정기점검표</h1>
        </div>

        {/* 상단 정보 */}
      <div className="mb-1">
        <div className="flex mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">설비점검주기 :</span>
            <input type="text" className="outline-none px-1 w-64" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">점검일시 :</span>
            <input type="text" className="outline-none px-1 w-64" />
          </div>
        </div>
      </div>

      {/* 메인 테이블 */}
      <table className="w-full border-collapse border-2 border-black">
        <thead>
          <tr>
            <th className="border border-black p-2 text-center font-medium">기기명</th>
            <th className="border border-black p-2 text-center font-medium">점검결과</th>
            <th className="border border-black p-2 text-center font-medium">조치사항</th>
            <th className="border border-black p-2 text-center font-medium">비고</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(14)].map((_, index) => (
            <tr key={index}>
              <td className="border border-black p-1 h-10">
                <input type="text" className="w-full h-full outline-none text-center" />
              </td>
              <td className="border border-black p-1 h-10">
                <input type="text" className="w-full h-full outline-none text-center" />
              </td>
              <td className="border border-black p-1 h-10">
                <input type="text" className="w-full h-full outline-none text-center" />
              </td>
              <td className="border border-black p-1 h-10">
                <input type="text" className="w-full h-full outline-none text-center" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 하단 안내문구 */}
      <div className="mt-2 text-sm mb-8">
        <p>※ 특정설비에 대하여는 위 양식번호를 사용하며 양식의 관리내용을 변경할 수 있음</p>
      </div>

            <div className="flex justify-end mb-6">
        <table className="border-2 border-black border-collapse">
          <tbody>
            <tr>
              <td className="h-8 border-2 border-black px-4 py-2 text-center text-sm"></td>
              <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
              <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
              <td className="border-2 border-black px-4 py-2 text-center text-sm"></td>
            </tr>
            <tr>
              <td
                className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
              >
              </td>
              <td
                className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
              >
              </td>
              <td
                className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
              >
              </td>
              <td
                className="border-2 border-black w-20 h-16 cursor-pointer hover:bg-gray-50"
              >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default EquipmentInspectionForm;
