/**
 * 프린터 관련 유틸리티 함수
 * 브라우저에서 프린터 목록을 가져오거나 관리하는 함수들
 * JSPrintManager를 우선적으로 사용하며, 실패 시 API 또는 localStorage를 사용합니다.
 */

// JSPrintManager는 브라우저에서 전역 객체(window.JSPM)로 로드됩니다
// CDN 스크립트 태그 또는 npm 패키지를 통해 로드할 수 있습니다

// localStorage 키
const PRINTER_LIST_KEY = 'saved_printers';
const DEFAULT_PRINTER_KEY = 'default_printer';

// JSPrintManager 인스턴스 (전역 변수로 관리)
let jspmInstance = null;
let jspmInitialized = false;
let jspmInitializing = false;

/**
 * JSPrintManager 초기화
 * JSPrintManager는 WebSocket(WSS)을 사용하여 실시간 통신을 합니다.
 * @param {string} serverUrl - JSPM 서버 URL (기본값: 환경 변수 또는 'ws://localhost:9595' 또는 'wss://localhost:28443')
 * @param {number} port - WebSocket 포트 (기본값: 환경 변수 또는 28443, WSS 포트)
 * @param {boolean} useSecure - WSS(WebSocket Secure) 사용 여부 (기본값: true)
 * @returns {Promise<Object>} JSPrintManager 인스턴스
 */
