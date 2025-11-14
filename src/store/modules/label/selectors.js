// 프린터
export const selectPrinters = (state) => state.label.printers.data;
export const selectPrintersLoading = (state) => state.label.printers.loading;
export const selectPrintersError = (state) => state.label.printers.error;

// 라벨 템플릿
export const selectLabelTemplate = (state) => state.label.template.data;
export const selectLabelTemplateLoading = (state) => state.label.template.loading;
export const selectLabelTemplateError = (state) => state.label.template.error;

// 템플릿 작업
export const selectTemplateOperation = (state) => state.label.templateOperation.data;
export const selectTemplateOperationLoading = (state) => state.label.templateOperation.loading;
export const selectTemplateOperationError = (state) => state.label.templateOperation.error;

// 라벨 목록
export const selectLabels = (state) => state.label.labels.data;
export const selectLabelsLoading = (state) => state.label.labels.loading;
export const selectLabelsError = (state) => state.label.labels.error;

// 바코드로 조회한 라벨
export const selectLabelsByBarcode = (state) => state.label.labelsByBarcode.data;
export const selectLabelsByBarcodeLoading = (state) => state.label.labelsByBarcode.loading;
export const selectLabelsByBarcodeError = (state) => state.label.labelsByBarcode.error;

// 재고ID로 조회한 라벨
export const selectLabelsByInventory = (state) => state.label.labelsByInventory.data;
export const selectLabelsByInventoryLoading = (state) => state.label.labelsByInventory.loading;
export const selectLabelsByInventoryError = (state) => state.label.labelsByInventory.error;

// 라벨 출력 작업
export const selectPrintOperation = (state) => state.label.printOperation.data;
export const selectPrintOperationLoading = (state) => state.label.printOperation.loading;
export const selectPrintOperationError = (state) => state.label.printOperation.error;

// 바코드
export const selectBarcode = (state) => state.label.barcode.data;
export const selectBarcodeLoading = (state) => state.label.barcode.loading;
export const selectBarcodeError = (state) => state.label.barcode.error;

// 출고 라벨
export const selectIssueLabel = (state) => state.label.issueLabel.data;
export const selectIssueLabelLoading = (state) => state.label.issueLabel.loading;
export const selectIssueLabelError = (state) => state.label.issueLabel.error;

// 필터
export const selectLabelFilter = (state) => state.label.filter;
