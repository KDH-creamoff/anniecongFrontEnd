import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

// 모바일 판별
const isMobile =
  typeof window !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );

const Scanner = () => {
  const [scannedResult, setScannedResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const scannerIdRef = useRef(null);
  const scannedResultRef = useRef('');

  // 백엔드에서 정보 가져오기 예시 (실제 API엔드포인트로 바꿔야 함)
  const fetchInfoFromBackend = async (code) => {
    setLoading(true);
    setApiData(null);
    setErrorMessage('');
    try {
      // 예시 API 엔드포인트입니다 (적절히 변경 필요)
      // const res = await fetch(`/api/barcode-info?code=${encodeURIComponent(code)}`);
      // TEST용 mock: 성공 시
      await new Promise((res) => setTimeout(res, 700));
      // 실제 사용 시 위 fetch 주석 해제+아래 코드 사용
      // if (!res.ok) throw new Error('정보를 불러오지 못했습니다.');
      // const data = await res.json();

      // MOCK DATA (실제 데이터 형태로 맞춰서 변환 필요)
      const data = {
        code: code,
        name: '예시 상품명',
        description: '이 상품은 예시 상품입니다.',
        date: '2024-06-13',
      };
      setApiData(data);

      // 에러 예시: throw new Error('해당 코드를 찾을 수 없습니다.');
    } catch (err) {
      setErrorMessage(
        err?.message || '정보를 불러오는 중 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  // 스캔 중지
  const stopScanning = async () => {
    try {
      if (html5QrCodeRef.current && isScanning) {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setIsScanning(false);
      }
    } catch (err) {
      console.error('스캔 중지 실패:', err);
    }
  };

  // QR 코드 스캔 성공 핸들러
  const onScanSuccess = (decodedText, decodedResult) => {
    if (decodedText && !scannedResultRef.current) {
      scannedResultRef.current = decodedText;
      setScannedResult(decodedText);
      stopScanning();
      fetchInfoFromBackend(decodedText);
    }
  };

  // 스캔 에러 핸들러
  const onScanFailure = (error) => {
    // NotFoundException은 정상적인 에러 (QR 코드를 찾지 못한 경우)
    if (error && error !== 'NotFoundException') {
      console.warn('스캔 에러:', error);
    }
  };

  // 카메라 스캔 시작
  const startScanning = async () => {
    try {
      setCameraError('');
      
      // 이미 스캔 중이면 중지
      if (html5QrCodeRef.current) {
        await stopScanning();
      }
      
      const html5QrCode = new Html5Qrcode(scannerIdRef.current);
      html5QrCodeRef.current = html5QrCode;

      // 모바일에서는 후면 카메라 사용
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      const cameraIdOrConfig = isMobile 
        ? { facingMode: { exact: "environment" } }
        : { facingMode: "user" };

      await html5QrCode.start(
        cameraIdOrConfig,
        config,
        onScanSuccess,
        onScanFailure
      );
      
      setIsScanning(true);
    } catch (err) {
      console.error('카메라 시작 실패:', err);
      setCameraError('카메라 접근이 불가능합니다. 카메라 권한을 허용해주세요.');
      setIsScanning(false);
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current = null;
      }
    }
  };

  // 컴포넌트 마운트 시 스캔 시작
  useEffect(() => {
    if (isMobile && !scannedResult && !loading) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 시작
      const timer = setTimeout(() => {
        startScanning();
      }, 300);
      
      return () => {
        clearTimeout(timer);
        stopScanning();
      };
    }
    
    return () => {
      stopScanning();
    };
  }, []);

  // 다시 스캔
  const handleRescan = async () => {
    await stopScanning();
    scannedResultRef.current = '';
    setScannedResult('');
    setErrorMessage('');
    setApiData(null);
    setLoading(false);
    setCameraError('');
    // 스캔 재시작
    setTimeout(() => {
      startScanning();
    }, 200);
  };

  // 모바일이 아닌 경우
  if (!isMobile) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#faf7f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'inherit'
        }}
      >
        <div style={{
          background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 2px 12px #0002'
        }}>
          <h2 style={{ textAlign: 'center', color: '#995439', marginBottom: 16 }}>모바일 전용 스캐너</h2>
          <p style={{ color: '#444', textAlign: 'center' }}>
            이 페이지는 모바일 기기에서만 사용 가능합니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#faf7f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4vw',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
      }}
    >
      <header style={{ width: '100%', margin: '16px 0 16px 0', textAlign: 'center' }}>
        <h2 style={{ color: '#674529', fontSize: '1.35rem', marginBottom: ".5rem" }}>QR/바코드 스캐너</h2>
        <p style={{ color: '#9c763f', fontSize: 15 }}>
          모바일 카메라로 바코드/QR 인식 후 상품 정보를 확인하세요
        </p>
      </header>
      <div
        style={{
          width: '100%',
          maxWidth: 370,
          borderRadius: 16,
          background: '#fff',
          boxShadow: '0 2px 10px #0001',
          padding: '5vw 2.5vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {!scannedResult && !loading && (
          <div style={{ width: '100%', marginBottom: 16 }}>
            {!cameraError ? (
              <div
                id="qr-reader"
                ref={scannerIdRef}
                style={{
                  borderRadius: 12,
                  width: '100%',
                  height: 280,
                  overflow: 'hidden',
                  background: '#000',
                  position: 'relative'
                }}
              />
            ) : (
              <div style={{
                color: "#b90000",
                background: "#ffe0e0",
                padding: "18px 10px",
                borderRadius: 8,
                textAlign: "center",
                margin: "16px 0",
                minHeight: 280,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cameraError}
                <button
                  onClick={startScanning}
                  style={{
                    marginTop: 12,
                    padding: '8px 16px',
                    background: '#674529',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  다시 시도
                </button>
              </div>
            )}
            <p style={{
              marginTop: 8,
              textAlign: 'center',
              fontSize: 14,
              color: '#94632f'
            }}>
              코드에 카메라를 맞춰주세요
            </p>
            <p style={{
              color: "#c0322e",
              fontSize: 13,
              marginTop: 2,
              textAlign: 'center'
            }}>
              {/* iOS 사파리는 사파리 브라우저로 접속해야 카메라가 정상작동합니다. */}
              일부 브라우저에서 카메라 허용 안내 문구가 나올 수 있습니다. <br/>카메라 권한을 꼭 허용해 주세요.<br/>
              (iPhone은 <b>Safari</b> 앱에서, Android는 <b>Chrome</b> 앱에서 이용 권장)
            </p>
          </div>
        )}

        {/* 결과 영역 */}
        {loading && (
          <div style={{padding:24, textAlign:'center'}}>
            <div className="loader" style={{
              margin: '0 auto 16px auto',
              width: 32, height: 32, border: '3px solid #dec6a6', borderTopColor: '#b49366', borderRadius: '50%', animation: 'spin 1s linear infinite'
            }}/>
            <p style={{
              color:'#674529', fontSize:15, marginTop:6
            }}>정보를 불러오는 중...</p>
            <style>{`@keyframes spin { 0%{transform: rotate(0deg);} 100%{transform: rotate(360deg);} }`}</style>
          </div>
        )}

        {scannedResult && !loading && (
          <>
            <div style={{ width: '100%', margin: '8px 0', wordBreak: 'break-all', textAlign: 'center' }}>
              <b style={{ color: '#674529', fontSize: 16 }}>스캔 값</b>
              <div style={{
                color: '#a47c4b',
                margin: '6px 0 2px 0',
                background:'#faf7f2',
                borderRadius:8,
                padding:'8px 5px',
                fontSize:14,
              }}>{scannedResult}</div>
            </div>
            {errorMessage && (
              <div style={{
                color: '#c0322e',
                background: '#ffe0e0',
                borderRadius: 8,
                padding: '10px 4px',
                margin: '12px 0', fontSize: 15
              }}>
                {errorMessage}
              </div>
            )}
            {apiData && (
              <div style={{
                margin: '12px 0',
                padding: '12px',
                background: '#f8f5ec',
                color: '#6e511c',
                borderRadius: 8,
                fontSize: 15,
                width: '100%'
              }}>
                <div style={{marginBottom:6}}>
                  <strong>상품 코드:</strong> {apiData.code}
                </div>
                <div style={{marginBottom:4}}>
                  <strong>상품명:</strong> {apiData.name}
                </div>
                <div style={{marginBottom:4}}>
                  <strong>설명:</strong> {apiData.description}
                </div>
                <div>
                  <strong>등록일:</strong> {apiData.date}
                </div>
              </div>
            )}
            <button
              onClick={handleRescan}
              style={{
                background: '#fff',
                border: '1px solid #674529',
                color: '#674529',
                borderRadius: 10,
                padding: '9px 18px',
                marginTop: 10,
                fontWeight: 500,
                fontSize: 15,
                width: '100%',
                maxWidth: 210,
                transition: 'background 0.13s',
                boxShadow: '0 1px 2px #0001'
              }}>
              다시 스캔하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Scanner;