export const initializeJSPM = async (serverUrl = null, port = null, useSecure = true) => {
  // 이미 초기화 중이거나 초기화된 경우
  if (jspmInitialized && jspmInstance) {
    // 연결 상태 확인
    if (jspmInstance.isStarted || (jspmInstance.isReady && jspmInstance.isReady())) {
      return jspmInstance;
    }
  }
  
  if (jspmInitializing) {
    // 초기화 중이면 대기
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50; // 5초 대기
      const checkInterval = setInterval(() => {
        attempts++;
        if (jspmInitialized && jspmInstance && (jspmInstance.isStarted || (jspmInstance.isReady && jspmInstance.isReady()))) {
          clearInterval(checkInterval);
          resolve(jspmInstance);
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          reject(new Error('JSPrintManager 초기화 타임아웃'));
        }
      }, 100);
    });
  }
  
  // JSPrintManager 가져오기 (전역 객체에서)
  // JSPrintManager는 HTML의 <script> 태그를 통해 로드되면 window.JSPM에 등록됩니다
  // 배포 환경(https://anniecong.o-r.kr)에서도 작동해야 함
  
  // 환경 확인
  const isProduction = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'production';
  const isHttps = typeof window !== 'undefined' && window.location?.protocol === 'https:';
  const currentHost = typeof window !== 'undefined' ? window.location?.hostname : 'localhost';
  
  // 스크립트 로드 확인 및 대기 함수
  const waitForJSPM = async (maxWait = 8000) => {
    const startTime = Date.now();
    let attempts = 0;
    const maxAttempts = Math.floor(maxWait / 100);
    
    while (attempts < maxAttempts) {
      if (typeof window !== 'undefined' && window.JSPM && window.JSPM.JSPrintManager) {
        const elapsed = attempts * 100;
        console.log(`✅ JSPrintManager 로드 확인 (${elapsed}ms 후)`);
        console.log(`🌐 환경: ${isProduction ? '프로덕션' : '개발'} | 호스트: ${currentHost} | 프로토콜: ${window.location?.protocol}`);
        return window.JSPM;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    console.warn(`⚠️ JSPrintManager 로드 대기 시간 초과 (${maxWait}ms)`);
    return null;
  };
  
  // JSPrintManager가 이미 로드되어 있는지 확인
  let JSPMLib = null;
  if (typeof window !== 'undefined' && window.JSPM && window.JSPM.JSPrintManager) {
    console.log('✅ JSPrintManager가 이미 로드되어 있습니다.');
    console.log(`🌐 환경: ${isProduction ? '프로덕션' : '개발'} | 호스트: ${currentHost}`);
    JSPMLib = window.JSPM;
  } else {
    // 아직 로드되지 않았으면 대기 (스크립트가 비동기로 로드 중일 수 있음)
    // 배포 환경에서는 네트워크 지연이 있을 수 있으므로 대기 시간 증가
    const waitTime = isProduction ? 8000 : 5000;
    console.log(`⏳ JSPrintManager 로드를 기다리는 중... (최대 ${waitTime}ms)`);
    console.log(`🌐 환경: ${isProduction ? '프로덕션' : '개발'} | 호스트: ${currentHost}`);
    JSPMLib = await waitForJSPM(waitTime);
  }
  
  // JSPrintManager가 여전히 없는 경우
  if (!JSPMLib || !JSPMLib.JSPrintManager) {
    console.warn('⚠️ JSPrintManager가 로드되지 않았습니다.');
    console.warn('📝 다음을 확인하세요:');
    console.warn('   1. HTML에 JSPrintManager 스크립트가 추가되어 있는지 확인');
    console.warn('   2. 브라우저 개발자 도구의 Network 탭에서 /js/JSPrintManager.js 로드 확인');
    console.warn('   3. 배포 환경에서 public/js/JSPrintManager.js 파일이 빌드에 포함되었는지 확인');
    console.warn('   4. 브라우저 콘솔에서 window.JSPM이 정의되어 있는지 확인: console.log(window.JSPM)');
    console.warn('   5. 브라우저 API를 통해 프린터 목록을 가져오는 방법으로 fallback됩니다.');
    
    // 배포 환경에서의 추가 안내
    if (isProduction || isHttps) {
      console.warn('💡 배포 환경 안내:');
      console.warn('   - 사용자 PC에 JSPrintManager Client App이 설치되어 있어야 합니다');
      console.warn('   - JSPrintManager Service가 실행 중이어야 합니다 (localhost:28443)');
      console.warn('   - 방화벽에서 포트 28443(WSS)이 허용되어 있어야 합니다');
    }
    
    return null;
  }
  
  try {
    jspmInitializing = true;
    
    // 포트 결정 (환경 변수 > 매개변수 > 기본값)
    // WSS 포트: 28443 (기본값), WS 포트: 9595
    const finalPort = port || 
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_JSPM_PORT && parseInt(import.meta.env.VITE_JSPM_PORT)) ||
      (useSecure ? 28443 : 9595);
    
    // 프로토콜 결정 (WSS 또는 WS)
    // 프로덕션 환경(HTTPS)에서는 WSS를 사용하는 것이 안전함
    // 배포된 웹사이트(https://anniecong.o-r.kr)에서는 WSS 사용
    const isProduction = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'production';
    const isHttps = typeof window !== 'undefined' && window.location?.protocol === 'https:';
    // HTTPS 환경이거나 프로덕션 환경에서는 WSS 강제 사용
    const shouldUseSecure = isHttps || isProduction || useSecure;
    const protocol = shouldUseSecure ? 'wss' : 'ws';
    const actualPort = shouldUseSecure ? 28443 : 9595;
    
    // 서버 URL 결정 (환경 변수 > 매개변수 > 기본값)
    // WebSocket URL 형식: ws://localhost:포트 또는 wss://localhost:포트
    // 중요: 배포 환경에서도 localhost를 사용 (사용자 PC의 JSPrintManager Client App에 연결)
    let finalServerUrl = serverUrl;
    if (!finalServerUrl) {
      // 환경 변수에서 URL 가져오기
      if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_JSPM_SERVER_URL) {
        finalServerUrl = import.meta.env.VITE_JSPM_SERVER_URL;
      } else {
        // 기본값: WebSocket URL 구성 (항상 localhost 사용)
        // 배포된 웹사이트(https://anniecong.o-r.kr)에서도 사용자 PC의 localhost:28443에 연결
        finalServerUrl = `${protocol}://localhost:${actualPort}`;
      }
    }
    
    console.log(`🔗 JSPrintManager 서버 URL: ${finalServerUrl}`);
    console.log(`🔒 WebSocket 프로토콜: ${protocol.toUpperCase()} (포트: ${actualPort})`);
    console.log(`🌐 환경: ${isProduction ? '프로덕션' : '개발'} (${isHttps ? 'HTTPS' : 'HTTP'})`);
    console.log(`💡 배포된 웹사이트에서도 사용자 PC의 JSPrintManager Client App(localhost:${actualPort})에 연결합니다.`);
    
    // JSPrintManager 인스턴스 생성
    // JSPMLib는 이미 위에서 확인되었으므로 바로 사용
    jspmInstance = new JSPMLib.JSPrintManager();
    jspmInstance.clientApp = 'JSPrintManager';
    
    // 서버 URL 설정
    // JSPrintManager는 자동으로 WebSocket 연결을 처리하지만, 명시적으로 설정할 수 있습니다
    if (finalServerUrl) {
      // serverUrl 속성이 있으면 설정
      if (jspmInstance.serverUrl !== undefined) {
        jspmInstance.serverUrl = finalServerUrl;
      }
      // host 속성이 있으면 설정
      if (jspmInstance.host !== undefined) {
        try {
          // WebSocket URL 파싱 (ws:// 또는 wss:// 지원)
          // URL 생성자는 http:// 또는 https://를 필요로 하므로, 임시로 http로 변경
          const httpUrl = finalServerUrl.replace(/^wss?:\/\//, 'https://');
          const urlObj = new URL(httpUrl);
          jspmInstance.host = urlObj.hostname;
          jspmInstance.port = urlObj.port || finalPort;
        } catch (error) {
          // URL 파싱 실패 시 localhost와 포트 사용
          console.warn('⚠️ WebSocket URL 파싱 실패, 기본값 사용:', error);
          jspmInstance.host = 'localhost';
          jspmInstance.port = finalPort;
        }
      }
      // port 속성이 있으면 설정
      if (jspmInstance.port !== undefined && !jspmInstance.port) {
        jspmInstance.port = finalPort;
      }
    }
    
    // 상태 변경 콜백 설정
    let statusResolve = null;
    const statusPromise = new Promise((resolve) => {
      statusResolve = resolve;
    });
    
    jspmInstance.onStatusChanged = function() {
      // 다양한 방법으로 준비 상태 확인
      const isReady = (
        (jspmInstance.isReady && jspmInstance.isReady()) ||
        jspmInstance.isStarted === true ||
        jspmInstance.status === 'ready' ||
        jspmInstance.status === 'connected'
      );
      
      if (isReady && statusResolve) {
        console.log('✅ JSPrintManager 준비 완료');
        jspmInitialized = true;
        jspmInitializing = false;
        statusResolve(jspmInstance);
        statusResolve = null;
      }
    };
    
    // 서버에 연결 시작
    // start()가 Promise를 반환하는 경우
    if (typeof jspmInstance.start === 'function') {
      const startResult = jspmInstance.start();
      
      // Promise인 경우
      if (startResult && typeof startResult.then === 'function') {
        try {
          await startResult;
          // 연결 완료 후 상태 확인
          const isReady = (
            (jspmInstance.isReady && jspmInstance.isReady()) ||
            jspmInstance.isStarted === true ||
            jspmInstance.status === 'ready' ||
            jspmInstance.status === 'connected'
          );
          
          if (isReady) {
            jspmInitialized = true;
            jspmInitializing = false;
            console.log('✅ JSPrintManager 초기화 완료');
            return jspmInstance;
          }
        } catch (error) {
          console.warn('⚠️ JSPrintManager start() 오류:', error);
        }
      }
    }
    
    // 연결 완료 대기 (최대 5초)
    // 상태 변경 콜백 또는 직접 확인
    try {
      const result = await Promise.race([
        statusPromise,
        new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 50;
          const checkInterval = setInterval(() => {
            attempts++;
            const isReady = (
              (jspmInstance.isReady && jspmInstance.isReady()) ||
              jspmInstance.isStarted === true ||
              jspmInstance.status === 'ready' ||
              jspmInstance.status === 'connected'
            );
            
            if (isReady) {
              clearInterval(checkInterval);
              jspmInitialized = true;
              jspmInitializing = false;
              console.log('✅ JSPrintManager 초기화 완료');
              resolve(jspmInstance);
            } else if (attempts >= maxAttempts) {
              clearInterval(checkInterval);
              resolve(null);
            }
          }, 100);
        })
      ]);
      
      // 초기화 성공 확인
      if (result && jspmInstance) {
        // 최종 상태 확인
        const isReady = (
          (jspmInstance.isReady && jspmInstance.isReady()) ||
          jspmInstance.isStarted === true ||
          jspmInstance.status === 'ready' ||
          jspmInstance.status === 'connected'
        );
        
        if (isReady) {
          jspmInitialized = true;
          jspmInitializing = false;
          return jspmInstance;
        }
      }
    } catch (error) {
      console.warn('⚠️ JSPrintManager 초기화 대기 중 오류:', error);
    }
    
    // 타임아웃 또는 실패
    jspmInitializing = false;
    
    // 마지막 상태 확인
    if (jspmInstance) {
      const isReady = (
        (jspmInstance.isReady && jspmInstance.isReady()) ||
        jspmInstance.isStarted === true ||
        jspmInstance.status === 'ready' ||
        jspmInstance.status === 'connected'
      );
      
      if (isReady) {
        jspmInitialized = true;
        console.log('✅ JSPrintManager 초기화 완료 (지연)');
        return jspmInstance;
      }
    }
    
    console.warn('⚠️ JSPrintManager 초기화 타임아웃 또는 실패');
    console.warn('⚠️ JSPM 서버가 실행 중인지 확인하세요. 기본 URL: http://localhost:9595');
    console.warn('⚠️ JSPrintManager 클라이언트 소프트웨어가 설치되어 있는지 확인하세요.');
    return null;
  } catch (error) {
    jspmInitializing = false;
    console.error('❌ JSPrintManager 초기화 실패:', error);
    console.warn('⚠️ JSPM 서버가 실행 중인지 확인하세요. 기본 URL: http://localhost:9595');
    console.warn('⚠️ JSPrintManager 클라이언트 소프트웨어가 설치되어 있는지 확인하세요.');
    return null;
  }
};

