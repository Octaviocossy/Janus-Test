import {
  DeleteProductoReq,
  ProductoReq,
  Reporte,
  TipoProducto,
} from '../models';
import { ToastMsg } from '../models/Toast.model';

export type Actions =
  | { type: 'getReportes'; payload: Reporte[] }
  | { type: 'getTipoProducto'; payload: TipoProducto[] }
  | { type: 'editProducto'; payload: ProductoReq }
  | { type: 'deleteProducto'; payload: DeleteProductoReq }
  | { type: 'message'; payload: ToastMsg }
  | { type: 'spinnerOn' }
  | { type: 'resetMessage' };
