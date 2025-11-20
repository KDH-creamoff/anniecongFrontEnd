import WorkOrderForm from './WorkOrderForm';
import WorkOrderListView from './WorkOrderListView';

const WorkOrderManagement = () => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* 작업지시서 등록 (작업 내용 / BOM) */}
        <WorkOrderForm />

        {/* 작업지시서 목록 */}
        <WorkOrderListView />
      </div>
    </div>
  );
};

export default WorkOrderManagement;
