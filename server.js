const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3001;

const archiver = require('archiver');
const path = require('path');
const fs = require('fs');

// 미들웨어 설정
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Puppeteer를 사용한 PDF 생성 엔드포인트
app.post('/api/generate-pdf', async (req, res) => {
  let browser = null;

  try {
    const { html, filename = 'document.pdf' } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    console.log('Starting PDF generation...');

    // Puppeteer 브라우저 실행
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ]
    });

    const page = await browser.newPage();

    // HTML 콘텐츠 설정
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000
    });

    // 페이지 스타일 최적화
    await page.addStyleTag({
      content: `
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `
    });

    // 페이지 컨텐츠 크기 측정하여 orientation 자동 결정
    const dimensions = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      return { width, height };
    });

    const isLandscape = dimensions.width > dimensions.height;

    console.log(`Content dimensions: ${dimensions.width}x${dimensions.height}, Landscape: ${isLandscape}`);

    // PDF 생성
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: isLandscape,
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    await browser.close();
    browser = null;

    console.log('PDF generated successfully');

    // PDF 응답
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);

    // 브라우저가 열려있으면 닫기
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }

    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message
    });
  }
});

// 헬스 체크 엔드포인트
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 여러 PDF를 생성하고 ZIP으로 압축하여 다운로드하는 엔드포인트
app.post('/api/generate-pdfs-zip', async (req, res) => {
  let browser = null;

  try {
    console.log('=== ZIP 생성 요청 받음 ===');
    const { documents, zipFilename = 'documents.zip' } = req.body;
    // documents = [{ html: '...', filename: 'doc1.pdf' }, { html: '...', filename: 'doc2.pdf' }, ...]

    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      console.error('문서 배열이 비어있거나 유효하지 않음');
      return res.status(400).json({ error: 'Documents array is required' });
    }

    console.log(`총 ${documents.length}개 문서에 대한 PDF 생성 시작...`);
    console.log(`ZIP 파일명: ${zipFilename}`);

    // Puppeteer 브라우저 실행 (한 번만)
    console.log('Puppeteer 브라우저 시작...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ]
    });
    console.log('브라우저 시작 완료');

    // ZIP 아카이브 설정
    console.log('ZIP 아카이브 설정 중...');
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(zipFilename)}"`);

    const archive = archiver('zip', { zlib: { level: 9 } });
    
    // 아카이브 이벤트 리스너
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Archive warning:', err);
      } else {
        throw err;
      }
    });
    
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });
    
    archive.pipe(res);
    console.log('ZIP 스트림 연결 완료');

    // 먼저 모든 PDF를 생성하여 배열에 저장
    const pdfBuffers = [];
    console.log(`문서 배열 길이: ${documents.length}`);

    for (let i = 0; i < documents.length; i++) {
      const { html, filename = `document_${i + 1}.pdf` } = documents[i];

      console.log(`\n=== Document ${i + 1}/${documents.length} ===`);
      console.log(`Filename: ${filename}`);
      console.log(`HTML length: ${html ? html.length : 0} characters`);

      if (!html) {
        console.warn(`Document ${i + 1}: No HTML content, skipping`);
        continue;
      }

      console.log(`Generating PDF ${i + 1}/${documents.length}: ${filename}`);

      try {
        console.log('새 페이지 생성...');
        const page = await browser.newPage();

        console.log('HTML 콘텐츠 설정 중...');
        await page.setContent(html, {
          waitUntil: ['load', 'domcontentloaded'],
          timeout: 30000
        });
        console.log('HTML 콘텐츠 설정 완료');

        await page.addStyleTag({
          content: `
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `
        });
        console.log('스타일 추가 완료');

        console.log('페이지 차원 측정 중...');
        const dimensions = await page.evaluate(() => {
          const body = document.body;
          const html = document.documentElement;
          const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
          const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
          return { width, height };
        });

        const isLandscape = dimensions.width > dimensions.height;
        console.log(`페이지 차원: ${dimensions.width}x${dimensions.height}, landscape: ${isLandscape}`);

        console.log('PDF 생성 시작...');
        const pdfData = await page.pdf({
          format: 'A4',
          landscape: isLandscape,
          printBackground: true,
          margin: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm'
          },
          preferCSSPageSize: false,
          displayHeaderFooter: false,
        });

        console.log(`PDF 생성 완료. Buffer type: ${typeof pdfData}, isBuffer: ${Buffer.isBuffer(pdfData)}, length: ${pdfData ? pdfData.length : 'N/A'}`);

        // Uint8Array를 Buffer로 변환
        const pdfBuffer = Buffer.from(pdfData);
        console.log(`Buffer 변환 완료. isBuffer: ${Buffer.isBuffer(pdfBuffer)}, length: ${pdfBuffer.length}`);

        await page.close();

        // PDF 버퍼를 배열에 저장
        if (pdfBuffer && Buffer.isBuffer(pdfBuffer) && pdfBuffer.length > 0) {
          pdfBuffers.push({ buffer: pdfBuffer, filename });
          console.log(`✓ PDF ${i + 1}/${documents.length} generated: ${filename} (${pdfBuffer.length} bytes)`);
        } else {
          console.error(`✗ PDF ${i + 1}/${documents.length} buffer is invalid or empty`);
        }

      } catch (pdfError) {
        console.error(`✗ Error generating PDF ${i + 1}:`, pdfError.message);
        console.error('Error stack:', pdfError.stack);
        // 개별 PDF 생성 실패 시 계속 진행
      }
    }

    console.log('브라우저 종료 중...');
    await browser.close();
    browser = null;
    console.log('브라우저 종료 완료');

    // 생성된 모든 PDF를 ZIP에 추가
    console.log(`ZIP에 ${pdfBuffers.length}개 파일 추가 중...`);
    for (const { buffer, filename } of pdfBuffers) {
      archive.append(buffer, { name: filename });
      console.log(`ZIP에 추가: ${filename}`);
    }

    console.log('ZIP 파일 마무리 중...');
    await archive.finalize();
    console.log(`=== ZIP 파일 생성 완료: ${zipFilename} ===`);

  } catch (error) {
    console.error('Batch PDF generation error:', error);

    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }

    res.status(500).json({
      error: 'Failed to generate PDFs',
      message: error.message
    });
  }
});

// ZIP 다운로드 엔드포인트 (기존 파일용 - 템플릿 다운로드에 사용)
app.post('/api/download-zip', async (req, res) => {
  try {
    const { files } = req.body; 
    // files = ["a.pdf", "b.pdf"]

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'File list is required' });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="pdfs.zip"');

    const archive = archiver('zip', { zlib: { level: 9 }});
    archive.pipe(res);

    files.forEach(filename => {
      const filePath = path.join(__dirname, 'pdf', filename);  // PDF 저장 위치

      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: filename });
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    });

    await archive.finalize();

  } catch (err) {
    console.error('ZIP creation error:', err);
    res.status(500).json({ error: 'Failed to create zip file' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`PDF generation server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/generate-pdf`);
});

// 에러 핸들링
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
