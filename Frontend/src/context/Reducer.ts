import { InitialState } from '../models';

import { Actions } from './actions';

const Reducer = (state: InitialState, action: Actions) => {
  switch (action.type) {
    case 'getReportes':
      return {
        ...state,
        reportes: action.payload,
        spinner: false,
      };
    case 'editProducto':
      return {
        ...state,
        reportes: [
          ...state.reportes.map((reporte) => {
            if (reporte.id === action.payload.producto.id) {
              reporte.nombre = action.payload.producto.nombre;
              reporte.precio = action.payload.producto.precio;
              reporte.cantidad = action.payload.stock.cantidad;
              reporte.idTipoProducto = action.payload.producto.idTipoProducto;
            }

            return reporte;
          }),
        ],
      };
    case 'deleteProducto':
      return {
        ...state,
        reportes: [
          ...state.reportes.map((reporte) => {
            if (reporte.id === action.payload.producto.id) {
              reporte.deleted = true;
            }

            return reporte;
          }),
        ],
      };

    case 'spinnerOn':
      return {
        ...state,
        spinner: true,
      };
    case 'message':
      return {
        ...state,
        alert: action.payload,
      };
    case 'resetMessage':
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};

export default Reducer;
