import { useState, useRef } from 'react';
import { X, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import PuppeteerPdfButton from '../common/PuppeteerPdfButton';
import FeedMillStandards from '../template/PrerequisitePrograms/01_FeedMillStandards';
import EquipmentManagement from '../template/PrerequisitePrograms/02_EquipmentManagement';
import TrainingManagement from '../template/PrerequisitePrograms/03_TrainingManagement';
import ProcessControl from '../template/PrerequisitePrograms/04_ProcessControl';

const CreateDocumentModal = ({ isOpen, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const pdfContentRef = useRef(null);

  // 문서 설정 상태
  const [documentSettings, setDocumentSettings] = useState({
    requiredDocuments: '',
    ceo: '',
    director: '',
    teamLeader: '',
    signatureImage: null
  });

  // 이미지 미리보기 URL
  const [signaturePreview, setSignaturePreview] = useState(null);

  // 템플릿 목록 (50개)
  const templates = [
    {
      id: 'template-1',
      name: '사료공장관리기준',
      description: '선행요건관리',
      component: FeedMillStandards,
    },
    {
      id: 'template-2',
      name: '설비관리기준',
      description: '선행요건관리',
      component: EquipmentManagement,
    },
    {
      id: 'template-3',
      name: '교육훈련관리기준',
      description: '선행요건관리',
      component: TrainingManagement,
    },
    {
      id: 'template-4',
      name: '공정관리기준',
      description: '선행요건관리',
      component: ProcessControl,
    },
    ...Array.from({ length: 40 }, (_, i) => ({
      id: `template-${i + 15}`,
      name: `템플릿 ${i + 15}`,
      description: `추후 추가될 템플릿 ${i + 15}`,
      component: null,
    })),
  ];

  if (!isOpen) return null;

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCreateDocument = () => {
    if (selectedTemplate) {
      setShowSettingsForm(true);
    }
  };

  const handleSettingsSubmit = () => {
    setShowSettingsForm(false);
    setIsEditMode(true);
  };

  const handleBackToList = () => {
    setIsEditMode(false);
    setShowSettingsForm(false);
  };

  const handleBackToSettings = () => {
    setIsEditMode(false);
  };

  const handleClose = () => {
    setIsEditMode(false);
    setShowSettingsForm(false);
    setSelectedTemplate(null);
    setDocumentSettings({
      requiredDocuments: '',
      ceo: '',
      director: '',
      teamLeader: '',
      signatureImage: null
    });
    setSignaturePreview(null);
    onClose();
  };

  const handleSettingsChange = (field, value) => {
    setDocumentSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignatureImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일만 허용
      if (file.type.startsWith('image/')) {
        setDocumentSettings(prev => ({
          ...prev,
          signatureImage: file
        }));
      } else {
        alert('이미지 파일만 업로드 가능합니다.');
      }
    }
  };

  // 문서 설정 폼 화면
  if (showSettingsForm && selectedTemplate) {
    return (
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
        onClick={handleClose}
      >
        <div
          className='w-full max-w-2xl rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50'>
            <div className='flex items-center gap-4'>
              <button
                onClick={handleBackToList}
                className='rounded-lg p-2 transition-colors hover:bg-gray-200'
                aria-label='뒤로가기'
              >
                <ArrowLeft className='h-5 w-5 text-gray-600' />
              </button>
              <div>
                <h3 className='text-ㅣㅎ font-bold text-gray-900'>문서 설정</h3>
                <p className='text-sm text-gray-500 mt-1'>{selectedTemplate.name}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className='rounded-lg p-2 transition-colors hover:bg-gray-100'
              aria-label='닫기'
            >
              <X className='h-6 w-6 text-gray-500' />
            </button>
          </div>

          {/* 설정 폼 */}
          <div className='flex-1 overflow-y-auto p-6'>
            <div className='space-y-5'>
              {/* 필요서류 */}
                <label className='block text-base font-semibold text-gray-700 mb-2'>
                  필요서명
                </label>

              {/* 대표 */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>
                  대표
                </label>
                <select
                  value={documentSettings.ceo}
                  onChange={(e) => handleSettingsChange('ceo', e.target.value)}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#724323] focus:border-transparent transition-all bg-white'
                >
                  <option value=''>대표 선택</option>
                  <option value='김대표'>김대표</option>
                  <option value='이대표'>이대표</option>
                  <option value='박대표'>박대표</option>
                </select>
              </div>

              {/* 이사 */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>
                  이사
                </label>
                <select
                  value={documentSettings.director}
                  onChange={(e) => handleSettingsChange('director', e.target.value)}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#724323] focus:border-transparent transition-all bg-white'
                >
                  <option value=''>이사 선택</option>
                  <option value='김이사'>김이사</option>
                  <option value='이이사'>이이사</option>
                  <option value='박이사'>박이사</option>
                </select>
              </div>

              {/* 팀장 */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>
                  팀장
                </label>
                <select
                  value={documentSettings.teamLeader}
                  onChange={(e) => handleSettingsChange('teamLeader', e.target.value)}
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#724323] focus:border-transparent transition-all bg-white'
                >
                  <option value=''>팀장 선택</option>
                  <option value='김팀장'>김팀장</option>
                  <option value='이팀장'>이팀장</option>
                  <option value='박팀장'>박팀장</option>
                </select>
              </div>

              {/* 본인서명 */}
              <div>
                <label className='block text-base font-semibold text-gray-700 mb-2'>
                  본인서명
                </label>
                <div className='space-y-3'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleSignatureImageChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#724323] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#724323] file:text-white hover:file:bg-[#5a3419] file:cursor-pointer'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className='flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50'>
            <div className='flex gap-3'>
              <button
                onClick={handleBackToList}
                className='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
              >
                취소
              </button>
              <button
                onClick={handleSettingsSubmit}
                className='px-6 py-2 rounded-lg font-semibold bg-[#724323] text-white hover:bg-[#5a3419] transition-colors'
              >
                작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 편집 모드일 때 전체 화면 표시
  if (isEditMode && selectedTemplate) {
    return (
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='w-full max-w-7xl h-[95vh] rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          {/* 편집 모드 헤더 */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50'>
            <div className='flex items-center gap-4'>
              <button
                onClick={handleBackToSettings}
                className='rounded-lg p-2 transition-colors hover:bg-gray-200'
                aria-label='뒤로가기'
              >
                <ArrowLeft className='h-5 w-5 text-gray-600' />
              </button>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>{selectedTemplate.name}</h2>
              </div>
            </div>
            <button
              onClick={handleClose}
              className='rounded-lg p-2 transition-colors hover:bg-gray-100'
              aria-label='닫기'
            >
              <X className='h-6 w-6 text-gray-500' />
            </button>
          </div>

          {/* 편집 모드 컨텐츠 */}
          <div className='flex-1 overflow-y-auto p-8 bg-gray-100'>
            <div className='max-w-5xl mx-auto'>
              {selectedTemplate.component ? (
                <selectedTemplate.component pdfRef={pdfContentRef} />
              ) : (
                <div className='flex items-center justify-center h-full'>
                  <div className='text-center'>
                    <FileText className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                    <p className='text-gray-500'>템플릿을 준비 중입니다</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 편집 모드 푸터 */}
          <div className='flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-white'>
            <div className='flex gap-3'>
              <button
                onClick={handleBackToList}
                className='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
              >
                취소
              </button>
              <PuppeteerPdfButton
                contentRef={pdfContentRef}
                filename={`${selectedTemplate.name}.pdf`}
                buttonText="PDF 다운로드"
                className="bg-[#724323] hover:bg-[#5a3419] text-white font-semibold py-2 px-4 rounded transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 템플릿 선택 모드
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
      onClick={handleClose}
    >
      <div
        className='w-full max-w-7xl h-[90vh] rounded-2xl bg-white shadow-xl flex flex-col overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>새 문서 작성</h2>
            <p className='text-sm text-gray-500 mt-1'>템플릿을 선택하여 문서를 작성하세요</p>
          </div>
          <button
            onClick={handleClose}
            className='rounded-lg p-2 transition-colors hover:bg-gray-100'
            aria-label='닫기'
          >
            <X className='h-6 w-6 text-gray-500' />
          </button>
        </div>

        {/* 메인 컨텐츠 */}
        <div className='flex flex-1 overflow-hidden'>
          {/* 왼쪽: 템플릿 목록 */}
          <div className='w-80 border-r border-gray-200 overflow-y-auto bg-gray-50'>
            <div className='p-4'>
              <h3 className='text-sm font-semibold text-gray-700 mb-3'>템플릿 목록</h3>
              <div className='space-y-2'>
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'border-[#724323] bg-[#724323]/10'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start gap-3 flex-1'>
                        <div className={`p-2 rounded-lg ${
                          selectedTemplate?.id === template.id ? 'bg-[#724323]/20' : 'bg-gray-100'
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            selectedTemplate?.id === template.id ? 'text-[#724323]' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-semibold text-gray-900 text-sm mb-1'>{template.name}</h4>
                          <p className='text-xs text-gray-500 line-clamp-2'>{template.description}</p>
                        </div>
                      </div>
                      {selectedTemplate?.id === template.id && (
                        <ChevronRight className='h-5 w-5 text-[#724323] flex-shrink-0 ml-2' />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 미리보기 */}
          <div className='flex-1 overflow-y-auto bg-white'>
            {selectedTemplate ? (
              <div className='h-full flex flex-col'>
                <div className='p-6 border-b border-gray-200 bg-gray-50'>
                  <h3 className='text-lg font-bold text-gray-900'>{selectedTemplate.name}</h3>
                  <p className='text-sm text-gray-600 mt-1'>{selectedTemplate.description}</p>
                </div>
                <div className='flex-1 overflow-auto p-6'>
                  {selectedTemplate.component ? (
                    <div className='transform scale-75 origin-top'>
                      <selectedTemplate.component />
                    </div>
                  ) : (
                    <div className='flex items-center justify-center h-full'>
                      <div className='text-center'>
                        <FileText className='h-16 w-16 text-gray-300 mx-auto mb-4' />
                        <p className='text-gray-500'>미리보기를 준비 중입니다</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-center h-full'>
                <div className='text-center'>
                  <FileText className='h-20 w-20 text-gray-300 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>템플릿을 선택하세요</h3>
                  <p className='text-sm text-gray-500'>왼쪽 목록에서 템플릿을 선택하면<br />미리보기가 표시됩니다</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className='flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50'>
          <div className='flex gap-3'>
            <button
              onClick={handleClose}
              className='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
            >
              취소
            </button>
            <button
              onClick={handleCreateDocument}
              disabled={!selectedTemplate}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedTemplate
                  ? 'bg-[#724323] text-white hover:bg-[#5a3419]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              문서 작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocumentModal;
