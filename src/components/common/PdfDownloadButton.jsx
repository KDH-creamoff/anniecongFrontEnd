import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * PDF 다운로드 버튼 컴포넌트
 * @param {Object} props
 * @param {React.RefObject} props.contentRef - PDF로 변환할 HTML 요소의 ref
 * @param {string} props.filename - 다운로드될 파일명 (기본값: "download.pdf")
 * @param {string} props.buttonText - 버튼에 표시될 텍스트 (기본값: "PDF 다운로드")
 * @param {string} props.className - 버튼에 적용될 추가 클래스명
 * @param {Function} props.onDownloadStart - 다운로드 시작 시 호출될 콜백
 * @param {Function} props.onDownloadComplete - 다운로드 완료 시 호출될 콜백
 * @param {Function} props.onDownloadError - 에러 발생 시 호출될 콜백
 */
const PdfDownloadButton = ({
  contentRef,
  filename = "download.pdf",
  buttonText = "PDF 다운로드",
  className = "",
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
}) => {
  const handleDownloadPdf = async () => {
    try {
      if (onDownloadStart) onDownloadStart();

      const element = contentRef.current;
      if (!element) {
        throw new Error("PDF로 변환할 요소를 찾을 수 없습니다.");
      }

      // HTML -> Canvas 변환 (높은 품질로 설정)
      const canvas = await html2canvas(element, {
        scale: 3, // 해상도 향상 (3배로 증가)
        useCORS: true, // 외부 이미지 사용 허용
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff", // 배경색 명시
        windowWidth: element.scrollWidth, // 전체 너비 캡처
        windowHeight: element.scrollHeight, // 전체 높이 캡처
        onclone: (clonedDoc) => {
          // 복제된 문서에서 테이블 셀들의 정렬을 강제 적용
          const clonedElement = clonedDoc.querySelector('[ref="contentRef"]') || clonedDoc.body.querySelector('div');
          if (clonedElement) {
            // 모든 테이블에 border-collapse 적용
            const tables = clonedElement.querySelectorAll('table');
            tables.forEach(table => {
              table.style.borderCollapse = 'collapse';
            });

            const cells = clonedElement.querySelectorAll('td, th');
            cells.forEach(cell => {
              // 테이블 셀의 display를 table-cell로 강제 설정
              cell.style.display = 'table-cell';
              cell.style.verticalAlign = 'middle';

              // input 요소들을 처리
              const inputs = cell.querySelectorAll('input');
              inputs.forEach(input => {
                const value = input.value;
                const placeholder = input.placeholder;
                const textAlign = window.getComputedStyle(input).textAlign;

                // input을 div로 감싸진 텍스트로 변환
                const textDiv = clonedDoc.createElement('div');
                textDiv.textContent = value || placeholder || '';
                textDiv.style.textAlign = textAlign;
                textDiv.style.lineHeight = '1';
                textDiv.style.padding = '2px 0';
                textDiv.style.display = 'flex';
                textDiv.style.alignItems = 'center';
                textDiv.style.justifyContent = textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start';
                textDiv.style.height = '100%';
                textDiv.style.minHeight = input.offsetHeight + 'px';

                input.parentNode.replaceChild(textDiv, input);
              });

              // 기존 div 래퍼의 스타일 개선
              const divs = cell.querySelectorAll('div');
              divs.forEach(div => {
                // flex가 아닌 div는 flex로 변환
                if (window.getComputedStyle(div).display !== 'flex') {
                  div.style.display = 'flex';
                }
                div.style.alignItems = 'center';
                div.style.minHeight = '24px';

                // span 자식이 있는 경우
                const spans = div.querySelectorAll('span');
                spans.forEach(span => {
                  span.style.lineHeight = '1';
                  span.style.display = 'inline-flex';
                  span.style.alignItems = 'center';
                });
              });

              // 셀 자체에 최소 높이 설정
              if (cell.style.height) {
                cell.style.minHeight = cell.style.height;
              }
            });
          }
        }
      });

      const imgData = canvas.toDataURL("image/png");

      // PDF 생성
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // A4 페이지 크기 및 여백 설정
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm 여백

      // 실제 컨텐츠 영역 크기 (여백 제외)
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);

      // 이미지 크기 계산 (여백을 고려하여)
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = contentWidth;
      const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

      // 여러 페이지로 분할이 필요한 경우
      let heightLeft = imgHeight;
      let position = 0;
      let page = 0;

      // 첫 페이지 추가
      pdf.addImage(imgData, "PNG", margin, margin + position, imgWidth, imgHeight);
      heightLeft -= contentHeight;

      // 추가 페이지가 필요한 경우
      while (heightLeft > 0) {
        page++;
        position = -(contentHeight * page);
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, margin + position, imgWidth, imgHeight);
        heightLeft -= contentHeight;
      }

      // 다운로드
      pdf.save(filename);

      if (onDownloadComplete) onDownloadComplete();
    } catch (error) {
      console.error("PDF 다운로드 중 오류 발생:", error);
      if (onDownloadError) {
        onDownloadError(error);
      } else {
        alert("PDF 다운로드에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <button onClick={handleDownloadPdf} className={className}>
      {buttonText}
    </button>
  );
};

export default PdfDownloadButton;
