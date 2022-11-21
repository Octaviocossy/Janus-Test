import { DeleteProductoReq, ProductoReq, Reporte } from '../models';
import { AlertMsg } from '../models/Alert.model';

export type Actions =
  | { type: 'getReportes'; payload: Reporte[] }
  | { type: 'editProducto'; payload: ProductoReq }
  | { type: 'deleteProducto'; payload: DeleteProductoReq }
  | { type: 'message'; payload: AlertMsg }
  | { type: 'resetMessage' };
