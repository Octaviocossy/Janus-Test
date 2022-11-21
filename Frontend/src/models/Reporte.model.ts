export enum StatusColor {
  Suficiente = 'green',
  Faltante = 'yellow',
  'Sin Stock' = 'red',
}

export type StatusColorType = keyof typeof StatusColor;
export interface Reporte {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  precioTotal: number;
  status: StatusColorType;
  idTipoProducto: number;
  idStock: number;
  deleted: boolean;
}
