import { useState } from 'react';
import { generatePdfWithPuppeteer, checkServerHealth } from '../../utils/pdfGenerator';
import PdfLoadingModal from './PdfLoadingModal';

/**
 * Puppeteer를 사용한 PDF 다운로드 버튼 컴포넌트
 * @param {Object} props
 * @param {React.RefObject} props.contentRef - PDF로 변환할 HTML 요소의 ref
 * @param {string} props.filename - 다운로드될 파일명 (기본값: "download.pdf")
 * @param {string} props.buttonText - 버튼에 표시될 텍스트 (기본값: "PDF 다운로드")
 * @param {string} props.className - 버튼에 적용될 추가 클래스명
 * @param {Function} props.onDownloadStart - 다운로드 시작 시 호출될 콜백
 * @param {Function} props.onDownloadComplete - 다운로드 완료 시 호출될 콜백
 * @param {Function} props.onDownloadError - 에러 발생 시 호출될 콜백
 */
const PuppeteerPdfButton = ({
  contentRef,
  filename = 'download.pdf',
  buttonText = 'PDF 다운로드 (Puppeteer)',
  className = '',
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);

      if (onDownloadStart) onDownloadStart();

      // 서버 상태 확인
      const isServerRunning = await checkServerHealth();

      if (!isServerRunning) {
        throw new Error(
          'PDF 서버가 실행되고 있지 않습니다.\n\n터미널에서 다음 명령어를 실행해주세요:\nnode server.js'
        );
      }

      const element = contentRef.current;
      if (!element) {
        throw new Error('PDF로 변환할 요소를 찾을 수 없습니다.');
      }

      // PDF 생성
      await generatePdfWithPuppeteer(element, filename);

      if (onDownloadComplete) onDownloadComplete();

      alert('PDF 다운로드가 완료되었습니다.');
    } catch (error) {
      console.error('PDF 다운로드 중 오류 발생:', error);

      if (onDownloadError) {
        onDownloadError(error);
      } else {
        alert(error.message || 'PDF 다운로드에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownloadPdf}
        disabled={isGenerating}
        className={`${className} ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {buttonText}
      </button>

      <PdfLoadingModal isOpen={isGenerating} />
    </>
  );
};

export default PuppeteerPdfButton;
