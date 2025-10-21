import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * PDF 다운로드 기능을 제공하는 커스텀 훅
 * @returns {Object} - downloadPdf 함수, isLoading 상태, error 상태
 */
const usePdfDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * PDF 다운로드 함수
   * @param {HTMLElement} element - PDF로 변환할 HTML 요소
   * @param {Object} options - 옵션 객체
   * @param {string} options.filename - 파일명 (기본값: "download.pdf")
   * @param {string} options.orientation - 페이지 방향 ("portrait" | "landscape")
   * @param {number} options.scale - 캔버스 스케일 (기본값: 2)
   * @param {number} options.margin - 페이지 여백 (mm, 기본값: 10)
   */
  const downloadPdf = async (element, options = {}) => {
    const {
      filename = "download.pdf",
      orientation = "portrait",
      scale = 2,
      margin = 10,
    } = options;

    setIsLoading(true);
    setError(null);

    try {
      if (!element) {
        throw new Error("PDF로 변환할 요소를 찾을 수 없습니다.");
      }

      // 폰트 로딩 대기 (중요!)
      await document.fonts.ready;

      // 추가 딜레이로 렌더링 완료 보장
      await new Promise(resolve => setTimeout(resolve, 500));

      // HTML -> Canvas 변환
      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // 클론된 문서의 스타일 보정
          const clonedElement = clonedDoc.querySelector(`[data-html2canvas-ignore="false"]`) || clonedDoc.body;
          if (clonedElement) {
            clonedElement.style.display = "block";
            clonedElement.style.position = "relative";
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      // PDF 생성
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // A4 페이지 크기 및 여백 설정
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // 실제 컨텐츠 영역 크기 (여백 제외)
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);

      // 이미지 크기 계산 (여백을 고려하여)
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = contentWidth;
      const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;
      let page = 0;

      // 첫 페이지 추가
      pdf.addImage(imgData, "PNG", margin, margin + position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= contentHeight;

      // 다운로드
      pdf.save(filename);

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error("PDF 다운로드 중 오류 발생:", err);
      setError(err.message || "PDF 다운로드에 실패했습니다.");
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  return { downloadPdf, isLoading, error };
};

export default usePdfDownload;