/**
 * JSPrintManager 연결 상태 확인
 * @returns {boolean} 연결 상태
 */
export const isJSPMConnected = () => {
  if (!jspmInstance) {
    return false;
  }
  // isReady() 메서드가 있으면 사용, 없으면 isStarted 속성 사용
  return jspmInitialized && (jspmInstance.isReady ? jspmInstance.isReady() : jspmInstance.isStarted);
};

/**
 * JSPrintManager를 통해 프린터 목록 가져오기
 * @param {string} serverUrl - JSPM 서버 URL (선택적, WebSocket URL: ws:// 또는 wss://)
 * @param {number} port - WebSocket 포트 (선택적, 기본값: 28443 for WSS)
 * @param {boolean} useSecure - WSS(WebSocket Secure) 사용 여부 (기본값: true)
 * @returns {Promise<Array<string>>} 프린터 목록
 */
export const getPrintersFromJSPM = async (serverUrl = null, port = null, useSecure = true) => {
  try {
    // JSPrintManager 초기화 (WebSocket 연결)
    const jspm = await initializeJSPM(serverUrl, port, useSecure);
    
    if (!jspm) {
      return null; // 초기화 실패
    }
    
    // 프린터 목록 가져오기
    const printers = await jspm.getPrinters();
    
    if (printers && printers.length > 0) {
      // 프린터 이름 배열로 변환
      const printerNames = printers.map(printer => {
        if (typeof printer === 'string') {
          return printer;
        } else if (printer && typeof printer === 'object') {
          return printer.name || printer.id || printer.printerName || String(printer);
        }
        return String(printer);
      }).filter(name => name && name.trim().length > 0);
      
      // 가져온 프린터 목록을 localStorage에 저장
      if (printerNames.length > 0) {
        savePrinters(printerNames);
        console.log('✅ JSPrintManager를 통해 프린터 목록 가져오기 성공:', printerNames);
        return printerNames;
      }
    }
    
    return [];
  } catch (error) {
    console.error('❌ JSPrintManager를 통한 프린터 목록 가져오기 실패:', error);
    return null; // null을 반환하여 fallback 사용 가능하도록 함
  }
};

