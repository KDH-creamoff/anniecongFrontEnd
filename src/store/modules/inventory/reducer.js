import { createAsyncState } from '../../../utils/sagaUtils';
import {
  FETCH_INVENTORY_STATUS,
  FETCH_INVENTORY_MOVEMENTS,
  FETCH_WAREHOUSE_UTILIZATION,
  FETCH_INVENTORY_ALERTS,
  UPDATE_TEMPERATURE,
  FETCH_TEMPERATURE_HISTORY,
  SET_INVENTORY_FILTER,
  CLEAR_INVENTORY_ERROR,
} from './actions';

const initialState = {
  inventoryStatus: createAsyncState([]),
  inventoryMovements: createAsyncState([]),
  warehouseUtilization: createAsyncState(null),
  alerts: createAsyncState([]),
  temperatureHistory: createAsyncState([]),
  updateTemperatureStatus: createAsyncState(null),
  filter: {
    warehouse: 'all',
    category: 'all',
    status: 'all',
  },
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_STATUS.REQUEST:
      return { ...state, inventoryStatus: { ...state.inventoryStatus, loading: true, error: null } };
    case FETCH_INVENTORY_STATUS.SUCCESS:
      return { ...state, inventoryStatus: { data: action.payload, loading: false, error: null } };
    case FETCH_INVENTORY_STATUS.FAILURE:
      return { ...state, inventoryStatus: { ...state.inventoryStatus, loading: false, error: action.error } };

    case FETCH_INVENTORY_MOVEMENTS.REQUEST:
      return { ...state, inventoryMovements: { ...state.inventoryMovements, loading: true, error: null } };
    case FETCH_INVENTORY_MOVEMENTS.SUCCESS:
      return { ...state, inventoryMovements: { data: action.payload, loading: false, error: null } };
    case FETCH_INVENTORY_MOVEMENTS.FAILURE:
      return { ...state, inventoryMovements: { ...state.inventoryMovements, loading: false, error: action.error } };

    case FETCH_WAREHOUSE_UTILIZATION.REQUEST:
      return { ...state, warehouseUtilization: { ...state.warehouseUtilization, loading: true, error: null } };
    case FETCH_WAREHOUSE_UTILIZATION.SUCCESS:
      return { ...state, warehouseUtilization: { data: action.payload, loading: false, error: null } };
    case FETCH_WAREHOUSE_UTILIZATION.FAILURE:
      return { ...state, warehouseUtilization: { ...state.warehouseUtilization, loading: false, error: action.error } };

    case FETCH_INVENTORY_ALERTS.REQUEST:
      return { ...state, alerts: { ...state.alerts, loading: true, error: null } };
    case FETCH_INVENTORY_ALERTS.SUCCESS:
      return { ...state, alerts: { data: action.payload, loading: false, error: null } };
    case FETCH_INVENTORY_ALERTS.FAILURE:
      return { ...state, alerts: { ...state.alerts, loading: false, error: action.error } };

    case UPDATE_TEMPERATURE.REQUEST:
      return { ...state, updateTemperatureStatus: { ...state.updateTemperatureStatus, loading: true, error: null } };
    case UPDATE_TEMPERATURE.SUCCESS:
      return { ...state, updateTemperatureStatus: { data: action.payload, loading: false, error: null } };
    case UPDATE_TEMPERATURE.FAILURE:
      return { ...state, updateTemperatureStatus: { ...state.updateTemperatureStatus, loading: false, error: action.error } };

    case FETCH_TEMPERATURE_HISTORY.REQUEST:
      return { ...state, temperatureHistory: { ...state.temperatureHistory, loading: true, error: null } };
    case FETCH_TEMPERATURE_HISTORY.SUCCESS:
      return { ...state, temperatureHistory: { data: action.payload, loading: false, error: null } };
    case FETCH_TEMPERATURE_HISTORY.FAILURE:
      return { ...state, temperatureHistory: { ...state.temperatureHistory, loading: false, error: action.error } };

    case SET_INVENTORY_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case CLEAR_INVENTORY_ERROR:
      return {
        ...state,
        inventoryStatus: { ...state.inventoryStatus, error: null },
        inventoryMovements: { ...state.inventoryMovements, error: null },
        warehouseUtilization: { ...state.warehouseUtilization, error: null },
        alerts: { ...state.alerts, error: null },
      };

    default:
      return state;
  }
};

export default inventoryReducer;
