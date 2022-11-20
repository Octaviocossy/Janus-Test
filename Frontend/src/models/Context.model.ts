import { AlertMsg } from './Alert.model';
import { Reporte } from './Reporte.model';

export interface InitialState {
  reportes: Reporte[];
  alert: AlertMsg | null;
}