/**
 * localStorage에서 저장된 프린터 목록 가져오기
 */
export const getSavedPrinters = () => {
  try {
    const saved = localStorage.getItem(PRINTER_LIST_KEY);
    if (saved) {
      const printers = JSON.parse(saved);
      return Array.isArray(printers) ? printers : [];
    }
  } catch (error) {
    console.error('저장된 프린터 목록 불러오기 실패:', error);
  }
  return [];
};

/**
 * 프린터 목록을 localStorage에 저장
 */
export const savePrinters = (printers) => {
  try {
    if (Array.isArray(printers)) {
      localStorage.setItem(PRINTER_LIST_KEY, JSON.stringify(printers));
      return true;
    }
  } catch (error) {
    console.error('프린터 목록 저장 실패:', error);
  }
  return false;
};

/**
 * 프린터 추가
 */
export const addPrinter = (printerName) => {
  if (!printerName || !printerName.trim()) return false;
  
  const printers = getSavedPrinters();
  const trimmedName = printerName.trim();
  
  // 중복 확인
  if (!printers.includes(trimmedName)) {
    printers.push(trimmedName);
    savePrinters(printers);
    return true;
  }
  return false;
};

/**
 * 프린터 삭제
 */
export const removePrinter = (printerName) => {
  const printers = getSavedPrinters();
  const filtered = printers.filter(p => p !== printerName);
  if (filtered.length !== printers.length) {
    savePrinters(filtered);
    return true;
  }
  return false;
};

