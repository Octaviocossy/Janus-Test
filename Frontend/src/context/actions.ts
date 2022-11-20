import { Reporte } from '../models';
import { AlertMsg } from '../models/Alert.model';

export type Actions =
  | { type: 'getReportes'; payload: Reporte[] }
  | { type: 'message'; payload: AlertMsg }
  | { type: 'resetMessage' };
