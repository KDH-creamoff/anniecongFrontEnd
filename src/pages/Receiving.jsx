import { useState } from 'react';
import { Package } from 'lucide-react';
import ReceivingWaitingList from '../components/receiving/ReceivingWaitingList';
import AddReceivingModal from '../components/receiving/AddReceivingModal';
import ReceivingCompletedList from '../components/receiving/ReceivingCompletedList';
import ReceivingConfirmModal from '../components/receiving/ReceivingConfirmModal';
import ShippingWaitingList from '../components/shipping/ShippingWaitingList';
import AddShippingModal from '../components/shipping/AddShippingModal';
import ShippingCompletedList from '../components/shipping/ShippingCompletedList';
import ShippingConfirmModal from '../components/shipping/ShippingConfirmModal';
import LabelPrintModal from '../components/receiving/LabelPrintModal';
import AlertModal from '../components/common/AlertModal';
import { getItemByName } from '../data/items';

const Receiving = ({ subPage = 'nav1' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLabelPrintModalOpen, setIsLabelPrintModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Alert 모달 상태
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  // Alert 모달 표시 함수
  const showAlert = (message, type = 'info', title = '알림') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  // Alert 모달 닫기
  const closeAlert = () => {
    setAlertModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'info',
    });
  };

  // 입고 대기 목록 상태
  const [waitingData, setWaitingData] = useState([
    {
      id: 1,
      itemCode: 'RAW001',
      itemName: '닭고기 (가슴살)',
      expectedQuantity: '50Kg',
      expectedDate: '2025-10-24',
      supplier: '신선식품',
    },
    {
      id: 2,
      itemCode: 'RAW002',
      itemName: '소고기(등심)',
      expectedQuantity: '70Kg',
      expectedDate: '2025-10-24',
      supplier: '프리미엄육가공',
    },
    {
      id: 3,
      itemCode: 'RAW003',
      itemName: '당근',
      expectedQuantity: '30Kg',
      expectedDate: '2025-10-25',
      supplier: '유기농산물',
    },
    {
      id: 4,
      itemCode: 'RAW004',
      itemName: '고구마',
      expectedQuantity: '40Kg',
      expectedDate: '2025-10-25',
      supplier: '유기농산물',
    },
  ]);

  // 입고 완료 목록 상태
  const [completedData, setCompletedData] = useState([]);

  // 출고 대기 목록 상태
  const [shippingWaitingData, setShippingWaitingData] = useState([
    {
      id: 1,
      itemCode: 'PRD001',
      itemName: '닭고기 사료 (프리미엄)',
      expectedQuantity: '100Kg',
      expectedDate: '2025-10-24',
      supplier: '신선식품',
    },
    {
      id: 2,
      itemCode: 'PRD002',
      itemName: '소고기 사료 (스탠다드)',
      expectedQuantity: '120Kg',
      expectedDate: '2025-10-24',
      supplier: '프리미엄육가공',
    },
    {
      id: 3,
      itemCode: 'PRD003',
      itemName: '야채 믹스 사료',
      expectedQuantity: '80Kg',
      expectedDate: '2025-10-25',
      supplier: '유기농산물',
    },
    {
      id: 4,
      itemCode: 'PRD004',
      itemName: '고구마 사료 (저알러지)',
      expectedQuantity: '90Kg',
      expectedDate: '2025-10-25',
      supplier: '유기농산물',
    },
  ]);

  // 출고 완료 목록 상태
  const [shippingCompletedData, setShippingCompletedData] = useState([]);

  const handleAddReceiving = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 대기 목록 추가
  const handleSubmitReceiving = (formData) => {
    const itemInfo = getItemByName(formData.itemName);

    const newWaitingItem = {
      id: Date.now(),
      itemCode: formData.itemCode,
      itemName: formData.itemName,
      expectedQuantity: `${formData.expectedQuantity}${formData.unit}`,
      expectedDate: formData.expectedDate,
      supplier: itemInfo?.supplier || '공급업체',
    };

    setWaitingData([...waitingData, newWaitingItem]);
    showAlert('입고 대기 목록에 추가되었습니다.', 'success');
    setIsModalOpen(false);
  };

  // 입고 버튼 클릭 시 확인 모달 열기
  const handleReceive = (item) => {
    setSelectedItem(item);
    setIsConfirmModalOpen(true);
  };

  // 입고 확인 모달 닫기
  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedItem(null);
  };

  // 입고 처리 확정 (대기 목록 -> 완료 목록)
  const handleConfirmReceive = () => {
    if (!selectedItem) return;

    // 대기 목록에서 제거
    setWaitingData(waitingData.filter((data) => data.id !== selectedItem.id));

    // 완료 목록에 추가
    const completedItem = {
      id: Date.now(),
      itemCode: selectedItem.itemCode,
      itemName: selectedItem.itemName,
      expectedQuantity: selectedItem.expectedQuantity,
      receivedQuantity: `${selectedItem.receivedQuantity}Kg`,
      unitCount: selectedItem.unitCount,
      receivedDate: new Date().toISOString().split('T')[0],
      status: '정상',
    };

    setCompletedData([completedItem, ...completedData]);
    showAlert('입고가 완료되었습니다.', 'success');
    handleCloseConfirmModal();
  };

  // 입고 취소 (완료 목록 -> 대기 목록)
  const handleCancelReceiving = (id) => {
    const item = completedData.find((data) => data.id === id);
    if (!item) return;

    if (!confirm('입고를 취소하시겠습니까? 대기 목록으로 돌아갑니다.')) return;

    // 완료 목록에서 제거
    setCompletedData(completedData.filter((data) => data.id !== id));

    // 대기 목록에 다시 추가
    const waitingItem = {
      id: Date.now(),
      itemCode: item.itemCode,
      itemName: item.itemName,
      expectedQuantity: item.expectedQuantity,
      expectedDate: new Date().toISOString().split('T')[0],
      supplier: '공급업체',
    };

    setWaitingData([...waitingData, waitingItem]);
    showAlert('입고가 취소되었습니다.', 'info');
  };

  // 라벨 프린트 모달 열기
  const handleLabelPrint = (item) => {
    setSelectedItem(item);
    setIsLabelPrintModalOpen(true);
  };

  // 라벨 프린트 모달 닫기
  const handleCloseLabelPrintModal = () => {
    setIsLabelPrintModalOpen(false);
    setSelectedItem(null);
  };

  // 라벨 프린트 완료 후 입고 완료 처리
  const handleLabelPrintComplete = (labelData) => {
    if (subPage === 'nav1') {
      // 입고 처리
      if (selectedItem?.receivedQuantity && selectedItem?.unitCount) {
        setWaitingData(waitingData.filter((data) => data.id !== selectedItem.id));
        const completedItem = {
          id: Date.now(),
          itemCode: selectedItem.itemCode,
          itemName: selectedItem.itemName,
          expectedQuantity: selectedItem.expectedQuantity,
          receivedQuantity: `${selectedItem.receivedQuantity}`,
          unitCount: selectedItem.unitCount,
          receivedDate: new Date().toISOString().split('T')[0],
          status: '정상',
        };
        setCompletedData([completedItem, ...completedData]);
        showAlert('라벨 프린트 및 입고가 완료되었습니다.', 'success');
        handleCloseConfirmModal();
      } else {
        showAlert('라벨을 프린트했습니다.', 'success');
      }
    } else {
      // 출고 처리
      if (selectedItem?.shippedQuantity && selectedItem?.unitCount) {
        setShippingWaitingData(shippingWaitingData.filter((data) => data.id !== selectedItem.id));
        const completedItem = {
          id: Date.now(),
          itemCode: selectedItem.itemCode,
          itemName: selectedItem.itemName,
          expectedQuantity: selectedItem.expectedQuantity,
          shippedQuantity: `${selectedItem.shippedQuantity}`,
          unitCount: selectedItem.unitCount,
          shippedDate: new Date().toISOString().split('T')[0],
          status: '정상',
        };
        setShippingCompletedData([completedItem, ...shippingCompletedData]);
        showAlert('라벨 프린트 및 출고가 완료되었습니다.', 'success');
        handleCloseConfirmModal();
      } else {
        showAlert('라벨을 프린트했습니다.', 'success');
      }
    }
    handleCloseLabelPrintModal();
  };

  // 출고 관련 핸들러들
  const handleAddShipping = () => {
    setIsModalOpen(true);
  };

  const handleSubmitShipping = (formData) => {
    const itemInfo = getItemByName(formData.itemName);
    const newWaitingItem = {
      id: Date.now(),
      itemCode: formData.itemCode,
      itemName: formData.itemName,
      expectedQuantity: `${formData.expectedQuantity}${formData.unit}`,
      expectedDate: formData.expectedDate,
      supplier: itemInfo?.supplier || '공급업체',
    };
    setShippingWaitingData([...shippingWaitingData, newWaitingItem]);
    showAlert('출고 대기 목록에 추가되었습니다.', 'success');
    setIsModalOpen(false);
  };

  const handleShip = (item) => {
    setSelectedItem(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmShip = () => {
    if (!selectedItem) return;
    setShippingWaitingData(shippingWaitingData.filter((data) => data.id !== selectedItem.id));
    const completedItem = {
      id: Date.now(),
      itemCode: selectedItem.itemCode,
      itemName: selectedItem.itemName,
      expectedQuantity: selectedItem.expectedQuantity,
      shippedQuantity: `${selectedItem.shippedQuantity}Kg`,
      unitCount: selectedItem.unitCount,
      shippedDate: new Date().toISOString().split('T')[0],
      status: '정상',
    };
    setShippingCompletedData([completedItem, ...shippingCompletedData]);
    showAlert('출고가 완료되었습니다.', 'success');
    handleCloseConfirmModal();
  };

  const handleCancelShipping = (id) => {
    const item = shippingCompletedData.find((data) => data.id === id);
    if (!item) return;
    if (!confirm('출고를 취소하시겠습니까? 대기 목록으로 돌아갑니다.')) return;
    setShippingCompletedData(shippingCompletedData.filter((data) => data.id !== id));
    const waitingItem = {
      id: Date.now(),
      itemCode: item.itemCode,
      itemName: item.itemName,
      expectedQuantity: item.expectedQuantity,
      expectedDate: new Date().toISOString().split('T')[0],
      supplier: '공급업체',
    };
    setShippingWaitingData([...shippingWaitingData, waitingItem]);
    showAlert('출고가 취소되었습니다.', 'info');
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className='mb-6'>
        <div className='mb-1 flex items-center space-x-2'>
          <Package className='h-5 w-5 text-[#674529]' />
          <h1 className='text-lg font-semibold text-[#674529]'>입출고관리</h1>
        </div>
        <p className='text-sm text-gray-600'>
          {subPage === 'nav1'
            ? '입고 대기 목록 및 입고 완료 내역을 관리합니다'
            : '출고 대기 목록 및 출고 완료 내역을 관리합니다'}
        </p>
      </div>

      {subPage === 'nav1' ? (
        <>
          {/* 입고 대기 목록 */}
          <div className='mb-6'>
            <ReceivingWaitingList
              waitingData={waitingData}
              onAddReceiving={handleAddReceiving}
              onReceive={handleReceive}
            />
          </div>

          {/* 입고 완료 목록 */}
          <div>
            <ReceivingCompletedList
              completedData={completedData}
              onCancel={handleCancelReceiving}
              onLabelPrint={handleLabelPrint}
            />
          </div>

          {/* 입고 추가 모달 */}
          <AddReceivingModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitReceiving}
          />

          {/* 입고 확인 모달 */}
          <ReceivingConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={handleCloseConfirmModal}
            onConfirm={handleConfirmReceive}
            onLabelPrint={() => handleLabelPrint(selectedItem)}
            itemData={selectedItem}
          />
        </>
      ) : (
        <>
          {/* 출고 대기 목록 */}
          <div className='mb-6'>
            <ShippingWaitingList
              waitingData={shippingWaitingData}
              onAddShipping={handleAddShipping}
              onShip={handleShip}
            />
          </div>

          {/* 출고 완료 목록 */}
          <div>
            <ShippingCompletedList
              completedData={shippingCompletedData}
              onCancel={handleCancelShipping}
              onLabelPrint={handleLabelPrint}
            />
          </div>

          {/* 출고 추가 모달 */}
          <AddShippingModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitShipping}
          />

          {/* 출고 확인 모달 */}
          <ShippingConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={handleCloseConfirmModal}
            onConfirm={handleConfirmShip}
            onLabelPrint={() => handleLabelPrint(selectedItem)}
            itemData={selectedItem}
          />
        </>
      )}

      {/* 라벨 프린트 모달 */}
      <LabelPrintModal
        isOpen={isLabelPrintModalOpen}
        onClose={handleCloseLabelPrintModal}
        onPrintComplete={handleLabelPrintComplete}
        itemData={selectedItem}
      />

      {/* Alert 모달 */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlert}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  );
};

export default Receiving;