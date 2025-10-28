import { useRef, useState } from "react";

const PestControlManagement = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  // 상단 헤더 정보
  const [headerInfo, setHeaderInfo] = useState({
    documentNumber: "",
    pageNumber: "",
    revisionDate: "",
    revisionNumber: ""
  });

  // 개정 이력 데이터 (9개 행)
  const [revisionHistory, setRevisionHistory] = useState(
    Array(9).fill(null).map(() => ({
      number: "",
      date: "",
      reason: "",
      summary: ""
    }))
  );

  // 서명 정보
  const [signatureInfo, setSignatureInfo] = useState({
    작성1: { team: "", position: "", signature: "", date: "" },
    작성2: { team: "", position: "", signature: "", date: "" },
    검토1: { team: "", position: "", signature: "", date: "" },
    검토2: { team: "", position: "", signature: "", date: "" },
    검토3: { team: "", position: "", signature: "", date: "" },
    승인: { team: "", position: "", signature: "", date: "" }
  });

  const handleHeaderChange = (field, value) => {
    setHeaderInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleRevisionChange = (index, field, value) => {
    setRevisionHistory(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSignatureChange = (role, field, value) => {
    setSignatureInfo(prev => ({
      ...prev,
      [role]: { ...prev[role], [field]: value }
    }));
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-8">
      <div ref={contentRef} className="border border-black" style={{fontSize: '11px', lineHeight: '1'}}>
        {/* 상단 헤더 */}
        <table className="w-full border-collapse" style={{tableLayout: 'fixed', borderCollapse: 'collapse'}}>
          <colgroup>
            <col style={{width: '80px'}} />
            <col style={{width: '150px'}} />
            <col style={{width: 'auto'}} />
            <col style={{width: '180px'}} />
          </colgroup>
          <tbody>
            <tr>
              <td rowSpan={5} className="border border-black text-center font-semibold" style={{verticalAlign: 'middle', padding: '4px'}}>
                012
              </td>
            </tr>
            <tr style={{height: '35px'}}>
              <td rowSpan={2} colSpan={2} className="border border-black text-center font-bold" style={{verticalAlign: 'middle', fontSize: '18px', padding: '2px'}}>
                선행요건관리
              </td>
              <td className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '4px', lineHeight: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span style={{whiteSpace: 'nowrap'}}>문서번호:</span>
                  <input
                    type="text"
                    value={headerInfo.documentNumber}
                    onChange={(e) => handleHeaderChange("documentNumber", e.target.value)}
                    className="border-0 outline-none bg-transparent text-sm"
                    style={{flex: 1, lineHeight: '1', padding: '0', margin: '0'}}
                  />
                </div>
              </td>
            </tr>
            <tr style={{height: '35px'}}>
              <td className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '4px', lineHeight: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span style={{whiteSpace: 'nowrap'}}>페이지:</span>
                  <input
                    type="text"
                    value={headerInfo.pageNumber}
                    onChange={(e) => handleHeaderChange("pageNumber", e.target.value)}
                    className="border-0 outline-none bg-transparent text-sm"
                    style={{flex: 1, lineHeight: '1', padding: '0', margin: '0'}}
                  />
                </div>
              </td>
            </tr>

            <tr style={{height: '35px'}}>
              <td rowSpan={2} colSpan={2} className="border border-black text-center font-bold" style={{verticalAlign: 'middle', fontSize: '18px', padding: '2px'}}>
                방역관리기준
              </td>
              <td className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '4px', lineHeight: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span style={{whiteSpace: 'nowrap'}}>개정일자:</span>
                  <input
                    type="text"
                    value={headerInfo.revisionDate}
                    onChange={(e) => handleHeaderChange("revisionDate", e.target.value)}
                    className="border-0 outline-none bg-transparent text-sm"
                    style={{flex: 1, lineHeight: '1', padding: '0', margin: '0'}}
                  />
                </div>
              </td>
            </tr>
            <tr style={{height: '35px'}}>
              <td className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '4px', lineHeight: '1'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <span style={{whiteSpace: 'nowrap'}}>개정번호:</span>
                  <input
                    type="text"
                    value={headerInfo.revisionNumber}
                    onChange={(e) => handleHeaderChange("revisionNumber", e.target.value)}
                    className="border-0 outline-none bg-transparent text-sm"
                    style={{flex: 1, lineHeight: '1', padding: '0', margin: '0'}}
                  />
                </div>
              </td>
            </tr>

          </tbody>
        </table>

        {/* 개정 이력 테이블 */}
        <table className="w-full border-collapse" style={{tableLayout: 'fixed', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{height: '28px'}}>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', width: '60px', padding: '2px', lineHeight: '1'}}>개정번호</td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>제·개정 일자</td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>제·개정 사유</td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>제·개정 내용 요약</td>
            </tr>
          </thead>
          <tbody>
            {revisionHistory.map((item, idx) => (
              <tr key={idx} style={{height: '45px'}}>
                <td className="border border-black text-center text-sm" style={{verticalAlign: 'middle', padding: '8px 2px', lineHeight: '1'}}>
                  {idx + 1}
                </td>
                <td className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => handleRevisionChange(idx, "date", e.target.value)}
                    className="w-full border-0 outline-none bg-transparent text-sm"
                    style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1', height: '100%'}}
                  />
                </td>
                <td className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                  <input
                    type="text"
                    value={item.reason}
                    onChange={(e) => handleRevisionChange(idx, "reason", e.target.value)}
                    className="w-full border-0 outline-none bg-transparent text-sm"
                    style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1', height: '100%'}}
                  />
                </td>
                <td colSpan={2} className="border border-black text-sm" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                  <input
                    type="text"
                    value={item.summary}
                    onChange={(e) => handleRevisionChange(idx, "summary", e.target.value)}
                    className="w-full border-0 outline-none bg-transparent text-sm"
                    style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1', height: '100%'}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 서명 섹션 */}
        <table className="w-full border-collapse" style={{tableLayout: 'fixed', borderCollapse: 'collapse'}}>
          <colgroup>
            <col style={{width: '65px'}} />
            <col style={{width: '12.5%'}} />
            <col style={{width: '12.5%'}} />
            <col style={{width: '12.5%'}} />
            <col style={{width: '12.5%'}} />
            <col style={{width: '12.5%'}} />
            <col style={{width: '12.5%'}} />
            <col style={{width: '12.5%'}} />
          </colgroup>
          <tbody>
            <tr style={{height: '28px'}}>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', width: '65px', padding: '2px', lineHeight: '1'}}>구 분</td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>작 성</td>
              <td colSpan={3} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>검 토</td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>승 인</td>
            </tr>
            <tr style={{height: '40px'}}>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>팀 명</td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성1.team}
                  onChange={(e) => handleSignatureChange("작성1", "team", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성2.team}
                  onChange={(e) => handleSignatureChange("작성2", "team", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토1.team}
                  onChange={(e) => handleSignatureChange("검토1", "team", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토2.team}
                  onChange={(e) => handleSignatureChange("검토2", "team", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토3.team}
                  onChange={(e) => handleSignatureChange("검토3", "team", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.승인.team}
                  onChange={(e) => handleSignatureChange("승인", "team", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
            </tr>
            <tr style={{height: '40px'}}>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>직 책</td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성1.position}
                  onChange={(e) => handleSignatureChange("작성1", "position", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성2.position}
                  onChange={(e) => handleSignatureChange("작성2", "position", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토1.position}
                  onChange={(e) => handleSignatureChange("검토1", "position", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토2.position}
                  onChange={(e) => handleSignatureChange("검토2", "position", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토3.position}
                  onChange={(e) => handleSignatureChange("검토3", "position", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.승인.position}
                  onChange={(e) => handleSignatureChange("승인", "position", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
            </tr>
            <tr style={{height: '40px'}}>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>서 명</td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성1.signature}
                  onChange={(e) => handleSignatureChange("작성1", "signature", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성2.signature}
                  onChange={(e) => handleSignatureChange("작성2", "signature", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토1.signature}
                  onChange={(e) => handleSignatureChange("검토1", "signature", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토2.signature}
                  onChange={(e) => handleSignatureChange("검토2", "signature", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토3.signature}
                  onChange={(e) => handleSignatureChange("검토3", "signature", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.승인.signature}
                  onChange={(e) => handleSignatureChange("승인", "signature", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                />
              </td>
            </tr>
            <tr style={{height: '40px'}}>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px', lineHeight: '1'}}>서명일자</td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성1.date}
                  onChange={(e) => handleSignatureChange("작성1", "date", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                  placeholder="/"
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.작성2.date}
                  onChange={(e) => handleSignatureChange("작성2", "date", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                  placeholder="/"
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토1.date}
                  onChange={(e) => handleSignatureChange("검토1", "date", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                  placeholder="/"
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토2.date}
                  onChange={(e) => handleSignatureChange("검토2", "date", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                  placeholder="/"
                />
              </td>
              <td className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.검토3.date}
                  onChange={(e) => handleSignatureChange("검토3", "date", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                  placeholder="/"
                />
              </td>
              <td colSpan={2} className="border border-black text-sm text-center" style={{verticalAlign: 'middle', padding: '2px 4px', lineHeight: '1'}}>
                <input
                  type="text"
                  value={signatureInfo.승인.date}
                  onChange={(e) => handleSignatureChange("승인", "date", e.target.value)}
                  className="w-full border-0 outline-none bg-transparent text-sm text-center"
                  style={{verticalAlign: 'middle', padding: '0', margin: '0', lineHeight: '1'}}
                  placeholder="/"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PestControlManagement;
