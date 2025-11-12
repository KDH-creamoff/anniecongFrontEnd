import { useRef } from 'react';

const PurchaseOrder = ({ pdfRef }) => {
  const contentRef = pdfRef || useRef();

  return (
    <div
      ref={contentRef}
      className="w-full max-w-[800px] mx-auto p-8 bg-white text-black text-[13px] leading-tight"
    >
      <div className='flex justify-between mb-4'>
        {/* 상단 헤더 */}
      <div>
        <div className="text-[11px] mb-0.5">애니콩 주식회사</div>
        <div className="text-[11px] mb-2">농업회사법인</div>
        <div className="text-3xl font-bold mb-1 tracking-[0.5em]">발 주 서</div>
        <div className="text-[10px] tracking-[0.3em] text-gray-600 mb-4">P U R C H A S E  O R D E R</div>
      </div>

      {/* 발주 번호 및 발주일자 - 우측 정렬 */}
      <div className="flex text-xs items-center">
        <div className="text-right">
          <div className="mb-1">
            발주번호 : 제
            <input
              type="text"
              className="w-28 mx-1 outline-none text-center"
            />
            호
          </div>
          <div>
            발주일자 : 20
              <input
                type="text"
                className="w-6 mx-1 outline-none text-center"
              />
              년
              <input
                type="text"
                className="w-6 mx-1 outline-none text-center"
              />
              월
              <input
                type="text"
                className="w-6 mx-1 outline-none text-center"
              />
              일
            </div>
          </div>
        </div>
      </div>

      {/* 수신처/발주처 테이블 */}
      <table className="w-full border border-black border-collapse mb-4 text-xs">
        <thead>
          <tr>
            <th colSpan={3} className="border border-black text-center py-1.5 px-2" style={{ backgroundColor: '#d3d3d3' }}>수 신 처</th>
            <th colSpan={3} className="border border-black text-center py-1.5 px-2" style={{ backgroundColor: '#d3d3d3' }}>발 주 처</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black text-center py-1.5 px-2 w-[60px]" style={{ backgroundColor: '#e8e8e8' }}>상 호</td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              애니콩 주식회사 농업회사법인
            </td>
            <td className="border border-black text-center py-1.5 px-2 w-[60px]" style={{ backgroundColor: '#e8e8e8' }}>상 호</td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              <input
                type="text"
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>대 표</td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              안은진
            </td>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>담 당 자</td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              <input
                type="text"
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>연 락 처</td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              054-510-7770
            </td>
            <td className="border border-black text-center py-1.5" style={{ backgroundColor: '#e8e8e8' }}>연 락 처</td>
            <td className="border border-black px-2 py-1.5" colSpan={2}>
              <input
                type="text"
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 합계금액 텍스트 */}
      <div className="text-center text-xs mb-2">
        <span className="font-bold">합계금액 : 원금 </span>
        <input
          type="text"
          className="w-32 outline-none text-center border-b border-black"
        />
        <span className="font-bold"> 원정 </span>
        <span className="italic">(VAT포함)</span>
      </div>

      {/* 품목 테이블 */}
      <table className="w-full border border-black border-collapse text-[10px] mb-4">
        <thead>
          <tr>
            <th className="border border-black text-center py-1 px-1 w-[30px]" style={{ backgroundColor: '#e8e8e8' }}>No.</th>
            <th className="border border-black text-center py-1 px-1" style={{ backgroundColor: '#e8e8e8' }}>품 명</th>
            <th className="border border-black text-center py-1 px-1 w-[60px]" style={{ backgroundColor: '#e8e8e8' }}>규 격</th>
            <th className="border border-black text-center py-1 px-1 w-[50px]" style={{ backgroundColor: '#e8e8e8' }}>수 량</th>
            <th className="border border-black text-center py-1 px-1 w-[70px]" style={{ backgroundColor: '#e8e8e8' }}>단 가</th>
            <th className="border border-black text-center py-1 px-1 w-[80px]" style={{ backgroundColor: '#e8e8e8' }}>공급가액</th>
            <th className="border border-black text-center py-1 px-1 w-[60px]" style={{ backgroundColor: '#e8e8e8' }}>비고</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((num) => (
            <tr key={num}>
              <td className="border border-black text-center py-3 px-1">{num}</td>
              <td className="border border-black py-3 px-1">
                <input
                  type="text"
                  className="w-full outline-none"
                />
              </td>
              <td className="border border-black py-3 px-1">
                <input
                  type="text"
                  className="w-full outline-none"
                />
              </td>
              <td className="border border-black py-3 px-1">
                <input
                  type="text"
                  className="w-full outline-none"
                />
              </td>
              <td className="border border-black py-3 px-1">
                <input
                  type="text"
                  className="w-full outline-none text-right"
                />
              </td>
              <td className="border border-black py-3 px-1">
                <input
                  type="text"
                  className="w-full outline-none text-right"
                />
              </td>
              <td className="border border-black py-3 px-1">
                <input
                  type="text"
                  className="w-full outline-none"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="border border-black text-center py-1.5 px-1 font-bold" style={{ backgroundColor: '#e8e8e8' }}>합 계</td>
            <td className="border border-black py-1.5 px-1">
              <input
                type="text"
                className="w-full outline-none"
              />
            </td>
            <td className="border border-black py-1.5 px-1">
              <input
                type="text"
                className="w-full outline-none text-right"
              />
            </td>
            <td className="border border-black py-1.5 px-1">
              <input
                type="text"
                className="w-full outline-none text-right"
              />
            </td>
            <td className="border border-black py-1.5 px-1">
              <input
                type="text"
                className="w-full outline-none"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 하단 테이블 - 참고사항 및 발주조건 */}
      <table className="w-full border border-black border-collapse text-[10px]">
        <tbody>
          <tr>
            <td className="border border-black text-center py-2 px-2 align-top w-[80px]" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="font-bold">참고사항</div>
            </td>
            <td className="border border-black py-2 px-3 align-top leading-relaxed">
              <div className="mb-1">발주일로부터 납품까지는 최소 2주 ~ 최대 3개월 소요될 수 있습니다.</div>
              <div className="mb-1">발주서 확인 후 생산 계약서 및 납품 일정을 확정하여 전달 드립니다.</div>
              <div className="mb-1">선금 50% 잔금 50% 진행되며, 선금 확인 후 생산일정이 확정됩니다.</div>
              <div>해당 발주서는 애니콩으로 전달 시점부터 법적인 효력이 있습니다.</div>
              <div className="mb-3"></div>
              <div className="mb-1">입금계좌 : 기업은행 / 애니콩 주식회사 농업회사법인 / 153-121028-04-014</div>
            </td>
          </tr>
          <tr>
            <td className="border border-black text-center py-2 px-2 align-top" style={{ backgroundColor: '#e8e8e8' }}>
              <div className="font-bold">발주조건</div>
            </td>
            <td className="border border-black py-2 px-3">
              <div className="space-y-1">
                <div className="flex">
                  <span className="mr-2">1)</span>
                  <div className="flex-1">
                    <span>지출조건 :</span>
                    <input
                      type="text"
                      className="ml-2 flex-1 outline-none"
                    />
                  </div>
                </div>
                <div className="flex">
                  <span className="mr-2">2)</span>
                  <div className="flex-1">
                    <span>납품장소 :</span>
                    <input
                      type="text"
                      className="ml-2 flex-1 outline-none"
                    />
                  </div>
                </div>
                <div className="flex">
                  <span className="mr-2">3)</span>
                  <div className="flex-1">
                    <span>희망납기일 :</span>
                    <input
                      type="text"
                      className="ml-2 flex-1 outline-none"
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrder;
