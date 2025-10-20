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
        scale: 2, // 해상도 향상 (2배)
        useCORS: true, // 외부 이미지 사용 허용
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff", // 배경색 명시
        windowWidth: element.scrollWidth, // 전체 너비 캡처
        windowHeight: element.scrollHeight, // 전체 높이 캡처
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
