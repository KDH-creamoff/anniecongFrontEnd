import { useCallback, useEffect } from 'react';
import BOMRegistration from './BOMRegistration';
import BOMList from './BOMList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoms, fetchBomById, createBom, updateBom, deleteBom } from '../../store/modules/basic/actions';

const BOMManagement = () => {
  const dispatch = useDispatch();

  // 리덕스 스토어에서 BOM 관련 상태 가져오기
  const { data: bomList, loading, error } = useSelector((state) => state.basic.boms);
  const { data: bomOperation, loading: operationLoading } = useSelector((state) => state.basic.bomOperation);

  // 컴포넌트 마운트 시 BOM 목록 조회
  useEffect(() => {
    dispatch(fetchBoms.request());
  }, [dispatch]);

  // BOM 생성 성공 시 목록 다시 조회
  useEffect(() => {
    if (bomOperation) {
      dispatch(fetchBoms.request());
    }
  }, [bomOperation, dispatch]);

  // BOM 삭제 핸들러
  const handleDelete = useCallback((id) => {
    dispatch(deleteBom.request(id));
  }, [dispatch]);

  // BOM 상세 조회 핸들러 (BOMList에서 직접 Redux 사용하도록 수정)
  const handleExpand = useCallback(async (id) => {
    try {
      dispatch(fetchBomById.request(id));
      // 비동기 처리를 위해 Promise 반환
      return new Promise((resolve) => {
        // Redux 상태가 업데이트될 때까지 대기
        setTimeout(() => {
          // 이 함수는 실제로 BOMList 컴포넌트에서 직접 Redux 상태를 읽도록 변경 필요
          resolve(null);
        }, 500);
      });
    } catch (error) {
      console.error('BOM 상세 조회 실패:', error);
      return null;
    }
  }, [dispatch]);

  // BOM 검색 핸들러 (현재는 클라이언트 사이드 필터링)
  const handleSearch = useCallback((keyword) => {
    // 현재는 클라이언트 사이드 필터링이 BOMList 컴포넌트에서 처리됨
    console.log('검색어:', keyword);
  }, []);

  // BOM 저장 핸들러
  const handleSaveBOM = useCallback((newBOM) => {
    const payload = {
      name: newBOM.bomName,
      bomName: newBOM.bomName,
      description: newBOM.description || '',
      materials: (newBOM.materials || []).map((m) => ({
        id: m.id,
        code: m.code,
        name: m.name,
        amount: Number(m.amount),
        unit: m.unit,
      })),
      components: (newBOM.materials || []).map((m, i) => ({
        itemCode: m.code,
        item: {
          code: m.code,
          name: m.name,
          unit: m.unit,
        },
        quantity: Number(m.amount),
        unit: m.unit,
        sortOrder: i + 1,
      })),
    };

    dispatch(createBom.request(payload));
  }, [dispatch]);

  // BOM 목록을 BOMList 컴포넌트 형식에 맞게 변환
  const formattedBomList = (bomList || []).map((bom) => ({
    id: bom.id,
    bomName: bom.name || bom.bomName,
    updatedDate: String(bom.updated_at || bom.updatedAt || '').slice(0, 10),
    materials: bom.materials || [],
  }));

  return (
    <div className="space-y-6">
      <BOMRegistration onSave={handleSaveBOM} loading={operationLoading} />
      <BOMList
        bomList={formattedBomList}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onExpand={handleExpand}
      />
    </div>
  );
};

export default BOMManagement;
