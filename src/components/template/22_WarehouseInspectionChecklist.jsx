import { useState, useRef } from 'react';

const WarehouseInspectionChecklist = ({ pdfRef }) => {
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

  const checklistItems = [
    { no: '1', question: '제품 및 원부재료는 구역별로 적재되어 있는가?' },
    { no: '2', question: '제품 및 원부재료적재 시 젖은 파렛트를 사용하지는 않았는가?' },
    { no: '3', question: '제품 및 원부재료 포장상태 중 파손된 것은 없는가?' },
    { no: '4', question: '제품 및 원부재료 선입선출은 이루어 지고 있는가?' },
    { no: '5', question: '부적합품의 경우 식별표시는 잘 되어있는가?' },
    { no: '6', question: '제품 및 원부재료 창고내부의 청소상태는 양호한가?' },
    { no: '7', question: '비가 세거나 습기가 차는 곳은 없는가?' },
    { no: '8', question: '통풍 및 환기 상태는 양호한가?' },
    { no: '9', question: '가연성 물질 등 화재의 위험은 없는가?' },
    { no: '10', question: '구서 및 조류방지 상태는 양호한가?' },
    { no: '11', question: '야적되어 있는 제품 및 원부재료에 덮개가 잘 씌어져 있는가?' }
  ];

  return (
    <>
      {/* Hidden file inputs */}
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

      <div ref={contentRef} className="w-full max-w-[900px] mx-auto p-5 bg-white">
        {/* 제목 및 날짜 헤더 */}
        <div className="border-2 border-black mb-4">
          {/* 제목 */}
          <div className="text-center text-3xl font-bold py-4">
            보관 창고 점검표
          </div>

          {/* 날짜 입력란 */}
          <div className="flex justify-center items-center gap-2 py-3 text-sm">
            <input type="text" className="w-10 outline-none text-center" />
            <span>년</span>
            <input type="text" className="w-10 outline-none text-center" />
            <span>월</span>
            <input type="text" className="w-10 outline-none text-center" />
            <span>일</span>
            <input type="text" className="w-12 outline-none text-center" />
            <span>요일</span>
          </div>
        </div>

        {/* 점검 테이블 */}
        <div className="border-2 border-black mb-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-16">
                  번호
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm">
                  점검내용
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-24">
                  양호
                </th>
                <th className="border border-black px-3 py-2 text-center font-bold text-sm w-24">
                  불량
                </th>
              </tr>
            </thead>
            <tbody>
              {checklistItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black px-3 py-3 text-center text-sm">
                    {item.no}
                  </td>
                  <td className="border border-black px-3 py-3 text-sm">
                    <div dangerouslySetInnerHTML={{ __html: item.question }} />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center" />
                  </td>
                  <td className="border border-black px-3 py-3">
                    <input type="text" className="w-full outline-none text-center" />
                  </td>
                </tr>
              ))}
              <tr>
                <td className='py-3 px-3 text-sm border border-b-0 border-black'>개선조치내역</td>
                <td>
                  <textarea
                    className="w-full h-32 outline-none resize-none text-sm"
                    placeholder=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WarehouseInspectionChecklist;
