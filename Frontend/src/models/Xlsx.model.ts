import { Reporte } from './Reporte.model';

export interface Column<T> {
  Header: string;
  accessor: string;
  Cell?: (props: T) => string;
}

export interface Schemas {
  Reportes: Column<Reporte>[];
}
