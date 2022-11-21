export interface Reporte {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  precioTotal: number;
  status: string;
  idTipoProducto: number;
  idStock: number;
}