/**
 * 기본 프린터 가져오기
 */
export const getDefaultPrinter = () => {
  try {
    const defaultPrinter = localStorage.getItem(DEFAULT_PRINTER_KEY);
    if (defaultPrinter) {
      return defaultPrinter;
    }
  } catch (error) {
    console.error('기본 프린터 불러오기 실패:', error);
  }
  return '';
};

/**
 * 기본 프린터 설정
 */
export const setDefaultPrinter = (printerName) => {
  try {
    if (printerName) {
      localStorage.setItem(DEFAULT_PRINTER_KEY, printerName);
      return true;
    }
  } catch (error) {
    console.error('기본 프린터 저장 실패:', error);
  }
  return false;
};

/**
 * 브라우저의 프린트 다이얼로그 열기 (선택적)
 * 실제 프린터 목록은 가져올 수 없지만, 사용자가 프린터를 선택할 수 있음
 */
export const openPrintDialog = (content) => {
  if (!content) return;
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // 프린트 후 창 닫기 (선택적)
    // setTimeout(() => printWindow.close(), 1000);
  }
};

/**
 * 브라우저에서 프린터 목록 가져오기 시도 (Web Print API)
 * Chrome/Edge에서만 지원될 수 있음
 */
export const getBrowserPrinters = async () => {
  try {
    // Web Print API 시도 (Chrome/Edge)
    if ('printers' in navigator && typeof navigator.printers === 'object') {
      const printers = await navigator.printers.getPrinters();
      if (printers && printers.length > 0) {
        return printers.map(p => p.name || p.id || String(p));
      }
    }
    
    // 대안: 브라우저 프린트 다이얼로그를 통한 간접적 방법은 불가능
    // 보안상의 이유로 브라우저에서 직접 프린터 목록을 가져올 수 없음
  } catch (error) {
    console.warn('브라우저 프린터 목록 가져오기 실패:', error);
  }
  return [];
};

/**
 * 백엔드 API를 통해 프린터 목록 가져오기
 * @param {Function} apiCall - labelAPI.getPrinters() 함수
 */
