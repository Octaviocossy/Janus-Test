import { ToastMsg } from './Toast.model';
import { Reporte } from './Reporte.model';
import { TipoProducto } from './TipoProducto.model';

export interface InitialState {
  reportes: Reporte[];
  tipoProducto: TipoProducto[];
  toast: ToastMsg | null;
  spinner: boolean;
}
