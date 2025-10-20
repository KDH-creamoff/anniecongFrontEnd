import { useRef } from "react";
import PdfDownloadButton from "../common/PdfDownloadButton";

const FeedMillStandards = () => {
  const contentRef = useRef();

  return (
    <div className="mx-auto max-w-4xl bg-white p-8">
      <div ref={contentRef} className="border border-black">
        {/* 상단 헤더 */}
        <table className="w-full border-collapse table-fixed">
          <tbody>
            <tr>
              <td rowSpan={5} className="w-20 border border-black text-center align-middle font-semibold">
                001 
              </td>
            </tr>
            <tr>
              <td rowSpan={2} colSpan={2}  className="border border-black text-center font-bold text-xl align-middle">
                선행요건관리
              </td>
              <td className="w-24 border border-black text-sm p-1 text-left">문서번호 :</td>
            </tr>
            <tr>
              <td className="border border-black text-sm p-1 text-left">페이지 :</td>
            </tr>
              
            <tr>
              <td rowSpan={2} colSpan={2} className="border border-black text-center font-bold text-xl align-middle">
                사료공장관리기준
              </td>
              <td className="border border-black text-sm p-1 text-left">개정일자 :</td>
            </tr>
            <tr>
              <td className="border border-black text-sm p-1 text-left">개정번호 :</td>
            </tr>

          </tbody>
        </table>

        {/* 개정 이력 테이블 */}
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="w-14 border border-black bg-gray-100 p-1 text-xs">개정번호</th>
              <th className="border border-black bg-gray-100 p-1 text-xs">제·개정 일자</th>
              <th className="border border-black bg-gray-100 p-1 text-xs">제·개정 사유</th>
              <th colSpan={2} className="border border-black bg-gray-100 p-1 text-xs">제·개정 내용 요약</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(9)].map((_, idx) => (
              <tr key={idx}>
                <td className="border border-black text-center p-1 text-sm">{idx + 1}</td>
                <td className="border border-black p-1 text-sm"></td>
                <td className="border border-black p-1 text-sm"></td>
                <td colSpan={2} className="border border-black p-1 text-sm"></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 서명 섹션 */}
        <table className="w-full border-collapse table-fixed">
          <tbody>
            <tr>
              <td className="w-16 border border-black bg-gray-100 p-1 text-sm text-center align-middle">구 분</td>
              <td colSpan={2} className="border border-black bg-gray-100 p-1 text-sm text-center">작 성</td>
              <td colSpan={3} className="border border-black bg-gray-100 p-1 text-sm text-center">검 토</td>
              <td colSpan={2} className="border border-black bg-gray-100 p-1 text-sm text-center">승 인</td>
            </tr>
            <tr>
              <td className="border border-black bg-gray-100 p-1 text-sm text-center">팀 명</td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td colSpan={2} rowSpan={2} className="border border-black p-2 text-sm"></td>
            </tr>
            <tr>
              <td className="border border-black bg-gray-100 p-1 text-sm text-center">직 책</td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
            </tr>
            <tr>
              <td className="border border-black bg-gray-100 p-1 text-sm text-center">서 명</td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td className="border border-black p-2 text-sm"></td>
              <td colSpan={2} className="border border-black p-2 text-sm"></td>
            </tr>
            <tr>
              <td className="border border-black bg-gray-100 p-1 text-sm text-center">서명일자</td>
              <td className="border border-black p-1 text-sm text-center">/</td>
              <td className="border border-black p-1 text-sm text-center">/</td>
              <td className="border border-black p-1 text-sm text-center">/</td>
              <td className="border border-black p-1 text-sm text-center">/</td>
              <td className="border border-black p-1 text-sm text-center">/</td>
              <td colSpan={2} className="border border-black p-1 text-sm text-center">/</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PdfDownloadButton
        contentRef={contentRef}
        filename="사료공장관리기준.pdf"
        buttonText="PDF 다운로드"
        className="mt-20 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
      />
    </div>
  );
};

export default FeedMillStandards;