export const fetchPrintersFromAPI = async (apiCall) => {
  try {
    const response = await apiCall();
    
    // 응답 데이터 구조 확인
    let printerList = [];
    if (Array.isArray(response.data)) {
      printerList = response.data;
    } else if (response.data?.data) {
      printerList = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
    } else if (response.data?.printers) {
      printerList = Array.isArray(response.data.printers) ? response.data.printers : [response.data.printers];
    } else if (response.data?.printersList) {
      printerList = Array.isArray(response.data.printersList) ? response.data.printersList : [response.data.printersList];
    }
    
    // 프린터 목록을 문자열 배열로 변환
    if (printerList.length > 0) {
      const printerNames = printerList.map(p => {
        // 객체인 경우 name 필드 사용, 문자열인 경우 그대로 사용
        if (typeof p === 'string') {
          return p;
        } else if (p && typeof p === 'object') {
          return p.name || p.id || p.printerName || String(p);
        }
        return String(p);
      }).filter(name => name && name.trim().length > 0);
      
      // 가져온 프린터 목록을 localStorage에 저장
      if (printerNames.length > 0) {
        savePrinters(printerNames);
        return printerNames;
      }
    }
    return [];
  } catch (error) {
    console.error('API를 통한 프린터 목록 가져오기 실패:', error);
    return null; // null을 반환하여 fallback 사용 가능하도록 함
  }
};

/**
 * 프린터 목록 가져오기 (우선순위: JSPrintManager > API > localStorage > 빈 배열)
 * JSPrintManager는 WebSocket(WSS)을 사용하여 실시간 통신을 합니다.
 * @param {Function} apiCall - labelAPI.getPrinters() 함수 (선택적)
 * @param {string} jspmServerUrl - JSPM 서버 URL (선택적, WebSocket URL: ws:// 또는 wss://)
 * @param {number} jspmPort - WebSocket 포트 (선택적, 기본값: 28443 for WSS)
 * @param {boolean} jspmUseSecure - WSS(WebSocket Secure) 사용 여부 (기본값: true)
 */
export const getPrinters = async (apiCall = null, jspmServerUrl = null, jspmPort = null, jspmUseSecure = true) => {
  // 1. JSPrintManager를 통해 프린터 목록 가져오기 시도 (최우선)
  // JSPrintManager는 WebSocket을 사용하여 클라이언트와 실시간 통신합니다
  try {
    const jspmPrinters = await getPrintersFromJSPM(jspmServerUrl, jspmPort, jspmUseSecure);
    if (jspmPrinters && jspmPrinters.length > 0) {
      return jspmPrinters;
    }
  } catch (error) {
    console.warn('⚠️ JSPrintManager를 통한 프린터 목록 가져오기 실패, 다른 방법 시도:', error);
    console.warn('💡 WebSocket 연결을 확인하세요. WSS 포트: 28443');
  }
  
  // 2. 브라우저에서 직접 가져오기 시도 (지원되는 경우)
  const browserPrinters = await getBrowserPrinters();
  if (browserPrinters.length > 0) {
    savePrinters(browserPrinters);
    return browserPrinters;
  }
  
  // 3. 백엔드 API를 통해 가져오기 시도
  if (apiCall && typeof apiCall === 'function') {
    try {
      const apiPrinters = await fetchPrintersFromAPI(apiCall);
      if (apiPrinters && apiPrinters.length > 0) {
        return apiPrinters;
      }
    } catch (error) {
      console.warn('⚠️ API를 통한 프린터 목록 가져오기 실패:', error);
    }
  }
  
  // 4. localStorage에서 가져오기 (fallback)
  const savedPrinters = getSavedPrinters();
  if (savedPrinters.length > 0) {
    return savedPrinters;
  }
  
  // 5. 모두 실패 시 빈 배열 반환
  return [];
};

/**
 * JSPrintManager 인스턴스 가져오기
 * @returns {Object|null} JSPrintManager 인스턴스
 */
export const getJSPMInstance = () => {
  return jspmInstance;
};

/**
 * JSPrintManager 연결 해제
 */
export const disconnectJSPM = async () => {
  if (jspmInstance && jspmInitialized) {
    try {
      await jspmInstance.stop();
      jspmInstance = null;
      jspmInitialized = false;
      console.log('✅ JSPrintManager 연결 해제 완료');
    } catch (error) {
      console.error('❌ JSPrintManager 연결 해제 실패:', error);
    }
  }
};
